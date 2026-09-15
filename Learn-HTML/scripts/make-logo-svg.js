const fs = require('fs');
const imgData = fs.readFileSync('assets/logo.png').toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83 83" width="83" height="83">
  <defs>
    <clipPath id="circleClip">
      <circle cx="41.5" cy="41.5" r="38" />
    </clipPath>
  </defs>
  <circle cx="41.5" cy="41.5" r="39" fill="#030712" stroke="#38bdf8" stroke-width="2" />
  <image href="data:image/jpeg;base64,${imgData}" x="0" y="0" width="83" height="83" clip-path="url(#circleClip)" />
</svg>`;
fs.writeFileSync('assets/logo.svg', svg);
console.log('assets/logo.svg created successfully!');
