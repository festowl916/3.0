document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     MODE TEST
     true  = test tarikh
     false = LIVE sebenar
  ===================== */
  const TEST_MODE = false;
  const TEST_NOW  = new Date("2026-02-15T12:00:00").getTime();
  const nowTime = () => TEST_MODE ? TEST_NOW : Date.now();

  /* =====================
     TARIKH DAFTAR
  ===================== */
  const DAFTAR_BUKA  = new Date("2026-03-01T00:00:00").getTime();
  const DAFTAR_TUTUP = new Date("2026-07-20T23:59:59").getTime();

  const btn = document.getElementById("btn-daftar");
  if (!btn) return;

  const originalLink = btn.getAttribute("href");

  function kawalLinkDaftar() {
    const now = nowTime();

    if (now < DAFTAR_BUKA) {
      // BELUM BUKA
      btn.classList.add("disabled");
      btn.removeAttribute("href");

    } else if (now <= DAFTAR_TUTUP) {
      // SEDANG BUKA
      btn.classList.remove("disabled");
      btn.setAttribute("href", originalLink);

    } else {
      // SUDAH TUTUP
      btn.classList.add("disabled");
      btn.removeAttribute("href");
    }
  }

  kawalLinkDaftar();
  setInterval(kawalLinkDaftar, 60000);

  /* =====================
     COUNTDOWN FESTIVAL
     (TIADA KAITAN DENGAN DAFTAR)
  ===================== */
  const eventDate = new Date("2026-07-04T08:00:00").getTime();

  function updateCountdown() {
    const now = nowTime(); // ikut TEST / LIVE yang sama
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

