/**
 * HTML Master — Topics & Lessons Controller
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Topics = (function() {
  let currentLevel = null;
  let currentTopicIndex = 0;

  function updateProgressBar() {
    const data = window.HTMLMaster.data.TOPICS;
    if (!data) return;
    const total = Object.values(data).reduce((s, lv) => s + lv.topics.length, 0);
    const Storage = window.HTMLMaster.modules.Storage;

    let done = 0;
    Object.values(data).forEach(lv => {
      lv.topics.forEach(t => {
        if (Storage.isDone(t.id)) done++;
      });
    });

    const pct = total ? (done / total) * 100 : 0;
    const bar = document.getElementById("progressFill");
    const txt = document.getElementById("progressText");
    if (bar) bar.style.width = pct + "%";
    if (txt) txt.textContent = `${done} / ${total} topics completed (${Math.round(pct)}%)`;
  }

  function renderHome() {
    const grid = document.getElementById("levelGrid");
    if (!grid) return;
    grid.innerHTML = "";
    const data = window.HTMLMaster.data.TOPICS;
    const Storage = window.HTMLMaster.modules.Storage;

    Object.entries(data).forEach(([key, lv]) => {
      const done = lv.topics.filter(t => Storage.isDone(t.id)).length;
      const total = lv.topics.length;
      const allDone = done === total;

      const card = document.createElement("div");
      card.className = "level-card";
      card.onclick = () => openLevel(key);
      card.innerHTML = `
        ${allDone ? '<span class="badge-done">✓ COMPLETED</span>' : ''}
        <span class="icon">${lv.icon}</span>
        <h3>${lv.name}</h3>
        <p>${lv.desc}</p>
        <span class="pill">${done} / ${total} topics completed</span>
      `;
      grid.appendChild(card);
    });

    updateProgressBar();
  }

  function openLevel(key) {
    currentLevel = key;
    const lv = window.HTMLMaster.data.TOPICS[key];
    const Storage = window.HTMLMaster.modules.Storage;

    document.getElementById("levelTitle").textContent = `${lv.icon} ${lv.name} Curriculum`;
    document.getElementById("levelDesc").textContent = lv.desc;

    const list = document.getElementById("topicList");
    list.innerHTML = "";

    lv.topics.forEach((t, i) => {
      const done = Storage.isDone(t.id);
      const div = document.createElement("div");
      div.className = "topic-item";
      div.onclick = () => openTopic(i);
      div.innerHTML = `
        <div>
          <h4>${i + 1}. ${t.title}</h4>
          <p>${t.quiz.length} interactive test questions</p>
        </div>
        <div class="status ${done ? 'done' : ''}">${done ? '✓' : '○'}</div>
      `;
      list.appendChild(div);
    });

    window.HTMLMaster.showView("view-level");
  }

  function openTopic(index) {
    currentTopicIndex = index;
    const lv = window.HTMLMaster.data.TOPICS[currentLevel];
    const t = lv.topics[index];

    const contentContainer = document.getElementById("topicContent");
    contentContainer.innerHTML = t.content;

    // Attach copy buttons to pre blocks
    contentContainer.querySelectorAll("pre").forEach(pre => {
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-code-btn";
      copyBtn.textContent = "Copy";
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(pre.textContent).then(() => {
          copyBtn.textContent = "Copied!";
          setTimeout(() => { copyBtn.textContent = "Copy"; }, 1800);
        });
      };
      wrapper.appendChild(copyBtn);
    });

    // Render topic quiz
    if (window.HTMLMaster.modules.Quiz) {
      window.HTMLMaster.modules.Quiz.initTopicQuiz(t.quiz);
    }

    document.getElementById("nextTopicBtn").style.display = "none";
    window.HTMLMaster.showView("view-topic");
  }

  function nextTopic() {
    const topics = window.HTMLMaster.data.TOPICS[currentLevel].topics;
    if (currentTopicIndex + 1 < topics.length) {
      openTopic(currentTopicIndex + 1);
    } else {
      openLevel(currentLevel);
      if (window.HTMLMaster.modules.Toast) {
        window.HTMLMaster.modules.Toast.show("Level Completed! Outstanding progress! 🎉", "success");
      }
    }
  }

  function backToLevel() {
    if (currentLevel) openLevel(currentLevel);
    else window.HTMLMaster.showView("view-home");
  }

  return {
    renderHome: renderHome,
    openLevel: openLevel,
    openTopic: openTopic,
    nextTopic: nextTopic,
    backToLevel: backToLevel,
    updateProgressBar: updateProgressBar,
    getCurrentLevel: () => currentLevel,
    getCurrentTopicIndex: () => currentTopicIndex
  };
})();
