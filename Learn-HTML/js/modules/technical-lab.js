window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.TechnicalLab = (function() {
  const templates = {
    cpp: '#include <iostream>\nint main() {\n  std::cout << "Hello XTuti";\n  return 0;\n}',
    java: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello XTuti");\n  }\n}',
    csharp: 'using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello XTuti");\n  }\n}',
    python: 'name = "XTuti"\nprint(f"Hello {name}")',
    sql: 'SELECT language, COUNT(*) AS lessons\nFROM courses\nGROUP BY language;'
  };

  function open() {
    window.HTMLMaster.showView("view-technical-lab");
    render();
  }

  function render() {
    const area = document.getElementById("technicalLabArea");
    if (!area) return;
    area.innerHTML = `
      <div class="lab-header"><span class="eyebrow">Technical Practice Studio</span><h2>Write, run, and inspect code</h2><p>Use the configured open-source runtime service to test C++, Java, C#, Python, and SQL exercises.</p></div>
      <div class="lab-controls"><label>Language <select id="labLanguage"><option value="cpp">C++</option><option value="java">Java</option><option value="csharp">C#</option><option value="python">Python</option><option value="sql">SQL</option></select></label><button class="btn" id="labRun">▶ Run Code</button></div>
      <div class="lab-workspace"><div><label class="lab-label" for="labSource">Source</label><textarea id="labSource" spellcheck="false"></textarea></div><div><label class="lab-label" for="labInput">Input</label><textarea id="labInput" spellcheck="false" placeholder="Optional standard input"></textarea></div></div>
      <div class="lab-output"><div class="lab-output-head"><span>Output</span><span id="labStatus">Ready</span></div><pre id="labOutput">Run your code to see output and errors.</pre></div>
    `;
    const language = document.getElementById("labLanguage");
    const source = document.getElementById("labSource");
    language.onchange = () => { source.value = templates[language.value]; };
    source.value = templates.cpp;
    document.getElementById("labRun").onclick = run;
  }

  async function run() {
    const language = document.getElementById("labLanguage").value;
    const source = document.getElementById("labSource").value;
    const stdin = document.getElementById("labInput").value;
    const output = document.getElementById("labOutput");
    const status = document.getElementById("labStatus");
    status.textContent = "Running...";
    output.textContent = "Compiling and executing...";
    try {
      const response = await fetch("/api/compiler/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, source, stdin })
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Compiler service unavailable.");
      status.textContent = body.status || "Complete";
      output.textContent = [body.stdout, body.stderr].filter(Boolean).join("\n") || "Process completed with no output.";
    } catch (error) {
      status.textContent = "Unavailable";
      output.textContent = error.message;
    }
  }

  return { open, render, run };
})();
