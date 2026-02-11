document.addEventListener("DOMContentLoaded", () => {

  /* =================================================
     MODE TEST / LIVE (UNTUK PENDAFTARAN SAHAJA)
     ❗ tukar false bila LIVE
  ================================================= */
  const TEST_MODE = false;

  // Masa palsu untuk test (UBAH TARIKH DI SINI SAHAJA)
  let fakeNow = new Date("2026-02-21T00:02:00").getTime();

  const daftarTime = () => TEST_MODE ? fakeNow : Date.now();

  if (TEST_MODE) {
    setInterval(() => {
      fakeNow += 60 * 1000; // tambah 1 minit
    }, 60000);
  }

  /* =====================
     TARIKH PENDAFTARAN
  ===================== */
  const DAFTAR_BUKA  = new Date("2026-03-01T00:00:00").getTime();
  const DAFTAR_TUTUP = new Date("2026-06-20T23:59:59").getTime();

  const btn        = document.getElementById("btn-daftar");
  const info       = document.getElementById("pendaftaran-info");
  const statusDot  = document.querySelector(".status-mini .dot");
  const statusText = document.querySelector(".status-mini .status-text");
  const originalLink = btn?.getAttribute("href");

  if (!btn || !info || !statusDot || !statusText) return;

  function kawalLinkDaftar() {
    const now = daftarTime();

    // reset
    btn.classList.remove("disabled");
    info.classList.remove("belum", "buka", "tutup");
    statusDot.classList.remove("belum", "buka", "tutup");

    if (now < DAFTAR_BUKA) {
      // BELUM BUKA
      btn.classList.add("disabled");
      btn.removeAttribute("href");

      info.textContent =
        "Pendaftaran akan dibuka dari 1 Mac hingga 20 Jun 2026";
      info.classList.add("belum");

      statusDot.classList.add("belum");
      statusText.innerHTML = `
        <small>Buka: 1 Mac 2026 | Tutup: 20 Jun 2026</small>
      `;

    } else if (now <= DAFTAR_TUTUP) {
      // SEDANG BUKA
      btn.setAttribute("href", originalLink);

      info.textContent =
        "Pendaftaran dibuka dari 1 Mac hingga 20 Jun 2026";
      info.classList.add("buka");

      statusDot.classList.add("buka");
      statusText.innerHTML = `
        Sedang dibuka
        <small>Buka: 1 Mac 2026 | Tutup: 20 Jun 2026</small>
      `;

    } else {
      // SUDAH TUTUP
      btn.classList.add("disabled");
      btn.removeAttribute("href");

      info.textContent = "Pendaftaran telah ditutup";
      info.classList.add("tutup");

      statusDot.classList.add("tutup");
      statusText.innerHTML = `
        Pendaftaran ditutup
        <small>Tutup: 20 Jun 2026</small>
      `;
    }
  }

  kawalLinkDaftar();
  setInterval(kawalLinkDaftar, 60000);

  /* =================================================
     COUNTDOWN FESTIVAL (LIVE SEBENAR)
     ❌ TAK GUNA TEST MODE
  ================================================= */
  const EVENT_DATE = new Date("2026-07-04T08:00:00").getTime();

  function updateCountdown() {
    const now = Date.now(); // ikut waktu Malaysia
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

});

function openBaju() {
  document.getElementById("bajuModal").style.display = "flex";
}

function closeBaju(event) {
  document.getElementById("bajuModal").style.display = "none";
}






