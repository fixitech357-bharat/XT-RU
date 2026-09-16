/**
 * HTML Master — Admin Panel (Live Registered Users)
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Admin = (function() {
  let refreshTimer = null;
  let lastCount = null;

  function openAdmin() {
    window.HTMLMaster.showView("view-admin");
    renderAdmin();
    startAutoRefresh();
  }

  function startAutoRefresh() {
    stopAutoRefresh();
    // Poll the live count every 10s while the admin panel is open so the
    // total always reflects the latest registration without a manual reload.
    refreshTimer = setInterval(() => {
      const view = document.getElementById("view-admin");
      if (view && view.classList.contains("active")) {
        refreshStats();
      } else {
        stopAutoRefresh();
      }
    }, 10000);
  }

  function stopAutoRefresh() {
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  }

  function renderAdmin() {
    const area = document.getElementById("adminArea");
    if (!area) return;
    area.innerHTML = `
      <div class="stat-grid" id="adminStatGrid">
        <div class="stat">
          <div class="num" id="adminTotalUsers">—</div>
          <div class="lbl">Total Registered Users</div>
        </div>
        <div class="stat green">
          <div class="num" id="adminTodayUsers">—</div>
          <div class="lbl">Registered Today</div>
        </div>
        <div class="stat purple">
          <div class="num" id="adminPasswordUsers">—</div>
          <div class="lbl">With Password Set</div>
        </div>
        <div class="stat gold">
          <div class="num" id="adminLastUpdated">—</div>
          <div class="lbl">Last Updated</div>
        </div>
        <div class="stat">
          <div class="num" id="adminAssessmentCount">—</div>
          <div class="lbl">Quiz Attempts</div>
        </div>
        <div class="stat green">
          <div class="num" id="adminAverageScore">—</div>
          <div class="lbl">Average Score</div>
        </div>
        <div class="stat purple">
          <div class="num" id="adminCppAssessments">—</div>
          <div class="lbl">C++ Assessments</div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin: 22px 0 12px; flex-wrap: wrap; gap: 10px;">
        <h3 style="margin: 0; font-size: 18px; color: #7dd3fc;">👥 Registered Learners (Live)</h3>
        <button class="btn ghost sm" onclick="window.HTMLMaster.modules.Admin.refresh()">↻ Refresh Now</button>
      </div>
      <div id="adminUsersTable">
        <div class="empty"><span class="ico">⏳</span>Loading registered users...</div>
      </div>
    `;
    refreshStats();
    refreshUsers();
  }

  function renderLogin() {
    const area = document.getElementById("adminArea");
    if (!area) return;
    area.innerHTML = `
      <div class="login-card admin-login-card">
        <div class="admin-login-icon">🔐</div>
        <h2>Admin Sign In</h2>
        <p>Use the administrator credentials configured for this deployment.</p>
        <div class="field"><label for="adminEmail">Admin Email</label><input id="adminEmail" type="email" autocomplete="username" /></div>
        <div class="field"><label for="adminPassword">Admin Password</label><input id="adminPassword" type="password" autocomplete="current-password" /></div>
        <button class="btn" style="width:100%;" onclick="window.HTMLMaster.modules.Admin.login()">Sign In &rarr;</button>
        <p class="admin-login-note">Admin credentials are never stored in the browser.</p>
      </div>
    `;
  }

  async function login() {
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;
    try {
      await window.HTMLMaster.modules.Storage.adminLogin(email, password);
      renderAdmin();
      window.HTMLMaster.modules.Toast.show("Admin access granted.", "success");
    } catch (error) {
      alert(error.message);
    }
  }

  async function refreshStats() {
    const Storage = window.HTMLMaster.modules.Storage;
    try {
      const stats = await Storage.loadAdminStats();
      setText("adminTotalUsers", Number(stats.total || 0).toLocaleString());
      setText("adminTodayUsers", Number(stats.today || 0).toLocaleString());
      setText("adminPasswordUsers", Number(stats.withPassword || 0).toLocaleString());
      setText("adminAssessmentCount", Number(stats.totalAssessments || 0).toLocaleString());
      setText("adminAverageScore", `${Number(stats.averageScore || 0).toLocaleString()}%`);
      setText("adminCppAssessments", Number(stats.cppAssessments || 0).toLocaleString());
      setText("adminLastUpdated", new Date().toLocaleTimeString());
      lastCount = stats.total;
    } catch (e) {
      if (e.status === 401) {
        renderLogin();
        return;
      }
      // Fall back to the shared live-count endpoint if admin stats fail.
      try {
        const count = await Storage.loadEnrolledCount();
        setText("adminTotalUsers", count.toLocaleString());
        setText("adminLastUpdated", new Date().toLocaleTimeString());
      } catch (err) {
        setText("adminTotalUsers", "—");
      }
    }
  }

  async function refreshUsers() {
    const Storage = window.HTMLMaster.modules.Storage;
    const container = document.getElementById("adminUsersTable");
    if (!container) return;
    try {
      const users = await Storage.loadAdminUsers();
      if (!users.length) {
        container.innerHTML = '<div class="empty"><span class="ico">📭</span>No registered users yet.</div>';
        return;
      }
      let rows = "";
      users.forEach((u, i) => {
        rows += `
          <tr>
            <td>${i + 1}</td>
            <td>${Storage.escapeHTML(u.name || "—")}</td>
            <td>${Storage.escapeHTML(u.email || "—")}</td>
            <td>${Storage.escapeHTML(u.phone || "—")}</td>
            <td>${u.dob ? Storage.escapeHTML(u.dob) : "—"}</td>
            <td>${u.joined ? new Date(u.joined).toLocaleDateString() : "—"}</td>
            <td>${Number(u.assessmentAttempts || 0)}</td>
            <td>${Number(u.averageScore || 0)}%</td>
            <td>${u.hasPassword ? '<span class="score-badge good">Active</span>' : '<span class="score-badge mid">Not set</span>'}</td>
            <td><button class="btn ghost sm" onclick="window.HTMLMaster.modules.Admin.viewUser('${encodeURIComponent(u.id)}')">View / Edit</button></td>
          </tr>
        `;
      });
      container.innerHTML = `
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>Joined</th>
              <th>Attempts</th>
              <th>Average</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    } catch (e) {
      if (e.status === 401) {
        renderLogin();
        return;
      }
      container.innerHTML = '<div class="empty"><span class="ico">⚠️</span>Could not load registered users. Ensure the server is running.</div>';
    }
  }

  async function viewUser(encodedId) {
    const id = decodeURIComponent(encodedId);
    try {
      const user = await window.HTMLMaster.modules.Storage.loadAdminUser(id);
      const attempts = Array.isArray(user.assessmentAttempts) ? user.assessmentAttempts : [];
      const details = attempts.length
        ? attempts.map(attempt => `<li>${escape(user.language || attempt.language)} — ${attempt.percentage}% — ${new Date(attempt.date).toLocaleDateString()}</li>`).join("")
        : "<li>No assessment attempts yet.</li>";
      const area = document.getElementById("adminUsersTable");
      area.innerHTML = `
        <div class="admin-user-detail">
          <button class="back-btn" onclick="window.HTMLMaster.modules.Admin.refreshUsers()">&larr; Back to users</button>
          <h3>${escape(user.name)} <span class="pill">${attempts.length} attempts</span></h3>
          <p>${escape(user.email)} · ${escape(user.phone || "No phone")} · Joined ${new Date(user.joined).toLocaleDateString()}</p>
          <h4>Technical Assessment History</h4><ul>${details}</ul>
          <div class="admin-edit-grid">
            <label>Name<input id="adminEditName" value="${escape(user.name)}" /></label>
            <label>Mobile<input id="adminEditPhone" value="${escape(user.phone || "")}" /></label>
            <label>DOB<input id="adminEditDob" type="date" value="${escape(user.dob || "")}" /></label>
          </div>
          <button class="btn" onclick="window.HTMLMaster.modules.Admin.saveUser('${encodeURIComponent(user.userId || user.id)}')">Save Learner Details</button>
        </div>
      `;
    } catch (error) {
      alert(error.message);
    }
  }

  async function saveUser(encodedId) {
    try {
      await window.HTMLMaster.modules.Storage.updateAdminUser(decodeURIComponent(encodedId), {
        name: document.getElementById("adminEditName").value,
        phone: document.getElementById("adminEditPhone").value,
        dob: document.getElementById("adminEditDob").value
      });
      window.HTMLMaster.modules.Toast.show("Learner details updated.", "success");
      refreshUsers();
    } catch (error) {
      alert(error.message);
    }
  }

  function escape(value) {
    return window.HTMLMaster.modules.Storage.escapeHTML(value || "");
  }

  function refresh() {
    refreshStats();
    refreshUsers();
    window.HTMLMaster.modules.Toast.show("Admin data refreshed.", "info", 1500);
  }

  // Called by the Topics live-count poller so the admin total stays in sync.
  function onCountUpdate(count) {
    const el = document.getElementById("adminTotalUsers");
    if (el && document.getElementById("view-admin") && document.getElementById("view-admin").classList.contains("active")) {
      el.textContent = Number(count || 0).toLocaleString();
      setText("adminLastUpdated", new Date().toLocaleTimeString());
    }
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  return {
    openAdmin: openAdmin,
    renderAdmin: renderAdmin,
    refresh: refresh,
    refreshStats: refreshStats,
    refreshUsers: refreshUsers,
    login: login,
    viewUser: viewUser,
    saveUser: saveUser,
    onCountUpdate: onCountUpdate
  };
})();