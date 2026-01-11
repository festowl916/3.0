document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  const status = document.getElementById("status");

  /* ===============================
     NEGERI / NEGARA (OTHER)
  =============================== */
  const negeriSelect = document.getElementById("negeriSelect");
  const negeriLain = document.getElementById("negeriLain");

  negeriSelect.addEventListener("change", () => {
    if (negeriSelect.value === "OTHER") {
      negeriLain.style.display = "block";
      negeriLain.required = true;
    } else {
      negeriLain.style.display = "none";
      negeriLain.required = false;
      negeriLain.value = "";
    }
  });

  /* ===============================
     PILIHAN DAFTAR (2 SAHAJA)
  =============================== */
  const radios = document.querySelectorAll('input[name="pilihan_baju"]');

  const saizBajuSection = document.getElementById("saizBajuSection");
  const kategoriBaju = document.getElementById("kategoriBaju");
  const saizInput = document.getElementById("saizInput");
  const saizBajuFinal = document.getElementById("saizBajuFinal");
  const alamatInput = document.querySelector(
    'textarea[name="alamat_penghantaran"]'
  );

  function hideSaizBaju() {
    saizBajuSection.style.display = "none";

    kategoriBaju.required = false;
    saizInput.required = false;
    alamatInput.required = false;

    kategoriBaju.value = "";
    saizInput.value = "";
    saizBajuFinal.value = "";
    alamatInput.value = "";
  }

  function showSaizBaju() {
    saizBajuSection.style.display = "block";

    kategoriBaju.required = true;
    saizInput.required = true;
    alamatInput.required = true;
  }

  function kawalMedan() {
    const pilihan = document.querySelector(
      'input[name="pilihan_baju"]:checked'
    )?.value;

    if (pilihan === "dengan_baju") {
      showSaizBaju();
    } else {
      // SEMUA SELAIN DENGAN_BAJU → HIDE
      hideSaizBaju();
    }
  }

  radios.forEach(r => r.addEventListener("change", kawalMedan));

  // FORCE JALAN MASA LOAD (INI YANG SEBELUM NI TAK JADI)
  setTimeout(kawalMedan, 0);

  /* ===============================
     SUBMIT (MODE TEST)
  =============================== */
  form.addEventListener("submit", e => {
    e.preventDefault();

    if (saizBajuSection.style.display !== "none") {
      const k = kategoriBaju.value;
      const s = saizInput.value.trim();
      saizBajuFinal.value = k && s ? `${k} ${s}` : "";
    } else {
      saizBajuFinal.value = "";
    }

    const data = new FormData(form);
    console.log("=== DATA DIHANTAR ===");
    for (let d of data.entries()) console.log(d[0], d[1]);

    status.textContent = "✅ Pendaftaran diterima (MODE UJIAN)";
    status.style.color = "green";

    form.reset();
    negeriLain.style.display = "none";
    setTimeout(kawalMedan, 0);
  });

});
