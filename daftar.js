window.onerror = function(msg, url, line) {
  alert("JS Error: " + msg + " (line " + line + ")");
};

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzYlxhtacak8h9A2uhwZerlSkSixdpdz58TmIcHz0jw4IrqIVia6Ezx92ZpsfV1k37e-g/exec";

  /* =========================
     TOGGLE BAJU
  ========================= */
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

  /* =========================
     NEGERI LAIN-LAIN
  ========================= */
  const negeriSelect = document.getElementById("negeri");
  const inputNegeriLain = document.getElementById("inputNegeriLain");

  if (negeriSelect && inputNegeriLain) {
    negeriSelect.addEventListener("change", () => {
      if (negeriSelect.value === "lain") {
        inputNegeriLain.style.display = "block";
      } else {
        inputNegeriLain.style.display = "none";
        inputNegeriLain.value = "";
      }
    });
  }

  /* =========================
     SAIZ LAIN-LAIN
  ========================= */
  const radios = document.querySelectorAll("input[name='saiz_baju']");
  const inputSaizLain = document.getElementById("inputSaizLain");

  if (radios.length && inputSaizLain) {
    radios.forEach(radio => {
      radio.addEventListener("change", () => {
        inputSaizLain.style.display =
          (radio.value === "lain" && radio.checked)
          ? "block"
          : "none";
      });
    });
  }

  /* =========================
     MODE PUKAL
  ========================= */
  const mode = document.getElementById("mode");
  const bulkControls = document.getElementById("bulkControls");
  const tambahBtn = document.getElementById("tambahPeserta");
  const pesertaContainer = document.getElementById("pesertaTambahan");

  if (mode && bulkControls && pesertaContainer) {
    mode.addEventListener("change", () => {
      if (mode.value === "pukal") {
        bulkControls.style.display = "block";
      } else {
        bulkControls.style.display = "none";
        pesertaContainer.innerHTML = "";
      }
    });
  }

  if (tambahBtn && pesertaContainer) {
    tambahBtn.addEventListener("click", () => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>Peserta Tambahan</h3>
        <label>Nama Penuh *</label>
        <input type="text" name="nama_penuh_tambahan[]" required>

        <label>No IC *</label>
        <input type="text" name="ic_tambahan[]" required>

        <label>Kategori Arrow Karbon</label>
        <select name="kategori_karbon_tambahan[]">
          <option value="">pilih kategori</option>
          <option>VETERAN</option>
          <option>DEWASA LELAKI</option>
          <option>DEWASA WANITA</option>
          <option>REMAJA LELAKI</option>
          <option>REMAJA PEREMPUAN</option>
          <option>CILIK LELAKI</option>
          <option>CILIK PEREMPUAN</option>
        </select>

        <label>Kategori Arrow Natural</label>
        <select name="kategori_natural_tambahan[]">
          <option value="">pilih kategori</option>
          <option>TERBUKA LELAKI</option>
          <option>TERBUKA WANITA</option>
        </select>
      `;
      pesertaContainer.appendChild(card);
    });
  }

  /* =========================
     SUBMIT FORM
  ========================= */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const button = document.getElementById("submitBtn");
    const spinner = document.getElementById("spinner");
    const btnText = document.getElementById("btnText");

    function resetBtn(){
      button.disabled = false;
      spinner.style.display = "none";
      btnText.textContent = "Hantar Pendaftaran";
    }

    button.disabled = true;
    spinner.style.display = "inline";
    btnText.textContent = "Menghantar...";

    // =========================
    // VALIDASI IC & UMUR
    // =========================
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

    // =========================
    // VALIDASI BAJU + ALAMAT
    // =========================
    if (form.jenis.value === "baju") {

      const saizRadio = form.querySelector("input[name='saiz_baju']:checked");

      if (!saizRadio) {
        alert("Sila pilih saiz baju.");
        resetBtn();
        return;
      }

      if (saizRadio.value === "lain" &&
          (!form.saiz_baju_lain || !form.saiz_baju_lain.value.trim())) {
        alert("Sila nyatakan saiz baju lain-lain.");
        resetBtn();
        return;
      }

      if (!form.alamat || !form.alamat.value.trim()) {
        alert("Sila isi alamat penghantaran.");
        resetBtn();
        return;
      }
    }

    // =========================
    // HANTAR DATA
    // =========================
    const negeri =
      form.negeri.value === "lain"
        ? form.negeri_lain.value
        : form.negeri.value;

    const peserta = [{
      nama_penuh: form.nama_penuh.value,
      nama_kelab: form.nama_kelab.value,
      kategori_karbon: form.kategori_karbon.value,
      kategori_natural: form.kategori_natural.value,
      negeri: negeri,
      ic: form.ic.value,
      telefon: form.telefon.value,
      jenis: form.jenis.value,
      saiz_baju: "",
      catatan_baju: form.catatan_baju?.value || "",
      alamat: form.alamat?.value || ""
    }];

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(peserta)
    })
    .then(res => res.text())
    .then(text => {
      form.innerHTML = `
        <div style="text-align:center;padding:30px">
          <h2>${text}</h2>
          <button onclick="location.reload()">
            Daftar peserta lain
          </button>
        </div>
      `;
    })
    .catch(()=>{
      alert("Gagal hantar");
      resetBtn();
    });

  });

});
