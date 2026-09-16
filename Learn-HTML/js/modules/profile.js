/**
 * HTML Master — User Profile & Achievements Module
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Profile = (function() {
  const EMOJIS = ["🧑‍💻", "👩‍💻", "‍💻", "🧑‍🎓", "👩‍🎓", "👨‍", "🦊", "🐼", "🐯", "🦁", "", "🐵", "🚀", "⭐", "🔥", ""];
  let pickedEmoji = "🧑‍💻";
  let screen = "main"; // main | edit | password

  function openProfile() {
    screen = "main";
    window.HTMLMaster.showView("view-profile");
    renderProfile();
  }

  function renderProfile() {
    const Storage = window.HTMLMaster.modules.Storage;
    const user = Storage.getCurrentUser();
    const area = document.getElementById("profileArea");
    if (!area) return;

    if (!user) {
      renderAuth(area);
      return;
    }

    if (screen === "edit") {
      renderEditProfile(area, user);
      return;
    }

    if (screen === "password") {
      renderChangePassword(area, user);
      return;
    }

    // Logged in state
    const topicTotal = Object.values(window.HTMLMaster.data.TOPICS || {}).reduce((s, lv) => s + lv.topics.length, 0);
    const doneCount = Object.values(user.progress || {}).filter(Boolean).length;
    const solvedChallenges = Object.values(user.challenges || {}).filter(Boolean).length;

    const results = (user.results || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const avgQuiz = results.length
      ? Math.round(results.reduce((s, r) => s + (r.score / r.total), 0) / results.length * 100)
      : 0;

    const examPct = user.exam ? Math.round((user.exam.score / user.exam.total) * 100) : null;
    const rankStr = getRankFor(user);
    const assessmentAttempts = Array.isArray(user.assessmentAttempts) ? user.assessmentAttempts : [];
    const assessedLanguages = ["Logical Thinking", "Problem Solving", "Programming Fundamentals", "C++", "Java", "C#", "Python", "DBMS", "SQL"];
    const technicalRows = assessedLanguages.map(language => {
      const attempts = assessmentAttempts.filter(attempt => attempt.language === language);
      const latest = attempts.slice(-1)[0];
      return `<div class="technical-skill-card"><div><strong>${Storage.escapeHTML(language)}</strong><span>Objective assessment</span></div><b>${latest ? latest.percentage + "%" : "—"}</b><span>${latest ? getAssessmentLevel(latest.percentage) : "Not assessed"}</span><small>${latest ? `Attempts: ${attempts.length} · Last: ${formatDate(latest.date)}` : "Complete an assessment"}</small></div>`;
    }).join("");
    const technicalSkillsHTML = `
      <section class="technical-skills-panel">
        <h3>🧠 Technical Skills</h3>
        <div class="technical-skill-list">${technicalRows}</div>
        <button class="btn ghost sm" onclick="window.HTMLMaster.modules.CppQuiz.openQuiz()">Take Technical Assessment &rarr;</button>
      </section>
    `;

    // Achievements Showcase HTML
    const allAchievements = window.HTMLMaster.data.ACHIEVEMENTS || [];
    let badgesHTML = '<div class="badge-grid">';
    allAchievements.forEach(ach => {
      const unlocked = (user.achievements || []).includes(ach.id);
      badgesHTML += `
        <div class="badge-card ${unlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon">${ach.icon}</div>
          <div class="badge-title">${ach.title}</div>
          <div class="badge-desc">${ach.desc}</div>
        </div>
      `;
    });
    badgesHTML += '</div>';

    // Quiz history table HTML
    let tableHTML = "";
    if (results.length === 0) {
      tableHTML = '<div class="empty"><span class="ico">📝</span>No quiz attempts recorded yet. Complete lessons to track quiz scores!</div>';
    } else {
      tableHTML = `
        <table class="data-table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Topic</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
      `;
      results.forEach(r => {
        const pct = Math.round((r.score / r.total) * 100);
        const cls = pct >= 80 ? "good" : pct >= 60 ? "mid" : "bad";
        tableHTML += `
          <tr>
            <td style="text-transform: capitalize;">${Storage.escapeHTML(r.level)}</td>
            <td>${Storage.escapeHTML(r.topic)}</td>
            <td><span class="score-badge ${cls}">${r.score} / ${r.total} (${pct}%)</span></td>
            <td>${formatDate(r.date)}</td>
          </tr>
        `;
      });
      tableHTML += '</tbody></table>';
    }

    const userEmail = user.email ? Storage.escapeHTML(user.email) : "Not provided";
    const userPhone = user.phone ? Storage.escapeHTML(user.phone) : "Not provided";
    const userDOB = user.dob ? formatDate(user.dob) : "Not provided";
    const passwordStatus = user.hasPassword
      ? '<span style="color:#4ade80;">● Password active</span>'
      : '<span style="color:#fbbf24;">● No password set</span>';

    area.innerHTML = `
      <div class="profile-header">
        <div class="big-av">${user.emoji || '🧑‍💻'}</div>
        <div class="who">
          <h2>${Storage.escapeHTML(user.name)}</h2>
          <p style="margin: 4px 0 2px; color: #bae6fd; font-size: 13.5px;">
            📧 <b>Gmail:</b> ${userEmail} &nbsp;•&nbsp; 📱 <b>Mobile:</b> ${userPhone}
          </p>
          <p style="color: var(--text-muted); font-size: 13px;">
            🎂 <b>DOB:</b> ${userDOB} &nbsp;•&nbsp; Member since ${formatDate(user.joined)} • ID: <code>${String(user.id).slice(0, 10)}</code>
          </p>
          <p style="font-size: 12.5px; margin-top: 4px;">🔐 ${passwordStatus}</p>
        </div>
        <div class="actions-inline">
          <button class="btn ghost sm" onclick="window.HTMLMaster.modules.Profile.editProfile()">✏️ Edit Profile</button>
          <button class="btn ghost sm" onclick="window.HTMLMaster.modules.Profile.changePassword()"> Change Password</button>
          <button class="btn ghost sm" onclick="window.HTMLMaster.modules.Profile.changeAvatar()">Change Avatar</button>
          <button class="btn danger sm" onclick="window.HTMLMaster.modules.Profile.logout()">Log Out</button>
        </div>
      </div>
      <p style="color: var(--text-dim); font-size: 12px; margin: -6px 0 18px;">
        You can edit your profile and update your password at any time. Account deletion is disabled by policy.
      </p>

      <div class="stat-grid">
        <div class="stat">
          <div class="num">${doneCount}/${topicTotal}</div>
          <div class="lbl">Lessons Finished</div>
        </div>
        <div class="stat purple">
          <div class="num">${solvedChallenges}/8</div>
          <div class="lbl">Lab Challenges</div>
        </div>
        <div class="stat green">
          <div class="num">${avgQuiz}%</div>
          <div class="lbl">Avg Quiz Accuracy</div>
        </div>
        <div class="stat gold">
          <div class="num">${examPct === null ? "—" : examPct + "%"}</div>
          <div class="lbl">Final Exam Score</div>
        </div>
        <div class="stat">
          <div class="num">${rankStr}</div>
          <div class="lbl">Leaderboard Rank</div>
        </div>
        <div class="stat">
          <div class="num" id="profileEnrolledCount">—</div>
          <div class="lbl">Registered Users</div>
        </div>
      </div>

      ${technicalSkillsHTML}

      <h3 style="margin: 24px 0 14px; font-size: 18px; color: var(--gold); display: flex; align-items: center; gap: 8px;">
        🏆 Earned Badges & Achievements
      </h3>
      ${badgesHTML}

      <h3 style="margin: 24px 0 14px; font-size: 18px; color: #7dd3fc; display: flex; align-items: center; gap: 8px;">
        📊 Assessment Performance Records
      </h3>
      ${tableHTML}
    `;

    renderNavUser();
    updateProfileEnrolledCount();
  }

  function getAssessmentLevel(score) {
    if (score >= 85) return "Expert";
    if (score >= 70) return "Advanced";
    if (score >= 55) return "Intermediate";
    if (score >= 40) return "Foundation";
    return "Beginner";
  }

  async function updateProfileEnrolledCount() {
    const el = document.getElementById("profileEnrolledCount");
    if (!el) return;
    try {
      const count = await window.HTMLMaster.modules.Storage.loadEnrolledCount();
      el.textContent = count.toLocaleString();
    } catch (e) {
      el.textContent = window.HTMLMaster.modules.Storage.getUsers().length.toLocaleString();
    }
  }

  function renderAuth(area) {
    const Storage = window.HTMLMaster.modules.Storage;
    area.innerHTML = `
      <div class="login-card" style="max-width: 520px;">
        <h2>Create Learner Profile</h2>
        <p>Register with your details to save your progress, challenge completions, and leaderboard stats.</p>

        <div class="field">
          <label for="inpName">Full Name *</label>
          <input id="inpName" type="text" placeholder="e.g. Rahul Verma" maxlength="32" autocomplete="name" required />
        </div>

        <div class="field">
          <label for="inpEmail">Gmail / Email Address *</label>
          <input id="inpEmail" type="email" placeholder="e.g. rahul@gmail.com" autocomplete="email" required />
        </div>

        <div class="field">
          <label for="inpPhone">Mobile Number (10 Digits) *</label>
          <input id="inpPhone" type="tel" placeholder="e.g. 9876543210" maxlength="15" autocomplete="tel" required />
        </div>

        <div class="field">
          <label for="inpDOB">Date of Birth (DOB) *</label>
          <input id="inpDOB" type="date" required />
        </div>

        <div class="field">
          <label>Choose Avatar Icon</label>
          <div class="emoji-picker" id="emojiPicker"></div>
        </div>

        <button class="btn" style="width: 100%; margin-top: 14px; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.requestRegistrationOtp()">
          Send Registration OTP &rarr;
        </button>
        <div id="registrationOtpArea" style="display: none; margin-top: 12px;">
          <div class="field">
            <label for="registrationOtp">Email OTP</label>
            <input id="registrationOtp" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code" />
          </div>
          <button class="btn ghost" style="width: 100%; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.verifyRegistrationOtp()">
            Verify & Create Profile
          </button>
        </div>

        <div style="margin: 24px 0 16px; border-top: 1px solid var(--border);"></div>
        <h3 style="margin: 0 0 6px;">Returning Learner?</h3>
        <p style="margin: 0 0 12px;">Log in with the email you used when you registered.</p>
        <div class="field">
          <label for="returningEmail">Registered Email</label>
          <input id="returningEmail" type="email" placeholder="e.g. rahul@gmail.com" autocomplete="email" />
        </div>
        <button class="btn ghost" style="width: 100%; margin-top: 4px; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.requestLoginOtp()">
          Send Login OTP &rarr;
        </button>
        <div id="loginOtpArea" style="display: none; margin-top: 12px;">
          <div class="field">
            <label for="loginOtp">Email OTP</label>
            <input id="loginOtp" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code" />
          </div>
          <button class="btn ghost" style="width: 100%; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.verifyLoginOtp()">
            Verify & Log In
          </button>
        </div>

        <div style="margin: 24px 0 16px; border-top: 1px solid var(--border);"></div>
        <h3 style="margin: 0 0 6px;">Log in with Password</h3>
        <p style="margin: 0 0 12px;">Only works after you have set a password from your profile.</p>
        <div class="field">
          <label for="pwdLoginEmail">Registered Email</label>
          <input id="pwdLoginEmail" type="email" placeholder="e.g. rahul@gmail.com" autocomplete="email" />
        </div>
        <div class="field">
          <label for="pwdLoginPassword">Password</label>
          <input id="pwdLoginPassword" type="password" placeholder="Your password" autocomplete="current-password" />
        </div>
        <button class="btn ghost" style="width: 100%; margin-top: 4px; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.loginWithPassword()">
          Log In with Password &rarr;
        </button>
      </div>
    `;

    const picker = document.getElementById("emojiPicker");
    EMOJIS.forEach(e => {
      const b = document.createElement("button");
      b.textContent = e;
      if (e === pickedEmoji) b.classList.add("selected");
      b.onclick = () => {
        pickedEmoji = e;
        picker.querySelectorAll("button").forEach(x => x.classList.remove("selected"));
        b.classList.add("selected");
      };
      picker.appendChild(b);
    });

    const inp = document.getElementById("inpName");
    if (inp) {
      inp.focus();
      inp.addEventListener("keydown", ev => {
        if (ev.key === "Enter") requestRegistrationOtp();
      });
    }
  }

  function renderEditProfile(area, user) {
    const Storage = window.HTMLMaster.modules.Storage;
    pickedEmoji = user.emoji || "🧑‍💻";
    area.innerHTML = `
      <div class="login-card" style="max-width: 520px;">
        <h2>✏️ Edit Profile</h2>
        <p>Update your learner details. Your email (account ID) cannot be changed here. Deletion is disabled.</p>

        <div class="field">
          <label for="editName">Full Name *</label>
          <input id="editName" type="text" maxlength="32" value="${Storage.escapeHTML(user.name || "")}" />
        </div>

        <div class="field">
          <label for="editEmail">Email (read-only)</label>
          <input id="editEmail" type="email" value="${Storage.escapeHTML(user.email || "")}" disabled />
        </div>

        <div class="field">
          <label for="editPhone">Mobile Number (10 Digits) *</label>
          <input id="editPhone" type="tel" maxlength="15" value="${Storage.escapeHTML(user.phone || "")}" />
        </div>

        <div class="field">
          <label for="editDOB">Date of Birth *</label>
          <input id="editDOB" type="date" value="${user.dob || ""}" />
        </div>

        <div class="field">
          <label>Choose Avatar Icon</label>
          <div class="emoji-picker" id="editEmojiPicker"></div>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 14px;">
          <button class="btn" style="flex: 1; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.requestProfileUpdateOtp()">
            Send Update OTP
          </button>
          <button class="btn ghost" style="flex: 1; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.cancel()">
            Cancel
          </button>
        </div>
        <div id="profileOtpArea" style="display: none; margin-top: 12px;">
          <div class="field">
            <label for="profileOtp">Email OTP</label>
            <input id="profileOtp" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code" />
          </div>
          <button class="btn ghost" style="width: 100%; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.verifyProfileUpdateOtp()">
            Verify &amp; Save Profile
          </button>
        </div>
      </div>
    `;

    const picker = document.getElementById("editEmojiPicker");
    EMOJIS.forEach(e => {
      const b = document.createElement("button");
      b.textContent = e;
      if (e === pickedEmoji) b.classList.add("selected");
      b.onclick = () => {
        pickedEmoji = e;
        picker.querySelectorAll("button").forEach(x => x.classList.remove("selected"));
        b.classList.add("selected");
      };
      picker.appendChild(b);
    });
  }

  async function requestProfileUpdateOtp() {
    const Storage = window.HTMLMaster.modules.Storage;
    const user = Storage.getCurrentUser();
    if (!user) return;

    const name = (document.getElementById("editName").value || "").trim();
    const phone = (document.getElementById("editPhone").value || "").trim();
    const dob = document.getElementById("editDOB").value || "";

    if (name.length < 2) {
      alert("Please enter your full name (at least 2 characters).");
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!dob) {
      alert("Please select your Date of Birth (DOB).");
      return;
    }

    try {
      await Storage.requestProfileOtp({
        email: user.email,
        name,
        phone,
        dob,
        emoji: pickedEmoji
      });
      document.getElementById("profileOtpArea").style.display = "block";
      window.HTMLMaster.modules.Toast.show("Profile update code sent to your email.", "success");
    } catch (error) {
      alert(error.message);
    }
  }

  async function verifyProfileUpdateOtp() {
    const Storage = window.HTMLMaster.modules.Storage;
    const user = Storage.getCurrentUser();
    const otp = (document.getElementById("profileOtp").value || "").trim();
    if (!user || !user.email) return;
    if (otp.length !== 6) {
      alert("Enter the 6-digit code sent to your email.");
      return;
    }
    try {
      const result = await Storage.verifyProfileOtp(user.email, otp);
      const updated = result.user || {};
      Storage.updateProfile({
        name: updated.name,
        phone: updated.phone,
        dob: updated.dob,
        emoji: updated.emoji
      });
      window.HTMLMaster.modules.Toast.show("Profile updated successfully!", "success");
      screen = "main";
      renderProfile();
      renderNavUser();
    } catch (error) {
      alert(error.message);
    }
  }

  function cancel() {
    screen = "main";
    renderProfile();
  }

  function editProfile() {
    screen = "edit";
    renderProfile();
  }

  function changePassword() {
    screen = "password";
    renderProfile();
  }

  function renderChangePassword(area, user) {
    const Storage = window.HTMLMaster.modules.Storage;
    area.innerHTML = `
      <div class="login-card" style="max-width: 520px;">
        <h2>🔑 Update Password</h2>
        <p>We will email a 6-digit verification code to <b>${Storage.escapeHTML(user.email || "")}</b> before changing your password.</p>

        <div class="field">
          <label for="newPassword">New Password *</label>
          <input id="newPassword" type="password" placeholder="At least 6 characters" autocomplete="new-password" />
        </div>

        <div class="field">
          <label for="confirmPassword">Confirm New Password *</label>
          <input id="confirmPassword" type="password" placeholder="Re-enter new password" autocomplete="new-password" />
        </div>

        <button class="btn" style="width: 100%; margin-top: 14px; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.requestPasswordResetOtp()">
          Send Password Reset OTP &rarr;
        </button>

        <div id="passwordOtpArea" style="display: none; margin-top: 12px;">
          <div class="field">
            <label for="passwordOtp">Email OTP</label>
            <input id="passwordOtp" type="text" inputmode="numeric" maxlength="6" placeholder="6-digit code" />
          </div>
          <button class="btn ghost" style="width: 100%; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.verifyPasswordResetOtp()">
            Verify & Update Password
          </button>
        </div>

        <button class="btn ghost" style="width: 100%; margin-top: 12px; padding: 12px;" onclick="window.HTMLMaster.modules.Profile.cancel()">
          Cancel
        </button>
      </div>
    `;
  }

  async function requestPasswordResetOtp() {
    const Storage = window.HTMLMaster.modules.Storage;
    const user = Storage.getCurrentUser();
    if (!user || !user.email) {
      alert("Please log in first.");
      return;
    }
    const p1 = document.getElementById("newPassword").value || "";
    const p2 = document.getElementById("confirmPassword").value || "";
    if (p1.length < 6) {
      alert("Your new password must be at least 6 characters long.");
      return;
    }
    if (p1 !== p2) {
      alert("The two passwords do not match.");
      return;
    }
    try {
      await Storage.requestPasswordOtp(user.email, p1);
      document.getElementById("passwordOtpArea").style.display = "block";
      window.HTMLMaster.modules.Toast.show("Password reset code sent to your email.", "success");
    } catch (error) {
      alert(error.message);
    }
  }

  async function verifyPasswordResetOtp() {
    const Storage = window.HTMLMaster.modules.Storage;
    const user = Storage.getCurrentUser();
    if (!user || !user.email) {
      alert("Please log in first.");
      return;
    }
    const otp = (document.getElementById("passwordOtp").value || "").trim();
    if (otp.length < 4) {
      alert("Enter the 6-digit code sent to your email.");
      return;
    }
    try {
      const result = await Storage.verifyPasswordOtp(user.email, otp);
      Storage.updateCurrentUser({ hasPassword: true, id: result.user && result.user.id ? result.user.id : user.id });
      window.HTMLMaster.modules.Toast.show("Password updated successfully!", "success");
      screen = "main";
      renderProfile();
    } catch (error) {
      alert(error.message);
    }
  }

  async function requestRegistrationOtp() {
    const inpName = document.getElementById("inpName");
    const inpEmail = document.getElementById("inpEmail");
    const inpPhone = document.getElementById("inpPhone");
    const inpDOB = document.getElementById("inpDOB");

    const name = (inpName ? inpName.value : "").trim();
    const email = (inpEmail ? inpEmail.value : "").trim();
    const phone = (inpPhone ? inpPhone.value : "").trim();
    const dob = inpDOB ? inpDOB.value : "";

    if (name.length < 2) {
      alert("Please enter your full name (at least 2 characters).");
      if (inpName) inpName.focus();
      return;
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid Gmail / Email address (e.g. yourname@gmail.com).");
      if (inpEmail) inpEmail.focus();
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      if (inpPhone) inpPhone.focus();
      return;
    }

    if (!dob) {
      alert("Please select your Date of Birth (DOB).");
      if (inpDOB) inpDOB.focus();
      return;
    }

    await requestOtp({ email, purpose: "register", name, phone, dob }, "registrationOtpArea", "Registration code sent to your email.");
  }

  async function verifyRegistrationOtp() {
    const email = document.getElementById("inpEmail").value.trim();
    const otp = document.getElementById("registrationOtp").value.trim();
    const result = await verifyOtp({ email, purpose: "register", otp });
    if (!result) return;

    const profile = result.user;
    window.HTMLMaster.modules.Storage.createUser(profile.name, pickedEmoji, profile.email, profile.phone, profile.dob);
    window.HTMLMaster.modules.Toast.show(`Welcome, ${profile.name}! Profile created successfully!`, "success");
    screen = "main";
    renderProfile();
    renderNavUser();
    window.HTMLMaster.modules.Topics.renderHome();
    // Fire the live-count refresh so the home "enrolled" card and the admin
    // panel immediately show the new total, without a manual reload.
    window.dispatchEvent(new CustomEvent("xtru:registration-complete"));
    if (window.HTMLMaster.modules.Topics.updateEnrolledCount) {
      window.HTMLMaster.modules.Topics.updateEnrolledCount();
    }
  }

  async function requestLoginOtp() {
    const input = document.getElementById("returningEmail");
    const email = (input ? input.value : "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      alert("Please enter the email address you used to register.");
      if (input) input.focus();
      return;
    }
    await requestOtp({ email, purpose: "login" }, "loginOtpArea", "Login code sent to your email.");
  }

  async function verifyLoginOtp() {
    const email = document.getElementById("returningEmail").value.trim().toLowerCase();
    const otp = document.getElementById("loginOtp").value.trim();
    const result = await verifyOtp({ email, purpose: "login", otp });
    if (!result) return;

    const serverUser = result.user;
    window.HTMLMaster.modules.Storage.createUser(serverUser.name, pickedEmoji, serverUser.email, serverUser.phone, serverUser.dob);
    if (serverUser.hasPassword !== undefined) {
      window.HTMLMaster.modules.Storage.updateCurrentUser({ hasPassword: !!serverUser.hasPassword });
    }
    window.HTMLMaster.modules.Toast.show(`Welcome back, ${serverUser.name}!`, "success");
    screen = "main";
    renderProfile();
    renderNavUser();
    window.HTMLMaster.modules.Topics.renderHome();
  }

  async function loginWithPassword() {
    const Storage = window.HTMLMaster.modules.Storage;
    const email = (document.getElementById("pwdLoginEmail").value || "").trim().toLowerCase();
    const password = document.getElementById("pwdLoginPassword").value || "";
    if (!email || !email.includes("@")) {
      alert("Please enter your registered email address.");
      return;
    }
    if (password.length < 1) {
      alert("Please enter your password.");
      return;
    }
    try {
      const result = await Storage.loginWithPassword(email, password);
      const serverUser = result.user;
      Storage.createUser(serverUser.name, pickedEmoji, serverUser.email, serverUser.phone, serverUser.dob);
      Storage.updateCurrentUser({ hasPassword: !!serverUser.hasPassword });
      window.HTMLMaster.modules.Toast.show(`Welcome back, ${serverUser.name}!`, "success");
      screen = "main";
      renderProfile();
      renderNavUser();
      window.HTMLMaster.modules.Topics.renderHome();
    } catch (error) {
      alert(error.message);
    }
  }

  async function requestOtp(payload, areaId, message) {
    try {
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = await readApiResponse(response);
      if (!response.ok) throw new Error(body.error || "Could not send the OTP.");
      document.getElementById(areaId).style.display = "block";
      window.HTMLMaster.modules.Toast.show(message, "success");
    } catch (error) {
      alert(error.message);
    }
  }

  async function verifyOtp(payload) {
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = await readApiResponse(response);
      if (!response.ok) throw new Error(body.error || "Could not verify the OTP.");
      return body;
    } catch (error) {
      alert(error.message);
      return null;
    }
  }

  async function readApiResponse(response) {
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("The authentication server is not running. Start the app with npm start after configuring .env.");
    }
    return response.json();
  }

  function changeAvatar() {
    const user = window.HTMLMaster.modules.Storage.getCurrentUser();
    if (!user) return;
    const curIdx = EMOJIS.indexOf(user.emoji);
    const nextEmoji = EMOJIS[(curIdx + 1) % EMOJIS.length];
    window.HTMLMaster.modules.Storage.updateCurrentUser({ emoji: nextEmoji });
    renderProfile();
    renderNavUser();
  }

  function logout() {
    if (!confirm("Are you sure you want to log out? Your progress is securely saved and will be restored when you log back in.")) return;
    window.HTMLMaster.modules.Storage.logoutUser();
    screen = "main";
    renderProfile();
    renderNavUser();
    window.HTMLMaster.modules.Topics.renderHome();
    window.HTMLMaster.modules.Toast.show("Logged out successfully.", "info");
  }

  function renderNavUser() {
    const existing = document.querySelector(".nav-user");
    if (existing) existing.remove();

    const user = window.HTMLMaster.modules.Storage.getCurrentUser();
    if (!user) return;

    const nav = document.getElementById("navUserContainer");
    if (!nav) return;

    const pill = document.createElement("div");
    pill.className = "nav-user";
    pill.onclick = openProfile;
    pill.innerHTML = `
      <span class="av">${user.emoji || '🧑‍💻'}</span>
      <span class="nm">${window.HTMLMaster.modules.Storage.escapeHTML(user.name)}</span>
    `;
    nav.appendChild(pill);
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return "—";
    }
  }

  function getRankFor(user) {
    const Storage = window.HTMLMaster.modules.Storage;
    const users = Storage.getUsers().slice().sort((a, b) => {
      const aTopics = Object.values(a.progress || {}).filter(Boolean).length;
      const bTopics = Object.values(b.progress || {}).filter(Boolean).length;
      if (bTopics !== aTopics) return bTopics - aTopics;
      const aExam = a.exam ? a.exam.score : -1;
      const bExam = b.exam ? b.exam.score : -1;
      return bExam - aExam;
    });

    const idx = users.findIndex(u => u.id === user.id);
    return idx >= 0 ? `#${idx + 1}` : "—";
  }

  return {
    openProfile: openProfile,
    renderProfile: renderProfile,
    renderNavUser: renderNavUser,
    requestRegistrationOtp: requestRegistrationOtp,
    verifyRegistrationOtp: verifyRegistrationOtp,
    requestLoginOtp: requestLoginOtp,
    verifyLoginOtp: verifyLoginOtp,
    loginWithPassword: loginWithPassword,
    editProfile: editProfile,
    requestProfileUpdateOtp: requestProfileUpdateOtp,
    verifyProfileUpdateOtp: verifyProfileUpdateOtp,
    changePassword: changePassword,
    requestPasswordResetOtp: requestPasswordResetOtp,
    verifyPasswordResetOtp: verifyPasswordResetOtp,
    cancel: cancel,
    changeAvatar: changeAvatar,
    logout: logout
  };
})();