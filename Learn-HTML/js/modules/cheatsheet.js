/**
 * HTML Master — Interactive HTML5 Tag Cheatsheet Module
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Cheatsheet = (function() {
  let activeFilter = "all";
  let searchQuery = "";

  function openCheatsheet() {
    window.HTMLMaster.showView("view-cheatsheet");
    renderTags();
    window.HTMLMaster.modules.Storage.unlockAchievement("tag_explorer");
  }

  function setFilter(cat, chipElem) {
    activeFilter = cat;
    document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
    if (chipElem) chipElem.classList.add("active");
    renderTags();
  }

  function setSearch(query) {
    searchQuery = (query || "").trim().toLowerCase();
    renderTags();
  }

  function renderTags() {
    const grid = document.getElementById("cheatsheetGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const tags = window.HTMLMaster.data.CHEATSHEET || [];
    const filtered = tags.filter(item => {
      const matchCat = (activeFilter === "all" || item.category === activeFilter);
      const matchSearch = !searchQuery || 
        item.tag.toLowerCase().includes(searchQuery) ||
        item.desc.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty" style="grid-column: 1 / -1;">
          <span class="ico">🔍</span>
          No tags found matching "<b>${window.HTMLMaster.modules.Storage.escapeHTML(searchQuery)}</b>".
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "tag-card";
      card.innerHTML = `
        <div>
          <div class="tag-card-head">
            <span class="tag-name">${window.HTMLMaster.modules.Storage.escapeHTML(item.tag)}</span>
            <span class="tag-badge">${item.category}</span>
          </div>
          <p class="tag-desc">${window.HTMLMaster.modules.Storage.escapeHTML(item.desc)}</p>
          <div class="tag-example-box">${window.HTMLMaster.modules.Storage.escapeHTML(item.example)}</div>
        </div>
        <div class="tag-actions">
          <button class="btn ghost sm" onclick="window.HTMLMaster.modules.Cheatsheet.tryTag('${encodeURIComponent(item.example)}')">
            🧪 Try in Playground
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function tryTag(encodedCode) {
    const code = decodeURIComponent(encodedCode);
    let jsCode = `console.log("Tag preview active.");`;
    let cssCode = `body {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  padding: 24px;\n  background: #0f172a;\n  color: #f8fafc;\n}`;

    if (code.includes("<canvas")) {
      cssCode += `\ncanvas {\n  border: 2px dashed #38bdf8;\n  border-radius: 8px;\n  background: #060a12;\n  display: block;\n  margin-top: 14px;\n  box-shadow: 0 0 20px rgba(56, 189, 248, 0.2);\n}`;
      jsCode = `const canvas = document.querySelector("canvas");\nif (canvas) {\n  const ctx = canvas.getContext("2d");\n  // Draw colored background box\n  ctx.fillStyle = "#38bdf8";\n  ctx.fillRect(20, 20, 140, 70);\n  \n  // Draw circle\n  ctx.beginPath();\n  ctx.arc(220, 55, 30, 0, Math.PI * 2);\n  ctx.fillStyle = "#10b981";\n  ctx.fill();\n  \n  // Draw text label\n  ctx.fillStyle = "#ffffff";\n  ctx.font = "bold 14px sans-serif";\n  ctx.fillText("HTML5 Canvas!", 28, 62);\n  console.log("Canvas 2D graphics rendered successfully!");\n}`;
    } else if (code.includes("<dialog")) {
      cssCode += `\ndialog {\n  background: #1e293b;\n  color: #fff;\n  border: 2px solid #38bdf8;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.5);\n}`;
      jsCode = `const d = document.querySelector("dialog");\nif (d && typeof d.showModal === "function") {\n  d.showModal();\n  console.log("Native <dialog> displayed with showModal().");\n}`;
    } else if (code.includes("<table")) {
      cssCode += `\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 10px;\n}\nth, td {\n  border: 1px solid #334155;\n  padding: 10px 14px;\n  text-align: left;\n}\nth {\n  background: #1e293b;\n  color: #38bdf8;\n}`;
    } else if (code.includes("<details")) {
      cssCode += `\ndetails {\n  background: #1e293b;\n  border: 1px solid #334155;\n  border-radius: 8px;\n  padding: 14px 18px;\n  cursor: pointer;\n}\nsummary {\n  font-weight: 700;\n  color: #38bdf8;\n  margin-bottom: 8px;\n}`;
    }

    const template = {
      html: `<!-- Testing HTML tag snippet -->\n${code}`,
      css: cssCode,
      js: jsCode
    };
    window.HTMLMaster.modules.Playground.openPlayground(template);
    window.HTMLMaster.modules.Toast.show("Tag snippet loaded into Playground! 🚀", "info");
  }

  return {
    openCheatsheet: openCheatsheet,
    setFilter: setFilter,
    setSearch: setSearch,
    renderTags: renderTags,
    tryTag: tryTag
  };
})();
