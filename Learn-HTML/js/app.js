/**
 * HTML Master — Application Controller & Router
 */
window.HTMLMaster = window.HTMLMaster || {};

(function() {
  function showView(viewId) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add("active");
    }

    // Update active nav button
    document.querySelectorAll("nav button[data-view]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-view") === viewId);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    window.HTMLMaster.modules.Topics.renderHome();
    showView("view-home");
  }

  function resetAllData() {
    if (confirm("Reset all progress, quiz scores, challenges, and profiles on this device? This action cannot be undone.")) {
      window.HTMLMaster.modules.Storage.resetAll();
      window.HTMLMaster.modules.Topics.renderHome();
      window.HTMLMaster.modules.Profile.renderNavUser();
      goHome();
      window.HTMLMaster.modules.Toast.show("All progress reset.", "info");
    }
  }

  function toggleSound() {
    const isMuted = window.HTMLMaster.modules.Sound.toggleMute();
    const btn = document.getElementById("soundToggleBtn");
    if (btn) {
      btn.innerHTML = isMuted ? "🔇" : "🔊";
      btn.title = isMuted ? "Unmute sound effects" : "Mute sound effects";
    }
    window.HTMLMaster.modules.Toast.show(isMuted ? "Sound muted" : "Sound enabled", "info", 1500);
  }

  // Global hotkeys
  window.addEventListener("keydown", (e) => {
    // Ctrl+Enter or Cmd+Enter to run code in playground or challenges
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      const activeView = document.querySelector(".view.active");
      if (activeView && activeView.id === "view-playground") {
        e.preventDefault();
        window.HTMLMaster.modules.Playground.runCode();
        window.HTMLMaster.modules.Toast.show("Code executed (Ctrl+Enter)", "info", 1500);
      } else if (activeView && activeView.id === "view-challenges") {
        e.preventDefault();
        window.HTMLMaster.modules.Challenges.runTests();
      }
    }
  });

  // Export methods to global namespace
  window.HTMLMaster.showView = showView;
  window.HTMLMaster.goHome = goHome;
  window.HTMLMaster.resetAllData = resetAllData;
  window.HTMLMaster.toggleSound = toggleSound;

  // Initialize on DOM load
  function init() {
    const Storage = window.HTMLMaster.modules.Storage;
    const currentUser = Storage.getCurrentUser();
    Storage.syncAllUsers();

    // Clear the profile created by older builds so first launch can show registration.
    if (currentUser && currentUser.name === "Learner" && !currentUser.email && !currentUser.phone && !currentUser.dob) {
      Storage.logoutUser();
    }

    // Check sound state
    const soundBtn = document.getElementById("soundToggleBtn");
    if (soundBtn && window.HTMLMaster.modules.Sound.isMuted()) {
      soundBtn.innerHTML = "🔇";
    }

    // Render components
    window.HTMLMaster.modules.Topics.renderHome();
    window.HTMLMaster.modules.Profile.renderNavUser();

    // Initialize dynamic roaming background
    if (window.HTMLMaster.modules.Background) {
      window.HTMLMaster.modules.Background.init();
    }

    if (!Storage.getCurrentUser()) {
      window.HTMLMaster.modules.Profile.openProfile();
    }

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
