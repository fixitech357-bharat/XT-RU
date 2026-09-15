/**
 * HTML Master — Quiz Evaluation Engine
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Quiz = (function() {
  let activeQuestions = [];

  function initTopicQuiz(questions) {
    activeQuestions = questions || [];
    const area = document.getElementById("quizArea");
    area.innerHTML = "";

    activeQuestions.forEach((q, qi) => {
      const qDiv = document.createElement("div");
      qDiv.className = "question";

      let html = `<p class="q-text">Q${qi + 1}. ${window.HTMLMaster.modules.Storage.escapeHTML(q.q)}</p>`;
      q.options.forEach((opt, oi) => {
        html += `
          <label class="option">
            <input type="radio" name="topicQuizQ_${qi}" value="${oi}" onchange="window.HTMLMaster.modules.Sound.click()">
            <span>${window.HTMLMaster.modules.Storage.escapeHTML(opt)}</span>
          </label>
        `;
      });
      qDiv.innerHTML = html;
      area.appendChild(qDiv);
    });

    const submitBtn = document.getElementById("submitQuizBtn");
    submitBtn.style.display = "inline-flex";
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Answers";

    const res = document.getElementById("quizResult");
    res.style.display = "none";
    res.textContent = "";
  }

  function submitTopicQuiz() {
    if (!activeQuestions.length) return;
    let score = 0;

    activeQuestions.forEach((q, qi) => {
      const options = document.querySelectorAll(`input[name="topicQuizQ_${qi}"]`);
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

    const passThreshold = Math.ceil(activeQuestions.length * 0.6);
    const passed = score >= passThreshold;
    const resultBox = document.getElementById("quizResult");

    resultBox.style.display = "block";
    resultBox.className = "quiz-result " + (passed ? "pass" : "fail");
    resultBox.innerHTML = `You scored <b>${score} / ${activeQuestions.length}</b> &mdash; ${passed ? '🎉 PASSED! Outstanding job!' : '❌ Needs Practice. Review lesson notes and try again.'}`;

    document.getElementById("submitQuizBtn").disabled = true;

    if (passed) {
      window.HTMLMaster.modules.Sound.success();
      const currentLevel = window.HTMLMaster.modules.Topics.getCurrentLevel();
      const currentIndex = window.HTMLMaster.modules.Topics.getCurrentTopicIndex();
      const topicObj = window.HTMLMaster.data.TOPICS[currentLevel].topics[currentIndex];

      window.HTMLMaster.modules.Storage.markDone(topicObj.id);
      window.HTMLMaster.modules.Storage.recordTopicResult(currentLevel, topicObj.title, score, activeQuestions.length);
      window.HTMLMaster.modules.Topics.updateProgressBar();

      document.getElementById("nextTopicBtn").style.display = "inline-flex";
      window.HTMLMaster.modules.Toast.show("Topic Completed! Progress Saved.", "success");
    } else {
      window.HTMLMaster.modules.Sound.fail();
      const retryBtn = document.createElement("button");
      retryBtn.className = "btn ghost sm";
      retryBtn.style.marginTop = "10px";
      retryBtn.textContent = "Try Again";
      retryBtn.onclick = () => {
        initTopicQuiz(activeQuestions);
      };
      resultBox.appendChild(document.createElement("br"));
      resultBox.appendChild(retryBtn);
    }
  }

  return {
    initTopicQuiz: initTopicQuiz,
    submitTopicQuiz: submitTopicQuiz
  };
})();
