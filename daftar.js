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
      negeriLain.focus();
    } else {
      negeriLain.style.display = "none";
      negeriLain.required = false;
      negeriLain.value = "";
    }
  });

  /* ===============================
     PILIHAN JENIS PENDAFTARAN
  =============================== */
  const pilihanRadios = document.querySelectorAll(
    'input[name="pilihan_baju"]'
  );

  const kategoriSection = document.querySelector(
    'select[name="arrow_carbon"]'
  ).closest("label").parentElement;

  const icSection = document.querySelector(
    'input[name="ic"]'
  ).closest("label").parentElement;

  const saizBajuSection = document.getElementById("saizBajuSection");

  const kategoriBaju = document.getElementById("kategoriBaju");
  const saizInput = document.getElementById("saizInput");
  const saizBajuFinal = document.getElementById("saizBajuFinal");

  const alamatInput = document.querySelector(
    'textarea[name="alamat_penghantaran"]'
  );

  /* ===============================
     KAWAL MEDAN IKUT PILIHAN
  =============================== */
  function kawalMedan() {
    const pilihan = document.querySelector(
      'input[name="pilihan_baju"]:checked'
    ).value;

    if (pilihan === "dengan_baju") {
      // ✅ DAFTAR + BAJU PERCUMA
      kategoriSection.style.display = "block";
      icSection.style.display = "block";

      saizBajuSection.style.display = "block";
      kategoriBaju.required = true;
      saizInput.required = true;
      alamatInput.required = true;

    } else if (pilihan === "tanpa_baju") {
      // ❌ DAFTAR TANPA BAJU
      kategoriSection.style.display = "block";
      icSection.style.display = "block";

      saizBajuSection.style.display = "none";
      kategoriBaju.required = false;
      saizInput.required = false;
      alamatInput.required = false;

      kategoriBaju.value = "";
      saizInput.value = "";
      saizBajuFinal.value = "";
      alamatInput.value = "";

    } else if (pilihan === "beli_baju") {
      // 🛒 BELI BAJU SAHAJA
      kategoriSection.style.display = "none";
      icSection.style.display = "none";

      saizBajuSection.style.display = "block";
      kategoriBaju.required = true;
      saizInput.required = true;
      alamatInput.required = true;
    }
  }

  pilihanRadios.forEach(r =>
    r.addEventListener("change", kawalMedan)
  );

  kawalMedan(); // run masa load

  /* ===============================
     SUBMIT FORM (MODE UJIAN)
  =============================== */
  form.addEventListener("submit", e => {
    e.preventDefault();

    // Gabung saiz baju → 1 kolum sahaja
    const kategori = kategoriBaju.value;
    const saiz = saizInput.value.trim();

    if (kategori && saiz) {
      saizBajuFinal.value = `${kategori} ${saiz}`;
    } else {
      saizBajuFinal.value = "";
    }

    // LOG UNTUK TEST
    const data = new FormData(form);
    console.log("=== DATA DIHANTAR ===");
    for (let d of data.entries()) {
      console.log(d[0], d[1]);
    }

    status.textContent = "✅ Pendaftaran diterima (MODE UJIAN)";
    status.style.color = "green";

    form.reset();
    negeriLain.style.display = "none";
    kawalMedan();
  });

});
