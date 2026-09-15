/**
 * HTML Master — Toast Notification System
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Toast = (function() {
  function getContainer() {
    let c = document.getElementById("toastContainer");
    if (!c) {
      c = document.createElement("div");
      c.id = "toastContainer";
      document.body.appendChild(c);
    }
    return c;
  }

  return {
    show: function(msg, type, duration) {
      const container = getContainer();
      const toast = document.createElement("div");
      const toastType = type || "info";
      toast.className = `toast toast-${toastType}`;

      let icon = "ℹ️";
      if (toastType === "success") icon = "✅";
      if (toastType === "error") icon = "❌";
      if (toastType === "achievement") icon = "🏆";

      toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px) scale(0.95)";
        setTimeout(() => {
          if (toast.parentElement) toast.parentElement.removeChild(toast);
        }, 300);
      }, duration || 3200);
    }
  };
})();
