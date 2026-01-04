document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     TARIKH MASTER
  ===================== */
  const TARIKH = {
    daftarBuka:  "2026-03-01T00:00:00",
    daftarTutup: "2026-07-20T23:59:59",
    event:       "2026-07-04T08:00:00"
  };

  const nowTime = () => Date.now();

  const daftarBuka  = new Date(TARIKH.daftarBuka).getTime();
  const daftarTutup = new Date(TARIKH.daftarTutup).getTime();
  const eventDate   = new Date(TARIKH.event).getTime();

  const daftarEl  = document.getElementById("pendaftaran-info");
  const btnDaftar = document.getElementById("btn-daftar");

  /* =====================
     STATUS PENDAFTARAN
  ===================== */
  function checkPendaftaran() {
    if (!daftarEl || !btnDaftar) return;

    const now = nowTime();

    btnDaftar.classList.remove("disabled");

    if (now < daftarBuka) {
      daftarEl.textContent =
        "Pendaftaran akan dibuka dari 1 Mac hingga 20 Julai 2026";
      btnDaftar.classList.add("disabled");
    }
    else if (now <= daftarTutup) {
      daftarEl.textContent =
        "Pendaftaran dibuka dari 1 Mac hingga 20 Julai 2026";
    }
    else {
      daftarEl.textContent =
        "Pendaftaran telah ditutup";
      btnDaftar.classList.add("disabled");
    }
  }

  /* =====================
     COUNTDOWN FESTIVAL
  ===================== */
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

  checkPendaftaran();
  updateCountdown();

  setInterval(checkPendaftaran, 60000);
  setInterval(updateCountdown, 1000);
});
