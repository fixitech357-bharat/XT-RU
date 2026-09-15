/**
 * HTML Master — Comprehensive Final Exam Module
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Exam = (function() {
  let examTimer = null;
  let timeRemaining = 1200; // 20 minutes

  function openExam() {
    window.HTMLMaster.showView("view-exam");
    clearInterval(examTimer);

    document.getElementById("examArea").innerHTML = "";
    document.getElementById("startExamBtn").style.display = "inline-flex";
    document.getElementById("startExamBtn").disabled = false;
    document.getElementById("submitExamBtn").style.display = "none";
    document.getElementById("submitExamBtn").disabled = false;

    const timerBar = document.getElementById("examTimerBar");
    if (timerBar) timerBar.style.display = "none";

    const res = document.getElementById("examResult");
    res.style.display = "none";
    res.innerHTML = "";
  }

  function startExam() {
    const questions = window.HTMLMaster.data.EXAM || [];
    document.getElementById("startExamBtn").style.display = "none";

    const timerBar = document.getElementById("examTimerBar");
    if (timerBar) timerBar.style.display = "flex";

    timeRemaining = 1200;
    updateTimerDisplay();
    clearInterval(examTimer);
    examTimer = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();
      if (timeRemaining <= 0) {
        clearInterval(examTimer);
        window.HTMLMaster.modules.Toast.show("Time expired! Submitting exam...", "error");
        submitExam();
      }
    }, 1000);

    const area = document.getElementById("examArea");
    area.innerHTML = "";

    questions.forEach((q, qi) => {
      const qDiv = document.createElement("div");
      qDiv.className = "question";

      let html = `<p class="q-text">Q${qi + 1}. ${window.HTMLMaster.modules.Storage.escapeHTML(q.q)}</p>`;
      q.options.forEach((opt, oi) => {
        html += `
          <label class="option">
            <input type="radio" name="finalExamQ_${qi}" value="${oi}" onchange="window.HTMLMaster.modules.Sound.click()">
            <span>${window.HTMLMaster.modules.Storage.escapeHTML(opt)}</span>
          </label>
        `;
      });
      qDiv.innerHTML = html;
      area.appendChild(qDiv);
    });

    document.getElementById("submitExamBtn").style.display = "inline-flex";
    window.HTMLMaster.modules.Toast.show("Final Exam started! You have 20 minutes. Good luck!", "info");
  }

  function updateTimerDisplay() {
    const timerElem = document.getElementById("examTimerVal");
    if (!timerElem) return;
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    timerElem.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function submitExam() {
    clearInterval(examTimer);
    const questions = window.HTMLMaster.data.EXAM || [];
    let score = 0;

    questions.forEach((q, qi) => {
      const options = document.querySelectorAll(`input[name="finalExamQ_${qi}"]`);
      let selected = -1;

      options.forEach((o, oi) => {
        if (o.checked) selected = oi;
        o.closest(".option").classList.remove("correct", "wrong");
      });

      if (selected === q.answer) {
        score++;
      }

      options.forEach((o, oi) => {
        if (oi === q.answer) {
          o.closest(".option").classList.add("correct");
        } else if (oi === selected) {
          o.closest(".option").classList.add("wrong");
        }
      });
    });

    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;
    const resultBox = document.getElementById("examResult");

    resultBox.style.display = "block";
    resultBox.className = "quiz-result " + (passed ? "pass" : "fail");

    let summaryHTML = `
      <h3>${passed ? '🎉 Congratulations! You Passed!' : '❌ Not Passed Yet'}</h3>
      <p style="margin: 8px 0; font-size: 16px;">
        Final Score: <b>${score} / ${total}</b> (<b>${pct}%</b>) &mdash; Passing threshold is 70%
      </p>
    `;

    if (passed) {
      window.HTMLMaster.modules.Sound.fanfare();
      summaryHTML += `
        <div style="margin-top: 16px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button class="btn success" onclick="window.HTMLMaster.modules.Leaderboard.openLeaderboard()">
            🏆 View Rank on Leaderboard
          </button>
          <button class="btn" style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); color: white;" onclick="window.HTMLMaster.modules.Games.openGames()">
            🎮 Play in Game Zone
          </button>
        </div>
      `;
    } else {
      window.HTMLMaster.modules.Sound.fail();
      summaryHTML += `
        <p style="color: var(--text-muted); font-size: 13.5px; margin-top: 8px;">
          Don't worry! Review the green correct answers highlighted above and retry when ready.
        </p>
        <button class="btn ghost sm" style="margin-top: 10px;" onclick="window.HTMLMaster.modules.Exam.startExam()">
          Retry Exam
        </button>
      `;
    }

    resultBox.innerHTML = summaryHTML;
    document.getElementById("submitExamBtn").disabled = true;

    // Record exam result
    window.HTMLMaster.modules.Storage.recordExamResult(score, total);
  }

  return {
    openExam: openExam,
    startExam: startExam,
    submitExam: submitExam
  };
})();
