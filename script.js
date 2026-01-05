document.addEventListener("DOMContentLoaded", () => {

  /* =================================================
     MODE TEST / LIVE (UNTUK PENDAFTARAN SAHAJA)
  ================================================= */
  const TEST_MODE = true; // ← tukar false bila LIVE

  // Tarikh palsu untuk test (TUKAR DI SINI SAHAJA)
  let fakeNow = new Date("2026-02-15T12:00:00").getTime();

  // Masa untuk PENDAFTARAN
  const daftarTime = () =>
    TEST_MODE ? fakeNow : Date.now();

  // Gerakkan fake time (supaya test boleh berubah bila refresh)
  if (TEST_MODE) {
    setInterval(() => {
      fakeNow += 60 * 1000; // tambah 1 minit setiap minit
    }, 60000);
  }

  /* =====================
     TARIKH PENDAFTARAN
  ===================== */
  const DAFTAR_BUKA  = new Date("2026-03-01T00:00:00").getTime();
  const DAFTAR_TUTUP = new Date("2026-06-20T23:59:59").getTime();

  const btn = document.getElementById("btn-daftar");
  const originalLink = btn?.getAttribute("href");

  function kawalLinkDaftar() {
    if (!btn) return;

    const now = daftarTime();

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
  setInterval(kawalLinkDaftar, 60000); // semak setiap 1 minit

});

/* =================================================
   COUNTDOWN FESTIVAL (LIVE SEBENAR)
   ❌ TAK GUNA MODE TEST
   ❌ TAK GUNA fakeNow
================================================= */
const EVENT_DATE = new Date("2026-07-04T08:00:00").getTime();

function updateCountdown() {
  const now = Date.now(); // LIVE sebenar
  const distance = EVENT_DATE - now;

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
