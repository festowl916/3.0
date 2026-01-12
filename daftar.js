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
     JENIS PENDAFTARAN (SELECT)
  =============================== */
  const jenisPendaftaran = document.getElementById("jenisPendaftaran");

  const saizBajuSection = document.getElementById("saizBajuSection");
  const kategoriBaju = document.getElementById("kategoriBaju");
  const saizInput = document.getElementById("saizInput");
  const saizBajuFinal = document.getElementById("saizBajuFinal");
  const alamatInput = document.getElementById("alamatPenghantaran");

  function kawalMedan() {
    const jenis = jenisPendaftaran.value;

    if (jenis === "dengan_baju") {
      // ✅ DAFTAR + BAJU
      saizBajuSection.style.display = "block";

      kategoriBaju.required = true;
      saizInput.required = true;
      alamatInput.required = true;

    } else {
      // ❌ DAFTAR TANPA BAJU
      saizBajuSection.style.display = "none";

      kategoriBaju.required = false;
      saizInput.required = false;
      alamatInput.required = false;

      kategoriBaju.value = "";
      saizInput.value = "";
      saizBajuFinal.value = "";
      alamatInput.value = "";
    }
  }

  jenisPendaftaran.addEventListener("change", kawalMedan);
  kawalMedan(); // jalan masa load

  /* ===============================
     SUBMIT (MODE UJIAN)
  =============================== */
  form.addEventListener("submit", e => {
    

    /* Gabung saiz baju → 1 kolum */
    if (kategoriBaju.value && saizInput.value.trim()) {
      saizBajuFinal.value =
        kategoriBaju.value + " " + saizInput.value.trim();
    } else {
      saizBajuFinal.value = "";
    }

    /* Semak sekurang-kurangnya satu kategori dipilih */
    const carbon = form.arrow_carbon.value;
    const natural = form.arrow_natural.value;

    if (!carbon && !natural) {
      alert("Sila pilih sekurang-kurangnya satu kategori Arrow.");
      return;
    }

    /* TEST OUTPUT */
    const data = new FormData(form);
    console.log("=== DATA DIHANTAR ===");
    for (let d of data.entries()) console.log(d[0], d[1]);

    status.textContent = "✅ Pendaftaran diterima (MODE UJIAN)";
    status.style.color = "green";

    form.reset();
    negeriLain.style.display = "none";
    kawalMedan();
  });

});

