require("dotenv").config();

const crypto = require("crypto");
const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const { MongoClient } = require("mongodb");

const requiredConfig = ["MONGODB_URI", "MONGODB_DB", "OTP_SECRET", "SMTP_USER", "SMTP_PASS"];
const missingConfig = requiredConfig.filter(key => !process.env[key]);
const configurationError = missingConfig.length
  ? `Missing required environment variables: ${missingConfig.join(", ")}`
  : null;

const app = express();
const port = Number(process.env.PORT || 3001);
const mongoClient = process.env.MONGODB_URI ? new MongoClient(process.env.MONGODB_URI) : null;
const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);
const adminPassword = String(process.env.ADMIN_PASSWORD || "");
const otpCollection = () => mongoClient.db(process.env.MONGODB_DB).collection("email_otps");
const userCollection = () => mongoClient.db(process.env.MONGODB_DB).collection("learners");
const adminCollection = () => mongoClient.db(process.env.MONGODB_DB).collection("admin_users");
let databaseReady;

const smtp = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false") === "true",
  family: 4,
  tls: {
    rejectUnauthorized: String(process.env.SMTP_TLS_REJECT_UNAUTHORIZED || "true") !== "false"
  },
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

async function connectDatabase() {
  if (configurationError || !mongoClient) {
    throw new Error(configurationError || "MongoDB configuration is missing.");
  }
  if (!databaseReady) {
    databaseReady = mongoClient.connect().then(async () => {
      await otpCollection().createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
      await userCollection().createIndex({ email: 1 }, { unique: true });
      await adminCollection().createIndex({ email: 1 }, { unique: true });
      if (adminEmail && adminPassword) {
        await adminCollection().updateOne(
          { email: adminEmail },
          { $setOnInsert: {
            email: adminEmail,
            role: "ADMIN",
            passwordHash: hashPassword(adminPassword),
            createdAt: new Date()
          } },
          { upsert: true }
        );
      }
    });
  }
  return databaseReady;
}

app.use("/api", async (req, res, next) => {
  try {
    if (configurationError) {
      return res.status(503).json({ error: "Authentication server is not configured in Vercel.", missing: missingConfig });
    }
    await connectDatabase();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    res.status(503).json({ error: "Database is temporarily unavailable." });
  }
});

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function hashOtp(otp) {
  return crypto.createHmac("sha256", process.env.OTP_SECRET).update(otp).digest("hex");
}

function signAdminToken() {
  const payload = `${adminEmail}:${Date.now() + 8 * 60 * 60 * 1000}`;
  const signature = crypto.createHmac("sha256", process.env.OTP_SECRET || "missing").update(payload).digest("hex");
  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

function isAdminAuthenticated(req) {
  const raw = String(req.headers.cookie || "").split(";").find(value => value.trim().startsWith("xtru_admin="));
  if (!raw) return false;
  try {
    const token = Buffer.from(raw.split("=").slice(1).join("=").trim(), "base64url").toString();
    const separator = token.lastIndexOf(".");
    const payload = token.slice(0, separator);
    const signature = token.slice(separator + 1);
    const expected = crypto.createHmac("sha256", process.env.OTP_SECRET || "missing").update(payload).digest("hex");
    const [email, expires] = payload.split(":");
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) &&
      email === adminEmail && Number(expires) > Date.now();
  } catch (error) {
    return false;
  }
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  if (!stored || !stored.includes(":")) return false;
  const [salt, hash] = stored.split(":");
  const test = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(test, "hex"));
}

function publicUser(user) {
  return {
    id: user.userId || String(user._id),
    name: user.name,
    email: user.email,
    phone: user.phone,
    dob: user.dob,
    joined: user.joined,
    hasPassword: !!user.passwordHash
  };
}

function publicLeaderboardUser(user) {
  return {
    id: user.userId || String(user._id),
    name: user.name,
    emoji: user.emoji || "🧑💻",
    joined: user.joined,
    progress: user.progress || {},
    challenges: user.challenges || {},
    exam: user.exam || null
  };
}

function storedLearner(body) {
  return {
    userId: String(body.id || "").trim(),
    name: String(body.name || "").trim(),
    email: normalizeEmail(body.email),
    phone: String(body.phone || "").trim(),
    dob: String(body.dob || ""),
    emoji: body.emoji || "🧑💻",
    joined: body.joined || new Date().toISOString(),
    progress: body.progress || {},
    challenges: body.challenges || {},
    achievements: body.achievements || [],
    results: body.results || [],
    assessmentAttempts: body.assessmentAttempts || [],
    exam: body.exam || null,
    playgroundRuns: Number(body.playgroundRuns || 0),
    gameScores: body.gameScores || null,
    updatedAt: new Date()
  };
}

function validProfile(profile) {
  return profile.name && profile.name.trim().length >= 2 &&
    profile.phone && profile.phone.replace(/\D/g, "").length >= 10 && profile.dob;
}

// Every successful registration/OTP action invalidates the cached live count
// so subsequent /api/stats/enrolled calls always read the freshest total.
let liveCountCache = { count: 0, at: 0 };

app.post("/api/auth/request-otp", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const purpose = ["login", "register", "password", "profile"].includes(req.body.purpose) ? req.body.purpose : "register";
    if (!email || !email.includes("@")) return res.status(400).json({ error: "Enter a valid email address." });

    const existing = await userCollection().findOne({ email });
    if ((purpose === "login" || purpose === "password" || purpose === "profile") && !existing) {
      return res.status(404).json({ error: "No learner profile was found with that email." });
    }
    if (purpose === "register" && existing) {
      return res.status(409).json({ error: "That email is already registered. Use Log In instead." });
    }
    if (purpose === "register" && !validProfile(req.body)) {
      return res.status(400).json({ error: "Complete your name, mobile number, and date of birth first." });
    }
    if (purpose === "password" && String(req.body.newPassword || "").length < 6) {
      return res.status(400).json({ error: "Your new password must be at least 6 characters long." });
    }
    if (purpose === "profile" && !validProfile(req.body)) {
      return res.status(400).json({ error: "Complete your name, mobile number, and date of birth first." });
    }

    const otp = String(crypto.randomInt(100000, 1000000));
    await otpCollection().deleteMany({ email, purpose });
    await otpCollection().insertOne({
      email,
      purpose,
      codeHash: hashOtp(otp),
      profile: purpose === "register" || purpose === "profile" ? {
        name: req.body.name.trim(),
        phone: req.body.phone.trim(),
        dob: req.body.dob,
        emoji: req.body.emoji || "🧑‍💻"
      } : null,
      passwordHash: purpose === "password" ? hashPassword(req.body.newPassword) : null,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      attempts: 0
    });

    const subject = purpose === "password"
      ? "Your XTuti RiseUp password reset code"
      : "Your XTuti RiseUp verification code";
    const intro = purpose === "password"
      ? "Use this code to update your XTuti RiseUp password:"
      : "Your XTuti RiseUp verification code is:";

    await smtp.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject,
      text: `${intro.replace(":", "")} ${otp}. It expires in 10 minutes.`,
      html: `<p>${intro}</p><h2>${otp}</h2><p>This code expires in 10 minutes.</p>`
    });
    res.json({ message: "Verification code sent." });
  } catch (error) {
    console.error("OTP request failed:", error);
    res.status(500).json({ error: "Could not send the verification code." });
  }
});

app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const purpose = ["login", "register", "password", "profile"].includes(req.body.purpose) ? req.body.purpose : "register";
    const otp = String(req.body.otp || "").trim();
    const record = await otpCollection().findOne({ email, purpose });

    if (!record || record.expiresAt <= new Date()) {
      return res.status(400).json({ error: "That code is invalid or expired." });
    }
    if (record.attempts >= 5) {
      return res.status(429).json({ error: "Too many attempts. Request a new code." });
    }
    await otpCollection().updateOne({ _id: record._id }, { $inc: { attempts: 1 } });
    if (hashOtp(otp) !== record.codeHash) {
      return res.status(400).json({ error: "That verification code is incorrect." });
    }

    let user;
    if (purpose === "register") {
      user = {
        name: record.profile.name,
        email,
        phone: record.profile.phone,
        dob: record.profile.dob,
        joined: new Date().toISOString()
      };
      const result = await userCollection().insertOne(user);
      user._id = result.insertedId;
      invalidateLiveCount();
    } else if (purpose === "password") {
      await userCollection().updateOne(
        { email },
        { $set: { passwordHash: record.passwordHash, updatedAt: new Date() } }
      );
      user = await userCollection().findOne({ email });
    } else if (purpose === "profile") {
      await userCollection().updateOne(
        { email },
        { $set: {
          name: record.profile.name,
          phone: record.profile.phone,
          dob: record.profile.dob,
          emoji: record.profile.emoji,
          updatedAt: new Date()
        } }
      );
      user = await userCollection().findOne({ email });
    } else {
      user = await userCollection().findOne({ email });
    }
    await otpCollection().deleteOne({ _id: record._id });
    res.json({ user: publicUser(user) });
  } catch (error) {
    console.error("OTP verification failed:", error);
    res.status(500).json({ error: "Could not verify the code." });
  }
});

app.put("/api/learners/:email", async (req, res) => {
  try {
    const email = normalizeEmail(req.params.email);
    const learner = storedLearner(Object.assign({}, req.body, { email }));
    if (!learner.userId || !learner.name || learner.email !== email) {
      return res.status(400).json({ error: "Invalid learner data." });
    }
    // Never let a profile sync wipe out an existing password hash.
    const existing = await userCollection().findOne({ email }, { projection: { passwordHash: 1 } });
    if (existing && existing.passwordHash) learner.passwordHash = existing.passwordHash;
    await userCollection().updateOne({ email }, { $set: learner }, { upsert: true });
    res.json({ user: learner });
  } catch (error) {
    console.error("Learner sync failed:", error);
    res.status(500).json({ error: "Could not save learner data." });
  }
});

app.get("/api/leaderboard", async (req, res) => {
  try {
    const users = await userCollection()
      .find({}, { projection: { userId: 1, name: 1, emoji: 1, joined: 1, progress: 1, challenges: 1, exam: 1 } })
      .toArray();
    res.json({ users: users.map(publicLeaderboardUser) });
  } catch (error) {
    console.error("Leaderboard load failed:", error);
    res.status(500).json({ error: "Could not load the leaderboard." });
  }
});

function invalidateLiveCount() {
  liveCountCache = { count: 0, at: 0 };
}

async function getLiveUserCount() {
  const fresh = Date.now() - liveCountCache.at < 3000;
  if (fresh) return liveCountCache.count;
  const count = await userCollection().countDocuments();
  liveCountCache = { count, at: Date.now() };
  return count;
}

app.get("/api/stats/enrolled", async (req, res) => {
  try {
    const count = await getLiveUserCount();
    res.json({ count, generatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Enrollment count load failed:", error);
    res.status(500).json({ error: "Could not load enrollment count." });
  }
});

app.post("/api/compiler/run", async (req, res) => {
  const runtimeUrl = String(process.env.COMPILER_SERVICE_URL || "").replace(/\/$/, "");
  if (!runtimeUrl) {
    return res.status(503).json({ error: "Code runtime is not configured. Set COMPILER_SERVICE_URL to a Judge0-compatible open-source service." });
  }
  const languageIds = { cpp: 54, java: 62, csharp: 51, python: 71, sql: 82 };
  const language = String(req.body.language || "");
  const source = String(req.body.source || "");
  if (!languageIds[language] || !source.trim()) return res.status(400).json({ error: "Choose a supported language and provide source code." });
  try {
    const response = await fetch(`${runtimeUrl}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers: Object.assign({ "Content-Type": "application/json" }, process.env.COMPILER_API_KEY ? { "X-Auth-Token": process.env.COMPILER_API_KEY } : {}),
      body: JSON.stringify({ language_id: languageIds[language], source_code: source, stdin: String(req.body.stdin || "") })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) return res.status(response.status).json({ error: result.message || "Compiler service rejected the request." });
    res.json({ status: result.status && result.status.description, stdout: result.stdout || "", stderr: result.stderr || result.compile_output || "" });
  } catch (error) {
    console.error("Compiler request failed:", error.message);
    res.status(502).json({ error: "Code runtime is unavailable." });
  }
});

app.post("/api/admin/login", async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || "");
  const admin = await adminCollection().findOne({ email, role: "ADMIN" });
  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return res.status(401).json({ error: "Invalid admin credentials." });
  }
  res.setHeader("Set-Cookie", `xtru_admin=${signAdminToken()}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=28800`);
  res.json({ authenticated: true });
});

app.use("/api/admin", (req, res, next) => {
  if (!isAdminAuthenticated(req)) return res.status(401).json({ error: "Admin login required." });
  next();
});

app.get("/api/admin/stats", async (req, res) => {
  try {
    const total = await getLiveUserCount();
    const withPassword = await userCollection().countDocuments({ passwordHash: { $exists: true, $ne: null } });
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const today = await userCollection().countDocuments({ joined: { $gte: startOfDay.toISOString() } });
    const learners = await userCollection().find({}, { projection: { assessmentAttempts: 1 } }).toArray();
    const attempts = learners.flatMap(user => Array.isArray(user.assessmentAttempts) ? user.assessmentAttempts : []);
    const completed = attempts.filter(attempt => attempt.percentage !== undefined);
    const averageScore = completed.length
      ? Math.round(completed.reduce((sum, attempt) => sum + Number(attempt.percentage || 0), 0) / completed.length * 10) / 10
      : 0;
    const cppAssessments = attempts.filter(attempt => attempt.language === "C++").length;
    res.json({ total, withPassword, today, totalAssessments: attempts.length, completedAssessments: completed.length, averageScore, cppAssessments, generatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Admin stats load failed:", error);
    res.status(500).json({ error: "Could not load admin stats." });
  }
});

app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await userCollection()
      .find({}, { projection: { userId: 1, name: 1, email: 1, phone: 1, dob: 1, joined: 1, passwordHash: 1, assessmentAttempts: 1 } })
      .sort({ joined: -1 })
      .limit(200)
      .toArray();
    res.json({
      users: users.map(user => ({
        id: user.userId || String(user._id),
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        joined: user.joined,
        hasPassword: !!user.passwordHash,
        assessmentAttempts: Array.isArray(user.assessmentAttempts) ? user.assessmentAttempts.length : 0,
        averageScore: Array.isArray(user.assessmentAttempts) && user.assessmentAttempts.length
          ? Math.round(user.assessmentAttempts.reduce((sum, attempt) => sum + Number(attempt.percentage || 0), 0) / user.assessmentAttempts.length)
          : 0
      }))
    });
  } catch (error) {
    console.error("Admin users load failed:", error);
    res.status(500).json({ error: "Could not load admin users." });
  }
});

app.get("/api/admin/users/:id", async (req, res) => {
  try {
    const user = await userCollection().findOne({ userId: req.params.id }, { projection: { passwordHash: 0 } });
    if (!user) return res.status(404).json({ error: "Learner not found." });
    res.json({ user });
  } catch (error) {
    console.error("Admin learner detail failed:", error);
    res.status(500).json({ error: "Could not load learner details." });
  }
});

app.put("/api/admin/users/:id", async (req, res) => {
  try {
    const patch = {};
    ["name", "phone", "dob", "emoji"].forEach(key => {
      if (req.body[key] !== undefined) patch[key] = String(req.body[key]).trim();
    });
    if (patch.name !== undefined && patch.name.length < 2) return res.status(400).json({ error: "Name is too short." });
    const result = await userCollection().findOneAndUpdate(
      { userId: req.params.id },
      { $set: Object.assign(patch, { updatedAt: new Date() }) },
      { returnDocument: "after", projection: { passwordHash: 0 } }
    );
    if (!result) return res.status(404).json({ error: "Learner not found." });
    res.json({ user: result });
  } catch (error) {
    console.error("Admin learner update failed:", error);
    res.status(500).json({ error: "Could not update learner details." });
  }
});

app.post("/api/auth/login-password", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");
    const user = await userCollection().findOne({ email });
    if (!user || !user.passwordHash) {
      return res.status(404).json({ error: "This account has no password set yet. Use the email OTP to log in." });
    }
    if (!verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: "That password is incorrect." });
    }
    res.json({ user: publicUser(user) });
  } catch (error) {
    console.error("Password login failed:", error);
    res.status(500).json({ error: "Could not log in with password." });
  }
});

async function start() {
  if (configurationError) throw new Error(configurationError);
  await connectDatabase();
  app.listen(port, () => console.log(`XTuti RiseUp running at http://localhost:${port}`));
}

if (require.main === module) {
  start().catch(error => {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  });
}

module.exports = app;