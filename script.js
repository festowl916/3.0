document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     MODE TEST (PRO)
     Tukar true → false bila live
  ===================== */
  const TEST_MODE = false;
  const TEST_NOW  = new Date("2026-02-15T12:00:00").getTime(); // tarikh ujian

  const nowTime = () => TEST_MODE ? TEST_NOW : Date.now();

  /* =====================
     STATUS PENDAFTARAN
  ===================== */
  const daftarBuka  = new Date("2026-03-01T00:00:00").getTime();
  const daftarTutup = new Date("2026-06-20T23:59:59").getTime();

  const daftarEl = document.getElementById("pendaftaran-info");
  const btnDaftar = document.getElementById("btn-daftar");

  function checkPendaftaran() {
    if (!daftarEl || !btnDaftar) return;

    const now = nowTime();

    daftarEl.classList.remove("open", "closed");
    btnDaftar.classList.remove("disabled");

    if (now < daftarBuka) {
      daftarEl.textContent = "Pendaftaran akan dibuka pada 1 Mac 2026";
      daftarEl.classList.add("closed");
      btnDaftar.classList.add("disabled");
    }
    else if (now <= daftarTutup) {
      daftarEl.textContent = "Pendaftaran sedang dibuka sehingga 20 Jun 2026";
      daftarEl.classList.add("open");
    }
    else {
      daftarEl.textContent = "Pendaftaran telah ditutup";
      daftarEl.classList.add("closed");
      btnDaftar.classList.add("disabled");
    }
  }

  checkPendaftaran();
  setInterval(checkPendaftaran, 60000);

  /* =====================
     COUNTDOWN FESTIVAL
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
      d.textContent = h.textContent = m.textContent = s.textContent = "0";
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
