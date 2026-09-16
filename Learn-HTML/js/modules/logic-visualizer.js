window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.LogicVisualizer = (function() {
  let timer = null;
  const steps = [
    { label: "Declare", code: "int total = 0;", memory: "total = 0", flow: "Variable created" },
    { label: "Loop", code: "for (int i = 1; i <= 3; ++i)", memory: "i = 1", flow: "Condition checked" },
    { label: "Update", code: "total += i;", memory: "total = 1", flow: "Function body runs" },
    { label: "Update", code: "total += i;", memory: "total = 3", flow: "Loop advances: i = 2" },
    { label: "Branch", code: "if (total > 3)", memory: "total = 6", flow: "Condition becomes true" },
    { label: "Return", code: "return total;", memory: "result = 6", flow: "Execution complete" }
  ];

  function mount(container) {
    if (!container) return;
    container.innerHTML = `
      <section class="logic-visualizer" aria-label="Animated code execution visualizer">
        <div class="logic-visualizer-head"><div><span class="eyebrow">Execution Visualizer</span><h3>Watch the logic move</h3></div><button class="btn ghost sm" id="logicReplay">Replay</button></div>
        <div class="logic-track"><div class="logic-progress" id="logicProgress"></div></div>
        <div class="logic-stage">
          <div><span class="logic-label">Step</span><strong id="logicStep">1 / ${steps.length}</strong></div>
          <pre id="logicCode"></pre>
          <div class="logic-memory"><span class="logic-label">Memory</span><strong id="logicMemory"></strong></div>
          <p id="logicFlow"></p>
        </div>
      </section>
    `;
    document.getElementById("logicReplay").onclick = () => play(container);
    play(container);
  }

  function play(container) {
    clearInterval(timer);
    let index = 0;
    const render = () => {
      const step = steps[index];
      const progress = document.getElementById("logicProgress");
      const stepEl = document.getElementById("logicStep");
      const codeEl = document.getElementById("logicCode");
      const memoryEl = document.getElementById("logicMemory");
      const flowEl = document.getElementById("logicFlow");
      if (!stepEl || !codeEl || !memoryEl || !flowEl) return;
      stepEl.textContent = `${index + 1} / ${steps.length}`;
      codeEl.textContent = step.code;
      memoryEl.textContent = step.memory;
      flowEl.textContent = `${step.label}: ${step.flow}`;
      if (progress) progress.style.width = `${((index + 1) / steps.length) * 100}%`;
      index = (index + 1) % steps.length;
    };
    render();
    timer = setInterval(render, 1800);
  }

  function clearIntervalSafe() { if (timer) clearInterval(timer); }
  return { mount, stop: clearIntervalSafe };
})();
