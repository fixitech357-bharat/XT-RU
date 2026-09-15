/**
 * HTML Master — Hands-on Coding Challenges (HTML Lab)
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.data = window.HTMLMaster.data || {};

window.HTMLMaster.data.CHALLENGES = [
  {
    id: "ch1",
    title: "1. Semantic Article Layout",
    difficulty: "Beginner",
    description: "Construct a semantic blog entry. It must contain an <code>&lt;article&gt;</code> element, an <code>&lt;h1&gt;</code> for the main headline, at least one <code>&lt;p&gt;</code> paragraph, and a <code>&lt;time&gt;</code> tag specifying the publication date.",
    starterCode: `<!-- Write your semantic article below -->
<article>
  
</article>`,
    tests: [
      {
        desc: "Must contain an <article> element",
        check: function(doc) { return doc.querySelector("article") !== null; }
      },
      {
        desc: "Must have an <h1> headline inside the article",
        check: function(doc) { return doc.querySelector("article h1") !== null && doc.querySelector("article h1").textContent.trim().length > 0; }
      },
      {
        desc: "Must include at least one paragraph <p>",
        check: function(doc) { return doc.querySelector("article p") !== null && doc.querySelector("article p").textContent.trim().length > 0; }
      },
      {
        desc: "Must include a <time> element with a 'datetime' attribute",
        check: function(doc) {
          const t = doc.querySelector("article time");
          return t !== null && t.hasAttribute("datetime");
        }
      }
    ]
  },
  {
    id: "ch2",
    title: "2. Accessible Login Form",
    difficulty: "Beginner",
    description: "Build an accessible login form. Include a <code>&lt;form&gt;</code> with an email input (with <code>type='email'</code> and <code>required</code>), a password input (with <code>type='password'</code> and <code>required</code>), properly linked <code>&lt;label&gt;</code> tags using the <code>for</code> attribute matching each input's <code>id</code>, and a submit <code>&lt;button&gt;</code>.",
    starterCode: `<form action="/login" method="POST">
  <!-- Add email field with linked label -->

  <!-- Add password field with linked label -->

  <!-- Add submit button -->

</form>`,
    tests: [
      {
        desc: "Contains an email input with type='email' and 'required'",
        check: function(doc) {
          const inp = doc.querySelector("input[type='email']");
          return inp !== null && inp.hasAttribute("required");
        }
      },
      {
        desc: "Contains a password input with type='password' and 'required'",
        check: function(doc) {
          const inp = doc.querySelector("input[type='password']");
          return inp !== null && inp.hasAttribute("required");
        }
      },
      {
        desc: "Every input has an associated <label for='...'> matching its id",
        check: function(doc) {
          const inputs = doc.querySelectorAll("input");
          if (inputs.length < 2) return false;
          for (let i = 0; i < inputs.length; i++) {
            const id = inputs[i].id;
            if (!id || !doc.querySelector(`label[for='${id}']`)) return false;
          }
          return true;
        }
      },
      {
        desc: "Contains a submit button (<button type='submit'> or <button>)",
        check: function(doc) {
          const btn = doc.querySelector("button");
          return btn !== null && btn.textContent.trim().length > 0;
        }
      }
    ]
  },
  {
    id: "ch3",
    title: "3. Accessible Figure & Image Caption",
    difficulty: "Beginner",
    description: "Embed an image using <code>&lt;figure&gt;</code>. The <code>&lt;img&gt;</code> must have a valid <code>src</code>, a descriptive <code>alt</code> attribute, and <code>loading='lazy'</code>. Provide a caption using <code>&lt;figcaption&gt;</code>.",
    starterCode: `<!-- Embed figure with image and caption -->
<figure>

</figure>`,
    tests: [
      {
        desc: "Contains a <figure> element",
        check: function(doc) { return doc.querySelector("figure") !== null; }
      },
      {
        desc: "Image has src, descriptive alt attribute, and loading='lazy'",
        check: function(doc) {
          const img = doc.querySelector("figure img");
          return img !== null && img.hasAttribute("src") && img.getAttribute("alt") && img.getAttribute("alt").trim().length > 3 && img.getAttribute("loading") === "lazy";
        }
      },
      {
        desc: "Contains a <figcaption> with text content inside the figure",
        check: function(doc) {
          const cap = doc.querySelector("figure figcaption");
          return cap !== null && cap.textContent.trim().length > 0;
        }
      }
    ]
  },
  {
    id: "ch4",
    title: "4. Semantic Data Table with Scopes",
    difficulty: "Intermediate",
    description: "Create a data table displaying student grades. Include a <code>&lt;caption&gt;</code>, a <code>&lt;thead&gt;</code> with column header cells (<code>&lt;th scope='col'&gt;</code>), and a <code>&lt;tbody&gt;</code> containing at least 2 rows with row headers (<code>&lt;th scope='row'&gt;</code>) and numeric data cells (<code>&lt;td&gt;</code>).",
    starterCode: `<table>
  <!-- Add caption, thead, and tbody -->

</table>`,
    tests: [
      {
        desc: "Table includes a <caption> element with description",
        check: function(doc) {
          const cap = doc.querySelector("table caption");
          return cap !== null && cap.textContent.trim().length > 0;
        }
      },
      {
        desc: "Table has <thead> with <th scope='col'> headers",
        check: function(doc) {
          const thead = doc.querySelector("table thead");
          const cols = doc.querySelectorAll("thead th[scope='col']");
          return thead !== null && cols.length >= 2;
        }
      },
      {
        desc: "Table has <tbody> with at least 2 rows (<tr>) and row headers (<th scope='row'>)",
        check: function(doc) {
          const rows = doc.querySelectorAll("tbody tr");
          const rowHeaders = doc.querySelectorAll("tbody th[scope='row']");
          const dataCells = doc.querySelectorAll("tbody td");
          return rows.length >= 2 && rowHeaders.length >= 2 && dataCells.length >= 2;
        }
      }
    ]
  },
  {
    id: "ch5",
    title: "5. Native Audio Player with Fallback",
    difficulty: "Intermediate",
    description: "Embed an HTML5 audio player using <code>&lt;audio&gt;</code> with standard playback controls (<code>controls</code>). Provide at least one <code>&lt;source&gt;</code> tag with <code>type='audio/mpeg'</code>, and a text fallback for older browsers.",
    starterCode: `<!-- Add native audio element with controls and source -->
`,
    tests: [
      {
        desc: "Contains an <audio> element with the 'controls' attribute",
        check: function(doc) {
          const aud = doc.querySelector("audio");
          return aud !== null && aud.hasAttribute("controls");
        }
      },
      {
        desc: "Includes a <source> tag with src and type='audio/mpeg'",
        check: function(doc) {
          const src = doc.querySelector("audio source");
          return src !== null && src.hasAttribute("src") && src.getAttribute("type") === "audio/mpeg";
        }
      },
      {
        desc: "Contains fallback text inside the <audio> tag for unsupported browsers",
        check: function(doc) {
          const aud = doc.querySelector("audio");
          return aud !== null && aud.textContent.trim().length > 5;
        }
      }
    ]
  },
  {
    id: "ch6",
    title: "6. Interactive Disclosure Accordion (<details>)",
    difficulty: "Intermediate",
    description: "Implement an interactive FAQ disclosure item without using any JavaScript! Use the native HTML5 <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> tags, with an answer paragraph inside.",
    starterCode: `<!-- Create an expandable FAQ item -->
`,
    tests: [
      {
        desc: "Contains a <details> element",
        check: function(doc) { return doc.querySelector("details") !== null; }
      },
      {
        desc: "Contains a <summary> element with question title inside <details>",
        check: function(doc) {
          const s = doc.querySelector("details summary");
          return s !== null && s.textContent.trim().length > 3;
        }
      },
      {
        desc: "Contains a paragraph <p> with answer content inside <details>",
        check: function(doc) {
          const p = doc.querySelector("details p");
          return p !== null && p.textContent.trim().length > 5;
        }
      }
    ]
  },
  {
    id: "ch7",
    title: "7. Accessible Icon Action Button",
    difficulty: "Advanced",
    description: "Screen readers need accessible labels for icon-only buttons. Create a <code>&lt;button&gt;</code> containing an emoji or SVG icon, equipped with a descriptive <code>aria-label</code> and a custom <code>data-action='delete-item'</code> attribute.",
    starterCode: `<!-- Create icon button with accessibility & data attribute -->
`,
    tests: [
      {
        desc: "Contains a <button> element",
        check: function(doc) { return doc.querySelector("button") !== null; }
      },
      {
        desc: "Button has a descriptive 'aria-label' attribute",
        check: function(doc) {
          const btn = doc.querySelector("button");
          return btn !== null && btn.getAttribute("aria-label") && btn.getAttribute("aria-label").trim().length > 3;
        }
      },
      {
        desc: "Button has custom data attribute 'data-action=\"delete-item\"'",
        check: function(doc) {
          const btn = doc.querySelector("button");
          return btn !== null && btn.getAttribute("data-action") === "delete-item";
        }
      }
    ]
  },
  {
    id: "ch8",
    title: "8. HTML5 Native Modal (<dialog>)",
    difficulty: "Advanced",
    description: "Create a modern native HTML5 popup modal using <code>&lt;dialog&gt;</code>. Inside, include a heading <code>&lt;h3&gt;</code>, a paragraph, and a <code>&lt;form method='dialog'&gt;</code> containing a close button.",
    starterCode: `<!-- Create native HTML5 dialog element -->
<dialog id="confirmDialog">

</dialog>`,
    tests: [
      {
        desc: "Contains a <dialog> element",
        check: function(doc) { return doc.querySelector("dialog") !== null; }
      },
      {
        desc: "Contains a heading and paragraph inside the <dialog>",
        check: function(doc) {
          const h = doc.querySelector("dialog h2, dialog h3, dialog h4");
          const p = doc.querySelector("dialog p");
          return h !== null && p !== null;
        }
      },
      {
        desc: "Contains a <form method='dialog'> with a close button",
        check: function(doc) {
          const form = doc.querySelector("dialog form[method='dialog']");
          const btn = doc.querySelector("dialog form[method='dialog'] button");
          return form !== null && btn !== null;
        }
      }
    ]
  }
];
