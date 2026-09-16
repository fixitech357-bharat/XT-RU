window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.CppQuiz = (function() {
  const STATE_KEY = "htmlMasterCppQuizState";
  let assessment = null;
  let answers = [];
  let currentIndex = 0;
  let startedAt = 0;
  let timerId = null;
  let submitted = false;

  function openQuiz() {
    window.HTMLMaster.showView("view-cpp-quiz");
    renderLanding();
  }

  function renderLanding() {
    stopTimer();
    const area = document.getElementById("cppQuizArea");
    if (!area) return;
    const assessments = window.HTMLMaster.data.CPP_ASSESSMENTS || [];
    area.innerHTML = `
      <div class="assessment-hero">
        <span class="eyebrow">Technical Skill Assessment</span>
        <h2>C++ Knowledge Assessment</h2>
        <p>Test your C++ programming knowledge through objective technical MCQs. Your level is calculated only from your score.</p>
      </div>
      <div class="assessment-grid">
        ${assessments.map(item => `
          <article class="assessment-card">
            <div class="assessment-card-icon">&lt;/&gt;</div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.description)}</p>
            <div class="assessment-meta"><span>${item.questions.length} Questions</span><span>${item.durationMinutes} Minutes</span></div>
            <button class="btn" onclick="window.HTMLMaster.modules.CppQuiz.start('${item.id}')">Start Assessment &rarr;</button>
          </article>
        `).join("")}
      </div>
    `;
  }

  function start(id) {
    const selected = (window.HTMLMaster.data.CPP_ASSESSMENTS || []).find(item => item.id === id);
    if (!selected) return;
    assessment = selected;
    const saved = loadState();
    if (saved && saved.assessmentId === id && saved.answers && !saved.submitted) {
      answers = saved.answers;
      currentIndex = Math.min(saved.currentIndex || 0, assessment.questions.length - 1);
      startedAt = saved.startedAt || Date.now();
    } else {
      answers = Array(assessment.questions.length).fill(null);
      currentIndex = 0;
      startedAt = Date.now();
      persistState();
    }
    submitted = false;
    renderQuestion();
    startTimer();
  }

  function renderQuestion() {
    const area = document.getElementById("cppQuizArea");
    const question = assessment.questions[currentIndex];
    const answered = answers.filter(answer => answer !== null).length;
    const progress = Math.round((answered / assessment.questions.length) * 100);
    area.innerHTML = `
      <div class="quiz-toolbar">
        <button class="back-btn" onclick="window.HTMLMaster.modules.CppQuiz.confirmExit()">&larr; Exit</button>
        <span class="quiz-timer" id="cppQuizTimer">00:00</span>
      </div>
      <div class="quiz-progress-header"><span>Question ${currentIndex + 1} of ${assessment.questions.length}</span><span>${answered} answered</span></div>
      <div class="bar"><div class="bar-fill" style="width:${progress}%"></div></div>
      <article class="cpp-question-card">
        <div class="question-category">${escapeHTML(question.category)} <span>${escapeHTML(question.difficulty)}</span></div>
        <h2>${escapeHTML(question.question)}</h2>
        <div class="cpp-options">
          ${question.options.map((option, index) => `
            <button class="cpp-option ${answers[currentIndex] === index ? "selected" : ""}" onclick="window.HTMLMaster.modules.CppQuiz.select(${index})">
              <span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHTML(option)}</span>
            </button>
          `).join("")}
        </div>
      </article>
      <div class="quiz-navigation">
        <button class="btn ghost" ${currentIndex === 0 ? "disabled" : ""} onclick="window.HTMLMaster.modules.CppQuiz.previous()">&larr; Previous</button>
        ${currentIndex === assessment.questions.length - 1
          ? `<button class="btn success" onclick="window.HTMLMaster.modules.CppQuiz.submit()">Submit Assessment</button>`
          : `<button class="btn" onclick="window.HTMLMaster.modules.CppQuiz.next()">Next &rarr;</button>`}
      </div>
    `;
    updateTimer();
  }

  function select(index) {
    answers[currentIndex] = index;
    persistState();
    renderQuestion();
  }

  function next() {
    if (currentIndex < assessment.questions.length - 1) {
      currentIndex++;
      persistState();
      renderQuestion();
    }
  }

  function previous() {
    if (currentIndex > 0) {
      currentIndex--;
      persistState();
      renderQuestion();
    }
  }

  function submit() {
    if (answers.some(answer => answer === null) && !confirm("Some questions are unanswered. Submit anyway?")) return;
    const correct = assessment.questions.filter((question, index) => answers[index] === question.answer).length;
    const unanswered = answers.filter(answer => answer === null).length;
    const wrong = assessment.questions.length - correct - unanswered;
    const percentage = Math.round((correct / assessment.questions.length) * 100);
    const attempt = {
      id: `cpp_${Date.now()}`,
      assessmentId: assessment.id,
      assessment: assessment.title,
      language: "C++",
      score: correct,
      total: assessment.questions.length,
      percentage,
      correct,
      wrong,
      unanswered,
      timeSeconds: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
      date: new Date().toISOString(),
      categories: categoryBreakdown()
    };
    const user = window.HTMLMaster.modules.Storage.getCurrentUser();
    if (user) {
      const attempts = Array.isArray(user.assessmentAttempts) ? user.assessmentAttempts : [];
      window.HTMLMaster.modules.Storage.updateCurrentUser({ assessmentAttempts: attempts.concat(attempt) });
    }
    submitted = true;
    localStorage.removeItem(STATE_KEY);
    stopTimer();
    renderResults(attempt);
  }

  function categoryBreakdown() {
    const grouped = {};
    assessment.questions.forEach((question, index) => {
      if (!grouped[question.category]) grouped[question.category] = { correct: 0, total: 0 };
      grouped[question.category].total++;
      if (answers[index] === question.answer) grouped[question.category].correct++;
    });
    Object.values(grouped).forEach(item => { item.percentage = Math.round(item.correct / item.total * 100); });
    return grouped;
  }

  function levelFor(percentage) {
    if (percentage >= 85) return "Expert";
    if (percentage >= 70) return "Advanced";
    if (percentage >= 55) return "Intermediate";
    if (percentage >= 40) return "Foundation";
    return "Beginner";
  }

  function renderResults(attempt) {
    const area = document.getElementById("cppQuizArea");
    const categories = Object.entries(attempt.categories).map(([name, result]) => `
      <div class="skill-row"><span>${escapeHTML(name)}</span><strong>${result.percentage}%</strong><div class="skill-bar"><i style="width:${result.percentage}%"></i></div></div>
    `).join("");
    const review = assessment.questions.map((question, index) => {
      const chosen = answers[index];
      const correct = chosen === question.answer;
      return `<details class="review-item ${correct ? "review-correct" : "review-wrong"}"><summary>${index + 1}. ${escapeHTML(question.question)} <b>${chosen === null ? "Unanswered" : correct ? "Correct" : "Incorrect"}</b></summary><p><strong>Answer:</strong> ${escapeHTML(question.options[question.answer])}</p><p>${escapeHTML(question.explanation)}</p></details>`;
    }).join("");
    area.innerHTML = `
      <div class="results-hero"><span class="eyebrow">Technical Skill Assessment</span><h2>${escapeHTML(assessment.title)}</h2><div class="result-level">${levelFor(attempt.percentage)}</div><p>Objective level based on ${attempt.percentage}% quiz performance.</p></div>
      <div class="result-stats"><div><strong>${attempt.score}/${attempt.total}</strong><span>Score</span></div><div><strong>${attempt.percentage}%</strong><span>Percentage</span></div><div><strong>${attempt.correct}</strong><span>Correct</span></div><div><strong>${attempt.wrong}</strong><span>Wrong</span></div><div><strong>${attempt.unanswered}</strong><span>Unanswered</span></div><div><strong>${formatDuration(attempt.timeSeconds)}</strong><span>Time</span></div></div>
      <section class="skill-breakdown"><h3>Skill Breakdown</h3>${categories}</section>
      <section class="question-review"><h3>Question Review</h3>${review}</section>
      <button class="btn" onclick="window.HTMLMaster.modules.CppQuiz.openQuiz()">Back to Assessments</button>
    `;
  }

  function confirmExit() {
    if (submitted || confirm("Your answers are saved. Exit this assessment?")) openQuiz();
  }

  function persistState() {
    if (!assessment) return;
    localStorage.setItem(STATE_KEY, JSON.stringify({ assessmentId: assessment.id, answers, currentIndex, startedAt, submitted }));
  }

  function loadState() {
    try { return JSON.parse(localStorage.getItem(STATE_KEY) || "null"); } catch (error) { return null; }
  }

  function startTimer() { stopTimer(); timerId = setInterval(updateTimer, 1000); }
  function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }
  function updateTimer() {
    const timer = document.getElementById("cppQuizTimer");
    if (!timer || !assessment) return;
    const elapsed = Math.round((Date.now() - startedAt) / 1000);
    timer.textContent = formatDuration(elapsed);
    if (elapsed >= assessment.durationMinutes * 60) submit();
  }
  function formatDuration(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`; }
  function escapeHTML(value) { return window.HTMLMaster.modules.Storage.escapeHTML(value); }

  return { openQuiz, start, select, next, previous, submit, confirmExit };
})();
