window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Arcade = (function() {
  const groups = [
    ["Logic & Brain", ["Logic Path", "Pattern Predictor", "Number Sequence Hunter", "Condition Maze", "Decision Tree Challenge", "Algorithm Race", "Step Ordering", "Logic Switches", "Bug Detective", "Problem Solver Arena"]],
    ["Programming Fundamentals", ["Variable Box", "Data Type Sorter", "Operator Battle", "If-Else Decision Game", "Loop Runner", "Function Builder", "Input/Output Challenge", "Expression Evaluator", "Code Flow Puzzle", "Programming Basics Boss Fight"]],
    ["C Programming", ["C Syntax Fixer", "Pointer Hunter", "Array Explorer", "String Builder", "Loop Challenge", "Function Puzzle", "Memory Address Maze", "Struct Builder", "Debug the C Code", "C Code Runner Challenge"]],
    ["C++ Programming", ["C++ Syntax Sprint", "OOP Class Builder", "Constructor Challenge", "Inheritance Battle", "Polymorphism Arena", "STL Container Sort", "Vector Race", "Pointer & Reference Lab", "Template Puzzle", "C++ Debugging Arena"]],
    ["Java", ["Java Syntax Builder", "JVM Memory Explorer", "Object Creation Game", "Class & Object Builder", "Inheritance Challenge", "Exception Handler", "Collection Sorter", "Multithreading Race", "Java Debug Detective", "Java Code Execution Simulator"]],
    ["C#", ["C# Syntax Builder", "Class Designer", "Interface Challenge", "LINQ Puzzle", "Exception Catcher", "Collection Challenge", "Async/Await Race", "Delegate & Event Game", "Garbage Collection Explorer", "C# Debugging Arena"]],
    ["Python", ["Python Syntax Fixer", "List Builder", "Dictionary Detective", "Loop Maze", "Function Factory", "Python OOP Builder", "Exception Escape", "Python Debugger", "Algorithm Python Race", "Python Code Execution Game"]],
    ["HTML/CSS/JavaScript", ["HTML Tag Matcher", "CSS Styling Battle", "Flexbox Builder", "Grid Layout Puzzle", "JavaScript Variable Race", "DOM Element Hunter", "Event Handler Challenge", "API Flow Simulator", "Web Debug Detective", "Build the Web Page"]],
    ["DBMS & SQL", ["Database Designer", "Table Builder", "Primary Key Hunter", "Foreign Key Connection", "Normalization Puzzle", "SQL Query Builder", "SELECT Challenge", "JOIN Master", "GROUP BY Analyzer", "SQL Debug Arena"]],
    ["Data Structures & Algorithms", ["Array Sorting Race", "Stack Challenge", "Queue Simulator", "Linked List Builder", "Tree Explorer", "Graph Path Finder", "HashMap Hunter", "Binary Search Race", "Sorting Algorithm Battle", "Big-O Complexity Challenge"]]
  ];
  const concepts = {
    "Logic & Brain": "reasoning and step-by-step problem decomposition", "Programming Fundamentals": "variables, conditions, loops, and functions", "C Programming": "memory, pointers, arrays, and procedural code", "C++ Programming": "OOP, STL, templates, and references", "Java": "objects, collections, exceptions, and JVM flow", "C#": ".NET types, LINQ, async code, and memory", "Python": "readable syntax, collections, functions, and debugging", "HTML/CSS/JavaScript": "structure, styling, DOM, and event flow", "DBMS & SQL": "schemas, relationships, queries, and transactions", "Data Structures & Algorithms": "data organization, traversal, searching, and complexity"
  };
  const modes = ["Trace", "Build", "Debug", "Sort", "Match", "Maze", "Output Prediction", "Connect", "Speed Challenge", "Boss Battle"];
  const catalog = groups.flatMap(([category, titles], groupIndex) => titles.map((title, index) => ({
    id: `arcade-${groupIndex * 10 + index + 1}`,
    number: groupIndex * 10 + index + 1,
    title, category, concept: concepts[category], mode: modes[(groupIndex + index) % modes.length],
    difficulty: index < 3 ? "Beginner" : index < 7 ? "Intermediate" : "Advanced"
  })));
  let filter = { search: "", category: "All", difficulty: "All", state: "All" };
  let selected = null;
  let simulationStep = 0;
  const defaultSimulationSteps = [
    { code: "value = 0", memory: "value: 0", flow: "Create the variable", position: 8 },
    { code: "value = value + 1", memory: "value: 1", flow: "Execute the update", position: 30 },
    { code: "if (value > 0)", memory: "condition: true", flow: "Choose the true branch", position: 54 },
    { code: "return value", memory: "result: 1", flow: "Finish and inspect the result", position: 78 }
  ];
  let activeSteps = defaultSimulationSteps;

  function render() {
    const area = document.getElementById("arcadeLibraryArea");
    if (!area) return;
    const games = filteredGames();
    const completed = getCompleted();
    area.innerHTML = `
      <div class="arcade-hero"><span class="eyebrow">Programming Learning Arcade</span><h2>100 playable technical games</h2><p>Every game teaches a real concept through tracing, building, debugging, sorting, or visual execution.</p><div class="arcade-metrics"><b>${catalog.length}<small>Games</small></b><b>${groups.length}<small>Categories</small></b><b>${completed.size}<small>Completed</small></b><b>${getXP()}<small>XP</small></b></div></div>
      <div class="arcade-controls"><input id="arcadeSearch" placeholder="Search games..." value="${escape(filter.search)}" /><select id="arcadeCategory"><option>All</option>${groups.map(group => `<option>${escape(group[0])}</option>`).join("")}</select><select id="arcadeDifficulty"><option>All</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select><select id="arcadeState"><option>All</option><option>Completed</option><option>Not Started</option></select></div>
      <div class="arcade-grid">${games.map(game => card(game, completed)).join("")}</div>
      ${selected ? playPanel(selected, completed.has(selected.id)) : ""}
    `;
    document.getElementById("arcadeSearch").oninput = event => { filter.search = event.target.value; render(); };
    document.getElementById("arcadeCategory").onchange = event => { filter.category = event.target.value; render(); };
    document.getElementById("arcadeDifficulty").onchange = event => { filter.difficulty = event.target.value; render(); };
    document.getElementById("arcadeState").onchange = event => { filter.state = event.target.value; render(); };
  }

  function card(game, completed) {
    return `<article class="arcade-card ${completed.has(game.id) ? "completed" : ""}"><span class="arcade-number">${String(game.number).padStart(2, "0")}</span><span class="pill">${escape(game.category)}</span><h3>${escape(game.title)}</h3><p>Learn ${escape(game.concept)} through a ${escape(game.mode.toLowerCase())} game.</p><div class="arcade-card-foot"><span>${escape(game.difficulty)} · ${escape(game.mode)}</span><button class="btn sm" onclick="window.HTMLMaster.modules.Arcade.play('${game.id}')">${completed.has(game.id) ? "Replay" : "Play"}</button></div></article>`;
  }

  function play(id) { selected = catalog.find(game => game.id === id); render(); document.getElementById("arcadePlayPanel")?.scrollIntoView({ behavior: "smooth", block: "center" }); }
  function playPanel(game, wasCompleted) {
    activeSteps = stepsFor(game);
    simulationStep = 0;
    return `<section class="arcade-play-panel" id="arcadePlayPanel"><div class="arcade-concept"><span class="eyebrow">Concept</span><h3>${escape(game.title)}</h3><p>This challenge teaches <strong>${escape(game.concept)}</strong>. Interact with the live example, then advance the execution state.</p><pre>${escape(exampleFor(game))}</pre><div class="arcade-actions"><button class="btn" onclick="window.HTMLMaster.modules.Arcade.advance()">▶ Run Next Step</button><button class="btn ghost" onclick="window.HTMLMaster.modules.Arcade.resetSimulation()">↺ Reset</button></div></div><div class="arcade-challenge"><span class="eyebrow">${escape(game.mode)} Challenge</span><h3>${escape(sceneTitle(game))}</h3><div class="arcade-live-scene" id="arcadeLiveScene">${sceneFor(game)}</div><div class="arcade-simulation"><div class="arcade-track"><i id="arcadeToken" style="left:8%"></i></div><strong id="arcadeStepLabel">Ready to execute</strong><pre id="arcadeCodeState">Press Run Next Step</pre><div class="arcade-memory-state" id="arcadeMemoryState">memory: waiting</div><p id="arcadeFlowState">The moving token will show execution flow.</p></div><div id="arcadeFeedback"></div></div></section>`;
  }
  function stepsFor(game) {
    const title = game.title.toLowerCase();
    if (title.includes("if-else") || title.includes("condition") || title.includes("decision")) return [
      { code: "switch = OFF", memory: "wire: disconnected", flow: "The switch is open", position: 8 },
      { code: "switch = ON", memory: "wire: connected", flow: "Current can travel through the wire", position: 34 },
      { code: "if (switch)", memory: "condition: true", flow: "Choose the ON branch", position: 62 },
      { code: "bulb = BRIGHT", memory: "bulb: light", flow: "The bulb receives power", position: 90 }
    ];
    if (title.includes("loop") || title.includes("race") || title.includes("sequence")) return [
      { code: "i = 0", memory: "character: start", flow: "Initialize the counter", position: 8 },
      { code: "i = i + 1", memory: "character: step 1", flow: "First iteration", position: 34 },
      { code: "i = i + 1", memory: "character: step 2", flow: "Second iteration", position: 62 },
      { code: "i < limit", memory: "character: finish", flow: "Condition is false; stop", position: 90 }
    ];
    if (title.includes("pointer") || title.includes("memory") || title.includes("reference")) return [
      { code: "value = 42", memory: "address A1 -> 42", flow: "Create a value in memory", position: 8 },
      { code: "ptr = &value", memory: "ptr -> address A1", flow: "Pointer stores the address", position: 38 },
      { code: "*ptr = 99", memory: "address A1 -> 99", flow: "Dereference and update memory", position: 68 },
      { code: "value", memory: "read: 99", flow: "Read the changed value", position: 92 }
    ];
    if (game.category.includes("SQL")) return [
      { code: "FROM users", memory: "rows: 12", flow: "Load source rows", position: 8 },
      { code: "WHERE active = 1", memory: "rows: 8", flow: "Filter inactive rows", position: 35 },
      { code: "GROUP BY skill", memory: "groups: 4", flow: "Build result groups", position: 64 },
      { code: "ORDER BY score", memory: "result: sorted", flow: "Return the final table", position: 92 }
    ];
    if (title.includes("array") || title.includes("vector") || title.includes("list") || title.includes("sort")) return [
      { code: "items = [10, 20, 30]", memory: "index 0 -> 10", flow: "Start at the first cell", position: 8 },
      { code: "index = index + 1", memory: "index 1 -> 20", flow: "Move to the next cell", position: 38 },
      { code: "compare(items[1], items[2])", memory: "20 vs 30", flow: "Compare neighboring values", position: 68 },
      { code: "return items", memory: "array: processed", flow: "Finish the traversal", position: 92 }
    ];
    return defaultSimulationSteps;
  }
  function sceneTitle(game) { return game.title.toLowerCase().includes("if-else") || game.title.toLowerCase().includes("condition") ? "Flip the switch and run the circuit" : "Watch the live concept simulation"; }
  function sceneFor(game) {
    const title = game.title.toLowerCase();
    if (title.includes("if-else") || title.includes("condition") || title.includes("decision")) return `<div class="switch-scene"><button id="arcadeSwitch" onclick="this.classList.toggle('on')"><span></span></button><div class="wire"></div><div class="bulb"><i></i></div><small>Switch → wire → bulb</small></div>`;
    if (title.includes("loop") || title.includes("race") || title.includes("sequence")) return `<div class="runner-scene"><span class="runner-character">▶</span><span class="runner-finish">FINISH</span></div>`;
    if (title.includes("pointer") || title.includes("memory") || title.includes("reference")) return `<div class="memory-scene"><span>pointer</span><b>↓</b><span class="memory-box">address A1<br><strong>42</strong></span></div>`;
    if (game.category.includes("SQL")) return `<div class="sql-scene"><span>ROWS</span><b>→</b><span>FILTER</span><b>→</b><span>GROUP</span><b>→</b><span>RESULT</span></div>`;
    return `<div class="array-scene"><span>[10]</span><span>[20]</span><span>[30]</span><i></i></div>`;
  }
  function advance() {
    if (simulationStep >= activeSteps.length) return;
    const step = activeSteps[simulationStep];
    const token = document.getElementById("arcadeToken");
    const label = document.getElementById("arcadeStepLabel");
    const code = document.getElementById("arcadeCodeState");
    const memory = document.getElementById("arcadeMemoryState");
    const flow = document.getElementById("arcadeFlowState");
    if (!token || !label || !code || !memory || !flow) return;
    token.style.left = `${step.position}%`;
    label.textContent = `Step ${simulationStep + 1} of ${activeSteps.length}`;
    code.textContent = step.code;
    memory.textContent = step.memory;
    flow.textContent = step.flow;
    simulationStep++;
    if (simulationStep >= activeSteps.length) {
      const feedback = document.getElementById("arcadeFeedback");
      if (feedback) feedback.innerHTML = `<div class="arcade-success"><strong>Execution complete.</strong><p>You observed state changes for ${escape(selected.concept)}.</p><button class="btn sm" onclick="window.HTMLMaster.modules.Arcade.complete()">Record Score &rarr;</button></div>`;
    }
  }
  function resetSimulation() { simulationStep = 0; render(); document.getElementById("arcadePlayPanel")?.scrollIntoView({ behavior: "smooth", block: "center" }); }
  function complete() { answer(null, true); }
  function answer(button, correct) {
    const feedback = document.getElementById("arcadeFeedback");
    if (!feedback || !selected) return;
    if (correct) {
      const user = window.HTMLMaster.modules.Storage.getCurrentUser();
      if (user) window.HTMLMaster.modules.Storage.recordGameScore(`arcade:${selected.id}`, 100, { label: selected.title, summary: `Learned ${selected.concept}` });
      feedback.innerHTML = `<div class="arcade-success"><strong>Concept understood.</strong><p>${escape(selected.concept)}: observe the state change, then try again at a higher difficulty.</p><button class="btn sm" onclick="window.HTMLMaster.modules.Arcade.next()">Next Recommended Game &rarr;</button></div>`;
    } else feedback.innerHTML = `<div class="arcade-hint">Start with the concept explanation, then trace one state change at a time.</div>`;
  }
  function next() { const index = catalog.findIndex(game => game.id === selected.id); selected = catalog[index + 1] || catalog[0]; render(); }
  function filteredGames() { return catalog.filter(game => (!filter.search || game.title.toLowerCase().includes(filter.search.toLowerCase()) || game.category.toLowerCase().includes(filter.search.toLowerCase())) && (filter.category === "All" || game.category === filter.category) && (filter.difficulty === "All" || game.difficulty === filter.difficulty) && (filter.state === "All" || (filter.state === "Completed" ? getCompleted().has(game.id) : !getCompleted().has(game.id)))); }
  function getCompleted() { const scores = window.HTMLMaster.modules.Storage.getGameScores(); return new Set((scores.history || []).filter(item => String(item.game).startsWith("arcade:")).map(item => item.game.slice(7))); }
  function getXP() { return window.HTMLMaster.modules.Storage.getGameScores().totalPoints || 0; }
  function exampleFor(game) { if (game.category.includes("SQL")) return "SELECT rows FROM table WHERE condition;"; if (game.category.includes("HTML")) return "for (const node of document.querySelectorAll('button')) {\n  node.addEventListener('click', run);\n}"; return "int value = 0;\nvalue = value + 1;\nreturn value;"; }
  function escape(value) { return window.HTMLMaster.modules.Storage.escapeHTML(value); }
  return { render, play, answer, advance, resetSimulation, complete, next, catalog };
})();
