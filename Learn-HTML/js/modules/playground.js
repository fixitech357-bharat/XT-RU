/**
 * HTML Master — Live Code Playground Module
 * Developed for XTutiRaiseUp by XSympan Technologies
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Playground = (function() {
  let currentCategory = "all";
  let currentSearch = "";

  function getPresets() {
    if (window.HTMLMaster.data && window.HTMLMaster.data.PlaygroundPresets) {
      return window.HTMLMaster.data.PlaygroundPresets.PRESETS;
    }
    return {};
  }

  function openPlayground(initialCode) {
    window.HTMLMaster.showView("view-playground");
    populatePresetsDropdown();
    if (initialCode) {
      document.getElementById("editorHTML").value = initialCode.html || "";
      if (initialCode.css !== undefined) document.getElementById("editorCSS").value = initialCode.css;
      if (initialCode.js !== undefined) document.getElementById("editorJS").value = initialCode.js;
    }
    runCode();
  }

  function switchTab(which, btn) {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    document.getElementById("editorHTML").style.display = which === "html" ? "block" : "none";
    document.getElementById("editorCSS").style.display  = which === "css"  ? "block" : "none";
    document.getElementById("editorJS").style.display   = which === "js"   ? "block" : "none";
  }

  function populatePresetsDropdown(selectedKey = null) {
    const select = document.getElementById("presetSelector");
    if (!select) return;

    const allPresets = getPresets();
    select.innerHTML = "";

    const categories = {
      "games": { label: "🎮 Canvas & Games (20)", items: [] },
      "modern_ui": { label: "✨ Modern UI & Glass (20)", items: [] },
      "forms": { label: "📝 Forms & Validation (20)", items: [] },
      "data": { label: "📊 Data & Charts (18)", items: [] },
      "animations": { label: "🎨 CSS & SVG FX (15)", items: [] },
      "micro_apps": { label: "🌐 Micro-Apps & Tools (12)", items: [] }
    };

    const q = currentSearch.toLowerCase().trim();

    for (const key in allPresets) {
      const p = allPresets[key];
      if (currentCategory !== "all" && p.category !== currentCategory) continue;
      if (q && !p.title.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q) && !p.badge.toLowerCase().includes(q)) {
        continue;
      }
      const catKey = p.category || "modern_ui";
      if (categories[catKey]) {
        categories[catKey].items.push({ key: key, preset: p });
      }
    }

    let hasMatches = false;
    for (const catKey in categories) {
      const catObj = categories[catKey];
      if (catObj.items.length > 0) {
        hasMatches = true;
        const group = document.createElement("optgroup");
        group.label = catObj.label;
        catObj.items.forEach(item => {
          const opt = document.createElement("option");
          opt.value = item.key;
          opt.textContent = `${item.preset.title} [${item.preset.badge}]`;
          if (selectedKey && item.key === selectedKey) opt.selected = true;
          group.appendChild(opt);
        });
        select.appendChild(group);
      }
    }

    if (!hasMatches) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No matching projects found";
      select.appendChild(opt);
    }
  }

  function setCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll(".pg-cat-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    populatePresetsDropdown();
  }

  function searchPresets(query) {
    currentSearch = query;
    populatePresetsDropdown();
  }

  function loadPreset(presetKey) {
    if (!presetKey) return;
    const presets = getPresets();
    const preset = presets[presetKey];
    if (!preset) return;

    document.getElementById("editorHTML").value = preset.html;
    document.getElementById("editorCSS").value = preset.css;
    document.getElementById("editorJS").value = preset.js;

    // Update active project info pill
    const infoBadge = document.getElementById("currentPresetBadge");
    if (infoBadge) {
      infoBadge.innerHTML = `<span class="tag-pill">${preset.badge}</span> <strong>${preset.title}</strong> &mdash; <span style="color:#94a3b8;font-size:12px;">${preset.desc}</span>`;
    }

    clearConsole();
    runCode();
    if (window.HTMLMaster && window.HTMLMaster.modules && window.HTMLMaster.modules.Toast) {
      window.HTMLMaster.modules.Toast.show(`Loaded Live Play: <b>${preset.title}</b>`, "success");
    }
  }

  function logToConsole(message, type) {
    const output = document.getElementById("consoleOutput");
    if (!output) return;
    const line = document.createElement("div");
    line.className = `console-line ${type || 'log'}`;
    line.textContent = `> ${message}`;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function clearConsole() {
    const output = document.getElementById("consoleOutput");
    if (output) output.innerHTML = "";
  }

  function runCode() {
    const html = document.getElementById("editorHTML").value;
    const css  = document.getElementById("editorCSS").value;
    const js   = document.getElementById("editorJS").value;

    clearConsole();
    logToConsole("Compiling sandbox build with XTuti RaiseUp engine...", "log");

    // Branded loader pulse in sandbox
    const sandboxLoader = document.getElementById("sandboxBuildLoader");
    if (sandboxLoader) {
      sandboxLoader.classList.add("active");
      setTimeout(() => sandboxLoader.classList.remove("active"), 400);
    }

    const fullDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    const origLog = console.log;
    console.log = function(...args) {
      origLog.apply(console, args);
      window.parent.postMessage({ type: "HM_CONSOLE_LOG", text: args.join(" ") }, "*");
    };
    window.onerror = function(msg, url, line) {
      window.parent.postMessage({ type: "HM_CONSOLE_ERROR", text: msg + " (line " + line + ")" }, "*");
    };
    try {
      ${js}
    } catch(err) {
      window.parent.postMessage({ type: "HM_CONSOLE_ERROR", text: err.message }, "*");
    }
  <\/script>
</body>
</html>`;

    const iframe = document.getElementById("preview");
    if (iframe) {
      try {
        iframe.srcdoc = fullDoc;
        logToConsole("Build ready. Sandbox updated.", "log");
      } catch (e) {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          if (doc) {
            doc.open();
            doc.write(fullDoc);
            doc.close();
            logToConsole("Build ready. Sandbox updated.", "log");
          }
        } catch (err) {
          logToConsole("Sandbox error: " + err.message, "error");
        }
      }
    }

    if (window.HTMLMaster && window.HTMLMaster.modules && window.HTMLMaster.modules.Sound) {
      window.HTMLMaster.modules.Sound.click();
    }
    if (window.HTMLMaster && window.HTMLMaster.modules && window.HTMLMaster.modules.Storage) {
      window.HTMLMaster.modules.Storage.incrementPlaygroundRuns();
    }
  }

  function clearCode() {
    if (!confirm("Clear all HTML, CSS, and JS code in playground?")) return;
    document.getElementById("editorHTML").value = "";
    document.getElementById("editorCSS").value = "";
    document.getElementById("editorJS").value = "";
    clearConsole();
    runCode();
    window.HTMLMaster.modules.Toast.show("Playground cleared.", "info");
  }

  function downloadProject() {
    const html = document.getElementById("editorHTML").value;
    const css  = document.getElementById("editorCSS").value;
    const js   = document.getElementById("editorJS").value;

    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Project — XTuti RaiseUp by XSympan Technologies</title>
  <!-- Powered by XTuti RaiseUp -->
  <style>
${css}
  </style>
</head>
<body>
${html}
  <script>
${js}
  <\/script>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: "text/html;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "xtuti-raiseup-live-play.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.HTMLMaster.modules.Toast.show("Live Play project downloaded! 🚀", "success");
  }

  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "HM_CONSOLE_LOG") {
      logToConsole(event.data.text, "log");
    } else if (event.data && event.data.type === "HM_CONSOLE_ERROR") {
      logToConsole(event.data.text, "error");
    }
  });

  return {
    openPlayground: openPlayground,
    switchTab: switchTab,
    populatePresetsDropdown: populatePresetsDropdown,
    setCategory: setCategory,
    searchPresets: searchPresets,
    loadPreset: loadPreset,
    runCode: runCode,
    clearCode: clearCode,
    clearConsole: clearConsole,
    downloadProject: downloadProject
  };
})();
