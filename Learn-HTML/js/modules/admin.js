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

  async function refreshStats() {
    const Storage = window.HTMLMaster.modules.Storage;
    try {
      const stats = await Storage.loadAdminStats();
      setText("adminTotalUsers", Number(stats.total || 0).toLocaleString());
      setText("adminTodayUsers", Number(stats.today || 0).toLocaleString());
      setText("adminPasswordUsers", Number(stats.withPassword || 0).toLocaleString());
      setText("adminLastUpdated", new Date().toLocaleTimeString());
      lastCount = stats.total;
    } catch (e) {
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
            <td>${u.hasPassword ? '<span class="score-badge good">Active</span>' : '<span class="score-badge mid">Not set</span>'}</td>
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
              <th>Password</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    } catch (e) {
      container.innerHTML = '<div class="empty"><span class="ico">⚠️</span>Could not load registered users. Ensure the server is running.</div>';
    }
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
    onCountUpdate: onCountUpdate
  };
})();