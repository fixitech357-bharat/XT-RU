/**
 * HTML Master — Dynamic HTML5 Canvas Certificate Generator & LinkedIn Sharer
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.modules = window.HTMLMaster.modules || {};

window.HTMLMaster.modules.Certificate = (function() {
  function generate() {
    window.HTMLMaster.showView("view-certificate");
    renderCanvasCertificate();
  }

  function renderCanvasCertificate() {
    const canvas = document.getElementById("certCanvas");
    if (!canvas) return;

    // High resolution canvas dimensions
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");

    const user = window.HTMLMaster.modules.Storage.getCurrentUser();
    const candidateName = user ? user.name : "Rahul Verma";
    const examScore = user && user.exam ? Math.round((user.exam.score / user.exam.total) * 100) : 95;
    const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const credId = "HM-" + (user ? user.id.replace(/^u_/, '').slice(0, 8).toUpperCase() : "2026-A1B2");

    // 1. Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
    bgGrad.addColorStop(0, "#080e1a");
    bgGrad.addColorStop(0.5, "#0e182c");
    bgGrad.addColorStop(1, "#060913");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 800);

    // 2. Ambient radial glow
    const glowGrad = ctx.createRadialGradient(600, 400, 50, 600, 400, 550);
    glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.08)");
    glowGrad.addColorStop(0.6, "rgba(99, 102, 241, 0.04)");
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, 1200, 800);

    // 3. Ornate Double Gold Borders
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 6;
    ctx.strokeRect(36, 36, 1128, 728);

    ctx.strokeStyle = "rgba(251, 191, 36, 0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, 1104, 704);

    // Corner Accents
    function drawCorner(x, y, flipX, flipY) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(flipX, flipY);
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 24);
      ctx.lineTo(24, 24);
      ctx.lineTo(24, 0);
      ctx.stroke();
      ctx.restore();
    }
    drawCorner(70, 70, 1, 1);
    drawCorner(1130, 70, -1, 1);
    drawCorner(70, 730, 1, -1);
    drawCorner(1130, 730, -1, -1);

    // 4. Header Badge / Emblem
    ctx.font = "bold 20px 'Inter', sans-serif";
    ctx.fillStyle = "#38bdf8";
    ctx.textAlign = "center";
    ctx.letterSpacing = "6px";
    ctx.fillText("HTML MASTER ACADEMY", 600, 120);

    // 5. Main Title
    ctx.font = "bold 52px 'Inter', sans-serif";
    const titleGrad = ctx.createLinearGradient(400, 180, 800, 180);
    titleGrad.addColorStop(0, "#fbbf24");
    titleGrad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = titleGrad;
    ctx.letterSpacing = "2px";
    ctx.fillText("CERTIFICATE OF EXCELLENCE", 600, 190);

    // Subtitle
    ctx.font = "italic 20px 'Inter', sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.letterSpacing = "1px";
    ctx.fillText("This is officially presented to acknowledge that", 600, 245);

    // 6. Recipient Name
    ctx.font = "bold 48px 'Inter', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.letterSpacing = "1px";
    ctx.fillText(candidateName, 600, 320);

    // Underline beneath name
    ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(350, 345);
    ctx.lineTo(850, 345);
    ctx.stroke();

    // 7. Statement of Achievement
    ctx.font = "19px 'Inter', sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.letterSpacing = "0.5px";
    ctx.fillText("has mastered HTML5, Semantic Web Architecture, Multimedia, Web Storage, ARIA Accessibility,", 600, 395);
    ctx.fillText(`and successfully passed the Comprehensive Master Examination with a score of ${examScore}%.`, 600, 428);

    // 8. Seal Medal on Left
    ctx.save();
    ctx.translate(280, 570);
    // Seal circle
    const sealGrad = ctx.createLinearGradient(-50, -50, 50, 50);
    sealGrad.addColorStop(0, "#fbbf24");
    sealGrad.addColorStop(1, "#d97706");
    ctx.fillStyle = sealGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 52, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#1e1b4b";
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("★", 0, 10);
    ctx.restore();

    // Seal label
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.fillStyle = "#fbbf24";
    ctx.textAlign = "center";
    ctx.fillText("VERIFIED CREDENTIAL", 280, 646);

    // 9. Signatures and Date on Right
    ctx.textAlign = "center";
    ctx.font = "16px 'Inter', sans-serif";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(dateStr, 880, 560);

    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(760, 580);
    ctx.lineTo(1000, 580);
    ctx.stroke();

    ctx.font = "13px 'Inter', sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("Date of Certification", 880, 602);

    // 10. Credential ID & Footer
    ctx.font = "12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#64748b";
    ctx.textAlign = "center";
    ctx.fillText(`Credential ID: ${credId} • Verified on HTML Master Official Registry`, 600, 715);
  }

  function downloadPNG() {
    const canvas = document.getElementById("certCanvas");
    if (!canvas) return;
    const user = window.HTMLMaster.modules.Storage.getCurrentUser();
    const safeName = (user ? user.name : "Learner").replace(/[^a-zA-Z0-9]/g, "_");

    const link = document.createElement("a");
    link.download = `HTML_Master_Certificate_${safeName}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.HTMLMaster.modules.Toast.show("Certificate downloaded in high resolution! 🎓", "success");
  }

  function shareLinkedIn() {
    const user = window.HTMLMaster.modules.Storage.getCurrentUser();
    const name = user ? user.name : "I";
    const score = user && user.exam ? Math.round((user.exam.score / user.exam.total) * 100) : 95;

    const shareText = encodeURIComponent(
      `🎉 Proud to share that I have achieved the HTML5 & Modern Web Architecture Certification from HTML Master with a score of ${score}%! 🚀\n\nCovering Semantic HTML, Responsive Design, Accessibility (a11y), and Performance Optimization.\n\n#HTML5 #WebDevelopment #FrontendDeveloper #Coding #Certified #TechSkills`
    );

    const shareUrl = encodeURIComponent(window.location.href);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${shareText}`;

    window.open(linkedInUrl, "_blank", "width=600,height=600");
  }

  return {
    generate: generate,
    renderCanvasCertificate: renderCanvasCertificate,
    downloadPNG: downloadPNG,
    shareLinkedIn: shareLinkedIn
  };
})();
