document.addEventListener("DOMContentLoaded", () => {

  /* MODE TEST */
  const TEST_MODE = false;
  const TEST_NOW  = new Date("2026-03-10T12:00:00").getTime();
  const nowTime = () => TEST_MODE ? TEST_NOW : Date.now();

  /* TARIKH MASTER */
  const TARIKH = {
    daftarBuka:  "2026-03-01T00:00:00",
    daftarTutup: "2026-07-20T23:59:59",
    event:       "2026-07-04T08:00:00"
  };

  const daftarBuka  = new Date(TARIKH.daftarBuka).getTime();
  const daftarTutup = new Date(TARIKH.daftarTutup).getTime();
  const eventDate   = new Date(TARIKH.event).getTime();

/* =====================
   STATUS PENDAFTARAN
===================== */
function checkPendaftaran() {
  if (!daftarEl || !btnDaftar) return;

  const now = nowTime();

  // reset
  btnDaftar.classList.remove("disabled");

  if (originalLink) {
    btnDaftar.setAttribute("href", originalLink);
  }

  if (now < daftarBuka) {
    daftarEl.textContent =
      "Pendaftaran akan dibuka dari 1 Mac hingga 20 Julai 2026";
    btnDaftar.classList.add("disabled");
    btnDaftar.removeAttribute("href");
  }
  else if (now <= daftarTutup) {
    daftarEl.textContent =
      "Pendaftaran dibuka dari 1 Mac hingga 20 Julai 2026";
  }
  else {
    daftarEl.textContent =
      "Pendaftaran telah ditutup";
    btnDaftar.classList.add("disabled");
    btnDaftar.removeAttribute("href");
  }
}

checkPendaftaran();
setInterval(checkPendaftaran, 60000);                          


