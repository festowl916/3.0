document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  const status = document.getElementById("status");

  const negeriSelect = document.getElementById("negeriSelect");
  const negeriLain = document.getElementById("negeriLain");

  const kategoriBaju = document.getElementById("kategoriBaju");
  const saizInput = document.getElementById("saizInput");
  const saizBajuFinal = document.getElementById("saizBajuFinal");

  /* ===============================
     TOGGLE NEGERI / NEGARA (OTHER)
  =============================== */
  negeriSelect.addEventListener("change", function () {
    if (this.value === "OTHER") {
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
     SUBMIT FORM (MODE UJIAN)
  =============================== */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    /* === GABUNG SAIZ BAJU (1 KOLUM) === */
    const kategori = kategoriBaju?.value || "";
    const saiz = saizInput?.value.trim() || "";

    if (kategori && saiz) {
      saizBajuFinal.value = `${kategori} ${saiz}`;
    } else if (kategori) {
      saizBajuFinal.value = kategori;
    } else {
      saizBajuFinal.value = "";
    }

    /* === LOG DATA (TEST SAHAJA) === */
    const data = new FormData(form);
    console.log("=== DATA DIHANTAR ===");
    for (let item of data.entries()) {
      console.log(item[0], item[1]);
    }

    status.textContent = "✅ Pendaftaran diterima (MODE UJIAN)";
    status.style.color = "green";

    form.reset();
    negeriLain.style.display = "none";
  });

});
