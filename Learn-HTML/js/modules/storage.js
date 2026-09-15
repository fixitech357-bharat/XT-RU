/**
 * HTML Master — State & Local Storage Management
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Storage = (function() {
  const USERS_KEY = "htmlMasterUsers";
  const CURRENT_KEY = "htmlMasterCurrent";
  const LEGACY_PROG_KEY = "htmlMasterProgress";

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {}
  }

  function getCurrentUserId() {
    try {
      return localStorage.getItem(CURRENT_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  function setCurrentUserId(id) {
    try {
      if (id) localStorage.setItem(CURRENT_KEY, id);
      else localStorage.removeItem(CURRENT_KEY);
    } catch (e) {}
  }

  function getCurrentUser() {
    const id = getCurrentUserId();
    if (!id) return null;
    return getUsers().find(u => u.id === id) || null;
  }

  function updateCurrentUser(patch) {
    const users = getUsers();
    const id = getCurrentUserId();
    const idx = users.findIndex(u => u.id === id);
    if (idx < 0) return null;
    users[idx] = Object.assign({}, users[idx], patch);
    saveUsers(users);
    return users[idx];
  }

  function createUser(name, emoji, email, phone, dob) {
    const users = getUsers();
    const cleanName = (name || "").trim();
    let user = users.find(u => u.name.toLowerCase() === cleanName.toLowerCase());
    if (!user) {
      user = {
        id: "u_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
        name: cleanName,
        emoji: emoji || "🧑💻",
        email: (email || "").trim(),
        phone: (phone || "").trim(),
        dob: dob || "",
        joined: new Date().toISOString(),
        progress: {},
        challenges: {},
        achievements: [],
        results: [],
        exam: null,
        playgroundRuns: 0
      };
      users.push(user);
    } else {
      user.emoji = emoji || user.emoji;
      if (email) user.email = email.trim();
      if (phone) user.phone = phone.trim();
      if (dob) user.dob = dob;
    }
    saveUsers(users);
    setCurrentUserId(user.id);
    return user;
  }

  function logoutUser() {
    setCurrentUserId(null);
  }

  // Progress helpers
  function isDone(topicId) {
    const user = getCurrentUser();
    if (user && user.progress) {
      return user.progress[topicId] === true;
    }
    try {
      const p = JSON.parse(localStorage.getItem(LEGACY_PROG_KEY) || "{}");
      return p[topicId] === true;
    } catch (e) {
      return false;
    }
  }

  function markDone(topicId) {
    const user = getCurrentUser();
    if (user) {
      const prog = user.progress || {};
      prog[topicId] = true;
      updateCurrentUser({ progress: prog });
      checkProgAchievements();
    } else {
      try {
        const p = JSON.parse(localStorage.getItem(LEGACY_PROG_KEY) || "{}");
        p[topicId] = true;
        localStorage.setItem(LEGACY_PROG_KEY, JSON.stringify(p));
      } catch (e) {}
    }
  }

  function isChallengeDone(chId) {
    const user = getCurrentUser();
    return user && user.challenges && user.challenges[chId] === true;
  }

  function markChallengeDone(chId) {
    const user = getCurrentUser();
    if (!user) return;
    const ch = user.challenges || {};
    ch[chId] = true;
    updateCurrentUser({ challenges: ch });

    const solvedCount = Object.values(ch).filter(Boolean).length;
    if (solvedCount >= 3) {
      unlockAchievement("bug_squasher");
    }
  }

  function unlockAchievement(achId) {
    const user = getCurrentUser();
    if (!user) return;
    const currentAchs = user.achievements || [];
    if (!currentAchs.includes(achId)) {
      currentAchs.push(achId);
      updateCurrentUser({ achievements: currentAchs });

      const meta = (window.HTMLMaster.data.ACHIEVEMENTS || []).find(a => a.id === achId);
      const title = meta ? meta.title : achId;
      if (window.HTMLMaster.modules.Toast) {
        window.HTMLMaster.modules.Toast.show(`Achievement Unlocked: <b>${title}</b>!`, "achievement", 4000);
      }
      if (window.HTMLMaster.modules.Sound) {
        window.HTMLMaster.modules.Sound.fanfare();
      }
    }
  }

  function hasAchievement(achId) {
    const user = getCurrentUser();
    return user && user.achievements && user.achievements.includes(achId);
  }

  function recordTopicResult(levelKey, topicTitle, score, total) {
    const user = getCurrentUser();
    if (!user) return;
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx < 0) return;

    if (!users[idx].results) users[idx].results = [];
    users[idx].results = users[idx].results.filter(r => !(r.level === levelKey && r.topic === topicTitle));
    users[idx].results.push({
      level: levelKey,
      topic: topicTitle,
      score: score,
      total: total,
      date: new Date().toISOString()
    });
    saveUsers(users);

    unlockAchievement("first_quiz");
    checkProgAchievements();
  }

  function recordExamResult(score, total) {
    const user = getCurrentUser();
    if (!user) return;
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx < 0) return;

    const prev = users[idx].exam;
    if (!prev || score > prev.score) {
      users[idx].exam = { score: score, total: total, date: new Date().toISOString() };
    }
    saveUsers(users);

    const pct = Math.round((score / total) * 100);
    if (pct >= 70) unlockAchievement("exam_passed");
    if (pct === 100) unlockAchievement("exam_ace");
  }

  function incrementPlaygroundRuns() {
    const user = getCurrentUser();
    if (!user) return;
    const runs = (user.playgroundRuns || 0) + 1;
    updateCurrentUser({ playgroundRuns: runs });
    if (runs >= 3) {
      unlockAchievement("coder_sandbox");
    }
  }

  function checkProgAchievements() {
    const user = getCurrentUser();
    if (!user || !user.progress) return;
    const prog = user.progress;

    // Check foundations topics done (t1 through t8)
    const beginnerDone = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"].every(id => prog[id] === true);
    if (beginnerDone) {
      unlockAchievement("beginner_done");
    }

    // Check all topics dynamically
    const data = window.HTMLMaster.data.TOPICS || {};
    const totalTopics = Object.values(data).reduce((s, lv) => s + lv.topics.length, 0);
    const allTopicsDone = totalTopics > 0 && Object.values(prog).filter(Boolean).length >= totalTopics;
    if (allTopicsDone) {
      unlockAchievement("all_topics");
    }
  }

  function getDefaultGameScores() {
    return {
      totalPlayed: 0,
      totalPoints: 0,
      snake: { played: 0, highScore: 0, lastScore: 0, totalEaten: 0 },
      memory: { played: 0, bestTime: 9999, bestMoves: 999, totalMatched: 0 },
      wordMap: { played: 0, highScore: 0, totalMatched: 0, perfectRounds: 0 },
      chooseAll: { played: 0, highScore: 0, totalCorrect: 0, totalQuestions: 0 },
      history: []
    };
  }

  function getGameScores() {
    const user = getCurrentUser();
    if (!user) {
      try {
        return JSON.parse(localStorage.getItem("htmlMasterGuestGameScores") || "null") || getDefaultGameScores();
      } catch(e) {
        return getDefaultGameScores();
      }
    }
    if (!user.gameScores) {
      user.gameScores = getDefaultGameScores();
      updateCurrentUser({ gameScores: user.gameScores });
    }
    return user.gameScores;
  }

  function recordGameScore(gameType, points, details) {
    const user = getCurrentUser();
    let gs = getGameScores();
    details = details || {};
    gs.totalPlayed = (gs.totalPlayed || 0) + 1;
    gs.totalPoints = (gs.totalPoints || 0) + (points || 0);

    if (gameType === "snake") {
      gs.snake = gs.snake || { played: 0, highScore: 0, lastScore: 0, totalEaten: 0 };
      gs.snake.played = (gs.snake.played || 0) + 1;
      gs.snake.lastScore = points;
      if (points > (gs.snake.highScore || 0)) gs.snake.highScore = points;
      gs.snake.totalEaten = (gs.snake.totalEaten || 0) + (details.eaten || 0);
    } else if (gameType === "memory") {
      gs.memory = gs.memory || { played: 0, bestTime: 9999, bestMoves: 999, totalMatched: 0 };
      gs.memory.played = (gs.memory.played || 0) + 1;
      if (details.seconds && details.seconds < (gs.memory.bestTime || 9999)) gs.memory.bestTime = details.seconds;
      if (details.moves && details.moves < (gs.memory.bestMoves || 999)) gs.memory.bestMoves = details.moves;
      gs.memory.totalMatched = (gs.memory.totalMatched || 0) + (details.matched || 6);
    } else if (gameType === "wordMap") {
      gs.wordMap = gs.wordMap || { played: 0, highScore: 0, totalMatched: 0, perfectRounds: 0 };
      gs.wordMap.played = (gs.wordMap.played || 0) + 1;
      if (points > (gs.wordMap.highScore || 0)) gs.wordMap.highScore = points;
      gs.wordMap.totalMatched = (gs.wordMap.totalMatched || 0) + (details.pairs || 0);
      if (details.perfect) gs.wordMap.perfectRounds = (gs.wordMap.perfectRounds || 0) + 1;
    } else if (gameType === "chooseAll") {
      gs.chooseAll = gs.chooseAll || { played: 0, highScore: 0, totalCorrect: 0, totalQuestions: 0 };
      gs.chooseAll.played = (gs.chooseAll.played || 0) + 1;
      if (points > (gs.chooseAll.highScore || 0)) gs.chooseAll.highScore = points;
      gs.chooseAll.totalCorrect = (gs.chooseAll.totalCorrect || 0) + (details.correct || 0);
      gs.chooseAll.totalQuestions = (gs.chooseAll.totalQuestions || 0) + (details.total || 0);
    }

    gs.history = gs.history || [];
    gs.history.unshift({
      id: "gm_" + Date.now(),
      game: gameType,
      points: points || 0,
      label: details.label || gameType,
      summary: details.summary || "",
      date: new Date().toISOString()
    });
    if (gs.history.length > 15) gs.history = gs.history.slice(0, 15);

    if (user) {
      updateCurrentUser({ gameScores: gs });
    } else {
      try {
        localStorage.setItem("htmlMasterGuestGameScores", JSON.stringify(gs));
      } catch(e) {}
    }

    return gs;
  }

  function exportAllUserData() {
    const user = getCurrentUser();
    const data = {
      user: user || { name: "Guest", email: "", phone: "", dob: "" },
      gameScores: getGameScores(),
      timestamp: new Date().toISOString(),
      platform: "HTML Master LMS"
    };
    return JSON.stringify(data, null, 2);
  }

  function resetAll() {
    try {
      localStorage.removeItem(USERS_KEY);
      localStorage.removeItem(CURRENT_KEY);
      localStorage.removeItem(LEGACY_PROG_KEY);
      localStorage.removeItem("htmlMasterGuestGameScores");
      localStorage.removeItem("htmlMasterSnakeHigh");
    } catch (e) {}
  }

  return {
    escapeHTML: escapeHTML,
    getUsers: getUsers,
    saveUsers: saveUsers,
    getCurrentUserId: getCurrentUserId,
    setCurrentUserId: setCurrentUserId,
    getCurrentUser: getCurrentUser,
    updateCurrentUser: updateCurrentUser,
    createUser: createUser,
    logoutUser: logoutUser,
    isDone: isDone,
    markDone: markDone,
    isChallengeDone: isChallengeDone,
    markChallengeDone: markChallengeDone,
    recordTopicResult: recordTopicResult,
    recordExamResult: recordExamResult,
    unlockAchievement: unlockAchievement,
    hasAchievement: hasAchievement,
    incrementPlaygroundRuns: incrementPlaygroundRuns,
    getGameScores: getGameScores,
    recordGameScore: recordGameScore,
    exportAllUserData: exportAllUserData,
    resetAll: resetAll
  };
})();
