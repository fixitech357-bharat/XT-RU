/**
 * HTML Master — Game Zone Module (Interactive HTML & Canvas Games)
 * Features:
 * 1. Tag Memory Matcher (3D flip cards)
 * 2. Cyber Snake (Canvas 2D, relaxed/slow speeds, speed selector, HTML tag food)
 * 3. Tag Word Mapper ("Map the Words / Map the Tag")
 * 4. "Choose ALL" Tag Blitz Quiz (Multi-select interactive quiz)
 * 5. Player Score Card & User Data Dashboard (localStorage sync & JSON export)
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Games = (function() {
  let activeGame = "arcade"; // "arcade", "memory", "snake", "wordmap", "chooseall", "scorecard"

  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* =========================================================
     1. HTML TAG MEMORY MATCHER GAME
     ========================================================= */
  const TAG_PAIRS = [
    { id: 1, text: "<h1>", type: "tag" },
    { id: 1, text: "Primary Heading", type: "desc" },
    { id: 2, text: "<img>", type: "tag" },
    { id: 2, text: "Embeds Graphics", type: "desc" },
    { id: 3, text: "<a>", type: "tag" },
    { id: 3, text: "Hyperlink Anchor", type: "desc" },
    { id: 4, text: "<form>", type: "tag" },
    { id: 4, text: "User Input Container", type: "desc" },
    { id: 5, text: "<canvas>", type: "tag" },
    { id: 5, text: "2D Pixel Drawing", type: "desc" },
    { id: 6, text: "<table>", type: "tag" },
    { id: 6, text: "Tabular Grid Data", type: "desc" }
  ];

  let memoryCards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let memoryMoves = 0;
  let memoryTimer = null;
  let memorySeconds = 0;

  function initMemoryGame() {
    matchedPairs = 0;
    memoryMoves = 0;
    memorySeconds = 0;
    flippedCards = [];
    clearInterval(memoryTimer);

    const movesEl = document.getElementById("memoryMoves");
    const timerEl = document.getElementById("memoryTimer");
    const winBox = document.getElementById("memoryWinBox");
    if (movesEl) movesEl.textContent = "0";
    if (timerEl) timerEl.textContent = "00:00";
    if (winBox) winBox.style.display = "none";

    memoryCards = [...TAG_PAIRS].sort(() => Math.random() - 0.5);

    const grid = document.getElementById("memoryGrid");
    if (!grid) return;
    grid.innerHTML = "";

    memoryCards.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "mem-card";
      card.dataset.index = index;
      card.dataset.id = item.id;
      card.innerHTML = `
        <div class="mem-card-inner">
          <div class="mem-card-front">&lt;?&gt;</div>
          <div class="mem-card-back ${item.type === 'tag' ? 'is-tag' : 'is-desc'}">
            ${escapeHTML(item.text)}
          </div>
        </div>
      `;
      card.onclick = () => flipMemoryCard(card, index);
      grid.appendChild(card);
    });

    memoryTimer = setInterval(() => {
      memorySeconds++;
      const m = Math.floor(memorySeconds / 60).toString().padStart(2, '0');
      const s = (memorySeconds % 60).toString().padStart(2, '0');
      const tEl = document.getElementById("memoryTimer");
      if (tEl) tEl.textContent = `${m}:${s}`;
    }, 1000);
  }

  function flipMemoryCard(cardElem, index) {
    if (flippedCards.length >= 2 || cardElem.classList.contains("flipped") || cardElem.classList.contains("matched")) {
      return;
    }

    cardElem.classList.add("flipped");
    flippedCards.push({ elem: cardElem, data: memoryCards[index] });

    if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.click();

    if (flippedCards.length === 2) {
      memoryMoves++;
      const movesEl = document.getElementById("memoryMoves");
      if (movesEl) movesEl.textContent = memoryMoves;

      const [c1, c2] = flippedCards;
      if (c1.data.id === c2.data.id && c1.data.type !== c2.data.type) {
        setTimeout(() => {
          c1.elem.classList.add("matched");
          c2.elem.classList.add("matched");
          flippedCards = [];
          matchedPairs++;

          if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.success();

          if (matchedPairs === TAG_PAIRS.length / 2) {
            clearInterval(memoryTimer);
            const winBox = document.getElementById("memoryWinBox");
            const finalScoreEl = document.getElementById("memoryFinalScore");
            const timeStr = document.getElementById("memoryTimer") ? document.getElementById("memoryTimer").textContent : "00:00";
            if (winBox) winBox.style.display = "block";
            if (finalScoreEl) {
              finalScoreEl.textContent = `Completed in ${memoryMoves} moves and ${timeStr}!`;
            }

            if (window.HTMLMaster.modules.Storage) {
              window.HTMLMaster.modules.Storage.recordGameScore("memory", 100, {
                moves: memoryMoves,
                seconds: memorySeconds,
                matched: 6,
                label: "Tag Memory Matcher",
                summary: `Solved in ${memoryMoves} moves (${timeStr})`
              });
            }

            if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.fanfare();
            if (window.HTMLMaster.modules.Toast) window.HTMLMaster.modules.Toast.show("Memory Game Won! Recorded to Score Card 🏆", "success");
          }
        }, 350);
      } else {
        setTimeout(() => {
          c1.elem.classList.remove("flipped");
          c2.elem.classList.remove("flipped");
          flippedCards = [];
        }, 900);
      }
    }
  }

  /* =========================================================
     2. HTML5 CANVAS CYBER SNAKE GAME (Slowed down & Speed controls)
     ========================================================= */
  let snakeCanvas, snakeCtx;
  let snake = [];
  let food = { x: 0, y: 0, tag: "<div>" };
  let dx = 20, dy = 0;
  let nextDx = 20, nextDy = 0;
  let snakeScore = 0;
  let snakeHighScore = 0;
  let snakeLoopId = null;
  let isSnakeRunning = false;
  let snakeSpeed = 260; // Default slow/relaxed (260ms per tick)
  let snakeSpeedMode = "slow";
  const GRID_SIZE = 20;

  const FOOD_TAGS = ["<div>", "<span>", "<img>", "<a>", "<p>", "<button>", "<h1>", "<ul>", "<dialog>", "<canvas>", "<video>", "<table>"];

  function initSnakeGame() {
    snakeCanvas = document.getElementById("snakeCanvas");
    if (!snakeCanvas) return;
    snakeCtx = snakeCanvas.getContext("2d");

    try {
      if (window.HTMLMaster.modules.Storage) {
        const scores = window.HTMLMaster.modules.Storage.getGameScores();
        snakeHighScore = (scores && scores.snake && scores.snake.highScore) || 0;
      } else {
        snakeHighScore = parseInt(localStorage.getItem("htmlMasterSnakeHigh") || "0", 10);
      }
    } catch (e) {
      snakeHighScore = 0;
    }

    const highEl = document.getElementById("snakeHighScore");
    if (highEl) highEl.textContent = snakeHighScore;

    resetSnake();
    renderSnakeFrame();
  }

  function setSnakeSpeed(mode, btn) {
    snakeSpeedMode = mode;
    if (mode === "slow") snakeSpeed = 260;
    else if (mode === "normal") snakeSpeed = 190;
    else if (mode === "fast") snakeSpeed = 130;

    document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    if (isSnakeRunning) {
      clearInterval(snakeLoopId);
      snakeLoopId = setInterval(gameStep, snakeSpeed);
    }
  }

  function resetSnake() {
    snake = [
      { x: 160, y: 160 },
      { x: 140, y: 160 },
      { x: 120, y: 160 }
    ];
    dx = 20;
    dy = 0;
    nextDx = 20;
    nextDy = 0;
    snakeScore = 0;
    const scoreEl = document.getElementById("snakeScore");
    if (scoreEl) scoreEl.textContent = "0";
    spawnFood();
  }

  function spawnFood() {
    if (!snakeCanvas) return;
    const maxX = snakeCanvas.width / GRID_SIZE;
    const maxY = snakeCanvas.height / GRID_SIZE;
    food.x = Math.floor(Math.random() * maxX) * GRID_SIZE;
    food.y = Math.floor(Math.random() * maxY) * GRID_SIZE;
    food.tag = FOOD_TAGS[Math.floor(Math.random() * FOOD_TAGS.length)];

    snake.forEach(part => {
      if (part.x === food.x && part.y === food.y) spawnFood();
    });

    const targetEl = document.getElementById("snakeTargetTag");
    if (targetEl) targetEl.textContent = food.tag;
  }

  function startSnake() {
    if (!snakeCanvas) initSnakeGame();
    if (isSnakeRunning) return;
    resetSnake();
    isSnakeRunning = true;
    const startBtn = document.getElementById("startSnakeBtn");
    const overBox = document.getElementById("snakeGameOverBox");
    if (startBtn) startBtn.style.display = "none";
    if (overBox) overBox.style.display = "none";

    clearInterval(snakeLoopId);
    snakeLoopId = setInterval(gameStep, snakeSpeed);
  }

  function gameStep() {
    dx = nextDx;
    dy = nextDy;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wall collision
    if (head.x < 0 || head.x >= snakeCanvas.width || head.y < 0 || head.y >= snakeCanvas.height) {
      endSnakeGame();
      return;
    }

    // Self collision
    for (let i = 0; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        endSnakeGame();
        return;
      }
    }

    snake.unshift(head);

    // Food eaten
    if (head.x === food.x && head.y === food.y) {
      snakeScore += 10;
      const scoreEl = document.getElementById("snakeScore");
      if (scoreEl) scoreEl.textContent = snakeScore;

      if (snakeScore > snakeHighScore) {
        snakeHighScore = snakeScore;
        const highEl = document.getElementById("snakeHighScore");
        if (highEl) highEl.textContent = snakeHighScore;
        try { localStorage.setItem("htmlMasterSnakeHigh", snakeHighScore.toString()); } catch(e){}
      }

      if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.click();
      if (window.HTMLMaster.modules.Toast && snakeScore % 30 === 0) {
        window.HTMLMaster.modules.Toast.show(`Ate ${escapeHTML(food.tag)}! +10 Points (Total: ${snakeScore})`, "success", 2000);
      }
      spawnFood();
    } else {
      snake.pop();
    }

    renderSnakeFrame();
  }

  function renderSnakeFrame() {
    if (!snakeCtx) return;

    // Background
    snakeCtx.fillStyle = "#060a12";
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    // Grid lines
    snakeCtx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    snakeCtx.lineWidth = 1;
    for (let x = 0; x < snakeCanvas.width; x += GRID_SIZE) {
      snakeCtx.beginPath();
      snakeCtx.moveTo(x, 0);
      snakeCtx.lineTo(x, snakeCanvas.height);
      snakeCtx.stroke();
    }
    for (let y = 0; y < snakeCanvas.height; y += GRID_SIZE) {
      snakeCtx.beginPath();
      snakeCtx.moveTo(0, y);
      snakeCtx.lineTo(snakeCanvas.width, y);
      snakeCtx.stroke();
    }

    // Draw Food (glowing HTML tag item)
    snakeCtx.fillStyle = "#f59e0b";
    snakeCtx.shadowColor = "#f59e0b";
    snakeCtx.shadowBlur = 12;
    snakeCtx.fillRect(food.x + 2, food.y + 2, GRID_SIZE - 4, GRID_SIZE - 4);

    // Draw tiny HTML tag symbol on food
    snakeCtx.shadowBlur = 0;
    snakeCtx.fillStyle = "#000";
    snakeCtx.font = "bold 9px monospace";
    snakeCtx.textAlign = "center";
    snakeCtx.textBaseline = "middle";
    snakeCtx.fillText("<>", food.x + GRID_SIZE / 2, food.y + GRID_SIZE / 2);

    // Draw Snake
    snake.forEach((part, index) => {
      snakeCtx.fillStyle = index === 0 ? "#38bdf8" : "#6366f1";
      snakeCtx.shadowColor = index === 0 ? "#38bdf8" : "transparent";
      snakeCtx.shadowBlur = index === 0 ? 10 : 0;
      snakeCtx.fillRect(part.x + 1, part.y + 1, GRID_SIZE - 2, GRID_SIZE - 2);
    });

    snakeCtx.shadowBlur = 0;
  }

  function endSnakeGame() {
    clearInterval(snakeLoopId);
    isSnakeRunning = false;
    if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.fail();

    const overBox = document.getElementById("snakeGameOverBox");
    const overText = document.getElementById("snakeGameOverText");
    const startBtn = document.getElementById("startSnakeBtn");

    if (overText) {
      overText.innerHTML = `You scored <b>${snakeScore} points</b> (Speed: ${snakeSpeedMode.toUpperCase()})!<br>Hit Start Game or press arrow keys to try again.`;
    }
    if (overBox) overBox.style.display = "block";
    if (startBtn) {
      startBtn.style.display = "inline-flex";
      startBtn.textContent = "Play Again";
    }

    if (window.HTMLMaster.modules.Storage) {
      window.HTMLMaster.modules.Storage.recordGameScore("snake", snakeScore, {
        eaten: Math.floor(snakeScore / 10),
        speed: snakeSpeedMode,
        label: "Cyber Snake",
        summary: `Scored ${snakeScore} pts at ${snakeSpeedMode} speed`
      });
    }
  }

  function handleSnakeKey(e) {
    const snakeArea = document.getElementById("gameSnakeArea");
    if (!snakeArea || snakeArea.style.display === "none") return;

    if (!isSnakeRunning) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
        startSnake();
        e.preventDefault();
      }
      return;
    }

    if (["ArrowUp", "KeyW"].includes(e.code) && dy === 0) {
      nextDx = 0; nextDy = -GRID_SIZE; e.preventDefault();
    } else if (["ArrowDown", "KeyS"].includes(e.code) && dy === 0) {
      nextDx = 0; nextDy = GRID_SIZE; e.preventDefault();
    } else if (["ArrowLeft", "KeyA"].includes(e.code) && dx === 0) {
      nextDx = -GRID_SIZE; nextDy = 0; e.preventDefault();
    } else if (["ArrowRight", "KeyD"].includes(e.code) && dx === 0) {
      nextDx = GRID_SIZE; nextDy = 0; e.preventDefault();
    }
  }

  function setDirection(dir) {
    if (!isSnakeRunning) {
      startSnake();
    }
    if (dir === 'up' && dy === 0) { nextDx = 0; nextDy = -GRID_SIZE; }
    if (dir === 'down' && dy === 0) { nextDx = 0; nextDy = GRID_SIZE; }
    if (dir === 'left' && dx === 0) { nextDx = -GRID_SIZE; nextDy = 0; }
    if (dir === 'right' && dx === 0) { nextDx = GRID_SIZE; nextDy = 0; }
  }

  /* =========================================================
     3. TAG WORD MAPPER GAME ("Map the Words / Map the Tag")
     ========================================================= */
  const WORD_MAP_ROUNDS = [
    {
      title: "Round 1: HTML Core & Structural Elements",
      pairs: [
        { id: 1, tag: "<header>", word: "Introductory content or top site navigation banner" },
        { id: 2, tag: "<nav>", word: "Container for major navigational hyperlink collections" },
        { id: 3, tag: "<main>", word: "The central dominant unique content of the page" },
        { id: 4, tag: "<article>", word: "Self-contained composition that can stand independently" },
        { id: 5, tag: "<aside>", word: "Sidebar tangentially related to the surrounding content" },
        { id: 6, tag: "<footer>", word: "Closing section containing copyright, author, and legal info" }
      ]
    },
    {
      title: "Round 2: Media, Graphics & Modern Interactivity",
      pairs: [
        { id: 7, tag: "<video>", word: "Native multimedia audio-visual movie player with controls" },
        { id: 8, tag: "<picture>", word: "Responsive image wrapper offering multiple media queries" },
        { id: 9, tag: "<svg>", word: "Scalable XML-based vector graphics that never pixelate" },
        { id: 10, tag: "<canvas>", word: "Procedural 2D pixel bitmap drawing surface scripted with JS" },
        { id: 11, tag: "<dialog>", word: "Native popup modal overlay box with showModal() support" },
        { id: 12, tag: "<details>", word: "Interactive disclosure widget that toggles open and closed" }
      ]
    },
    {
      title: "Round 3: Text Semantics & Code Markup",
      pairs: [
        { id: 13, tag: "<mark>", word: "Highlighted text for relevance in reference or search results" },
        { id: 14, tag: "<time>", word: "Machine-readable datetime stamp with datetime attribute" },
        { id: 15, tag: "<abbr>", word: "Abbreviation or acronym with optional expanded title tooltip" },
        { id: 16, tag: "<code>", word: "Inline fragment of computer programming code" },
        { id: 17, tag: "<kbd>", word: "User keyboard key input keystroke representation" },
        { id: 18, tag: "<blockquote>", word: "Extended quoted excerpt taken from an external source" }
      ]
    },
    {
      title: "Round 4: Forms & Tabular Data Grid",
      pairs: [
        { id: 19, tag: "<fieldset>", word: "Visual container grouping related form inputs under a legend" },
        { id: 20, tag: "<datalist>", word: "Autocomplete dropdown suggestions connected to an input" },
        { id: 21, tag: "<caption>", word: "Accessible explanatory title placed directly inside a table" },
        { id: 22, tag: "<thead>", word: "Header row block containing column titles in a table" },
        { id: 23, tag: "<colgroup>", word: "Applies column formatting across multiple table columns" },
        { id: 24, tag: "<textarea>", word: "Multi-line expandable user plain text input control" }
      ]
    }
  ];

  let wmRoundIndex = 0;
  let wmScore = 0;
  let wmStreak = 1;
  let wmMatchedInRound = 0;
  let wmSelectedTag = null;
  let wmSelectedWord = null;
  let wmMistakesInRound = 0;

  function initWordMap(roundIdx) {
    if (typeof roundIdx === "number") wmRoundIndex = roundIdx;
    if (wmRoundIndex >= WORD_MAP_ROUNDS.length) wmRoundIndex = 0;

    const roundData = WORD_MAP_ROUNDS[wmRoundIndex];
    wmMatchedInRound = 0;
    wmSelectedTag = null;
    wmSelectedWord = null;
    wmMistakesInRound = 0;

    const roundEl = document.getElementById("wordMapRound");
    const scoreEl = document.getElementById("wordMapScore");
    const streakEl = document.getElementById("wordMapStreak");
    const matchedEl = document.getElementById("wordMapMatched");
    const winBox = document.getElementById("wordMapWinBox");

    if (roundEl) roundEl.textContent = `${wmRoundIndex + 1} / ${WORD_MAP_ROUNDS.length}`;
    if (scoreEl) scoreEl.textContent = wmScore;
    if (streakEl) streakEl.textContent = `${wmStreak}x`;
    if (matchedEl) matchedEl.textContent = `0 / ${roundData.pairs.length}`;
    if (winBox) winBox.style.display = "none";

    const tagsCol = document.getElementById("wordMapTagsCol");
    const wordsCol = document.getElementById("wordMapWordsCol");
    if (!tagsCol || !wordsCol) return;

    tagsCol.innerHTML = `<div style="font-weight: 700; color: var(--text-muted); font-size: 13px; text-transform: uppercase; margin-bottom: 4px;">Column A: HTML Tags</div>`;
    wordsCol.innerHTML = `<div style="font-weight: 700; color: var(--text-muted); font-size: 13px; text-transform: uppercase; margin-bottom: 4px;">Column B: Meanings &amp; Words</div>`;

    const shuffledTags = [...roundData.pairs].sort(() => Math.random() - 0.5);
    const shuffledWords = [...roundData.pairs].sort(() => Math.random() - 0.5);

    shuffledTags.forEach(item => {
      const el = document.createElement("div");
      el.className = "wordmap-item";
      el.dataset.id = item.id;
      el.dataset.type = "tag";
      el.innerHTML = `
        <span class="wm-tag-code">${escapeHTML(item.tag)}</span>
        <span class="wm-badge">Tag</span>
      `;
      el.onclick = () => selectWordMapItem(el, item, "tag");
      tagsCol.appendChild(el);
    });

    shuffledWords.forEach(item => {
      const el = document.createElement("div");
      el.className = "wordmap-item";
      el.dataset.id = item.id;
      el.dataset.type = "word";
      el.innerHTML = `
        <span class="wm-word-text">${escapeHTML(item.word)}</span>
        <span class="wm-badge">Definition</span>
      `;
      el.onclick = () => selectWordMapItem(el, item, "word");
      wordsCol.appendChild(el);
    });
  }

  function selectWordMapItem(elem, data, type) {
    if (elem.classList.contains("matched")) return;

    if (type === "tag") {
      document.querySelectorAll("#wordMapTagsCol .wordmap-item").forEach(i => i.classList.remove("selected"));
      elem.classList.add("selected");
      wmSelectedTag = { elem: elem, data: data };
    } else {
      document.querySelectorAll("#wordMapWordsCol .wordmap-item").forEach(i => i.classList.remove("selected"));
      elem.classList.add("selected");
      wmSelectedWord = { elem: elem, data: data };
    }

    if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.click();

    if (wmSelectedTag && wmSelectedWord) {
      const tagItem = wmSelectedTag;
      const wordItem = wmSelectedWord;

      if (tagItem.data.id === wordItem.data.id) {
        setTimeout(() => {
          tagItem.elem.classList.remove("selected");
          wordItem.elem.classList.remove("selected");
          tagItem.elem.classList.add("matched");
          wordItem.elem.classList.add("matched");

          tagItem.elem.querySelector(".wm-badge").textContent = "✓ MATCHED";
          wordItem.elem.querySelector(".wm-badge").textContent = "✓ MATCHED";

          wmMatchedInRound++;
          const ptsEarned = 25 * wmStreak;
          wmScore += ptsEarned;
          wmStreak = Math.min(wmStreak + 1, 5);

          const scoreEl = document.getElementById("wordMapScore");
          const streakEl = document.getElementById("wordMapStreak");
          const matchedEl = document.getElementById("wordMapMatched");
          if (scoreEl) scoreEl.textContent = wmScore;
          if (streakEl) streakEl.textContent = `${wmStreak}x 🔥`;
          if (matchedEl) matchedEl.textContent = `${wmMatchedInRound} / ${WORD_MAP_ROUNDS[wmRoundIndex].pairs.length}`;

          if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.success();
          if (window.HTMLMaster.modules.Toast) {
            window.HTMLMaster.modules.Toast.show(`Mapped: <b>${escapeHTML(tagItem.data.tag)}</b> (+${ptsEarned} XP)!`, "success", 1800);
          }

          wmSelectedTag = null;
          wmSelectedWord = null;

          if (wmMatchedInRound === WORD_MAP_ROUNDS[wmRoundIndex].pairs.length) {
            completeWordMapRound();
          }
        }, 250);
      } else {
        setTimeout(() => {
          tagItem.elem.classList.add("wrong");
          wordItem.elem.classList.add("wrong");
          wmMistakesInRound++;
          wmStreak = 1;

          const streakEl = document.getElementById("wordMapStreak");
          if (streakEl) streakEl.textContent = "1x";

          if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.fail();

          setTimeout(() => {
            tagItem.elem.classList.remove("selected", "wrong");
            wordItem.elem.classList.remove("selected", "wrong");
            wmSelectedTag = null;
            wmSelectedWord = null;
          }, 500);
        }, 250);
      }
    }
  }

  function completeWordMapRound() {
    const winBox = document.getElementById("wordMapWinBox");
    const winText = document.getElementById("wordMapWinText");
    const nextBtn = document.getElementById("wordMapNextBtn");

    const isLastRound = wmRoundIndex >= WORD_MAP_ROUNDS.length - 1;
    if (winText) {
      winText.innerHTML = `You mastered <b>${WORD_MAP_ROUNDS[wmRoundIndex].title}</b>!<br>Total Score: <b>${wmScore} XP</b> (Mistakes: ${wmMistakesInRound})`;
    }
    if (nextBtn) {
      nextBtn.textContent = isLastRound ? "Restart From Round 1" : `Proceed to Round ${wmRoundIndex + 2} →`;
    }
    if (winBox) winBox.style.display = "block";

    if (window.HTMLMaster.modules.Storage) {
      window.HTMLMaster.modules.Storage.recordGameScore("wordMap", wmScore, {
        pairs: 6,
        perfect: wmMistakesInRound === 0,
        label: "Tag Word Mapper",
        summary: `Round ${wmRoundIndex + 1} cleared (${wmScore} XP)`
      });
    }

    if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.fanfare();
    if (window.HTMLMaster.modules.Toast) window.HTMLMaster.modules.Toast.show("Round Cleared! Word Mapping Saved to Score Card 🏆", "success");
  }

  function nextWordMapRound() {
    wmRoundIndex++;
    if (wmRoundIndex >= WORD_MAP_ROUNDS.length) {
      wmRoundIndex = 0;
      wmScore = 0;
      wmStreak = 1;
    }
    initWordMap(wmRoundIndex);
  }

  /* =========================================================
     4. "CHOOSE ALL" TAG BLITZ QUIZ (Multi-Select Interactive)
     ========================================================= */
  const CHOOSE_ALL_QUESTIONS = [
    {
      id: "ca1",
      title: "Choose ALL tags that are void / self-closing (never require a closing </tag>):",
      subtitle: "Select every element that cannot have children and self-terminates in HTML5.",
      options: [
        { text: "<img>", correct: true },
        { text: "<input>", correct: true },
        { text: "<br>", correct: true },
        { text: "<div>", correct: false },
        { text: "<meta>", correct: true },
        { text: "<hr>", correct: true },
        { text: "<p>", correct: false },
        { text: "<a>", correct: false }
      ],
      tip: "<b>Void Elements:</b> <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>, and <code>&lt;meta&gt;</code> cannot have content or end tags."
    },
    {
      id: "ca2",
      title: "Choose ALL semantic layout tags introduced in modern HTML5:",
      subtitle: "Which tags define meaningful landmark regions of a web page?",
      options: [
        { text: "<header>", correct: true },
        { text: "<nav>", correct: true },
        { text: "<article>", correct: true },
        { text: "<font>", correct: false },
        { text: "<main>", correct: true },
        { text: "<center>", correct: false },
        { text: "<section>", correct: true },
        { text: "<footer>", correct: true }
      ],
      tip: "<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, and <code>&lt;footer&gt;</code> are semantic landmarks. <code>&lt;font&gt;</code> and <code>&lt;center&gt;</code> are obsolete."
    },
    {
      id: "ca3",
      title: "Choose ALL elements that are legal direct children of a <table>:",
      subtitle: "Which elements are syntactically valid directly inside a table container?",
      options: [
        { text: "<caption>", correct: true },
        { text: "<thead>", correct: true },
        { text: "<tbody>", correct: true },
        { text: "<tr>", correct: true },
        { text: "<colgroup>", correct: true },
        { text: "<tfoot>", correct: true },
        { text: "<h1>", correct: false },
        { text: "<dialog>", correct: false }
      ],
      tip: "Only tabular elements (<code>&lt;caption&gt;</code>, <code>&lt;colgroup&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;tfoot&gt;</code>) can be direct children of a table."
    },
    {
      id: "ca4",
      title: "Choose ALL tags designed specifically for modern media, vector graphics, or drawing:",
      subtitle: "Identify all elements introduced or tailored for rich visual & audio content.",
      options: [
        { text: "<video>", correct: true },
        { text: "<audio>", correct: true },
        { text: "<svg>", correct: true },
        { text: "<canvas>", correct: true },
        { text: "<picture>", correct: true },
        { text: "<aside>", correct: false },
        { text: "<form>", correct: false }
      ],
      tip: "Multimedia and graphics in HTML5 include native audio/video, responsive pictures, SVG vectors, and pixel-based 2D canvas."
    },
    {
      id: "ca5",
      title: "Choose ALL valid HTML5 <input> type attribute values:",
      subtitle: "Select all real input types that browsers natively support for form validation.",
      options: [
        { text: "email", correct: true },
        { text: "number", correct: true },
        { text: "range", correct: true },
        { text: "date", correct: true },
        { text: "color", correct: true },
        { text: "checkbox", correct: true },
        { text: "paragraph", correct: false },
        { text: "script", correct: false }
      ],
      tip: "HTML5 includes native input types like email, number, date, range, color, tel, url, and checkbox. 'paragraph' and 'script' are not input types."
    },
    {
      id: "ca6",
      title: "Choose ALL inline text-level semantic elements:",
      subtitle: "Which tags apply semantic meaning to small spans of inline text?",
      options: [
        { text: "<em>", correct: true },
        { text: "<strong>", correct: true },
        { text: "<mark>", correct: true },
        { text: "<cite>", correct: true },
        { text: "<code>", correct: true },
        { text: "<abbr>", correct: true },
        { text: "<header>", correct: false },
        { text: "<table>", correct: false }
      ],
      tip: "<code>&lt;em&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;mark&gt;</code>, <code>&lt;cite&gt;</code>, <code>&lt;code&gt;</code>, and <code>&lt;abbr&gt;</code> are inline phrasing semantics."
    },
    {
      id: "ca7",
      title: "Choose ALL boolean attributes that do not require a value to be active:",
      subtitle: "Which attributes are enabled simply by being present on an HTML element?",
      options: [
        { text: "disabled", correct: true },
        { text: "required", correct: true },
        { text: "checked", correct: true },
        { text: "autofocus", correct: true },
        { text: "readonly", correct: true },
        { text: "href", correct: false },
        { text: "src", correct: false }
      ],
      tip: "Boolean attributes like <code>disabled</code>, <code>required</code>, <code>checked</code>, and <code>autofocus</code> are true by their mere presence. <code>href</code> and <code>src</code> require URL values."
    },
    {
      id: "ca8",
      title: "Choose ALL elements that significantly improve Web Accessibility (a11y) & SEO outline:",
      subtitle: "Which tags communicate landmark structure to search engines and screen readers?",
      options: [
        { text: "<nav>", correct: true },
        { text: "<main>", correct: true },
        { text: "<header>", correct: true },
        { text: "<article>", correct: true },
        { text: "<h1>", correct: true },
        { text: "<div>", correct: false },
        { text: "<span>", correct: false }
      ],
      tip: "Landmarks like <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;h1&gt;</code> give assistive technologies immediate structural context."
    }
  ];

  let caCurrentIndex = 0;
  let caScore = 0;
  let caStreak = 0;
  let caTotalCorrect = 0;
  let caSelectedIndices = new Set();
  let caIsSubmitted = false;

  function initChooseAll() {
    caCurrentIndex = 0;
    caScore = 0;
    caStreak = 0;
    caTotalCorrect = 0;
    loadChooseAllQuestion(caCurrentIndex);
  }

  function loadChooseAllQuestion(idx) {
    caIsSubmitted = false;
    caSelectedIndices.clear();

    const q = CHOOSE_ALL_QUESTIONS[idx];
    const progEl = document.getElementById("chooseAllProgress");
    const scoreEl = document.getElementById("chooseAllScore");
    const streakEl = document.getElementById("chooseAllStreak");
    const titleEl = document.getElementById("chooseAllQuestionTitle");
    const subtitleEl = document.getElementById("chooseAllQuestionSubtitle");
    const grid = document.getElementById("chooseAllOptionsGrid");
    const submitBtn = document.getElementById("chooseAllSubmitBtn");
    const nextBtn = document.getElementById("chooseAllNextBtn");
    const feedbackBox = document.getElementById("chooseAllFeedbackBox");
    const finalBox = document.getElementById("chooseAllFinalBox");

    if (progEl) progEl.textContent = `${idx + 1} / ${CHOOSE_ALL_QUESTIONS.length}`;
    if (scoreEl) scoreEl.textContent = caScore;
    if (streakEl) streakEl.textContent = `${caStreak} 🔥`;
    if (titleEl) titleEl.textContent = q.title;
    if (subtitleEl) subtitleEl.textContent = q.subtitle;
    if (submitBtn) { submitBtn.style.display = "inline-flex"; submitBtn.disabled = false; }
    if (nextBtn) nextBtn.style.display = "none";
    if (feedbackBox) feedbackBox.style.display = "none";
    if (finalBox) finalBox.style.display = "none";

    if (!grid) return;
    grid.innerHTML = "";

    q.options.forEach((opt, oIdx) => {
      const item = document.createElement("div");
      item.className = "chooseall-option-item";
      item.dataset.index = oIdx;
      item.innerHTML = `
        <div class="chooseall-checkbox">✓</div>
        <span class="chooseall-opt-code">${escapeHTML(opt.text)}</span>
      `;
      item.onclick = () => toggleChooseAllOption(item, oIdx);
      grid.appendChild(item);
    });
  }

  function toggleChooseAllOption(elem, oIdx) {
    if (caIsSubmitted) return;

    if (caSelectedIndices.has(oIdx)) {
      caSelectedIndices.delete(oIdx);
      elem.classList.remove("selected");
    } else {
      caSelectedIndices.add(oIdx);
      elem.classList.add("selected");
    }

    if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.click();
  }

  function submitChooseAll() {
    if (caIsSubmitted) return;
    caIsSubmitted = true;

    const q = CHOOSE_ALL_QUESTIONS[caCurrentIndex];
    const grid = document.getElementById("chooseAllOptionsGrid");
    const submitBtn = document.getElementById("chooseAllSubmitBtn");
    const nextBtn = document.getElementById("chooseAllNextBtn");
    const feedbackBox = document.getElementById("chooseAllFeedbackBox");

    let correctCount = 0;
    let incorrectCount = 0;
    let totalTargetCorrect = q.options.filter(o => o.correct).length;

    q.options.forEach((opt, oIdx) => {
      const item = grid.children[oIdx];
      const isPicked = caSelectedIndices.has(oIdx);

      if (opt.correct && isPicked) {
        item.classList.add("is-correct-picked");
        correctCount++;
      } else if (opt.correct && !isPicked) {
        item.classList.add("is-missed");
      } else if (!opt.correct && isPicked) {
        item.classList.add("is-wrong-picked");
        incorrectCount++;
      }
    });

    const isPerfect = correctCount === totalTargetCorrect && incorrectCount === 0;
    let earned = 0;
    if (isPerfect) {
      earned = 25;
      caStreak++;
      caTotalCorrect++;
      if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.success();
    } else if (correctCount > 0 && incorrectCount <= 1) {
      earned = 15;
      if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.click();
    } else {
      caStreak = 0;
      if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.fail();
    }

    caScore += earned;
    const scoreEl = document.getElementById("chooseAllScore");
    const streakEl = document.getElementById("chooseAllStreak");
    if (scoreEl) scoreEl.textContent = caScore;
    if (streakEl) streakEl.textContent = `${caStreak} 🔥`;

    if (submitBtn) submitBtn.style.display = "none";
    if (nextBtn) {
      nextBtn.style.display = "inline-flex";
      nextBtn.textContent = caCurrentIndex >= CHOOSE_ALL_QUESTIONS.length - 1 ? "Finish Quiz & View Score Card →" : "Next Question →";
    }

    if (feedbackBox) {
      feedbackBox.style.display = "block";
      feedbackBox.innerHTML = `
        <div style="font-weight: 700; color: ${isPerfect ? 'var(--success)' : '#f59e0b'}; margin-bottom: 6px;">
          ${isPerfect ? '🎉 Perfect Selection (+25 XP)!' : `Identified ${correctCount} of ${totalTargetCorrect} correctly (+${earned} XP)`}
        </div>
        <div>${q.tip}</div>
      `;
    }
  }

  function nextChooseAllQuestion() {
    caCurrentIndex++;
    if (caCurrentIndex >= CHOOSE_ALL_QUESTIONS.length) {
      finishChooseAllQuiz();
    } else {
      loadChooseAllQuestion(caCurrentIndex);
    }
  }

  function finishChooseAllQuiz() {
    const finalBox = document.getElementById("chooseAllFinalBox");
    const finalScoreEl = document.getElementById("chooseAllFinalScore");
    const cardEl = document.querySelector(".chooseall-card");

    if (cardEl) cardEl.style.display = "none";
    if (finalBox) finalBox.style.display = "block";

    const accuracyPct = Math.round((caTotalCorrect / CHOOSE_ALL_QUESTIONS.length) * 100);
    if (finalScoreEl) {
      finalScoreEl.innerHTML = `
        You finished the Multi-Select Blitz Quiz with <b>${caScore} Points</b>!<br>
        Accuracy: <b>${accuracyPct}%</b> (${caTotalCorrect} / ${CHOOSE_ALL_QUESTIONS.length} Perfect Questions).
      `;
    }

    if (window.HTMLMaster.modules.Storage) {
      window.HTMLMaster.modules.Storage.recordGameScore("chooseAll", caScore, {
        correct: caTotalCorrect,
        total: CHOOSE_ALL_QUESTIONS.length,
        label: "Choose ALL Tag Blitz",
        summary: `Scored ${caScore} pts with ${accuracyPct}% accuracy`
      });
    }

    if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.fanfare();
    if (window.HTMLMaster.modules.Toast) {
      window.HTMLMaster.modules.Toast.show("Choose All Quiz Run Completed & Saved to Score Card! 🏆", "success");
    }
  }

  /* =========================================================
     5. PLAYER SCORE CARD & USER DATA DASHBOARD
     ========================================================= */
  function renderScoreCard() {
    const container = document.getElementById("scoreCardContainer");
    if (!container) return;

    let user = null;
    let scores = null;

    if (window.HTMLMaster.modules.Storage) {
      user = window.HTMLMaster.modules.Storage.getCurrentUser();
      scores = window.HTMLMaster.modules.Storage.getGameScores();
    }

    user = user || {
      name: "Guest Explorer",
      email: "guest@example.com",
      phone: "Not registered",
      dob: "Not specified",
      emoji: "🧑💻",
      joined: new Date().toISOString()
    };

    scores = scores || {
      totalPlayed: 0,
      totalPoints: 0,
      snake: { played: 0, highScore: 0, lastScore: 0, totalEaten: 0 },
      memory: { played: 0, bestTime: 9999, bestMoves: 999, totalMatched: 0 },
      wordMap: { played: 0, highScore: 0, totalMatched: 0, perfectRounds: 0 },
      chooseAll: { played: 0, highScore: 0, totalCorrect: 0, totalQuestions: 0 },
      history: []
    };

    const bestMemoryTimeStr = scores.memory.bestTime === 9999 ? "--:--" : 
      `${Math.floor(scores.memory.bestTime / 60).toString().padStart(2, '0')}:${(scores.memory.bestTime % 60).toString().padStart(2, '0')}`;

    const chooseAllAcc = scores.chooseAll.totalQuestions > 0 ? 
      Math.round((scores.chooseAll.totalCorrect / scores.chooseAll.totalQuestions) * 100) : 0;

    let historyHtml = "";
    if (scores.history && scores.history.length > 0) {
      historyHtml = scores.history.map(item => `
        <div class="history-item">
          <div class="history-left">
            <span style="font-size: 16px;">🎮</span>
            <div>
              <div style="font-weight: 600; color: var(--text-main);">${item.label || item.game}</div>
              <div style="color: var(--text-dim); font-size: 12px;">${item.summary || ''} &bull; ${new Date(item.date).toLocaleDateString()}</div>
            </div>
          </div>
          <span class="stat-pill">+${item.points} XP</span>
        </div>
      `).join("");
    } else {
      historyHtml = `<div style="color: var(--text-muted); padding: 14px; font-size: 13.5px;">No game records yet. Play any game in the arcade to start building your score card!</div>`;
    }

    container.innerHTML = `
      <div class="scorecard-hero">
        <div class="scorecard-user-info">
          <div class="scorecard-avatar">${user.emoji || '🧑💻'}</div>
          <div class="scorecard-details">
            <h3>${user.name || 'Guest Explorer'}</h3>
            <div class="scorecard-chips">
              <span class="scorecard-chip">📧 Gmail: <strong>${user.email || 'N/A'}</strong></span>
              <span class="scorecard-chip">📱 Mobile: <strong>${user.phone || 'N/A'}</strong></span>
              <span class="scorecard-chip">🎂 DOB: <strong>${user.dob || 'N/A'}</strong></span>
              <span class="scorecard-chip" style="border-color: var(--primary); color: var(--primary);">⭐ Level: HTML Prodigy</span>
            </div>
          </div>
        </div>
        <div style="text-align: right;">
          <button class="btn ghost sm" onclick="window.HTMLMaster.modules.Games.exportScoreCardJSON()">📥 Download Data (JSON)</button>
        </div>
      </div>

      <div class="scorecard-metrics-grid">
        <div class="sc-metric-card">
          <span class="sc-metric-label">Total Games Played</span>
          <span class="sc-metric-val">${scores.totalPlayed}</span>
          <span class="sc-metric-sub">Arcade Sessions</span>
        </div>
        <div class="sc-metric-card">
          <span class="sc-metric-label">Total Arcade Points</span>
          <span class="sc-metric-val" style="color: var(--gold);">${scores.totalPoints} XP</span>
          <span class="sc-metric-sub">Lifetime Points</span>
        </div>
        <div class="sc-metric-card">
          <span class="sc-metric-label">Top Snake Score</span>
          <span class="sc-metric-val" style="color: var(--primary);">${scores.snake.highScore} pts</span>
          <span class="sc-metric-sub">Tags Eaten: ${scores.snake.totalEaten}</span>
        </div>
        <div class="sc-metric-card">
          <span class="sc-metric-label">Choose-All Accuracy</span>
          <span class="sc-metric-val" style="color: var(--success);">${chooseAllAcc}%</span>
          <span class="sc-metric-sub">Multi-Select Blitz</span>
        </div>
      </div>

      <div class="scorecard-table-card">
        <h4>📋 Comprehensive Game Breakdown</h4>
        <table class="scorecard-table">
          <thead>
            <tr>
              <th>Game Mode</th>
              <th>Times Played</th>
              <th>High Score / Record</th>
              <th>Special Stat</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>🃏 Tag Memory Matcher</b></td>
              <td>${scores.memory.played}</td>
              <td>${scores.memory.bestMoves === 999 ? 'N/A' : scores.memory.bestMoves + ' moves'}</td>
              <td>Best Time: ${bestMemoryTimeStr}</td>
              <td><span class="stat-pill" style="color: var(--success);">Active</span></td>
            </tr>
            <tr>
              <td><b>🐍 Cyber Snake (Canvas 2D)</b></td>
              <td>${scores.snake.played}</td>
              <td>${scores.snake.highScore} pts</td>
              <td>Last Run: ${scores.snake.lastScore} pts</td>
              <td><span class="stat-pill" style="color: var(--primary);">Active</span></td>
            </tr>
            <tr>
              <td><b>🗺️ Tag Word Mapper</b></td>
              <td>${scores.wordMap.played}</td>
              <td>${scores.wordMap.highScore} XP</td>
              <td>Perfect Rounds: ${scores.wordMap.perfectRounds}</td>
              <td><span class="stat-pill" style="color: var(--gold);">Active</span></td>
            </tr>
            <tr>
              <td><b>🎯 "Choose ALL" Tag Quiz</b></td>
              <td>${scores.chooseAll.played}</td>
              <td>${scores.chooseAll.highScore} pts</td>
              <td>Accuracy: ${chooseAllAcc}%</td>
              <td><span class="stat-pill" style="color: #a855f7;">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="scorecard-history-box">
        <h4>🕒 Recent Game History &amp; Points Log</h4>
        <div class="history-list">${historyHtml}</div>
      </div>

      <!-- Winner Card Download & Preview Actions -->
      <div class="scorecard-actions-bar">
        <button class="btn success" onclick="window.HTMLMaster.modules.Games.downloadScoreCardImage()">
          🏆 Download Winner Score Card (Image/PNG)
        </button>
        <button class="btn primary" onclick="window.HTMLMaster.modules.Games.previewWinnerModal()">
          🖼️ Preview Winner Certificate
        </button>
        <button class="btn ghost" onclick="window.HTMLMaster.modules.Games.renderScoreCard()">
          ↺ Refresh Stats
        </button>
        <a href="javascript:void(0)" style="margin-left: auto; align-self: center; font-size: 12px; color: var(--text-dim); text-decoration: underline;" onclick="window.HTMLMaster.modules.Games.exportScoreCardJSON()">
          Export Backup Data (JSON)
        </a>
      </div>

      <!-- Social Challenge Box: Share with Friends to Play -->
      <div class="scorecard-share-box">
        <div class="scorecard-share-header">
          <span style="font-size: 22px;">🚀</span>
          <div>
            <h4>Challenge &amp; Share with Friends to Play!</h4>
            <div style="font-size: 13px; color: var(--text-muted);">
              Invite your friends to play and try to beat your high score!
            </div>
          </div>
        </div>
        <div class="share-buttons-grid">
          <button class="share-btn whatsapp" onclick="window.HTMLMaster.modules.Games.shareToWhatsApp()">
            🟢 Share on WhatsApp
          </button>
          <button class="share-btn twitter" onclick="window.HTMLMaster.modules.Games.shareToX()">
            𝕏 Share on X (Twitter)
          </button>
          <button class="share-btn linkedin" onclick="window.HTMLMaster.modules.Games.shareToLinkedIn()">
            💼 Share on LinkedIn
          </button>
          <button class="share-btn copy" onclick="window.HTMLMaster.modules.Games.copyChallengeLink()">
            🔗 Copy Challenge Link
          </button>
        </div>
      </div>
    `;
  }

  function drawWinnerScoreCardCanvas(canvas, user, scores) {
    if (!canvas) return;
    canvas.width = 1000;
    canvas.height = 650;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    user = user || { name: "HTML Champion", email: "learner@gmail.com", phone: "9876543210", dob: "2000-01-01" };
    scores = scores || { totalPoints: 0, totalPlayed: 0, snake: { highScore: 0, totalEaten: 0 }, wordMap: { highScore: 0 }, chooseAll: { totalCorrect: 0, totalQuestions: 0 } };

    const totalPts = scores.totalPoints || 0;
    const snakeHigh = (scores.snake && scores.snake.highScore) || 0;
    const snakeEaten = (scores.snake && scores.snake.totalEaten) || 0;
    const wordMapHigh = (scores.wordMap && scores.wordMap.highScore) || 0;
    const chooseAllAcc = (scores.chooseAll && scores.chooseAll.totalQuestions > 0) ?
      Math.round((scores.chooseAll.totalCorrect / scores.chooseAll.totalQuestions) * 100) : 100;
    const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const credId = "HM-ARCADE-" + (user.id ? user.id.replace(/^u_/, '').slice(0, 6).toUpperCase() : Date.now().toString(36).slice(-6).toUpperCase());

    // 1. Background gradient
    const bg = ctx.createLinearGradient(0, 0, 1000, 650);
    bg.addColorStop(0, "#080e1a");
    bg.addColorStop(0.5, "#0e182c");
    bg.addColorStop(1, "#050812");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1000, 650);

    // 2. Ambient radial glows
    const glow1 = ctx.createRadialGradient(250, 180, 20, 250, 180, 450);
    glow1.addColorStop(0, "rgba(56, 189, 248, 0.09)");
    glow1.addColorStop(1, "transparent");
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, 1000, 650);

    const glow2 = ctx.createRadialGradient(750, 450, 20, 750, 450, 450);
    glow2.addColorStop(0, "rgba(245, 158, 11, 0.08)");
    glow2.addColorStop(1, "transparent");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, 1000, 650);

    // 3. Ornate Double Gold & Cyan Borders
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 5;
    ctx.strokeRect(28, 28, 944, 594);

    ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(38, 38, 924, 574);

    // Corner brackets
    function drawCorner(x, y, sx, sy) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(sx, sy);
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.lineTo(18, 18);
      ctx.lineTo(18, 0);
      ctx.stroke();
      ctx.restore();
    }
    drawCorner(52, 52, 1, 1);
    drawCorner(948, 52, -1, 1);
    drawCorner(52, 598, 1, -1);
    drawCorner(948, 598, -1, -1);

    // 4. Official XTuti RaiseUp Logo & Header Top
    try {
      if (typeof Image !== "undefined") {
        if (!window._xtutiLogoImg) {
          window._xtutiLogoImg = new Image();
          window._xtutiLogoImg.src = "assets/logo.png";
        }
        const lImg = window._xtutiLogoImg;
        if (lImg && lImg.complete && lImg.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(105, 115, 38, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(lImg, 67, 77, 76, 76);
          ctx.restore();
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(105, 115, 38, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    } catch (err) {}

    ctx.font = "bold 13px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#38bdf8";
    ctx.textAlign = "center";
    ctx.fillText("★  XTUTIRAISEUP BY XSYMPAN TECHNOLOGIES ARCADE  ★", 500, 85);

    ctx.font = "bold 34px 'Inter', sans-serif";
    const titleGrad = ctx.createLinearGradient(300, 120, 700, 120);
    titleGrad.addColorStop(0, "#fbbf24");
    titleGrad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = titleGrad;
    ctx.fillText("OFFICIAL WINNER SCORE CARD", 500, 128);

    ctx.font = "italic 14px 'Inter', sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("Recognized HTML5 Champion • Powered by XTuti RaiseUp", 500, 158);

    // 5. Player Identity Card
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(140, 185, 720, 95, 10);
    else ctx.rect(140, 185, 720, 95);
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 30px 'Inter', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(user.name || "HTML Champion", 500, 230);

    ctx.font = "13px 'Inter', sans-serif";
    ctx.fillStyle = "#94a3b8";
    const infoText = `📧 Gmail: ${user.email || 'N/A'}    •    📱 Mobile: ${user.phone || 'N/A'}    •    🎂 DOB: ${user.dob || 'N/A'}`;
    ctx.fillText(infoText, 500, 260);

    // 6. Three Prominent Metrics Boxes
    const cards = [
      { label: "TOTAL ARCADE XP", val: `+${totalPts} XP`, sub: `${scores.totalPlayed || 0} Games Played`, color: "#fbbf24" },
      { label: "CYBER SNAKE RECORD", val: `${snakeHigh} PTS`, sub: `${snakeEaten} Tags Eaten`, color: "#38bdf8" },
      { label: "WORD MAPPER & QUIZ", val: `${wordMapHigh} XP`, sub: `${chooseAllAcc}% Quiz Accuracy`, color: "#a855f7" }
    ];

    cards.forEach((c, idx) => {
      const cx = 140 + idx * 250;
      const cy = 305;
      const cw = 220;
      const ch = 135;

      ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
      ctx.strokeStyle = c.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx, cy, cw, ch, 8);
      else ctx.rect(cx, cy, cw, ch);
      ctx.fill();
      ctx.stroke();

      ctx.font = "bold 11px 'Inter', sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.textAlign = "center";
      ctx.fillText(c.label, cx + cw / 2, cy + 32);

      ctx.font = "bold 26px 'JetBrains Mono', monospace";
      ctx.fillStyle = c.color;
      ctx.fillText(c.val, cx + cw / 2, cy + 78);

      ctx.font = "12px 'Inter', sans-serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText(c.sub, cx + cw / 2, cy + 110);
    });

    // 7. Gold Seal on Bottom Left
    ctx.save();
    ctx.translate(220, 520);
    const seal = ctx.createLinearGradient(-40, -40, 40, 40);
    seal.addColorStop(0, "#fbbf24");
    seal.addColorStop(1, "#d97706");
    ctx.fillStyle = seal;
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#040711";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("★", 0, 8);
    ctx.restore();

    ctx.font = "bold 12px 'Inter', sans-serif";
    ctx.fillStyle = "#fbbf24";
    ctx.textAlign = "center";
    ctx.fillText("VERIFIED WINNER", 220, 580);

    // 8. Verification & Challenge Callout on Bottom Right
    ctx.textAlign = "right";
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(`Date: ${dateStr}`, 860, 495);

    ctx.font = "12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText(`Credential: ${credId}`, 860, 520);

    ctx.font = "italic 13px 'Inter', sans-serif";
    ctx.fillStyle = "#f59e0b";
    ctx.fillText("Challenge your friends to beat this score at HTML Master!", 860, 548);

    // 9. Official Accreditation Stamp
    ctx.font = "bold 12px 'Inter', sans-serif";
    ctx.fillStyle = "#38bdf8";
    ctx.textAlign = "center";
    ctx.fillText("DEVELOPED WITH ❤️ BY XTutiRaiseUp by XSympan Technologies", 500, 608);
  }

  function downloadScoreCardImage() {
    const canvas = document.getElementById("scoreCardCanvas");
    if (!canvas) return;

    let user = null;
    let scores = null;
    if (window.HTMLMaster.modules.Storage) {
      user = window.HTMLMaster.modules.Storage.getCurrentUser();
      scores = window.HTMLMaster.modules.Storage.getGameScores();
    }

    drawWinnerScoreCardCanvas(canvas, user, scores);

    const safeName = ((user && user.name) || "Winner").replace(/[^a-zA-Z0-9]/g, "_");
    const link = document.createElement("a");
    link.download = `HTML_Master_Winner_ScoreCard_${safeName}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.HTMLMaster.modules.Sound) window.HTMLMaster.modules.Sound.fanfare();
    if (window.HTMLMaster.modules.Toast) {
      window.HTMLMaster.modules.Toast.show("Winner Score Card image downloaded! 🏆 Share it with your friends!", "success");
    }
  }

  function previewWinnerModal() {
    const canvas = document.getElementById("scoreCardCanvas");
    const modal = document.getElementById("winnerCardModal");
    const img = document.getElementById("winnerCardPreviewImg");
    if (!canvas || !modal || !img) return;

    let user = null;
    let scores = null;
    if (window.HTMLMaster.modules.Storage) {
      user = window.HTMLMaster.modules.Storage.getCurrentUser();
      scores = window.HTMLMaster.modules.Storage.getGameScores();
    }

    drawWinnerScoreCardCanvas(canvas, user, scores);
    img.src = canvas.toDataURL("image/png");
    modal.style.display = "flex";
  }

  function closeWinnerModal() {
    const modal = document.getElementById("winnerCardModal");
    if (modal) modal.style.display = "none";
  }

  function shareToWhatsApp() {
    let user = null;
    let scores = null;
    if (window.HTMLMaster.modules.Storage) {
      user = window.HTMLMaster.modules.Storage.getCurrentUser();
      scores = window.HTMLMaster.modules.Storage.getGameScores();
    }
    const name = (user && user.name) || "HTML Champion";
    const pts = (scores && scores.totalPoints) || 0;
    const snakeHigh = (scores && scores.snake && scores.snake.highScore) || 0;
    const url = window.location.origin || window.location.href;

    const text = `🏆 Hey! I just scored ${pts} XP on HTML Master Arcade!\n🐍 My Cyber Snake Record: ${snakeHigh} pts.\n\nCan you beat my high score? Play with me here:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  }

  function shareToX() {
    let user = null;
    let scores = null;
    if (window.HTMLMaster.modules.Storage) {
      user = window.HTMLMaster.modules.Storage.getCurrentUser();
      scores = window.HTMLMaster.modules.Storage.getGameScores();
    }
    const pts = (scores && scores.totalPoints) || 0;
    const snakeHigh = (scores && scores.snake && scores.snake.highScore) || 0;
    const url = window.location.origin || window.location.href;

    const text = `🔥 Just scored ${pts} XP on @HTMLMaster Arcade (Snake Record: ${snakeHigh} pts)! Can you beat my score?\n\nPlay here: ${url}\n\n#HTML5 #WebDev #ArcadeGame #CodingChallenge`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  }

  function shareToLinkedIn() {
    let user = null;
    let scores = null;
    if (window.HTMLMaster.modules.Storage) {
      user = window.HTMLMaster.modules.Storage.getCurrentUser();
      scores = window.HTMLMaster.modules.Storage.getGameScores();
    }
    const name = (user && user.name) || "I";
    const pts = (scores && scores.totalPoints) || 0;
    const url = encodeURIComponent(window.location.origin || window.location.href);

    const shareText = encodeURIComponent(
      `🎉 Proud to share that ${name} achieved ${pts} XP on the HTML Master Arcade!\nTesting HTML5 tags, Canvas graphics, and Web Architecture in an interactive game format.\n\n#HTML5 #WebDevelopment #Frontend #CodingChallenge`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${shareText}`, '_blank');
  }

  function copyChallengeLink() {
    let user = null;
    let scores = null;
    if (window.HTMLMaster.modules.Storage) {
      user = window.HTMLMaster.modules.Storage.getCurrentUser();
      scores = window.HTMLMaster.modules.Storage.getGameScores();
    }
    const name = (user && user.name) || "HTML Champion";
    const pts = (scores && scores.totalPoints) || 0;
    const snakeHigh = (scores && scores.snake && scores.snake.highScore) || 0;
    const url = window.location.origin || window.location.href;

    const challengeMsg = `🏆 HTML Master Arcade Challenge 🏆\n` +
      `Player: ${name}\n` +
      `Total Score: ${pts} XP\n` +
      `Cyber Snake Record: ${snakeHigh} pts\n\n` +
      `Can you beat my high score? Play here: ${url}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(challengeMsg).then(() => {
        if (window.HTMLMaster.modules.Toast) {
          window.HTMLMaster.modules.Toast.show("Challenge invite copied! Send it to your friends to play! 🚀", "success");
        }
      });
    } else {
      prompt("Copy your challenge message:", challengeMsg);
    }
  }

  function exportScoreCardJSON() {
    let jsonStr = "";
    if (window.HTMLMaster.modules.Storage && window.HTMLMaster.modules.Storage.exportAllUserData) {
      jsonStr = window.HTMLMaster.modules.Storage.exportAllUserData();
    } else {
      jsonStr = JSON.stringify({ note: "No data stored" }, null, 2);
    }

    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `html-master-scorecard-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.HTMLMaster.modules.Toast) {
      window.HTMLMaster.modules.Toast.show("Score Card JSON backup downloaded! 📁", "success");
    }
  }

  const copyScoreSummary = copyChallengeLink;

  /* =========================================================
     ROUTER & NAVIGATION
     ========================================================= */
  function openGames() {
    window.HTMLMaster.showView("view-games");
    switchGame(activeGame);
  }

  function switchGame(which) {
    activeGame = which;

    // Clean up timers from previous games
    if (snakeLoopId && which !== "snake") {
      clearInterval(snakeLoopId);
      isSnakeRunning = false;
    }
    if (memoryTimer && which !== "memory") {
      clearInterval(memoryTimer);
    }

    document.querySelectorAll(".game-tab-btn").forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-game") === which);
    });

    const memoryArea = document.getElementById("gameMemoryArea");
    const snakeArea = document.getElementById("gameSnakeArea");
    const wordMapArea = document.getElementById("gameWordMapArea");
    const chooseAllArea = document.getElementById("gameChooseAllArea");
    const scoreCardArea = document.getElementById("gameScoreCardArea");
    const arcadeArea = document.getElementById("gameArcadeArea");

    if (arcadeArea) arcadeArea.style.display = which === "arcade" ? "block" : "none";
    if (memoryArea) memoryArea.style.display = which === "memory" ? "block" : "none";
    if (snakeArea) snakeArea.style.display = which === "snake" ? "block" : "none";
    if (wordMapArea) wordMapArea.style.display = which === "wordmap" ? "block" : "none";
    if (chooseAllArea) chooseAllArea.style.display = which === "chooseall" ? "block" : "none";
    if (scoreCardArea) scoreCardArea.style.display = which === "scorecard" ? "block" : "none";

    if (which === "arcade") {
      if (window.HTMLMaster.modules.Arcade) window.HTMLMaster.modules.Arcade.render();
    } else if (which === "memory") {
      initMemoryGame();
    } else if (which === "snake") {
      initSnakeGame();
    } else if (which === "wordmap") {
      initWordMap(wmRoundIndex);
    } else if (which === "chooseall") {
      const cardEl = document.querySelector(".chooseall-card");
      if (cardEl) cardEl.style.display = "block";
      initChooseAll();
    } else if (which === "scorecard") {
      renderScoreCard();
    }
  }

  window.addEventListener("keydown", handleSnakeKey);

  return {
    openGames: openGames,
    switchGame: switchGame,
    initMemoryGame: initMemoryGame,
    startSnake: startSnake,
    setSnakeSpeed: setSnakeSpeed,
    setDirection: setDirection,
    initWordMap: initWordMap,
    nextWordMapRound: nextWordMapRound,
    initChooseAll: initChooseAll,
    submitChooseAll: submitChooseAll,
    nextChooseAllQuestion: nextChooseAllQuestion,
    renderScoreCard: renderScoreCard,
    downloadScoreCardImage: downloadScoreCardImage,
    previewWinnerModal: previewWinnerModal,
    closeWinnerModal: closeWinnerModal,
    shareToWhatsApp: shareToWhatsApp,
    shareToX: shareToX,
    shareToLinkedIn: shareToLinkedIn,
    copyChallengeLink: copyChallengeLink,
    exportScoreCardJSON: exportScoreCardJSON,
    copyScoreSummary: copyScoreSummary
  };
})();
