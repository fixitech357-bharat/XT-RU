/**
 * HTML Master — Comprehensive Final Exam (25 Questions)
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.data = window.HTMLMaster.data || {};

window.HTMLMaster.data.EXAM = [
  {
    q: "What does HTML stand for?",
    options: ["HyperText Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    answer: 0
  },
  {
    q: "Which HTML tag is used for the highest-level, most important heading on a page?",
    options: ["<h6>", "<h1>", "<head>", "<heading>"],
    answer: 1
  },
  {
    q: "Where must all visible content for visitors be placed inside an HTML document?",
    options: ["Inside <head>", "Inside <body>", "Inside <meta>", "Inside <title>"],
    answer: 1
  },
  {
    q: "Which tag produces an unordered, bulleted list?",
    options: ["<ol>", "<ul>", "<li>", "<dl>"],
    answer: 1
  },
  {
    q: "How do you configure an anchor <a> tag to open a link in a new tab securely?",
    options: ["target='_blank' rel='noopener noreferrer'", "new='true'", "open='new_window'", "href='external'"],
    answer: 0
  },
  {
    q: "Which attribute provides descriptive alternative text for an image when it fails to load or for screen readers?",
    options: ["title", "alt", "aria-desc", "caption"],
    answer: 1
  },
  {
    q: "In an HTML data table, which element represents an individual table row?",
    options: ["<td>", "<tr>", "<th>", "<row>"],
    answer: 1
  },
  {
    q: "Which input type masks characters with dots or asterisks for privacy?",
    options: ["text", "password", "hidden", "private"],
    answer: 1
  },
  {
    q: "What is the default display behavior of a <span> element?",
    options: ["Block", "Inline", "Flex", "Grid"],
    answer: 1
  },
  {
    q: "Which semantic HTML5 tag should wrap website navigation menus?",
    options: ["<nav>", "<menu>", "<links>", "<navbar>"],
    answer: 0
  },
  {
    q: "Which element provides native video streaming without third-party plugins?",
    options: ["<media>", "<video>", "<movie>", "<mp4>"],
    answer: 1
  },
  {
    q: "Which meta tag is required for responsive layout scaling across mobile and desktop devices?",
    options: ["charset='UTF-8'", "name='viewport'", "name='theme-color'", "property='og:type'"],
    answer: 1
  },
  {
    q: "Which HTML character entity represents the '<' (less than) symbol?",
    options: ["&lt;", "&gt;", "&amp;", "&copy;"],
    answer: 0
  },
  {
    q: "Which JavaScript method is used to obtain the 2D graphics rendering context on a <canvas> element?",
    options: ["getContext('2d')", "get2D()", "initContext()", "canvas.render2D()"],
    answer: 0
  },
  {
    q: "How do you read the custom attribute 'data-user-id' in modern JavaScript via the element's DOM properties?",
    options: ["el.data.userId", "el.dataset.userId", "el.getCustom('userId')", "el.data_user_id"],
    answer: 1
  },
  {
    q: "Which web storage mechanism keeps data stored permanently across browser closing and restarts?",
    options: ["sessionStorage", "localStorage", "cookieSession", "temporaryCache"],
    answer: 1
  },
  {
    q: "Which ARIA attribute provides an accessible name for an icon button that contains no visible text?",
    options: ["aria-title", "aria-label", "aria-hidden", "role-name"],
    answer: 1
  },
  {
    q: "Which HTML5 attribute enforces that a form field must not be submitted empty?",
    options: ["must-fill", "required", "mandatory", "validate"],
    answer: 1
  },
  {
    q: "Which CSS display property enables the 1-dimensional Flexbox layout system?",
    options: ["display: flex", "flex: on", "layout: flexbox", "position: flex"],
    answer: 0
  },
  {
    q: "Which CSS unit is calculated relative to the root (<html>) element's font size?",
    options: ["em", "rem", "vh", "px"],
    answer: 1
  },
  {
    q: "What does the 'defer' attribute on a <script> tag do?",
    options: [
      "Stops JavaScript from executing completely",
      "Downloads script in background and executes after HTML is fully parsed",
      "Forces script to run before HTML starts parsing",
      "Reruns the script every 5 seconds"
    ],
    answer: 1
  },
  {
    q: "Which element represents the main, central content area of a document?",
    options: ["<content>", "<main>", "<body>", "<section>"],
    answer: 1
  },
  {
    q: "Which image attribute enables native browser lazy-loading to optimize initial page load speed?",
    options: ["lazy='true'", "loading='lazy'", "defer='image'", "preload='none'"],
    answer: 1
  },
  {
    q: "Which tag is best suited for an independent, self-contained article or blog entry?",
    options: ["<section>", "<div>", "<article>", "<aside>"],
    answer: 2
  },
  {
    q: "What is the primary rule regarding ARIA attributes according to W3C accessibility guidelines?",
    options: [
      "Use ARIA on every element possible",
      "Prefer native semantic HTML elements over ARIA roles whenever available",
      "Never use ARIA with HTML5",
      "ARIA only works inside <header>"
    ],
    answer: 1
  }
];
