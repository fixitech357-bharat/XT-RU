/**
 * HTML Master — Local Leaderboard Module
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Leaderboard = (function() {
  function compareUsers(a, b) {
    const aTopics = Object.values(a.progress || {}).filter(Boolean).length;
    const bTopics = Object.values(b.progress || {}).filter(Boolean).length;
    if (bTopics !== aTopics) return bTopics - aTopics;

    const aChallenges = Object.values(a.challenges || {}).filter(Boolean).length;
    const bChallenges = Object.values(b.challenges || {}).filter(Boolean).length;
    if (bChallenges !== aChallenges) return bChallenges - aChallenges;

    const aExam = a.exam ? a.exam.score : -1;
    const bExam = b.exam ? b.exam.score : -1;
    if (bExam !== aExam) return bExam - aExam;

    return new Date(a.joined) - new Date(b.joined);
  }

  function openLeaderboard() {
    window.HTMLMaster.showView("view-leaderboard");
    renderLeaderboard();
  }

  async function renderLeaderboard() {
    const Storage = window.HTMLMaster.modules.Storage;
    let users = Storage.getUsers().slice();
    const area = document.getElementById("leaderboardArea");
    const curId = Storage.getCurrentUserId();

    try {
      const remoteUsers = await Storage.loadLeaderboardUsers();
      if (remoteUsers.length) users = remoteUsers;
    } catch (e) {
      // Keep the cached leaderboard visible when the API is unavailable.
    }
    users.sort(compareUsers);

    if (users.length === 0) {
      area.innerHTML = `
        <div class="empty">
          <span class="ico">🏆</span>
          No players registered yet. Create your learner profile to start competing!
        </div>
      `;
      return;
    }

    const totalTopics = Object.values(window.HTMLMaster.data.TOPICS || {}).reduce((s, lv) => s + lv.topics.length, 0);

    let rows = "";
    users.forEach((u, i) => {
      const topics = Object.values(u.progress || {}).filter(Boolean).length;
      const challenges = Object.values(u.challenges || {}).filter(Boolean).length;
      const examPct = u.exam ? Math.round((u.exam.score / u.exam.total) * 100) + "%" : "—";
      const isMe = u.id === curId;
      const topCls = i === 0 ? "top1" : i === 1 ? "top2" : i === 2 ? "top3" : "";
      const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "";

      const joinDate = formatDate(u.joined);

      rows += `
        <tr ${isMe ? 'style="background: rgba(56, 189, 248, 0.08);"' : ''}>
          <td>
            <div class="rank-row ${topCls}">
              <span class="rank-num">${i + 1}</span>
            </div>
          </td>
          <td>
            <b>${u.emoji || '🧑💻'} ${Storage.escapeHTML(u.name)}</b>
            ${isMe ? '<span style="color: var(--primary); font-size: 12px; margin-left: 4px;">(you)</span>' : ''}
            ${medal ? ' ' + medal : ''}
          </td>
          <td>${topics} / ${totalTopics}</td>
          <td>${challenges} / 8</td>
          <td>
            <span class="score-badge ${u.exam && (u.exam.score / u.exam.total) >= 0.7 ? 'good' : u.exam ? 'mid' : 'bad'}">
              ${examPct}
            </span>
          </td>
          <td>${joinDate}</td>
        </tr>
      `;
    });

    area.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Learner</th>
            <th>Lessons</th>
            <th>Lab Solved</th>
            <th>Final Exam</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return "—";
    }
  }

  return {
    openLeaderboard: openLeaderboard,
    renderLeaderboard: renderLeaderboard
  };
})();
