/**
 * HTML Master — User Profile & Achievements Module
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Profile = (function() {
  const EMOJIS = ["🧑💻", "👩💻", "👨💻", "🧑🎓", "👩🎓", "👨🎓", "🦊", "🐼", "🐯", "🦁", "🐸", "🐵", "🚀", "⭐", "🔥", "💎"];
  let pickedEmoji = "🧑💻";

  function openProfile() {
    window.HTMLMaster.showView("view-profile");
    renderProfile();
  }

  function renderProfile() {
    const Storage = window.HTMLMaster.modules.Storage;
    const user = Storage.getCurrentUser();
    const area = document.getElementById("profileArea");
    if (!area) return;

    if (!user) {
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
              Verify &amp; Create Profile
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
              Verify &amp; Log In
            </button>
          </div>
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

    area.innerHTML = `
      <div class="profile-header">
        <div class="big-av">${user.emoji || '🧑💻'}</div>
        <div class="who">
          <h2>${Storage.escapeHTML(user.name)}</h2>
          <p style="margin: 4px 0 2px; color: #bae6fd; font-size: 13.5px;">
            📧 <b>Gmail:</b> ${userEmail} &nbsp;•&nbsp; 📱 <b>Mobile:</b> ${userPhone}
          </p>
          <p style="color: var(--text-muted); font-size: 13px;">
            🎂 <b>DOB:</b> ${userDOB} &nbsp;•&nbsp; Member since ${formatDate(user.joined)} • ID: <code>${user.id.slice(0, 10)}</code>
          </p>
        </div>
        <div class="actions-inline">
          <button class="btn ghost sm" onclick="window.HTMLMaster.modules.Profile.changeAvatar()">Change Avatar</button>
          <button class="btn danger sm" onclick="window.HTMLMaster.modules.Profile.logout()">Log Out</button>
        </div>
      </div>

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
      </div>

      <h3 style="margin: 24px 0 14px; font-size: 18px; color: var(--gold); display: flex; align-items: center; gap: 8px;">
        🏆 Earned Badges &amp; Achievements
      </h3>
      ${badgesHTML}

      <h3 style="margin: 24px 0 14px; font-size: 18px; color: #7dd3fc; display: flex; align-items: center; gap: 8px;">
        📊 Assessment Performance Records
      </h3>
      ${tableHTML}
    `;

    renderNavUser();
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
    renderProfile();
    renderNavUser();
    window.HTMLMaster.modules.Topics.renderHome();
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
    const localUser = window.HTMLMaster.modules.Storage.getUsers().find(u =>
      (u.email || "").trim().toLowerCase() === email
    );
    if (localUser) {
      window.HTMLMaster.modules.Storage.setCurrentUserId(localUser.id);
    } else {
      window.HTMLMaster.modules.Storage.createUser(serverUser.name, pickedEmoji, serverUser.email, serverUser.phone, serverUser.dob);
    }
    window.HTMLMaster.modules.Toast.show(`Welcome back, ${serverUser.name}!`, "success");
    renderProfile();
    renderNavUser();
    window.HTMLMaster.modules.Topics.renderHome();
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
      <span class="av">${user.emoji || '🧑💻'}</span>
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
    const Leaderboard = window.HTMLMaster.modules.Leaderboard;
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
    changeAvatar: changeAvatar,
    logout: logout
  };
})();
