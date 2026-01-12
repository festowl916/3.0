document.addEventListener("DOMContentLoaded", () => {

  const negeriSelect = document.getElementById("negeriSelect");
  const negeriLain = document.getElementById("negeriLain");

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
  function kawalBaju() {
    const jenis = document.querySelector(
      'input[name="jenis_pendaftaran"]:checked'
    ).value;

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

  document
    .querySelectorAll('input[name="jenis_pendaftaran"]')
    .forEach(r => r.addEventListener("change", kawalBaju));

  kawalBaju();
});
