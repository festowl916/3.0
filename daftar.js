document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");

  const negeriSelect = document.getElementById("negeriSelect");
  const negeriLain = document.getElementById("negeriLain");

  const jenisPendaftaran = document.getElementById("jenisPendaftaran");
  const saizBajuSection = document.getElementById("saizBajuSection");
  const kategoriBaju = document.getElementById("kategoriBaju");
  const saizInput = document.getElementById("saizInput");
  const saizBajuFinal = document.getElementById("saizBajuFinal");
  const alamatInput = document.getElementById("alamatPenghantaran");

  /* NEGERI OTHER */
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

  /* KAWAL BAJU */
  function kawalMedan() {
    const jenis = jenisPendaftaran.value;

    if (jenis === "dengan_baju") {
      saizBajuSection.style.display = "block";
      kategoriBaju.required = true;
      saizInput.required = true;
      alamatInput.required = true;
    } else {
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

  // ❌ TIADA submit handler
  // ❌ TIADA reset
});
