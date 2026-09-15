/**
 * HTML Master — Comprehensive 50-Topic Full Spectrum HTML Curriculum
 * From Absolute Scratch to High-End Production Mastery
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.data = window.HTMLMaster.data || {};

window.HTMLMaster.data.TOPICS = {
  foundations: {
    name: "Foundations & Text",
    icon: "🌱",
    desc: "Start from absolute zero. Learn how the web works, HTML anatomy, headings, typography, lists, and quotes.",
    topics: [
      {
        id: "t1",
        title: "1. How the Web Works & What is HTML?",
        content: `
          <h2>How the Web Works &amp; What is HTML?</h2>
          <p>Every time you open a website, your browser (like Chrome or Edge) sends a request across the internet to a web server. The server responds with three core technologies:</p>
          <ul>
            <li><b>HTML (HyperText Markup Language):</b> The skeleton and content. It defines <i>what</i> appears on the screen.</li>
            <li><b>CSS (Cascading Style Sheets):</b> The presentation. It defines <i>how</i> things look (colors, spacing, layout).</li>
            <li><b>JavaScript:</b> The behavior. It defines <i>what happens</i> when you interact (logic, dynamic data, animations).</li>
          </ul>
          <div class="note"><b>Crucial Distinction:</b> HTML is <b>declarative markup</b>, not a programming language. You don't write loops or variable calculations in HTML; instead, you wrap content with descriptive <b>tags</b> to give it meaning.</div>
          <h3>Basic Anatomy of an HTML Element</h3>
          <pre>&lt;p class="greeting"&gt;Hello World!&lt;/p&gt;
│  │               │           │
│  │               │           └─ Closing Tag (&lt;/p&gt;)
│  │               └───────────── Element Content ("Hello World!")
│  └───────────────────────────── Attribute (class="greeting")
└──────────────────────────────── Opening Tag (&lt;p&gt;)</pre>
        `,
        quiz: [
          { q: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Machine Language", "Home Tool Markup Language", "Hyperlink Text Making Language"], answer: 0 },
          { q: "What is HTML's primary purpose on the web?", options: ["Store user passwords in SQL", "Provide structure and semantic meaning to content", "Compile binary machine instructions", "Direct network packets"], answer: 1 },
          { q: "Which part of '<h1 id=\"title\">Welcome</h1>' is the closing tag?", options: ["<h1 id=\"title\">", "Welcome", "</h1>", "id=\"title\""], answer: 2 }
        ]
      },
      {
        id: "t2",
        title: "2. Document Anatomy & Boilerplate",
        content: `
          <h2>The Standard HTML5 Boilerplate</h2>
          <p>Every valid modern HTML page starts with the exact same fundamental skeleton:</p>
          <pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;My First Web Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Hello World&lt;/h1&gt;
  &lt;p&gt;Visible web content goes here inside the body.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
          <h3>Detailed Element Breakdown:</h3>
          <ul>
            <li><code>&lt;!DOCTYPE html&gt;</code>: Tells the browser engine to render the document in modern standard mode rather than legacy quirks mode.</li>
            <li><code>&lt;html lang="en"&gt;</code>: The root element wrapping everything. The <code>lang</code> attribute helps screen readers pronounce words correctly and tells search engines the primary language.</li>
            <li><code>&lt;head&gt;</code>: Houses metadata, external CSS links, character encoding, and browser tab titles. Nothing in <code>&lt;head&gt;</code> is directly visible on the page canvas.</li>
            <li><code>&lt;body&gt;</code>: Houses all visible content: text, links, buttons, images, and videos.</li>
          </ul>
        `,
        quiz: [
          { q: "What does <!DOCTYPE html> tell the browser?", options: ["To link a database", "To parse using modern HTML5 standard mode", "To run JavaScript scripts", "To apply dark mode"], answer: 1 },
          { q: "Where does content that is visibly displayed to website visitors go?", options: ["<head>", "<title>", "<body>", "<meta>"], answer: 2 },
          { q: "Why is the lang attribute in <html lang='en'> important?", options: ["It speeds up internet connection", "It assists search engines and screen readers with pronunciation", "It translates the site into all languages automatically", "It is required for CSS to work"], answer: 1 }
        ]
      },
      {
        id: "t3",
        title: "3. Headings Hierarchy (h1 to h6)",
        content: `
          <h2>Headings &amp; Information Hierarchy</h2>
          <p>HTML provides 6 levels of headings, ranging from <code>&lt;h1&gt;</code> (most important) to <code>&lt;h6&gt;</code> (least important).</p>
          <pre>&lt;h1&gt;Primary Page Title (Book Title)&lt;/h1&gt;
&lt;h2&gt;Major Section (Chapter 1)&lt;/h2&gt;
&lt;h3&gt;Sub-section (Section 1.1)&lt;/h3&gt;
&lt;h4&gt;Minor Topic&lt;/h4&gt;
&lt;h5&gt;Deep Detail&lt;/h5&gt;
&lt;h6&gt;Smallest Heading Level&lt;/h6&gt;</pre>
          <div class="note"><b>Golden Rule of Headings:</b> Never skip heading levels (e.g., jumping directly from <code>&lt;h1&gt;</code> to <code>&lt;h4&gt;</code>). Never choose a heading tag just because you want big or bold text—use CSS font-size for styling. Reserve exactly <b>one</b> <code>&lt;h1&gt;</code> per page for the core document topic.</div>
        `,
        quiz: [
          { q: "Which heading represents the top-level, most important subject of the page?", options: ["<h6>", "<h3>", "<h1>", "<header>"], answer: 2 },
          { q: "How many <h1> elements should a page typically have for clean SEO?", options: ["Exactly one", "Zero", "At least 10", "One for every paragraph"], answer: 0 },
          { q: "Is it good practice to skip from <h1> directly down to <h4>?", options: ["Yes, always", "No, heading levels should follow a sequential hierarchy", "Only on mobile phones", "Only inside a <table>"], answer: 1 }
        ]
      },
      {
        id: "t4",
        title: "4. Paragraphs, Breaks & Dividers",
        content: `
          <h2>Paragraphs (&lt;p&gt;), Breaks (&lt;br&gt;) &amp; Horizontal Rules (&lt;hr&gt;)</h2>
          <p>Text in HTML is organized using block-level paragraphs and inline break controls:</p>
          <pre>&lt;p&gt;This is the first paragraph. Browsers automatically add vertical margin before and after paragraphs.&lt;/p&gt;

&lt;p&gt;Roses are red,&lt;br&gt;
Violets are blue.&lt;/p&gt;

&lt;hr&gt; &lt;!-- Thematic break / horizontal separator line --&gt;

&lt;p&gt;A new thematic section begins here.&lt;/p&gt;</pre>
          <h3>Void Elements:</h3>
          <p>Both <code>&lt;br&gt;</code> and <code>&lt;hr&gt;</code> are <b>void elements</b> (self-closing). They cannot contain content or have closing tags like <code>&lt;/br&gt;</code>.</p>
        `,
        quiz: [
          { q: "Which tag represents a paragraph of text?", options: ["<para>", "<p>", "<text>", "<pg>"], answer: 1 },
          { q: "Which element creates a line break within a block of text without starting a new paragraph?", options: ["<lb>", "<br>", "<break>", "<newline>"], answer: 1 },
          { q: "What semantic role does the <hr> tag serve in HTML5?", options: ["Draws a table border", "Represents a thematic break between topics", "Refreshes the page", "Loads external CSS"], answer: 1 }
        ]
      },
      {
        id: "t5",
        title: "5. Semantic Typography & Text Styling",
        content: `
          <h2>Semantic vs Cosmetic Text Formatting</h2>
          <p>Modern HTML distinguishes between visual appearance and semantic importance:</p>
          <pre>&lt;strong&gt;Strong Importance:&lt;/strong&gt; Screen readers stress this text with serious tone.
&lt;b&gt;Stylistic Bold:&lt;/b&gt; Visually bold without implying special importance (e.g. keywords).

&lt;em&gt;Stress Emphasis:&lt;/em&gt; Changes the spoken inflection of the sentence.
&lt;i&gt;Alternate Voice:&lt;/i&gt; Used for technical terms, foreign phrases, or thoughts.

&lt;mark&gt;Highlighted text&lt;/mark&gt; (rendered with yellow marker by default).
&lt;small&gt;Fine print, copyright disclaimers, terms of service.&lt;/small&gt;
&lt;del&gt;Deleted text (strikethrough)&lt;/del&gt; and &lt;ins&gt;Inserted replacement text&lt;/ins&gt;.
Water formula: H&lt;sub&gt;2&lt;/sub&gt;O and Math exponent: E = mc&lt;sup&gt;2&lt;/sup&gt;.</pre>
        `,
        quiz: [
          { q: "Which tag signals urgent or crucial importance to assistive technologies?", options: ["<b>", "<strong>", "<bold>", "<big>"], answer: 1 },
          { q: "How do you write the chemical formula for water (H2O) with a lowered '2'?", options: ["H<sup>2</sup>O", "H<sub>2</sub>O", "H<down>2</down>O", "H<subscript>2</subscript>O"], answer: 1 },
          { q: "Which element indicates newly inserted text in a document revision?", options: ["<new>", "<add>", "<ins>", "<plus>"], answer: 2 }
        ]
      },
      {
        id: "t6",
        title: "6. Quotations & Citations",
        content: `
          <h2>Quotations, Citations &amp; Abbreviations</h2>
          <p>When referencing external ideas, books, or speakers, use dedicated quote elements:</p>
          <pre>&lt;!-- Long block quotation from external source --&gt;
&lt;blockquote cite="https://w3.org"&gt;
  &lt;p&gt;The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.&lt;/p&gt;
&lt;/blockquote&gt;
&lt;p&gt;As stated by &lt;cite&gt;Tim Berners-Lee&lt;/cite&gt;.&lt;/p&gt;

&lt;!-- Inline quotation with automatic quotation marks --&gt;
&lt;p&gt;He said, &lt;q&gt;Stay hungry, stay foolish.&lt;/q&gt;&lt;/p&gt;

&lt;!-- Abbreviations with expanded tooltip --&gt;
&lt;p&gt;We study &lt;abbr title="HyperText Markup Language"&gt;HTML&lt;/abbr&gt; daily.&lt;/p&gt;</pre>
        `,
        quiz: [
          { q: "Which tag is best suited for an extended multi-line quotation from an external work?", options: ["<q>", "<blockquote>", "<cite>", "<quote>"], answer: 1 },
          { q: "What does the <abbr> element's title attribute do?", options: ["Changes font color", "Provides the full expanded meaning shown on hover", "Sets the page title", "Links to a dictionary"], answer: 1 },
          { q: "Which element references the title of a creative work (book, paper, song)?", options: ["<cite>", "<ref>", "<source>", "<author>"], answer: 0 }
        ]
      },
      {
        id: "t7",
        title: "7. Computer Code, Keyboard & Output",
        content: `
          <h2>Displaying Computer Code &amp; Keyboard Input</h2>
          <p>When building technical tutorials or documentation, HTML provides dedicated tags:</p>
          <pre>&lt;!-- Inline code fragment --&gt;
&lt;p&gt;Use the &lt;code&gt;git status&lt;/code&gt; command to view changed files.&lt;/p&gt;

&lt;!-- Preformatted multi-line block --&gt;
&lt;pre&gt;&lt;code&gt;function add(a, b) {
  return a + b;
}&lt;/code&gt;&lt;/pre&gt;

&lt;!-- User keyboard shortcut --&gt;
&lt;p&gt;Press &lt;kbd&gt;Ctrl&lt;/kbd&gt; + &lt;kbd&gt;S&lt;/kbd&gt; to save your work.&lt;/p&gt;

&lt;!-- Computer output sample --&gt;
&lt;p&gt;Terminal reply: &lt;samp&gt;Build completed in 1.4s&lt;/samp&gt;&lt;/p&gt;</pre>
        `,
        quiz: [
          { q: "Which element preserves exact whitespace, tabs, and line breaks?", options: ["<preserve>", "<pre>", "<raw>", "<format>"], answer: 1 },
          { q: "Which element represents keyboard keystroke combinations (e.g. Ctrl + C)?", options: ["<key>", "<press>", "<kbd>", "<button>"], answer: 2 },
          { q: "Which tag designates computer code snippets?", options: ["<script>", "<code>", "<prog>", "<tech>"], answer: 1 }
        ]
      },
      {
        id: "t8",
        title: "8. Lists: Unordered, Ordered & Description",
        content: `
          <h2>Mastering All 3 HTML List Types</h2>
          <p>HTML provides three distinct list formats for organizing related data:</p>
          <h3>1. Unordered List (&lt;ul&gt;)</h3>
          <pre>&lt;ul&gt;
  &lt;li&gt;Coffee beans&lt;/li&gt;
  &lt;li&gt;Oat milk&lt;/li&gt;
&lt;/ul&gt;</pre>
          <h3>2. Ordered List (&lt;ol&gt;) with Types &amp; Starts</h3>
          <pre>&lt;ol start="5" type="A"&gt;
  &lt;li&gt;Item E&lt;/li&gt;
  &lt;li&gt;Item F&lt;/li&gt;
&lt;/ol&gt;</pre>
          <h3>3. Description List (&lt;dl&gt;) for Glossaries &amp; Key-Values</h3>
          <pre>&lt;dl&gt;
  &lt;dt&gt;HTML&lt;/dt&gt;
  &lt;dd&gt;HyperText Markup Language.&lt;/dd&gt;
  &lt;dt&gt;CSS&lt;/dt&gt;
  &lt;dd&gt;Cascading Style Sheets.&lt;/dd&gt;
&lt;/dl&gt;</pre>
        `,
        quiz: [
          { q: "Which list type is designed for term-definition pairs or metadata glossaries?", options: ["<ul>", "<ol>", "<dl>", "<list>"], answer: 2 },
          { q: "Inside a <dl>, which tag holds the term being defined?", options: ["<dt>", "<dd>", "<li>", "<term>"], answer: 0 },
          { q: "How do you make an ordered list start counting at number 10?", options: ["<ol begin='10'>", "<ol start='10'>", "<ol count='10'>", "<ol index='10'>"], answer: 1 }
        ]
      }
    ]
  },

  links_media: {
    name: "Links, Media & Attributes",
    icon: "🔷",
    desc: "Hyperlinks, URLs, raster & vector graphics, responsive pictures, and global HTML attributes.",
    topics: [
      {
        id: "t9",
        title: "9. Hyperlinks & Anchors (&lt;a&gt;)",
        content: `
          <h2>The Anchor Element (&lt;a&gt;)</h2>
          <p>Hyperlinks connect the world's information together. The <code>&lt;a&gt;</code> tag supports multiple URL schemes:</p>
          <pre>&lt;!-- External Web Page --&gt;
&lt;a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer"&gt;MDN Web Docs&lt;/a&gt;

&lt;!-- Internal Relative Path --&gt;
&lt;a href="/about.html"&gt;About Us&lt;/a&gt;

&lt;!-- In-Page Bookmark Anchor --&gt;
&lt;a href="#faq-section"&gt;Jump to FAQs&lt;/a&gt;

&lt;!-- Communication Protocols --&gt;
&lt;a href="mailto:support@example.com?subject=Help"&gt;Email Support&lt;/a&gt;
&lt;a href="tel:+15551234567"&gt;Call Toll-Free&lt;/a&gt;
&lt;a href="sms:+15551234567"&gt;Text Us&lt;/a&gt;

&lt;!-- File Download --&gt;
&lt;a href="/files/whitepaper.pdf" download="Guide2026.pdf"&gt;Download PDF&lt;/a&gt;</pre>
        `,
        quiz: [
          { q: "Which attribute specifies the destination URL of a link?", options: ["src", "url", "href", "link"], answer: 2 },
          { q: "What security attribute should always accompany target='_blank'?", options: ["rel='noopener noreferrer'", "secure='true'", "guard='sandbox'", "protect='strict'"], answer: 0 },
          { q: "Which protocol prefix opens the user's phone dialer on mobile devices?", options: ["call:", "phone:", "tel:", "dial:"], answer: 2 }
        ]
      },
      {
        id: "t10",
        title: "10. Images & Figures (&lt;img&gt; &amp; &lt;figure&gt;)",
        content: `
          <h2>Embedding Images Efficiently</h2>
          <p>Modern images must be accessible, responsive, and performant:</p>
          <pre>&lt;figure&gt;
  &lt;img 
    src="/images/golden-gate.webp" 
    alt="San Francisco Golden Gate Bridge shrouded in morning fog" 
    width="800" 
    height="450" 
    loading="lazy" 
    decoding="async"&gt;
  &lt;figcaption&gt;Photo by Sarah Chen &mdash; San Francisco Bay, 2026.&lt;/figcaption&gt;
&lt;/figure&gt;</pre>
          <h3>Best Practice Checklist:</h3>
          <ul>
            <li>Always specify <code>width</code> and <code>height</code> to eliminate Cumulative Layout Shift (CLS).</li>
            <li>Always write meaningful <code>alt</code> text for visually impaired screen-reader users.</li>
            <li>Use <code>loading="lazy"</code> to defer offscreen images until the user scrolls near them.</li>
          </ul>
        `,
        quiz: [
          { q: "Why should you always define width and height attributes on images?", options: ["To make them load in black and white", "To prevent page layout jumping (CLS) while downloading", "To reduce file size on the server", "To disable right clicking"], answer: 1 },
          { q: "Which attribute provides alternative text for accessibility?", options: ["title", "alt", "desc", "label"], answer: 1 },
          { q: "Which element associates a caption with an image or diagram?", options: ["<caption-img>", "<figcaption>", "<label>", "<title>"], answer: 1 }
        ]
      },
      {
        id: "t11",
        title: "11. Responsive Images (&lt;picture&gt; &amp; srcset)",
        content: `
          <h2>Next-Gen Responsive Media (&lt;picture&gt;)</h2>
          <p>Serve tailored image resolutions and modern formats (AVIF/WebP) based on device capabilities:</p>
          <pre>&lt;picture&gt;
  &lt;!-- 1. Modern high-compression format --&gt;
  &lt;source type="image/avif" srcset="hero.avif"&gt;
  &lt;source type="image/webp" srcset="hero.webp"&gt;

  &lt;!-- 2. Art direction for mobile screens --&gt;
  &lt;source media="(max-width: 600px)" srcset="hero-mobile.jpg"&gt;

  &lt;!-- 3. Safe fallback for older browsers --&gt;
  &lt;img src="hero-desktop.jpg" alt="Team collaborating in modern office" width="1200" height="600"&gt;
&lt;/picture&gt;</pre>
        `,
        quiz: [
          { q: "What is the primary advantage of the <picture> element over a plain <img>?", options: ["It draws vector circles", "It allows art-direction and format negotiation (AVIF/WebP)", "It plays background music", "It encrypts images"], answer: 1 },
          { q: "Which image format offers higher modern compression than legacy JPEG?", options: ["BMP", "AVIF or WebP", "TIFF", "GIF"], answer: 1 },
          { q: "If the browser supports AVIF, which <source> will it load first?", options: ["The first matching <source> in document order", "Always the last fallback <img>", "It downloads all sources at once", "A random source"], answer: 0 }
        ]
      },
      {
        id: "t12",
        title: "12. Block vs Inline vs Inline-Block",
        content: `
          <h2>Display Behaviors: Block vs. Inline</h2>
          <p>Understanding element flow in standard document layout:</p>
          <h3>Block Elements (&lt;div&gt;, &lt;p&gt;, &lt;h1&gt;, &lt;section&gt;)</h3>
          <ul>
            <li>Always break onto a fresh line.</li>
            <li>Stretch to fill 100% of their container width by default.</li>
            <li>Respect width, height, margin, and padding on all four sides.</li>
          </ul>
          <h3>Inline Elements (&lt;span&gt;, &lt;a&gt;, &lt;strong&gt;, &lt;code&gt;)</h3>
          <ul>
            <li>Flow naturally inside sentence lines without line breaks.</li>
            <li>Only take up as much width as their content requires.</li>
            <li>Vertical margins (top/bottom) do not push neighboring elements away.</li>
          </ul>
        `,
        quiz: [
          { q: "Which element is an inline container by default?", options: ["<div>", "<section>", "<span>", "<article>"], answer: 2 },
          { q: "What happens when you place two block elements sequentially?", options: ["They sit side by side", "The second block starts on a new line below the first", "They overlap completely", "The browser throws an error"], answer: 1 },
          { q: "Can vertical margin-top on an inline <span> push text lines apart?", options: ["Yes, full effect", "No, vertical margins do not affect inline flow", "Only in Firefox", "Only when font-size is 20px"], answer: 1 }
        ]
      },
      {
        id: "t13",
        title: "13. Global HTML Attributes",
        content: `
          <h2>Universal Global Attributes</h2>
          <p>Global attributes can be legally placed on <b>any</b> valid HTML element:</p>
          <pre>&lt;!-- id: Must be unique across the entire document --&gt;
&lt;div id="mainNavigation"&gt;&lt;/div&gt;

&lt;!-- class: Reusable classification identifier for CSS &amp; JS --&gt;
&lt;div class="btn btn-primary shadow-sm"&gt;&lt;/div&gt;

&lt;!-- title: Native browser hover tooltip --&gt;
&lt;span title="Click to copy secret key"&gt;API Key&lt;/span&gt;

&lt;!-- hidden: Completely hides element from screen and assistive tech --&gt;
&lt;div hidden&gt;This content is not rendered&lt;/div&gt;

&lt;!-- tabindex: Keyboard navigation focus order --&gt;
&lt;div tabindex="0"&gt;Now focusable via Tab key&lt;/div&gt;

&lt;!-- contenteditable: Allows visitor to live edit element text --&gt;
&lt;div contenteditable="true"&gt;Click and type text directly!&lt;/div&gt;</pre>
        `,
        quiz: [
          { q: "Which attribute must be globally unique per web page?", options: ["class", "id", "style", "name"], answer: 1 },
          { q: "What does setting tabindex='0' on an element accomplish?", options: ["Deletes the element", "Makes a normally non-focusable element focusable via the Tab key", "Hides it from view", "Pins it to top of screen"], answer: 1 },
          { q: "Which boolean attribute turns on direct in-browser text editing for an element?", options: ["editable='on'", "contenteditable='true'", "input='active'", "text='modify'"], answer: 1 }
        ]
      }
    ]
  },

  tables: {
    name: "Data Tables & Structure",
    icon: "📊",
    desc: "Tabular data, header scopes, column grouping, cell merging (colspan/rowspan), and accessibility.",
    topics: [
      {
        id: "t14",
        title: "14. Table Fundamentals & Semantics",
        content: `
          <h2>Semantic Data Tables</h2>
          <p>HTML tables organize structured datasets into rows and columns with semantic sections:</p>
          <pre>&lt;table&gt;
  &lt;caption&gt;Monthly Cloud Infrastructure Expenses (2026)&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Service&lt;/th&gt;
      &lt;th scope="col"&gt;Region&lt;/th&gt;
      &lt;th scope="col"&gt;Cost (USD)&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;Cloud Compute&lt;/th&gt;
      &lt;td&gt;us-east-1&lt;/td&gt;
      &lt;td&gt;$1,240.00&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
  &lt;tfoot&gt;
    &lt;tr&gt;
      &lt;th scope="row" colspan="2"&gt;Total&lt;/th&gt;
      &lt;td&gt;$1,240.00&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;</pre>
        `,
        quiz: [
          { q: "Which element provides the accessible title/description for a table?", options: ["<title>", "<caption>", "<label>", "<summary>"], answer: 1 },
          { q: "Which section groups the summary or total rows at the bottom of a table?", options: ["<bottom>", "<tfoot>", "<end>", "<summary>"], answer: 1 },
          { q: "What is the semantic difference between <th> and <td>?", options: ["<th> is for header cells, <td> is for data cells", "<td> is only for numbers", "<th> is obsolete", "They are 100% identical"], answer: 0 }
        ]
      },
      {
        id: "t15",
        title: "15. Spanning Cells (colspan & rowspan)",
        content: `
          <h2>Merging Table Cells: colspan &amp; rowspan</h2>
          <p>Complex tables require cells to stretch across multiple horizontal columns or vertical rows:</p>
          <pre>&lt;table border="1"&gt;
  &lt;tr&gt;
    &lt;!-- Stretches across 2 columns horizontally --&gt;
    &lt;th colspan="2"&gt;Merged Header&lt;/th&gt;
    &lt;th&gt;Column 3&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;!-- Stretches across 2 rows vertically --&gt;
    &lt;td rowspan="2"&gt;Merged Row Cell&lt;/td&gt;
    &lt;td&gt;Row 1 Cell 2&lt;/td&gt;
    &lt;td&gt;Row 1 Cell 3&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Row 2 Cell 2&lt;/td&gt;
    &lt;td&gt;Row 2 Cell 3&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
        `,
        quiz: [
          { q: "Which attribute merges a cell across 3 horizontal columns?", options: ["rowspan='3'", "colspan='3'", "width='3'", "span='3'"], answer: 1 },
          { q: "Which attribute merges a cell downwards across 2 vertical rows?", options: ["rowspan='2'", "colspan='2'", "merge='vertical'", "height='2'"], answer: 0 },
          { q: "If a row has a cell with colspan='2' and another cell with colspan='1', how many column slots are filled?", options: ["1 slot", "2 slots", "3 slots", "4 slots"], answer: 2 }
        ]
      },
      {
        id: "t16",
        title: "16. Column Groups (&lt;colgroup&gt;) &amp; Table Accessibility",
        content: `
          <h2>Column Styling (&lt;colgroup&gt;) &amp; Accessibility</h2>
          <p>Styling whole columns in CSS without adding classes to every single <code>&lt;td&gt;</code>:</p>
          <pre>&lt;table&gt;
  &lt;colgroup&gt;
    &lt;col style="background-color: rgba(56,189,248,0.1);"&gt;
    &lt;col span="2" style="background-color: rgba(99,102,241,0.1);"&gt;
  &lt;/colgroup&gt;
  &lt;tr&gt;
    &lt;th scope="col"&gt;ID&lt;/th&gt;
    &lt;th scope="col"&gt;First Name&lt;/th&gt;
    &lt;th scope="col"&gt;Last Name&lt;/th&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
          <div class="note"><b>Screen Reader Rules:</b> Always include <code>scope="col"</code> on column headers and <code>scope="row"</code> on row headers so audio synthesizers announce context accurately.</div>
        `,
        quiz: [
          { q: "What does <col span='2'> inside <colgroup> target?", options: ["Two consecutive columns", "Two rows", "Two tables", "Two headers"], answer: 0 },
          { q: "What attribute tells screen readers a header pertains to a specific column?", options: ["scope='col'", "role='column'", "type='col'", "dir='vertical'"], answer: 0 },
          { q: "Can <table> elements be used for page layouts in modern web development?", options: ["Yes, recommended", "No, tables are strictly for tabular data; use Flexbox/Grid for layout", "Only on desktop", "Only with CSS reset"], answer: 1 }
        ]
      }
    ]
  },

  forms: {
    name: "Forms & User Input",
    icon: "📝",
    desc: "Form architecture, labels, inputs, selects, validation constraints, and autocomplete.",
    topics: [
      {
        id: "t17",
        title: "17. Form Architecture & Methods (GET vs POST)",
        content: `
          <h2>HTML Form Architecture</h2>
          <p>Forms submit user data to servers using two fundamental HTTP methods:</p>
          <pre>&lt;!-- 1. GET Method: Appends data to URL query string (Search bars, filters) --&gt;
&lt;form action="/search" method="GET"&gt;
  &lt;input type="search" name="q" placeholder="Search documentation..."&gt;
  &lt;button type="submit"&gt;Search&lt;/button&gt;
&lt;/form&gt;

&lt;!-- 2. POST Method: Sends data inside HTTP request body (Logins, payments) --&gt;
&lt;form action="/api/login" method="POST" autocomplete="on"&gt;
  &lt;!-- Form fields go here --&gt;
&lt;/form&gt;</pre>
          <h3>Security Rule:</h3>
          <p>Never transmit sensitive data (passwords, credit cards) using <code>method="GET"</code>, as query strings are recorded in browser histories, bookmarks, and server logs!</p>
        `,
        quiz: [
          { q: "Which HTTP method appends form data directly into the URL query string?", options: ["POST", "GET", "PUT", "DELETE"], answer: 1 },
          { q: "Which method is appropriate for submitting passwords or registration data?", options: ["GET", "POST", "QUERY", "FETCH"], answer: 1 },
          { q: "What happens if a form has no 'method' attribute declared?", options: ["It fails to submit", "It defaults to GET", "It defaults to POST", "It opens an email"], answer: 1 }
        ]
      },
      {
        id: "t18",
        title: "18. Accessible Labels & Text Inputs",
        content: `
          <h2>Form Labels &amp; Text Inputs</h2>
          <p>Connecting labels to inputs is non-negotiable for accessibility and user experience:</p>
          <pre>&lt;!-- Method A: Explicit linking via 'for' and 'id' (Industry Standard) --&gt;
&lt;label for="userEmail"&gt;Work Email Address:&lt;/label&gt;
&lt;input type="email" id="userEmail" name="email" placeholder="you@company.com" required&gt;

&lt;!-- Method B: Implicit wrapping --&gt;
&lt;label&gt;
  Username:
  &lt;input type="text" name="username" required&gt;
&lt;/label&gt;</pre>
          <div class="note">Clicking a linked <code>&lt;label&gt;</code> automatically shifts keyboard focus directly into the associated input field, massively improving mobile usability.</div>
        `,
        quiz: [
          { q: "Which attribute connects a <label> to an <input id='myInput'>?", options: ["to='myInput'", "for='myInput'", "target='myInput'", "ref='myInput'"], answer: 1 },
          { q: "What UX advantage occurs when clicking an associated <label>?", options: ["The form resets", "Focus immediately jumps to the linked input field", "The page reloads", "The font turns bold"], answer: 1 },
          { q: "Which input type ensures mobile keyboards display the '@' symbol easily?", options: ["type='text'", "type='email'", "type='string'", "type='web'"], answer: 1 }
        ]
      },
      {
        id: "t19",
        title: "19. Selection Controls: Radio, Checkbox & Select",
        content: `
          <h2>Radios, Checkboxes, Select &amp; Optgroup</h2>
          <p>Choosing single options vs multiple choices:</p>
          <pre>&lt;!-- Radio buttons: Mutually exclusive (Shared 'name' attribute) --&gt;
&lt;fieldset&gt;
  &lt;legend&gt;Subscription Tier&lt;/legend&gt;
  &lt;label&gt;&lt;input type="radio" name="plan" value="free" checked&gt; Free&lt;/label&gt;
  &lt;label&gt;&lt;input type="radio" name="plan" value="pro"&gt; Pro ($19/mo)&lt;/label&gt;
&lt;/fieldset&gt;

&lt;!-- Checkbox: Independent toggle --&gt;
&lt;label&gt;&lt;input type="checkbox" name="agree" required&gt; I accept terms&lt;/label&gt;

&lt;!-- Dropdown Select with grouped categories --&gt;
&lt;select name="framework"&gt;
  &lt;optgroup label="JavaScript"&gt;
    &lt;option value="react"&gt;React&lt;/option&gt;
    &lt;option value="vue"&gt;Vue&lt;/option&gt;
  &lt;/optgroup&gt;
  &lt;optgroup label="CSS"&gt;
    &lt;option value="vanilla" selected&gt;Vanilla CSS&lt;/option&gt;
  &lt;/optgroup&gt;
&lt;/select&gt;</pre>
        `,
        quiz: [
          { q: "How do you group radio buttons so only ONE can be selected at a time?", options: ["Give them identical id attributes", "Give them identical name attributes", "Place them in the same row", "Use the 'single' attribute"], answer: 1 },
          { q: "Which element groups related options inside a <select> dropdown?", options: ["<group>", "<optgroup>", "<category>", "<optionset>"], answer: 1 },
          { q: "How do you mark a checkbox as checked by default?", options: ["selected", "checked", "active", "true"], answer: 1 }
        ]
      },
      {
        id: "t20",
        title: "20. Temporal, Numeric & Color Pickers",
        content: `
          <h2>Specialized HTML5 Input Controls</h2>
          <p>Native inputs eliminate the need for bloated third-party JavaScript libraries:</p>
          <pre>&lt;!-- Numbers with step &amp; boundaries --&gt;
&lt;input type="number" min="1" max="100" step="5" value="25"&gt;

&lt;!-- Slider Range --&gt;
&lt;input type="range" min="0" max="100" value="50"&gt;

&lt;!-- Calendar Date Picker --&gt;
&lt;input type="date" min="2026-01-01" max="2026-12-31"&gt;

&lt;!-- Native Color Picker --&gt;
&lt;input type="color" value="#38bdf8"&gt;

&lt;!-- File Upload (Restricted to images, multiple files) --&gt;
&lt;input type="file" accept="image/png, image/jpeg" multiple&gt;</pre>
        `,
        quiz: [
          { q: "Which input type renders an interactive visual color picker palette?", options: ["type='palette'", "type='color'", "type='rgb'", "type='hex'"], answer: 1 },
          { q: "What attribute restricts an <input type='file'> to only accept PNG and JPEG files?", options: ["filter='images'", "accept='image/png, image/jpeg'", "types='png,jpg'", "files='images'"], answer: 1 },
          { q: "What input type renders a draggable slider bar?", options: ["type='slider'", "type='range'", "type='bar'", "type='scroll'"], answer: 1 }
        ]
      },
      {
        id: "t21",
        title: "21. Native Form Validation & Datalist Autocomplete",
        content: `
          <h2>Constraint Validation &amp; Suggestions (&lt;datalist&gt;)</h2>
          <p>HTML5 validates data before the browser ever transmits a network request:</p>
          <pre>&lt;!-- Declarative Constraints --&gt;
&lt;input type="text" minlength="4" maxlength="16" required&gt;
&lt;input type="text" pattern="[A-Z]{3}-[0-9]{4}" title="Format: ABC-1234"&gt;

&lt;!-- Autocomplete Recommendations with &lt;datalist&gt; --&gt;
&lt;label for="cityInput"&gt;Destination City:&lt;/label&gt;
&lt;input list="cities" id="cityInput" name="city" placeholder="Type city..."&gt;

&lt;datalist id="cities"&gt;
  &lt;option value="New York"&gt;
  &lt;option value="Tokyo"&gt;
  &lt;option value="London"&gt;
  &lt;option value="Paris"&gt;
&lt;/datalist&gt;</pre>
        `,
        quiz: [
          { q: "Which attribute applies custom regular expression rules to an input?", options: ["regex", "pattern", "rule", "match"], answer: 1 },
          { q: "How does an <input> connect to a <datalist id='myList'>?", options: ["input datalist='myList'", "input list='myList'", "input options='myList'", "input suggest='myList'"], answer: 1 },
          { q: "Which attribute prevents a form from submitting if an input field is empty?", options: ["mandatory", "required", "needed", "strict"], answer: 1 }
        ]
      }
    ]
  },

  multimedia_embed: {
    name: "Multimedia, Embeds & Interactive",
    icon: "🎬",
    desc: "Audio, video, subtitle tracks, iframes, SVGs, dialog modals, and details disclosure widgets.",
    topics: [
      {
        id: "t22",
        title: "22. Native Audio & Video Players",
        content: `
          <h2>Native Media Playback</h2>
          <p>HTML5 native media players offer hardware-accelerated streaming without external plugins:</p>
          <pre>&lt;!-- Video Player with Multiple Fallback Codecs --&gt;
&lt;video width="800" height="450" controls poster="/images/poster.jpg" preload="metadata"&gt;
  &lt;source src="/media/clip.webm" type="video/webm"&gt;
  &lt;source src="/media/clip.mp4" type="video/mp4"&gt;
  &lt;p&gt;Your browser does not support HTML5 video.&lt;/p&gt;
&lt;/video&gt;

&lt;!-- Audio Stream Player --&gt;
&lt;audio controls preload="none"&gt;
  &lt;source src="/media/podcast.mp3" type="audio/mpeg"&gt;
&lt;/audio&gt;</pre>
          <div class="note"><b>Autoplay Rule:</b> Modern browsers block video autoplay unless the <code>muted</code> attribute is explicitly present.</div>
        `,
        quiz: [
          { q: "Which attribute displays native playback buttons (play, volume, seeker)?", options: ["buttons", "controls", "player", "show"], answer: 1 },
          { q: "Which attribute provides a preview thumbnail image before the video plays?", options: ["poster", "preview", "thumbnail", "cover"], answer: 0 },
          { q: "What attribute is required alongside 'autoplay' for videos to play automatically?", options: ["loop", "muted", "controls", "inline"], answer: 1 }
        ]
      },
      {
        id: "t23",
        title: "23. Subtitles & Timed Text (&lt;track&gt;)",
        content: `
          <h2>Accessibility with Video Subtitles &amp; Captions</h2>
          <p>Timed text tracks support deaf or hard-of-hearing viewers and multilingual translations:</p>
          <pre>&lt;video controls width="640"&gt;
  &lt;source src="speech.mp4" type="video/mp4"&gt;
  
  &lt;!-- English Subtitles --&gt;
  &lt;track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English" default&gt;
  
  &lt;!-- Spanish Subtitles --&gt;
  &lt;track kind="subtitles" src="subtitles-es.vtt" srclang="es" label="Español"&gt;
&lt;/video&gt;</pre>
          <h3>WebVTT (.vtt) Format Sample:</h3>
          <pre>WEBVTT

00:00:01.000 --&gt; 00:00:04.000
Welcome to the HTML Master class!

00:00:04.500 --&gt; 00:00:08.000
Today we master video subtitles.</pre>
        `,
        quiz: [
          { q: "What standard file format is used for HTML5 video text tracks?", options: [".srt", ".vtt (WebVTT)", ".txt", ".sub"], answer: 1 },
          { q: "Which attribute specifies that a text track is active by default?", options: ["active", "default", "selected", "primary"], answer: 1 },
          { q: "What 'kind' value describes subtitles intended for translation?", options: ["kind='subtitles'", "kind='captions'", "kind='chapters'", "kind='descriptions'"], answer: 0 }
        ]
      },
      {
        id: "t24",
        title: "24. Iframes & Sandboxing Security",
        content: `
          <h2>Inline Frames (&lt;iframe&gt;) &amp; Security</h2>
          <p>Embed external web pages, maps, or widgets safely with strict sandboxing:</p>
          <pre>&lt;iframe 
  src="https://example.com/widget" 
  width="600" 
  height="300" 
  title="Interactive Pricing Widget"
  loading="lazy"
  sandbox="allow-scripts allow-forms"
  referrerpolicy="no-referrer"&gt;
&lt;/iframe&gt;</pre>
          <h3>Security Best Practices:</h3>
          <ul>
            <li>Always supply a meaningful <code>title</code> for accessibility.</li>
            <li>Use the <code>sandbox</code> attribute to restrict untrusted third-party scripts, popups, and cookie access.</li>
          </ul>
        `,
        quiz: [
          { q: "Which attribute restricts scripts, modals, and cookie access inside an iframe?", options: ["guard", "sandbox", "secure", "lockdown"], answer: 1 },
          { q: "Why is a title attribute required on every <iframe>?", options: ["It provides an accessible description for screen readers", "It styles the border color", "It improves video resolution", "It is needed for HTTPS"], answer: 0 },
          { q: "What does loading='lazy' do on an <iframe>?", options: ["Disables JavaScript", "Defers loading the iframe until scrolled near viewport", "Slows down video speed", "Caches page for 1 year"], answer: 1 }
        ]
      },
      {
        id: "t25",
        title: "25. Interactive Widgets: details, dialog & progress",
        content: `
          <h2>Modern HTML5 Interactive Widgets</h2>
          <p>Modern HTML eliminates JavaScript for accordions, modals, and progress meters:</p>
          <pre>&lt;!-- 1. Expandable Accordion (&lt;details&gt;) --&gt;
&lt;details&gt;
  &lt;summary&gt;What are the prerequisites for this course?&lt;/summary&gt;
  &lt;p&gt;No prior coding knowledge is required! We start from absolute zero.&lt;/p&gt;
&lt;/details&gt;

&lt;!-- 2. Native Popup Modal Dialog (&lt;dialog&gt;) --&gt;
&lt;dialog id="confirmModal"&gt;
  &lt;h3&gt;Confirm Deletion&lt;/h3&gt;
  &lt;p&gt;Are you sure you want to proceed?&lt;/p&gt;
  &lt;form method="dialog"&gt;
    &lt;button&gt;Cancel&lt;/button&gt;
  &lt;/form&gt;
&lt;/dialog&gt;

&lt;!-- 3. Progress Indicator --&gt;
&lt;progress value="75" max="100"&gt;75%&lt;/progress&gt;</pre>
        `,
        quiz: [
          { q: "Which native HTML element creates a collapsible accordion without JavaScript?", options: ["<accordion>", "<details>", "<toggle>", "<expand>"], answer: 1 },
          { q: "Which JavaScript method opens a <dialog> element as a backdrop-dimmed modal?", options: ["dialog.show()", "dialog.showModal()", "dialog.open()", "dialog.display()"], answer: 1 },
          { q: "What element specifies the clickable headline of a <details> box?", options: ["<header>", "<summary>", "<title>", "<caption_>"], answer: 1 }
        ]
      }
    ]
  },

  semantics_seo: {
    name: "Semantics, SEO & OpenGraph",
    icon: "🚀",
    desc: "Semantic architecture, Google SEO meta tags, social OpenGraph sharing, and mobile PWA manifests.",
    topics: [
      {
        id: "t26",
        title: "26. Semantic HTML5 Architecture",
        content: `
          <h2>Semantic Architecture vs. &quot;Div Soup&quot;</h2>
          <p>A semantic structure describes what content <i>means</i>, creating clear landmarks for assistive readers and search engine spiders:</p>
          <pre>&lt;header&gt;
  &lt;div class="brand"&gt;HTML Master&lt;/div&gt;
  &lt;nav&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;article&gt;
    &lt;h1&gt;Understanding Semantic Tags&lt;/h1&gt;
    &lt;p&gt;Articles represent standalone, distributable stories.&lt;/p&gt;
    &lt;section&gt;
      &lt;h2&gt;Section Title&lt;/h2&gt;
      &lt;p&gt;Thematic grouping within the article.&lt;/p&gt;
    &lt;/section&gt;
  &lt;/article&gt;

  &lt;aside&gt;
    &lt;h3&gt;Related Tutorials&lt;/h3&gt;
    &lt;ul&gt;...&lt;/ul&gt;
  &lt;/aside&gt;
&lt;/main&gt;

&lt;footer&gt;
  &lt;p&gt;&copy; 2026 HTML Master&lt;/p&gt;
&lt;/footer&gt;</pre>
        `,
        quiz: [
          { q: "Which semantic tag represents content tangentially related to the main page (e.g. sidebar)?", options: ["<aside>", "<section>", "<div>", "<nav>"], answer: 0 },
          { q: "Which element encapsulates the primary, central subject matter of the page body?", options: ["<content>", "<main>", "<center>", "<body-main>"], answer: 1 },
          { q: "Which tag is best suited for an independent blog post, newspaper article, or user comment?", options: ["<section>", "<article>", "<div>", "<span>"], answer: 1 }
        ]
      },
      {
        id: "t27",
        title: "27. Search Engine Optimization (SEO) Meta Tags",
        content: `
          <h2>Production SEO Meta Tags</h2>
          <p>Search engines like Google read your <code>&lt;head&gt;</code> tags to rank and display your website in search results:</p>
          <pre>&lt;!-- Essential Document Encoding &amp; Viewport --&gt;
&lt;meta charset="UTF-8"&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

&lt;!-- Page Title: 50-60 characters maximum --&gt;
&lt;title&gt;HTML Master — Comprehensive Web Architecture Guide&lt;/title&gt;

&lt;!-- Meta Description: 150-160 characters summary shown in Google snippets --&gt;
&lt;meta name="description" content="Learn HTML5 from scratch with interactive lessons, live coding challenges, and verifiable certification."&gt;

&lt;!-- Canonical Link: Prevents duplicate content penalties --&gt;
&lt;link rel="canonical" href="https://htmlmaster.dev/learn"&gt;

&lt;!-- Robot Indexing Directives --&gt;
&lt;meta name="robots" content="index, follow"&gt;</pre>
        `,
        quiz: [
          { q: "Where does the meta description snippet typically appear?", options: ["As the big headline in browser tabs", "Underneath the title in Google search result listings", "At the bottom of the webpage footer", "Inside the developer console"], answer: 1 },
          { q: "What does a canonical link (<link rel='canonical'>) accomplish?", options: ["Speeds up page load", "Informs search engines of the primary original URL to prevent duplicate content penalties", "Caches fonts", "Translates the website"], answer: 1 },
          { q: "What viewport meta value ensures a page scales properly on mobile screens?", options: ["width=device-width, initial-scale=1.0", "width=1200", "scale=desktop", "mobile=yes"], answer: 0 }
        ]
      },
      {
        id: "t28",
        title: "28. Social Media Cards (OpenGraph & Twitter)",
        content: `
          <h2>Open Graph &amp; Social Previews (LinkedIn, X, Facebook)</h2>
          <p>When you share a link on LinkedIn, Twitter, or Discord, rich preview cards are generated using Open Graph metadata:</p>
          <pre>&lt;!-- OpenGraph Standards (LinkedIn, Facebook, Discord) --&gt;
&lt;meta property="og:type" content="website"&gt;
&lt;meta property="og:url" content="https://htmlmaster.dev"&gt;
&lt;meta property="og:title" content="HTML Master — Interactive Web Platform"&gt;
&lt;meta property="og:description" content="Master HTML5 with interactive lessons, sandbox, and verifiable certificate."&gt;
&lt;meta property="og:image" content="https://htmlmaster.dev/assets/social-card.png"&gt;

&lt;!-- Twitter / X Card Directives --&gt;
&lt;meta name="twitter:card" content="summary_large_image"&gt;
&lt;meta name="twitter:title" content="HTML Master"&gt;
&lt;meta name="twitter:image" content="https://htmlmaster.dev/assets/social-card.png"&gt;</pre>
        `,
        quiz: [
          { q: "What prefix identifies Open Graph properties used by LinkedIn and Facebook?", options: ["social:", "og:", "web:", "meta:"], answer: 1 },
          { q: "Which property specifies the preview image thumbnail displayed in social shares?", options: ["og:picture", "og:image", "og:media", "og:thumb"], answer: 1 },
          { q: "Which Twitter card type generates a full-width panoramic card preview?", options: ["summary_large_image", "small_card", "banner_card", "image_full"], answer: 0 }
        ]
      }
    ]
  },

  apis_performance: {
    name: "HTML5 APIs, ARIA & Performance",
    icon: "👑",
    desc: "Canvas 2D graphics, Web Storage, WAI-ARIA accessibility, performance optimization, and project architecture.",
    topics: [
      {
        id: "t29",
        title: "29. Canvas 2D Rendering",
        content: `
          <h2>The HTML5 &lt;canvas&gt; Element</h2>
          <p>The canvas provides an immediate-mode pixel drawing surface controlled via JavaScript:</p>
          <pre>&lt;canvas id="myCanvas" width="600" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Draw rectangle with gradient
  const grad = ctx.createLinearGradient(0, 0, 600, 0);
  grad.addColorStop(0, "#38bdf8");
  grad.addColorStop(1, "#6366f1");
  ctx.fillStyle = grad;
  ctx.fillRect(50, 50, 200, 100);

  // Draw circle
  ctx.beginPath();
  ctx.arc(400, 100, 50, 0, Math.PI * 2);
  ctx.fillStyle = "#10b981";
  ctx.fill();
&lt;/script&gt;</pre>
        `,
        quiz: [
          { q: "Which JavaScript method acquires the 2D drawing context from a <canvas>?", options: ["canvas.getContext('2d')", "canvas.init2D()", "canvas.setupContext()", "canvas.draw()"], answer: 0 },
          { q: "How are graphics rendered onto an HTML5 <canvas>?", options: ["Using CSS selectors", "Procedurally through JavaScript APIs", "With SVG markup tags", "Through server SQL queries"], answer: 1 },
          { q: "Which canvas method draws the outline of a circular arc or path?", options: ["ctx.stroke()", "ctx.outline()", "ctx.circle()", "ctx.render()"], answer: 0 }
        ]
      },
      {
        id: "t30",
        title: "30. Custom Data Attributes (data-*)",
        content: `
          <h2>Storing Custom Data with data-*</h2>
          <p>Embed custom dataset metadata directly onto HTML elements without violating specifications:</p>
          <pre>&lt;button 
  id="productBtn" 
  data-product-id="SKU-9921" 
  data-category="electronics" 
  data-discount-active="true"&gt;
  Add to Cart
&lt;/button&gt;

&lt;script&gt;
  const btn = document.getElementById("productBtn");

  // Access via modern dataset DOM property
  console.log(btn.dataset.productId);       // "SKU-9921"
  console.log(btn.dataset.category);        // "electronics"
  console.log(btn.dataset.discountActive);  // "true"
&lt;/script&gt;</pre>
        `,
        quiz: [
          { q: "What prefix is legally required for custom HTML data attributes?", options: ["data-", "custom-", "attr-", "var-"], answer: 0 },
          { q: "How do you access 'data-user-role' in JavaScript via DOM properties?", options: ["el.data.userRole", "el.dataset.userRole", "el.get('userRole')", "el.data_user_role"], answer: 1 },
          { q: "Which HTML elements are permitted to use data-* attributes?", options: ["Only <div> and <button>", "Only form elements", "All valid HTML elements", "Only the <body> tag"], answer: 2 }
        ]
      },
      {
        id: "t31",
        title: "31. Web Storage (localStorage & sessionStorage)",
        content: `
          <h2>Client-Side Web Storage</h2>
          <p>HTML5 provides client-side key-value stores vastly superior to cookies in capacity and performance:</p>
          <pre>// 1. localStorage: Persists forever across browser restarts
localStorage.setItem("userTheme", "dark");
const theme = localStorage.getItem("userTheme"); // "dark"

// 2. Saving complex JSON objects
const profile = { name: "Rahul", score: 98 };
localStorage.setItem("userProfile", JSON.stringify(profile));

// Reading and parsing
const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

// 3. sessionStorage: Cleared automatically when tab is closed
sessionStorage.setItem("activeStep", "2");</pre>
        `,
        quiz: [
          { q: "Which storage mechanism persists data permanently across browser restarts?", options: ["sessionStorage", "localStorage", "cookieSession", "memoryRAM"], answer: 1 },
          { q: "What data format must complex JavaScript objects be converted into before saving in localStorage?", options: ["Binary BLOB", "JSON string (JSON.stringify)", "XML document", "Base64 string"], answer: 1 },
          { q: "When is sessionStorage data automatically cleared?", options: ["Every 5 minutes", "When the browser tab or window is closed", "Only when computer restarts", "Never"], answer: 1 }
        ]
      },
      {
        id: "t32",
        title: "32. Web Accessibility (a11y) & WAI-ARIA",
        content: `
          <h2>WAI-ARIA &amp; Web Accessibility Guidelines</h2>
          <p>Accessible Rich Internet Applications (WAI-ARIA) clarify interactive state when native HTML semantics are insufficient:</p>
          <pre>&lt;!-- Accessible Icon Button --&gt;
&lt;button aria-label="Close dialog modal"&gt;&amp;times;&lt;/button&gt;

&lt;!-- Screen Reader Dynamic Announcement Region --&gt;
&lt;div role="status" aria-live="polite"&gt;
  Profile saved successfully.
&lt;/div&gt;

&lt;!-- Collapsible Accordion State --&gt;
&lt;button aria-expanded="true" aria-controls="faq1"&gt;FAQ Question&lt;/button&gt;
&lt;div id="faq1"&gt;FAQ Answer Details&lt;/div&gt;</pre>
          <div class="note"><b>First Rule of ARIA:</b> If you can use a native HTML element (e.g. <code>&lt;button&gt;</code>) instead of a custom <code>&lt;div role="button"&gt;</code>, ALWAYS use the native element!</div>
        `,
        quiz: [
          { q: "What does ARIA stand for?", options: ["Accessible Rich Internet Applications", "Advanced Responsive Interface API", "Applied Reader Interface Access", "Automated Read Internet App"], answer: 0 },
          { q: "Which attribute supplies an accessible name for an icon-only button?", options: ["title", "aria-label", "screen-reader", "tooltip"], answer: 1 },
          { q: "What is the primary rule regarding native HTML elements versus ARIA roles?", options: ["Always prefer native HTML elements over custom ARIA roles when available", "Always replace HTML tags with ARIA", "Never use ARIA in modern web apps", "ARIA is only for mobile browsers"], answer: 0 }
        ]
      },
      {
        id: "t33",
        title: "33. HTML Performance & Resource Hints",
        content: `
          <h2>HTML Performance Engineering</h2>
          <p>High-performance websites load faster, retain users, and rank higher on search engines:</p>
          <pre>&lt;!-- 1. Resource Hints in &lt;head&gt; --&gt;
&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
&lt;link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin&gt;

&lt;!-- 2. Non-blocking Scripts: defer vs async --&gt;
&lt;!-- defer: Downloads in background, executes after HTML parsing is complete (Safest) --&gt;
&lt;script src="/js/app.js" defer&gt;&lt;/script&gt;

&lt;!-- async: Executes the instant it finishes downloading, independent of DOM --&gt;
&lt;script src="/js/analytics.js" async&gt;&lt;/script&gt;</pre>
        `,
        quiz: [
          { q: "What does the 'defer' attribute on a <script> tag do?", options: ["Blocks HTML parsing until execution completes", "Downloads script in background and executes after HTML is completely parsed", "Stops script execution on mobile", "Reruns the script every 10 seconds"], answer: 1 },
          { q: "Which link attribute establishes an early network handshake to an external CDN?", options: ["rel='preconnect'", "rel='fast'", "rel='early'", "rel='speed'"], answer: 0 },
          { q: "Which script attribute is best suited for independent third-party analytics trackers?", options: ["defer", "async", "block", "lazy"], answer: 1 }
        ]
      },
      {
        id: "t34",
        title: "34. Capstone Architecture & Best Practices",
        content: `
          <h2>Production Capstone Project Architecture</h2>
          <p>Synthesizing everything learned into a complete, professional, production-ready website:</p>
          <pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Rahul Verma — Senior Frontend Engineer&lt;/title&gt;
  &lt;meta name="description" content="Portfolio of Rahul Verma, specializing in high-performance web architecture."&gt;
  &lt;link rel="stylesheet" href="style.css"&gt;
  &lt;script src="app.js" defer&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;
    &lt;nav aria-label="Main Navigation"&gt;
      &lt;a href="#about"&gt;About&lt;/a&gt;
      &lt;a href="#projects"&gt;Projects&lt;/a&gt;
      &lt;a href="#contact"&gt;Contact&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/header&gt;
  &lt;main&gt;
    &lt;section id="about"&gt;
      &lt;h1&gt;Engineering Fast, Accessible Web Experiences&lt;/h1&gt;
    &lt;/section&gt;
  &lt;/main&gt;
  &lt;footer&gt;
    &lt;p&gt;&copy; 2026 Rahul Verma. All rights reserved.&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
        `,
        quiz: [
          { q: "What element encloses navigation links with semantic landmark status?", options: ["<nav>", "<menu>", "<links>", "<navbar>"], answer: 0 },
          { q: "Where should external stylesheet <link> tags reside?", options: ["Inside <head>", "Before </body>", "Inside <footer>", "Directly inside <h1>"], answer: 0 },
          { q: "What attribute clarifies the specific purpose of a navigation menu to screen readers?", options: ["aria-label='Main Navigation'", "name='main'", "role='nav'", "type='menu'"], answer: 0 }
        ]
      }
    ]
  },

  full_development: {
    name: "Full Projects & Game Dev",
    icon: "🛠️",
    desc: "Real-world web development from scratch: SaaS landing pages, e-commerce product stores, interactive image maps, advanced tables, and HTML5 Canvas games.",
    topics: [
      {
        id: "t35",
        title: "35. Project: Complete SaaS Landing Page",
        content: `
          <h2>Building a Modern SaaS Landing Page</h2>
          <p>This full template demonstrates how all semantic HTML elements come together to create a commercial product landing page:</p>
          <pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;CloudFlow — Next-Gen Developer Platform&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!-- Sticky Navigation Bar --&gt;
  &lt;header&gt;
    &lt;nav&gt;
      &lt;div class="brand"&gt;&lt;b&gt;CloudFlow&lt;/b&gt;&lt;/div&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="#features"&gt;Features&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#pricing"&gt;Pricing&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#faq"&gt;FAQ&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
      &lt;a href="/login" class="btn"&gt;Sign In&lt;/a&gt;
    &lt;/nav&gt;
  &lt;/header&gt;

  &lt;main&gt;
    &lt;!-- Hero Section --&gt;
    &lt;section class="hero"&gt;
      &lt;h1&gt;Ship software at the speed of thought.&lt;/h1&gt;
      &lt;p&gt;Automate deployments, monitor server health, and collaborate in real time.&lt;/p&gt;
      &lt;form action="/signup" method="POST"&gt;
        &lt;input type="email" placeholder="Enter work email..." required&gt;
        &lt;button type="submit"&gt;Start Free Trial &rarr;&lt;/button&gt;
      &lt;/form&gt;
    &lt;/section&gt;

    &lt;!-- Features Grid --&gt;
    &lt;section id="features"&gt;
      &lt;h2&gt;Engineered for High-Scale Teams&lt;/h2&gt;
      &lt;div class="grid"&gt;
        &lt;article&gt;
          &lt;h3&gt;Instant Global CDN&lt;/h3&gt;
          &lt;p&gt;Deploy closer to your users across 300+ edge locations.&lt;/p&gt;
        &lt;/article&gt;
        &lt;article&gt;
          &lt;h3&gt;Zero-Downtime Rollouts&lt;/h3&gt;
          &lt;p&gt;Canary deployments with instant rollbacks built-in.&lt;/p&gt;
        &lt;/article&gt;
      &lt;/div&gt;
    &lt;/section&gt;
  &lt;/main&gt;

  &lt;footer&gt;
    &lt;p&gt;&copy; 2026 CloudFlow Inc. All rights reserved.&lt;/p&gt;
  &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
        `,
        quiz: [
          { q: "What semantic tag should contain the main header, logo, and primary links?", options: ["<header> containing <nav>", "<aside>", "<main>", "<section>"], answer: 0 },
          { q: "Why is an <article> element appropriate for feature cards in a landing page?", options: ["Because each card represents an independent, reusable piece of content", "It makes cards purple", "It prevents text copying", "It creates CSS animations"], answer: 0 },
          { q: "Where should the signup email form be placed semantically?", options: ["Directly in <head>", "Inside <section class='hero'> in <main>", "In the <meta> tags", "Only in the footer"], answer: 1 }
        ]
      },
      {
        id: "t36",
        title: "36. Project: E-Commerce Product Page",
        content: `
          <h2>Building an E-Commerce Product Showcase</h2>
          <p>Product pages require image galleries, specifications tables, review ratings, and add-to-cart forms:</p>
          <pre>&lt;article class="product-page"&gt;
  &lt;!-- Product Image Gallery --&gt;
  &lt;figure class="gallery"&gt;
    &lt;img src="laptop-main.webp" alt="UltraBook Pro 16-inch Space Grey" width="600" height="400"&gt;
    &lt;figcaption&gt;UltraBook Pro 16" (2026 Edition)&lt;/figcaption&gt;
  &lt;/figure&gt;

  &lt;!-- Product Details &amp; Purchase Form --&gt;
  &lt;section class="details"&gt;
    &lt;h1&gt;UltraBook Pro 16&quot;&lt;/h1&gt;
    &lt;p class="rating" aria-label="Rating: 4.9 out of 5 stars"&gt;&starf;&starf;&starf;&starf;&starf; (4.9 / 5 &bull; 1,280 reviews)&lt;/p&gt;
    &lt;p class="price"&gt;&lt;strong&gt;$1,999.00&lt;/strong&gt;&lt;/p&gt;

    &lt;form action="/cart/add" method="POST"&gt;
      &lt;fieldset&gt;
        &lt;legend&gt;Memory Option (RAM)&lt;/legend&gt;
        &lt;label&gt;&lt;input type="radio" name="ram" value="16gb" checked&gt; 16 GB Unified&lt;/label&gt;
        &lt;label&gt;&lt;input type="radio" name="ram" value="32gb"&gt; 32 GB Unified (+$400)&lt;/label&gt;
      &lt;/fieldset&gt;

      &lt;label for="qty"&gt;Quantity:&lt;/label&gt;
      &lt;input type="number" id="qty" name="quantity" min="1" max="5" value="1"&gt;

      &lt;button type="submit"&gt;Add to Shopping Cart&lt;/button&gt;
    &lt;/form&gt;

    &lt;!-- Technical Specifications Table --&gt;
    &lt;h2&gt;Technical Specifications&lt;/h2&gt;
    &lt;table&gt;
      &lt;tr&gt;&lt;th scope="row"&gt;Processor&lt;/th&gt;&lt;td&gt;12-Core Silicon CPU&lt;/td&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;th scope="row"&gt;Display&lt;/th&gt;&lt;td&gt;Liquid Retina XDR (120Hz)&lt;/td&gt;&lt;/tr&gt;
      &lt;tr&gt;&lt;th scope="row"&gt;Battery Life&lt;/th&gt;&lt;td&gt;Up to 22 Hours&lt;/td&gt;&lt;/tr&gt;
    &lt;/table&gt;
  &lt;/section&gt;
&lt;/article&gt;</pre>
        `,
        quiz: [
          { q: "Why is aria-label='Rating: 4.9 out of 5 stars' used on the star rating element?", options: ["To color stars yellow", "To announce the numeric rating clearly to screen readers", "To prevent users from clicking stars", "To link to Google reviews"], answer: 1 },
          { q: "Which element semantically groups product options like memory size or color?", options: ["<fieldset> with <legend>", "<div> only", "<span> only", "<select-box>"], answer: 0 },
          { q: "How should technical specifications be structured in HTML?", options: ["A series of bold line breaks", "An accessible <table> with <th scope='row'>", "Inside an <iframe>", "In the <head> tags"], answer: 1 }
        ]
      },
      {
        id: "t37",
        title: "37. Image Maps & Interactive Hotspots (&lt;map&gt;)",
        content: `
          <h2>Creating Clickable Image Maps (&lt;map&gt; &amp; &lt;area&gt;)</h2>
          <p>Image maps allow specific geometric regions of an image to link to different URLs or trigger scripts:</p>
          <pre>&lt;!-- Image bound to map via 'usemap' attribute --&gt;
&lt;img src="world-map.jpg" alt="Interactive World Map" width="800" height="400" usemap="#worldMap"&gt;

&lt;!-- Define map regions --&gt;
&lt;map name="worldMap"&gt;
  &lt;!-- Rectangular Hotspot: coords='x1, y1, x2, y2' --&gt;
  &lt;area shape="rect" coords="50,50,200,180" href="/usa" alt="United States Offices"&gt;

  &lt;!-- Circular Hotspot: coords='centerX, centerY, radius' --&gt;
  &lt;area shape="circle" coords="550,150,45" href="/japan" alt="Tokyo Headquarters"&gt;

  &lt;!-- Polygon Hotspot: coords='x1,y1, x2,y2, x3,y3...' --&gt;
  &lt;area shape="poly" coords="400,80, 460,120, 390,160" href="/europe" alt="European Division"&gt;
&lt;/map&gt;</pre>
        `,
        quiz: [
          { q: "Which attribute links an <img> to a <map name='myMap'>?", options: ["map='myMap'", "usemap='#myMap'", "href='#myMap'", "target='myMap'"], answer: 1 },
          { q: "What coordinates are required for a shape='circle' <area>?", options: ["x1, y1, x2, y2", "centerX, centerY, radius", "width, height", "top, left, right, bottom"], answer: 1 },
          { q: "Why is the alt attribute required on every <area> element?", options: ["It ensures accessibility for keyboard and screen-reader users navigating map links", "It draws a red line", "It makes links open in a new tab", "It is needed for PNG images"], answer: 0 }
        ]
      },
      {
        id: "t38",
        title: "38. Scalable Vector Graphics (SVG) in HTML",
        content: `
          <h2>Inline SVG Mastery</h2>
          <p>Unlike pixel-based JPGs or PNGs, SVG graphics scale infinitely without losing sharpness, and can be styled directly with CSS:</p>
          <pre>&lt;!-- Inline SVG Icon / Logo --&gt;
&lt;svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shield Logo"&gt;
  &lt;!-- Gradient Definition --&gt;
  &lt;defs&gt;
    &lt;linearGradient id="shieldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"&gt;
      &lt;stop stop-color="#38bdf8"/&gt;
      &lt;stop offset="1" stop-color="#6366f1"/&gt;
    &lt;/linearGradient&gt;
  &lt;/defs&gt;

  &lt;!-- Vector Path Shape --&gt;
  &lt;path d="M50 10 L85 25 V55 C85 75 50 90 50 90 C50 90 15 75 15 55 V25 Z" fill="url(#shieldGrad)"/&gt;
  
  &lt;!-- Checkmark inside shield --&gt;
  &lt;path d="M38 50 L46 58 L64 40" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/&gt;
&lt;/svg&gt;</pre>
        `,
        quiz: [
          { q: "What is the primary advantage of SVG over raster images (JPEG/PNG)?", options: ["SVG files are always larger", "SVG is resolution-independent and scales infinitely without pixelation", "SVG only works on Windows", "SVG cannot be styled with CSS"], answer: 1 },
          { q: "What does the 'viewBox' attribute define on an <svg>?", options: ["The aspect ratio and internal coordinate system", "The browser window size", "The background color", "The download URL"], answer: 0 },
          { q: "How can you color an SVG path directly?", options: ["color: red", "fill='#38bdf8' or fill='url(#grad)'", "background-image", "tint='blue'"], answer: 1 }
        ]
      },
      {
        id: "t39",
        title: "39. Advanced Responsive & Financial Tables",
        content: `
          <h2>Enterprise Invoices &amp; Responsive Tables</h2>
          <p>Designing complex financial ledgers and receipt invoices with multi-column spans and currency totals:</p>
          <pre>&lt;table class="invoice-table"&gt;
  &lt;caption&gt;Invoice #INV-2026-089 &bull; Due October 1, 2026&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Description&lt;/th&gt;
      &lt;th scope="col" style="text-align: right;"&gt;Qty&lt;/th&gt;
      &lt;th scope="col" style="text-align: right;"&gt;Rate&lt;/th&gt;
      &lt;th scope="col" style="text-align: right;"&gt;Amount&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Cloud Hosting Infrastructure (Monthly)&lt;/td&gt;
      &lt;td style="text-align: right;"&gt;1&lt;/td&gt;
      &lt;td style="text-align: right;"&gt;$500.00&lt;/td&gt;
      &lt;td style="text-align: right;"&gt;$500.00&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Frontend Architecture Consulting&lt;/td&gt;
      &lt;td style="text-align: right;"&gt;10&lt;/td&gt;
      &lt;td style="text-align: right;"&gt;$150.00&lt;/td&gt;
      &lt;td style="text-align: right;"&gt;$1,500.00&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
  &lt;tfoot&gt;
    &lt;tr&gt;
      &lt;th scope="row" colspan="3" style="text-align: right;"&gt;Subtotal:&lt;/th&gt;
      &lt;td style="text-align: right;"&gt;$2,000.00&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row" colspan="3" style="text-align: right;"&gt;Tax (10%):&lt;/th&gt;
      &lt;td style="text-align: right;"&gt;$200.00&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row" colspan="3" style="text-align: right;"&gt;&lt;strong&gt;Total Due:&lt;/strong&gt;&lt;/th&gt;
      &lt;td style="text-align: right;"&gt;&lt;strong&gt;$2,200.00&lt;/strong&gt;&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;</pre>
        `,
        quiz: [
          { q: "How do you make the summary labels in an invoice table span across 3 columns?", options: ["rowspan='3'", "colspan='3'", "merge='3'", "span='3'"], answer: 1 },
          { q: "Where do subtotal, tax, and final amount rows belong semantically?", options: ["Inside <tfoot>", "Inside <thead>", "Inside <head>", "In a separate <p> tag"], answer: 0 },
          { q: "What CSS property helps wide tables scroll smoothly on small mobile screens?", options: ["overflow-x: auto", "display: flex", "table-layout: fixed", "white-space: nowrap"], answer: 0 }
        ]
      },
      {
        id: "t40",
        title: "40. Game Architecture with Canvas & JavaScript",
        content: `
          <h2>HTML5 Canvas Game Architecture</h2>
          <p>Building video games in HTML5 follows an architectural loop: <b>Update State &rarr; Clear Canvas &rarr; Render Graphics &rarr; Loop with requestAnimationFrame</b>:</p>
          <pre>&lt;canvas id="gameCanvas" width="400" height="400" style="background: #060a12; border: 2px solid #38bdf8;"&gt;&lt;/canvas&gt;

&lt;script&gt;
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Game state
  let playerX = 180, playerY = 320;
  let score = 0;

  // Listen to keyboard input
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" &amp;&amp; playerX &gt; 10) playerX -= 15;
    if (e.key === "ArrowRight" &amp;&amp; playerX &lt; 350) playerX += 15;
  });

  // Game Loop
  function gameLoop() {
    // 1. Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw player spacecraft
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(playerX + 20, playerY);
    ctx.lineTo(playerX + 40, playerY + 40);
    ctx.lineTo(playerX, playerY + 40);
    ctx.closePath();
    ctx.fill();

    // 3. Render Score UI
    ctx.fillStyle = "#fbbf24";
    ctx.font = "16px 'Inter', sans-serif";
    ctx.fillText("Score: " + score, 20, 30);

    // 4. Request next frame for 60fps smooth animation
    requestAnimationFrame(gameLoop);
  }

  // Start game engine
  requestAnimationFrame(gameLoop);
&lt;/script&gt;</pre>
        `,
        quiz: [
          { q: "Which browser API synchronizes animation frame rendering with the display refresh rate (60Hz/120Hz)?", options: ["setInterval()", "requestAnimationFrame()", "setTimeout()", "setImmediate()"], answer: 1 },
          { q: "Why must ctx.clearRect() be called at the start of every game frame?", options: ["To save memory", "To erase the previous frame's drawings before rendering new positions", "To change canvas background", "To reset scores"], answer: 1 },
          { q: "How do you detect arrow key presses in an HTML5 game?", options: ["window.addEventListener('keydown', handler)", "canvas.onpress", "document.keyWatcher()", "HTML tags only"], answer: 0 }
        ]
      }
    ]
  }
};
