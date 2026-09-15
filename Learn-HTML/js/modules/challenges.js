/**
 * HTML Master — Hands-on Coding Challenges (HTML Lab) Module
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Challenges = (function() {
  let activeChallengeIndex = 0;

  function openChallenges() {
    window.HTMLMaster.showView("view-challenges");
    renderChallengeList();
    selectChallenge(activeChallengeIndex);
  }

  function renderChallengeList() {
    const list = document.getElementById("challengeNavList");
    if (!list) return;
    list.innerHTML = "";

    const challenges = window.HTMLMaster.data.CHALLENGES || [];
    const Storage = window.HTMLMaster.modules.Storage;

    challenges.forEach((ch, idx) => {
      const isSolved = Storage.isChallengeDone(ch.id);
      const item = document.createElement("div");
      item.className = `challenge-nav-item ${idx === activeChallengeIndex ? 'active' : ''}`;
      item.onclick = () => selectChallenge(idx);
      item.innerHTML = `
        <span class="ch-title">${ch.title}</span>
        <span class="ch-status" style="color: ${isSolved ? 'var(--success)' : 'var(--text-dim)'}">
          ${isSolved ? '✓' : '○'}
        </span>
      `;
      list.appendChild(item);
    });
  }

  function selectChallenge(index) {
    activeChallengeIndex = index;
    const challenges = window.HTMLMaster.data.CHALLENGES || [];
    const ch = challenges[index];
    if (!ch) return;

    // Highlight nav item
    document.querySelectorAll(".challenge-nav-item").forEach((el, i) => {
      el.classList.toggle("active", i === index);
    });

    // Populate title & description
    document.getElementById("challengeTitle").textContent = ch.title;
    document.getElementById("challengeDifficulty").textContent = ch.difficulty;
    document.getElementById("challengeDesc").innerHTML = ch.description;

    // Populate starter code
    document.getElementById("challengeEditor").value = ch.starterCode;

    // Render test cases placeholder
    renderTestCases(ch.tests, []);
  }

  function renderTestCases(tests, results) {
    const suite = document.getElementById("challengeTestSuite");
    if (!suite) return;
    suite.innerHTML = '<div class="test-suite-title">Automated Verification Tests</div>';

    tests.forEach((t, i) => {
      const passed = results[i] === true;
      const ran = results[i] !== undefined;

      const item = document.createElement("div");
      item.className = `test-case ${ran ? (passed ? 'pass' : 'fail') : ''}`;
      item.innerHTML = `
        <span class="test-icon">${ran ? (passed ? '✓' : '✗') : '○'}</span>
        <span>${t.desc}</span>
      `;
      suite.appendChild(item);
    });
  }

  function runTests() {
    const challenges = window.HTMLMaster.data.CHALLENGES || [];
    const ch = challenges[activeChallengeIndex];
    if (!ch) return;

    const userCode = document.getElementById("challengeEditor").value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(userCode, "text/html");

    const results = [];
    let allPassed = true;

    ch.tests.forEach(t => {
      try {
        const res = Boolean(t.check(doc));
        results.push(res);
        if (!res) allPassed = false;
      } catch (err) {
        results.push(false);
        allPassed = false;
      }
    });

    renderTestCases(ch.tests, results);

    if (allPassed) {
      window.HTMLMaster.modules.Sound.success();
      window.HTMLMaster.modules.Storage.markChallengeDone(ch.id);
      renderChallengeList();
      window.HTMLMaster.modules.Toast.show(`Challenge "${ch.title}" Passed! Excellent! 🚀`, "success");
    } else {
      window.HTMLMaster.modules.Sound.fail();
      window.HTMLMaster.modules.Toast.show("Some requirements failed. Check tests below.", "error");
    }
  }

  function resetCode() {
    const challenges = window.HTMLMaster.data.CHALLENGES || [];
    const ch = challenges[activeChallengeIndex];
    if (!ch) return;
    document.getElementById("challengeEditor").value = ch.starterCode;
    renderTestCases(ch.tests, []);
  }

  return {
    openChallenges: openChallenges,
    selectChallenge: selectChallenge,
    runTests: runTests,
    resetCode: resetCode
  };
})();
