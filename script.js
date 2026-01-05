document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     MODE TEST / LIVE
  ===================== */
  const TEST_MODE = true; // ❗ tukar false bila LIVE

  let fakeNow = new Date("2026-03-01T00:01:00").getTime();
  const daftarTime = () => TEST_MODE ? fakeNow : Date.now();

  if (TEST_MODE) {
    setInterval(() => {
      fakeNow += 60 * 1000;
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

    info.classList.remove("belum", "buka", "tutup");
    statusDot.classList.remove("belum", "buka", "tutup");

    if (now < DAFTAR_BUKA) {
      btn.classList.add("disabled");
      btn.removeAttribute("href");

      info.textContent =
        "Pendaftaran akan dibuka dari 1 Mac hingga 20 Jun 2026";
      info.classList.add("belum");

      statusDot.classList.add("belum");
      statusText.innerHTML = `
        Belum dibuka
        <small>Buka: 1 Mac 2026 | Tutup: 20 Jun 2026</small>
      `;

    } else if (now <= DAFTAR_TUTUP) {
      btn.classList.remove("disabled");
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

});




