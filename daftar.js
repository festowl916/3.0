document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  const status = document.getElementById("status");

  /* ========= NEGERI OTHER ========= */
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

  /* ========= BAJU ========= */
  const radios = document.querySelectorAll('input[name="pilihan_baju"]');
  const saizBajuSection = document.getElementById("saizBajuSection");

  const kategoriBaju = document.getElementById("kategoriBaju");
  const saizInput = document.getElementById("saizInput");
  const saizBajuFinal = document.getElementById("saizBajuFinal");
  const alamatInput = document.querySelector(
    'textarea[name="alamat_penghantaran"]'
  );

  function kawalBaju() {
    const pilihan = document.querySelector(
      'input[name="pilihan_baju"]:checked'
    ).value;

    if (pilihan === "dengan_baju") {
      // ✅ DAFTAR DENGAN BAJU
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

  radios.forEach(r => r.addEventListener("change", kawalBaju));
  kawalBaju(); // run masa mula

  /* ========= SUBMIT ========= */
  form.addEventListener("submit", e => {
    e.preventDefault();

    if (kategoriBaju.value && saizInput.value.trim()) {
      saizBajuFinal.value =
        kategoriBaju.value + " " + saizInput.value.trim();
    } else {
      saizBajuFinal.value = "";
    }

    // TEST OUTPUT
    const data = new FormData(form);
    console.log("=== DATA DIHANTAR ===");
    for (let d of data.entries()) console.log(d[0], d[1]);

    status.textContent = "✅ Pendaftaran diterima (MODE UJIAN)";
    status.style.color = "green";

    form.reset();
    negeriLain.style.display = "none";
    kawalBaju();
  });

});
