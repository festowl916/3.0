// Pastikan HTML dah load dulu
document.addEventListener("DOMContentLoaded", function () {

  // ✅ TEST (boleh padam lepas confirm jalan)
  console.log("script.js berjalan");

  // =========================
  // KESAN KLIK PADA CARD
  // =========================
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.add("clicked");
      setTimeout(() => {
        card.classList.remove("clicked");
      }, 200);
    });
  });

  // =========================
  // ANIMASI MASUK (fade-in)
  // =========================
  const elements = document.querySelectorAll(
    ".logo-area, .logo-group, h1, .subtitle, .card"
  );

  elements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, i * 120);
  });

});