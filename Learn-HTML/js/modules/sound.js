/**
 * HTML Master — Sound Synthesis Module (Web Audio API)
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Sound = (function() {
  let audioCtx = null;
  let muted = false;

  try {
    muted = localStorage.getItem("htmlMasterMuted") === "true";
  } catch (e) {
    muted = false;
  }

  function getContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, gainVal, delay) {
    if (muted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = ctx.currentTime + (delay || 0);
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(gainVal || 0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      // Audio context might be restricted before first interaction
    }
  }

  return {
    isMuted: function() {
      return muted;
    },
    toggleMute: function() {
      muted = !muted;
      try {
        localStorage.setItem("htmlMasterMuted", muted ? "true" : "false");
      } catch (e) {}
      return muted;
    },
    click: function() {
      playTone(600, "sine", 0.05, 0.05, 0);
    },
    success: function() {
      playTone(523.25, "triangle", 0.12, 0.12, 0);       // C5
      playTone(659.25, "triangle", 0.15, 0.12, 0.08);    // E5
      playTone(783.99, "sine", 0.28, 0.15, 0.16);        // G5
    },
    fail: function() {
      playTone(320, "sawtooth", 0.15, 0.08, 0);
      playTone(260, "sawtooth", 0.22, 0.08, 0.1);
    },
    fanfare: function() {
      playTone(523.25, "triangle", 0.15, 0.12, 0);       // C5
      playTone(659.25, "triangle", 0.15, 0.12, 0.1);     // E5
      playTone(783.99, "triangle", 0.15, 0.12, 0.2);     // G5
      playTone(1046.50, "sine", 0.45, 0.18, 0.32);       // C6
    }
  };
})();
