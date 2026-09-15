/**
 * HTML Master — Dynamic Roaming Background Canvas
 * Developed for XTutiRaiseUp by XSympan Technologies
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Background = (function() {
  let canvas, ctx;
  let width, height;
  let particles = [];
  let codeTokens = [];
  let mouse = { x: null, y: null, radius: 140 };
  let animId = null;

  const TAGS = [
    "<div>", "</div>", "<span>", "<canvas>", "<h1>", "</>",
    "<header>", "<code>", "<html>", "<body>", "<section>",
    "<article>", "<nav>", "<button>", "<input/>", "<svg>"
  ];

  const COLORS = [
    "rgba(56, 189, 248, ",   // Cyan
    "rgba(99, 102, 241, ",   // Indigo
    "rgba(168, 85, 247, ",   // Purple
    "rgba(16, 185, 129, ",   // Emerald
    "rgba(245, 158, 11, "    // Amber
  ];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.size = Math.random() * 2.2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.45 + 0.25;
      this.pulseSpeed = 0.02 + Math.random() * 0.02;
      this.pulseVal = Math.random() * Math.PI;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulseVal += this.pulseSpeed;

      // Wrap around edges
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;

      // Mouse interactive roaming
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = dx / dist;
          const dirY = dy / dist;
          this.x -= dirX * force * 1.8;
          this.y -= dirY * force * 1.8;
        }
      }
    }

    draw() {
      const currentAlpha = Math.max(0.1, this.alpha + Math.sin(this.pulseVal) * 0.2);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorBase}${currentAlpha})`;
      ctx.shadowColor = `${this.colorBase}0.8)`;
      ctx.shadowBlur = 8;
      ctx.fill();
    }
  }

  class RoamingToken {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.text = TAGS[Math.floor(Math.random() * TAGS.length)];
      this.x = initial ? Math.random() * width : Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = -(Math.random() * 0.45 + 0.2); // Roams upwards slowly
      this.fontSize = Math.floor(Math.random() * 6 + 12);
      this.colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.35 + 0.18;
      this.angle = (Math.random() - 0.5) * 0.2;
      this.rotSpeed = (Math.random() - 0.5) * 0.003;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.rotSpeed;

      if (this.y < -30) {
        this.reset(false);
      }
      if (this.x < -40) this.x = width + 40;
      if (this.x > width + 40) this.x = -40;

      // Mouse dodge
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius * 1.2) {
          const force = (mouse.radius * 1.2 - dist) / (mouse.radius * 1.2);
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.font = `bold ${this.fontSize}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `${this.colorBase}${this.alpha})`;
      ctx.shadowColor = `${this.colorBase}0.6)`;
      ctx.shadowBlur = 10;
      ctx.fillText(this.text, 0, 0);
      ctx.restore();
    }
  }

  function applyFixedStyles() {
    if (!canvas) return;
    canvas.style.setProperty("position", "fixed", "important");
    canvas.style.setProperty("top", "0px", "important");
    canvas.style.setProperty("left", "0px", "important");
    canvas.style.setProperty("width", "100vw", "important");
    canvas.style.setProperty("height", "100vh", "important");
    canvas.style.setProperty("pointer-events", "none", "important");
    canvas.style.setProperty("z-index", "-1", "important");
    canvas.style.setProperty("display", "block", "important");
    canvas.style.setProperty("margin", "0px", "important");
    canvas.style.setProperty("padding", "0px", "important");
  }

  function resize() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    applyFixedStyles();
  }

  function connectParticles() {
    const maxDist = 115;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.16;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    connectParticles();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Update & draw roaming code tokens
    for (let i = 0; i < codeTokens.length; i++) {
      codeTokens[i].update();
      codeTokens[i].draw();
    }

    animId = requestAnimationFrame(animate);
  }

  function init() {
    canvas = document.getElementById("roamingBackgroundCanvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    if (!ctx) return;

    applyFixedStyles();
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Mouse tracking
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    }, { passive: true });

    // Populate particles & tokens
    const particleCount = Math.min(55, Math.floor((width * height) / 22000));
    const tokenCount = Math.min(22, Math.floor((width * height) / 55000));

    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    codeTokens = [];
    for (let i = 0; i < tokenCount; i++) {
      codeTokens.push(new RoamingToken());
    }

    animate();
  }

  return {
    init: init
  };
})();
