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



    status.textContent = "✅ Pendaftaran diterima (MODE UJIAN)";
    status.style.color = "green";

    form.reset();
    negeriLain.style.display = "none";
    kawalMedan();
  });

});


