document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  const status = document.getElementById("status");

  const negeriSelect = document.getElementById("negeriSelect");
  const negeriLain = document.getElementById("negeriLain");

  const jenis = document.getElementById("jenisPendaftaran");

  const kategoriSection = document.getElementById("kategoriSection");
  const icSection = document.getElementById("icSection");
  const saizBajuSection = document.getElementById("saizBajuSection");

  const kategoriBaju = document.getElementById("kategoriBaju");
  const saizInput = document.getElementById("saizInput");
  const saizBajuFinal = document.getElementById("saizBajuFinal");

  /* ===============================
     NEGERI / NEGARA (OTHER)
  =============================== */
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
     KAWAL MEDAN IKUT PILIHAN
  =============================== */
  function kawalMedan() {
    const v = jenis.value;

    if (v === "dengan_baju") {
      // DAFTAR BAJU
      kategoriSection.style.display = "block";
      icSection.style.display = "block";
      saizBajuSection.style.display = "block";

    } else if (v === "tanpa_baju") {
      // TANPA BAJU
      kategoriSection.style.display = "block";
      icSection.style.display = "block";
      saizBajuSection.style.display = "none";

      kategoriBaju.value = "";
      saizInput.value = "";
      saizBajuFinal.value = "";

    } else if (v === "beli_baju") {
      // BELI BAJU SAHAJA
      kategoriSection.style.display = "none";
      icSection.style.display = "none";
      saizBajuSection.style.display = "block";
    }
  }

  jenis.addEventListener("change", kawalMedan);
  kawalMedan(); // run awal

  /* ===============================
     SUBMIT (TEST MODE)
  =============================== */
  form.addEventListener("submit", e => {
    e.preventDefault();

    // Gabung saiz baju → 1 kolum
    const k = kategoriBaju.value;
    const s = saizInput.value.trim();
    saizBajuFinal.value = k && s ? `${k} ${s}` : "";

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
