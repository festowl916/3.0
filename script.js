document.addEventListener("DOMContentLoaded", function () {

  const daftarBuka  = new Date("2026-03-01T00:00:00").getTime();
  const daftarTutup = new Date("2026-06-20T23:59:59").getTime();

  const daftarEl = document.getElementById("pendaftaran-info");
  const btnDaftar = document.getElementById("btn-daftar");

  console.log("JS LOAD:", daftarEl, btnDaftar);

  if (!daftarEl || !btnDaftar) return;

  function checkPendaftaran() {
    const now = Date.now();

    daftarEl.classList.remove("open", "closed");
    btnDaftar.classList.remove("disabled");

    if (now < daftarBuka) {
      daftarEl.innerText = "Pendaftaran akan dibuka pada 1 Mac 2026";
      daftarEl.classList.add("closed");
      btnDaftar.classList.add("disabled");
    }
    else if (now <= daftarTutup) {
      daftarEl.innerText = "Pendaftaran sedang dibuka sehingga 20 Jun 2026";
      daftarEl.classList.add("open");
    }
    else {
      daftarEl.innerText = "Pendaftaran telah ditutup";
      daftarEl.classList.add("closed");
      btnDaftar.classList.add("disabled");
    }
  }

  checkPendaftaran();
  setInterval(checkPendaftaran, 60000);
});


