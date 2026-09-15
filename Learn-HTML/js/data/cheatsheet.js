/**
 * HTML Master — Interactive HTML5 Tag Cheatsheet (60+ elements)
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.data = window.HTMLMaster.data || {};

window.HTMLMaster.data.CHEATSHEET = [
  // Structure & Metadata
  { tag: "<!DOCTYPE html>", category: "structure", desc: "Declares document standard to HTML5.", example: "<!DOCTYPE html>", void: true },
  { tag: "<html>", category: "structure", desc: "The root element of an HTML page. Specify language with lang='en'.", example: "<html lang=\"en\">\n  ...\n</html>", void: false },
  { tag: "<head>", category: "structure", desc: "Container for machine-readable information (metadata) about the document.", example: "<head>\n  <meta charset=\"UTF-8\">\n  <title>Title</title>\n</head>", void: false },
  { tag: "<title>", category: "structure", desc: "Defines the title shown in the browser tab and search results.", example: "<title>My Awesome Website</title>", void: false },
  { tag: "<meta>", category: "structure", desc: "Metadata like viewport, charset, description, and social OpenGraph tags.", example: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", void: true },
  { tag: "<link>", category: "structure", desc: "Links external resources such as stylesheets, icons, or preconnect origins.", example: "<link rel=\"stylesheet\" href=\"style.css\">", void: true },
  { tag: "<script>", category: "structure", desc: "Embeds client-side JavaScript executable code or modules.", example: "<script src=\"app.js\" defer></script>", void: false },
  { tag: "<style>", category: "structure", desc: "Embeds internal CSS styling directly within the document.", example: "<style>\n  body { background: #000; color: #fff; }\n</style>", void: false },

  // Semantic Architecture
  { tag: "<header>", category: "semantic", desc: "Introductory container typically holding a logo, brand title, and navigation.", example: "<header>\n  <h1>Website Title</h1>\n  <nav>...</nav>\n</header>", void: false },
  { tag: "<nav>", category: "semantic", desc: "Section of a page intended for primary navigation links.", example: "<nav>\n  <a href=\"#home\">Home</a>\n  <a href=\"#about\">About</a>\n</nav>", void: false },
  { tag: "<main>", category: "semantic", desc: "Represents the dominant, central content unique to this document.", example: "<main>\n  <h1>Welcome to our store</h1>\n</main>", void: false },
  { tag: "<article>", category: "semantic", desc: "Self-contained composition that is independently reusable or distributable.", example: "<article>\n  <h2>Latest Tech Trends</h2>\n  <p>HTML5 is standard...</p>\n</article>", void: false },
  { tag: "<section>", category: "semantic", desc: "Generic standalone thematic section of content with a heading.", example: "<section>\n  <h2>Features</h2>\n  <p>Fast, responsive...</p>\n</section>", void: false },
  { tag: "<aside>", category: "semantic", desc: "Portion of content indirectly related to the main content (e.g. sidebar, callout).", example: "<aside>\n  <h3>Related Articles</h3>\n  <ul>...</ul>\n</aside>", void: false },
  { tag: "<footer>", category: "semantic", desc: "Footer for its nearest ancestor section or the overall page.", example: "<footer>\n  <p>&copy; 2026 HTML Master. All rights reserved.</p>\n</footer>", void: false },
  { tag: "<figure>", category: "semantic", desc: "Self-contained content such as illustrations, diagrams, code snippets, or photos.", example: "<figure>\n  <img src=\"chart.png\" alt=\"Sales chart\">\n  <figcaption>Figure 1: 2026 Performance.</figcaption>\n</figure>", void: false },
  { tag: "<figcaption>", category: "semantic", desc: "Caption or legend describing the contents of its parent <figure>.", example: "<figcaption>Sunset over the Pacific Ocean.</figcaption>", void: false },
  { tag: "<time>", category: "semantic", desc: "Represents a specific period in time or datetime readable by machines.", example: "<time datetime=\"2026-09-15\">September 15, 2026</time>", void: false },

  // Text & Formatting
  { tag: "<h1> - <h6>", category: "text", desc: "Six hierarchical heading levels, from <h1> (highest) to <h6> (lowest).", example: "<h1>Main Title</h1>\n<h2>Section Header</h2>", void: false },
  { tag: "<p>", category: "text", desc: "Defines a paragraph of running text.", example: "<p>This is a standard text paragraph.</p>", void: false },
  { tag: "<a>", category: "text", desc: "Anchor hyperlink pointing to other pages, files, email, or telephone numbers.", example: "<a href=\"https://google.com\" target=\"_blank\" rel=\"noopener noreferrer\">Google</a>", void: false },
  { tag: "<strong>", category: "text", desc: "Indicates strong importance, seriousness, or urgency for its contents.", example: "<strong>Warning:</strong> Action cannot be undone.", void: false },
  { tag: "<em>", category: "text", desc: "Marks text that has stress emphasis, changing sentence meaning.", example: "<p>I <em>love</em> web development.</p>", void: false },
  { tag: "<b>", category: "text", desc: "Draws attention to text without adding semantic importance.", example: "<b>Keyword:</b> Frontend architecture.", void: false },
  { tag: "<i>", category: "text", desc: "Represents a range of text in an alternate voice or technical designation.", example: "The species is <i>Homo sapiens</i>.", void: false },
  { tag: "<mark>", category: "text", desc: "Represents text marked or highlighted for reference purposes.", example: "<p>Search result for <mark>HTML5</mark>.</p>", void: false },
  { tag: "<code>", category: "text", desc: "Displays short fragments of computer code in monospace font.", example: "Use <code>npm install</code> to begin.", void: false },
  { tag: "<pre>", category: "text", desc: "Preformatted text where whitespace and line breaks are preserved exactly.", example: "<pre>Line 1\n  Indented Line 2</pre>", void: false },
  { tag: "<blockquote>", category: "text", desc: "Indicates that the enclosed text is an extended quotation from another source.", example: "<blockquote cite=\"https://w3.org\">\n  Web for all, Web on everything.\n</blockquote>", void: false },
  { tag: "<hr>", category: "text", desc: "A thematic break between paragraph-level elements (horizontal divider line).", example: "<p>Part 1</p>\n<hr>\n<p>Part 2</p>", void: true },
  { tag: "<br>", category: "text", desc: "Produces a single line break in text (carriage-return).", example: "First Line<br>Second Line", void: true },
  { tag: "<span>", category: "text", desc: "Generic inline container with no intrinsic semantic meaning.", example: "<p>Status: <span style=\"color: #10b981;\">Online</span></p>", void: false },
  { tag: "<div>", category: "text", desc: "Generic block container for styling, layout, or grouping content.", example: "<div class=\"card\">\n  <h3>Card Title</h3>\n</div>", void: false },

  // Forms & Inputs
  { tag: "<form>", category: "forms", desc: "Interactive form container collecting and submitting user input data.", example: "<form action=\"/api/login\" method=\"POST\">\n  ...\n</form>", void: false },
  { tag: "<input>", category: "forms", desc: "Versatile input control based on the 'type' attribute (text, email, password, etc.).", example: "<input type=\"email\" placeholder=\"name@domain.com\" required>", void: true },
  { tag: "<label>", category: "forms", desc: "Caption for an input element that activates focus when clicked.", example: "<label for=\"emailInput\">Your Email:</label>\n<input id=\"emailInput\" type=\"email\">", void: false },
  { tag: "<textarea>", category: "forms", desc: "Multi-line plain-text editing control.", example: "<textarea rows=\"4\" cols=\"50\" placeholder=\"Enter feedback...\"></textarea>", void: false },
  { tag: "<button>", category: "forms", desc: "Interactive button triggering form submissions or JavaScript event handlers.", example: "<button type=\"submit\">Submit Form</button>", void: false },
  { tag: "<select>", category: "forms", desc: "Drop-down selection menu displaying a list of options.", example: "<select name=\"country\">\n  <option value=\"us\">United States</option>\n  <option value=\"in\">India</option>\n</select>", void: false },
  { tag: "<option>", category: "forms", desc: "Defines an individual selectable choice inside a <select> or <datalist>.", example: "<option value=\"gold\">Gold Member</option>", void: false },
  { tag: "<fieldset>", category: "forms", desc: "Groups several controls and labels within a web form.", example: "<fieldset>\n  <legend>Personal Info</legend>\n  ...\n</fieldset>", void: false },
  { tag: "<legend>", category: "forms", desc: "Represents a caption for the content of its parent <fieldset>.", example: "<legend>Billing Details</legend>", void: false },
  { tag: "<datalist>", category: "forms", desc: "Contains a set of <option> elements providing autocomplete recommendations.", example: "<input list=\"browsers\">\n<datalist id=\"browsers\">\n  <option value=\"Chrome\">\n  <option value=\"Firefox\">\n</datalist>", void: false },

  // Media & Graphics
  { tag: "<img>", category: "media", desc: "Embeds an image into the document.", example: "<img src=\"logo.svg\" alt=\"Company Logo\" width=\"120\" height=\"40\">", void: true },
  { tag: "<video>", category: "media", desc: "Embeds native media player for video playback.", example: "<video controls width=\"400\">\n  <source src=\"clip.mp4\" type=\"video/mp4\">\n</video>", void: false },
  { tag: "<audio>", category: "media", desc: "Embeds native media player for audio clips or music.", example: "<audio controls src=\"sound.mp3\"></audio>", void: false },
  { tag: "<source>", category: "media", desc: "Specifies multiple alternative media resources for <picture>, <audio>, or <video>.", example: "<source src=\"video.webm\" type=\"video/webm\">", void: true },
  { tag: "<iframe>", category: "media", desc: "Inline frame embedding another HTML page or external widget.", example: "<iframe src=\"https://example.com\" width=\"500\" height=\"300\" title=\"Demo Frame\"></iframe>", void: false },
  { tag: "<canvas>", category: "media", desc: "Bitmap surface rendered procedurally with 2D or WebGL JavaScript scripts.", example: "<canvas id=\"game\" width=\"300\" height=\"200\"></canvas>", void: false },
  { tag: "<svg>", category: "media", desc: "Scalable Vector Graphics container rendering resolution-independent vector shapes.", example: "<svg width=\"100\" height=\"100\">\n  <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"#38bdf8\" />\n</svg>", void: false },
  { tag: "<picture>", category: "media", desc: "Responsive image wrapper serving different images based on screen media queries.", example: "<picture>\n  <source media=\"(min-width: 800px)\" srcset=\"large.jpg\">\n  <img src=\"small.jpg\" alt=\"Responsive view\">\n</picture>", void: false },

  // Tables
  { tag: "<table>", category: "tables", desc: "Represents multi-dimensional tabular data arranged in rows and columns.", example: "<table>\n  <tr><th>Name</th><th>Score</th></tr>\n  <tr><td>Alex</td><td>95</td></tr>\n</table>", void: false },
  { tag: "<caption>", category: "tables", desc: "Specifies the caption (or title) of an HTML table.", example: "<caption>Monthly Sales Leaderboard</caption>", void: false },
  { tag: "<thead>", category: "tables", desc: "Groups the header rows of a table.", example: "<thead>\n  <tr><th>Header 1</th></tr>\n</thead>", void: false },
  { tag: "<tbody>", category: "tables", desc: "Encapsulates the body rows containing the primary data of a table.", example: "<tbody>\n  <tr><td>Cell 1</td></tr>\n</tbody>", void: false },
  { tag: "<tfoot>", category: "tables", desc: "Groups the footer rows (such as totals or averages) in a table.", example: "<tfoot>\n  <tr><td>Total: $500</td></tr>\n</tfoot>", void: false },
  { tag: "<tr>", category: "tables", desc: "Defines a row of cells in a table.", example: "<tr><td>Row Cell</td></tr>", void: false },
  { tag: "<th>", category: "tables", desc: "Designates a table cell that acts as a header for a column or row.", example: "<th scope=\"col\">Username</th>", void: false },
  { tag: "<td>", category: "tables", desc: "Defines a standard data cell in a table.", example: "<td>$1,200.00</td>", void: false },

  // Modern Interactive & Advanced
  { tag: "<details>", category: "interactive", desc: "Creates an interactive disclosure widget that toggles content open or closed.", example: "<details>\n  <summary>Click to Expand</summary>\n  <p>Hidden details revealed!</p>\n</details>", void: false },
  { tag: "<summary>", category: "interactive", desc: "Specifies the visible heading or label for a <details> disclosure box.", example: "<summary>Frequently Asked Questions</summary>", void: false },
  { tag: "<dialog>", category: "interactive", desc: "Represents a native popup modal dialog or subwindow with showModal() API.", example: "<dialog id=\"myModal\">\n  <p>Modal content</p>\n  <button onclick=\"this.closest('dialog').close()\">Close</button>\n</dialog>", void: false },
  { tag: "<progress>", category: "interactive", desc: "Displays an indicator showing the completion progress of a task.", example: "<progress value=\"75\" max=\"100\"></progress>", void: false },
  { tag: "<meter>", category: "interactive", desc: "Represents either a scalar value within a known range or a fractional value.", example: "<meter value=\"0.6\" min=\"0\" max=\"1\">60%</meter>", void: false },
  { tag: "<template>", category: "interactive", desc: "Holds client-side HTML that is not rendered immediately, for JavaScript cloning.", example: "<template id=\"cardTemplate\">\n  <div class=\"user-card\">...</div>\n</template>", void: false }
];
