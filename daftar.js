window.onerror = function(msg, url, line) {
  alert("JS Error: " + msg + " (line " + line + ")");
};

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzYlxhtacak8h9A2uhwZerlSkSixdpdz58TmIcHz0jw4IrqIVia6Ezx92ZpsfV1k37e-g/exec";

  const jenis = document.getElementById("jenis");
  const sectionBaju = document.getElementById("sectionBaju");

  function toggleBaju(){
    if (!sectionBaju || !jenis) return;
    sectionBaju.style.display =
      jenis.value === "baju" ? "block" : "none";
  }

  if (jenis) {
    jenis.addEventListener("change", toggleBaju);
    toggleBaju();
  }

  const mode = document.getElementById("mode");
  const bulkControls = document.getElementById("bulkControls");

  if (mode && bulkControls) {
    mode.addEventListener("change", () => {
      bulkControls.style.display =
        mode.value === "pukal" ? "block" : "none";
    });
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();

    const button = document.getElementById("submitBtn");
    const spinner = document.getElementById("spinner");
    const btnText = document.getElementById("btnText");

    button.disabled = true;
    spinner.style.display = "inline";
    btnText.textContent = "Menghantar...";

    const ic = form.ic.value.trim();
    const karbon = form.kategori_karbon.value.toUpperCase();

    if (!/^\d{12}$/.test(ic)) {
      alert("Nombor IC mesti 12 digit.");
      resetBtn();
      return;
    }

    const tahun = parseInt(ic.substring(0, 2));
    const currentYear = new Date().getFullYear() % 100;

    let fullYear = tahun > currentYear
      ? 1900 + tahun
      : 2000 + tahun;

    const umur = new Date().getFullYear() - fullYear;

    if (umur <= 12 && !karbon.includes("CILIK")) {
      alert("Umur 12 tahun ke bawah hanya kategori CILIK.");
      resetBtn();
      return;
    }

    if (umur >= 13 && umur <= 17 && !karbon.includes("REMAJA")) {
      alert("Umur 13–17 hanya kategori REMAJA.");
      resetBtn();
      return;
    }

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify([{
        nama_penuh: form.nama_penuh.value,
        nama_kelab: form.nama_kelab.value,
        kategori_karbon: form.kategori_karbon.value,
        kategori_natural: form.kategori_natural.value,
        negeri: form.negeri.value,
        ic: form.ic.value,
        telefon: form.telefon.value,
        jenis: form.jenis.value
      }])
    })
    .then(res => res.text())
    .then(text => {
      form.innerHTML = `<h2>${text}</h2>`;
    })
    .catch(()=>{
      alert("Gagal hantar");
      resetBtn();
    });

    function resetBtn(){
      button.disabled = false;
      spinner.style.display = "none";
      btnText.textContent = "Hantar Pendaftaran";
    }

  });

});
