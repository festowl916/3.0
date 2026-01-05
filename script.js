document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     MODE TEST / LIVE
  ===================== */
  const TEST_MODE = true; // ← tukar false bila LIVE

  let fakeNow = new Date("2026-06-20T00:01:00").getTime();
  const nowTime = () => TEST_MODE ? (fakeNow += 1000) : Date.now();

  /* =====================
     TARIKH DAFTAR
  ===================== */
  const DAFTAR_BUKA  = new Date("2026-03-01T00:00:00").getTime();
  const DAFTAR_TUTUP = new Date("2026-06-20T23:59:59").getTime();

  const btn = document.getElementById("btn-daftar");
  const originalLink = btn?.getAttribute("href");

  function kawalLinkDaftar() {
    if (!btn) return;

    const now = nowTime();

    if (now < DAFTAR_BUKA) {
      btn.classList.add("disabled");
      btn.removeAttribute("href");

    } else if (now <= DAFTAR_TUTUP) {
      btn.classList.remove("disabled");
      btn.setAttribute("href", originalLink);

    } else {
      btn.classList.add("disabled");
      btn.removeAttribute("href");
    }
  
  /* =====================
     COUNTDOWN FESTIVAL
     (TIADA KAITAN DENGAN DAFTAR)
  ===================== */
  const eventDate = new Date("2026-07-04T08:00:00").getTime();

  function updateCountdown() {
    const now = nowTime();
    const distance = eventDate - now;

    const d = document.getElementById("days");
    const h = document.getElementById("hours");
    const m = document.getElementById("minutes");
    const s = document.getElementById("seconds");

    if (!d || !h || !m || !s) return;

    if (distance <= 0) {
      d.textContent = h.textContent =
      m.textContent = s.textContent = "0";
      return;
    }

    d.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
    h.textContent = Math.floor((distance / (1000 * 60 * 60)) % 24);
    m.textContent = Math.floor((distance / (1000 * 60)) % 60);
    s.textContent = Math.floor((distance / 1000) % 60);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

});




