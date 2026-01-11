document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  const status = document.getElementById("status");

  const negeriSelect = document.getElementById("negeri");
  const negeriLain = document.getElementById("negeri_lain");

  /* ===== SUBMIT FORM (TEST MODE) ===== */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(this);

    console.log("=== DATA DIHANTAR ===");
    for (let item of data.entries()) {
      console.log(item[0], item[1]);
    }

    status.textContent = "✅ Pendaftaran diterima (MODE UJIAN)";
    status.style.color = "green";

    this.reset();
    negeriLain.style.display = "none";
  });

  /* ===== NEGERI OTHER ===== */
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

});
