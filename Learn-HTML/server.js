require("dotenv").config();

const crypto = require("crypto");
const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const { MongoClient } = require("mongodb");

const requiredConfig = ["MONGODB_URI", "MONGODB_DB", "OTP_SECRET", "SMTP_USER", "SMTP_PASS"];
const missingConfig = requiredConfig.filter(key => !process.env[key]);
if (missingConfig.length) {
  console.error(`Missing required environment variables: ${missingConfig.join(", ")}`);
  process.exit(1);
}

const app = express();
const port = Number(process.env.PORT || 3001);
const mongoClient = new MongoClient(process.env.MONGODB_URI);
const otpCollection = () => mongoClient.db(process.env.MONGODB_DB).collection("email_otps");
const userCollection = () => mongoClient.db(process.env.MONGODB_DB).collection("learners");

const smtp = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || "true") === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function hashOtp(otp) {
  return crypto.createHmac("sha256", process.env.OTP_SECRET).update(otp).digest("hex");
}

function publicUser(user) {
  return {
    id: user.userId || String(user._id),
    name: user.name,
    email: user.email,
    phone: user.phone,
    dob: user.dob,
    joined: user.joined
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

app.post("/api/auth/request-otp", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const purpose = req.body.purpose === "login" ? "login" : "register";
    if (!email || !email.includes("@")) return res.status(400).json({ error: "Enter a valid email address." });

    const existing = await userCollection().findOne({ email });
    if (purpose === "login" && !existing) {
      return res.status(404).json({ error: "No learner profile was found with that email." });
    }
    if (purpose === "register" && existing) {
      return res.status(409).json({ error: "That email is already registered. Use Log In instead." });
    }
    if (purpose === "register" && !validProfile(req.body)) {
      return res.status(400).json({ error: "Complete your name, mobile number, and date of birth first." });
    }

    const otp = String(crypto.randomInt(100000, 1000000));
    await otpCollection().deleteMany({ email, purpose });
    await otpCollection().insertOne({
      email,
      purpose,
      codeHash: hashOtp(otp),
      profile: purpose === "register" ? {
        name: req.body.name.trim(),
        phone: req.body.phone.trim(),
        dob: req.body.dob
      } : null,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      attempts: 0
    });

    await smtp.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Your XTuti RiseUp verification code",
      text: `Your verification code is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your XTuti RiseUp verification code is:</p><h2>${otp}</h2><p>This code expires in 10 minutes.</p>`
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
    const purpose = req.body.purpose === "login" ? "login" : "register";
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

async function start() {
  await mongoClient.connect();
  await otpCollection().createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await userCollection().createIndex({ email: 1 }, { unique: true });
  app.listen(port, () => console.log(`XTuti RiseUp running at http://localhost:${port}`));
}

start().catch(error => {
  console.error("Could not connect to MongoDB:", error.message);
  process.exit(1);
});
