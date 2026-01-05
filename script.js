document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     MODE TEST
     true  = test tarikh
     false = tarikh sebenar (LIVE)
  ===================== */
  const TEST_MODE = true;

  // Tarikh palsu untuk test (bebas ubah)
  const TEST_NOW = new Date("2026-02-15T12:00:00").getTime();

  const nowTime = () => TEST_MODE ? TEST_NOW : Date.now();

  /* =====================
     TARIKH DAFTAR SEBENAR
  ===================== */
  const DAFTAR_BUKA = new Date("2026-03-01T00:00:00").getTime();

  const btn = document.getElementById("btn-daftar");
  if (!btn) return;

  // simpan link asal
  const originalLink = btn.getAttribute("href");

  function kawalLinkDaftar() {
    const now = nowTime();

    if (now < DAFTAR_BUKA) {
      // BELUM BUKA → KUNCI
      btn.classList.add("disabled");
      btn.removeAttribute("href");
    } else {
      // DAH BUKA → BOLEH KLIK
      btn.classList.remove("disabled");
      btn.setAttribute("href", originalLink);
    }
  }

  kawalLinkDaftar();
  setInterval(kawalLinkDaftar, 60000); // semak setiap 1 minit
});

const DAFTAR_TUTUP = new Date("2026-07-20T23:59:59").getTime();


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






