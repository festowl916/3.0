document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     MODE TEST
     false = LIVE
     true  = TEST
  ===================== */
  const TEST_MODE = false;
  const TEST_NOW  = new Date("2026-02-15T12:00:00").getTime();
  const nowTime = () => TEST_MODE ? TEST_NOW : Date.now();

  /* =====================
     TARIKH PENDAFTARAN (FINAL)
  ===================== */
  const daftarBuka  = new Date("2026-03-01T00:00:00").getTime();
  const daftarTutup = new Date("2026-07-20T23:59:59").getTime();

  const daftarEl  = document.getElementById("pendaftaran-info");
  const btnDaftar = document.getElementById("btn-daftar");

  // simpan link asal
  const daftarLink = btnDaftar ? btnDaftar.getAttribute("href") : "";

  function checkPendaftaran() {
    if (!daftarEl || !btnDaftar) return;

    const now = nowTime();

    daftarEl.classList.remove("open", "closed");
    btnDaftar.classList.remove("disabled");

    if (now < daftarBuka) {
      // BELUM BUKA
      daftarEl.textContent =
        "Pendaftaran akan dibuka dari 1 Mac hingga 20 Julai 2026";
      daftarEl.classList.add("closed");
      btnDaftar.classList.add("disabled");
      btnDaftar.removeAttribute("href");

    } else if (now <= daftarTutup) {
      // SEDANG DIBUKA
      daftarEl.textContent =
        "Pendaftaran dibuka dari 1 Mac hingga 20 Julai 2026";
      daftarEl.classList.add("open");
      btnDaftar.setAttribute("href", daftarLink);

    } else {
      // SUDAH TUTUP
      daftarEl.textContent =
        "Pendaftaran telah ditutup";
      daftarEl.classList.add("closed");
      btnDaftar.classList.add("disabled");
      btnDaftar.removeAttribute("href");
    }
  }

  checkPendaftaran();
  setInterval(checkPendaftaran, 60000);

});
