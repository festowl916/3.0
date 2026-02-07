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
    function toggleNegeri(){
      if (negeriSelect.value === "lain") {
        inputNegeriLain.style.display = "block";
      } else {
        inputNegeriLain.style.display = "none";
        inputNegeriLain.value = "";
      }
    }

    negeriSelect.addEventListener("change", toggleNegeri);
    toggleNegeri();
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

  // AKTIFKAN SPINNER DI SINI
  const button = document.getElementById("submitBtn");
  const spinner = document.getElementById("spinner");
  const btnText = document.getElementById("btnText");

  button.disabled = true;
  spinner.style.display = "inline";
  btnText.textContent = "Menghantar...";

  const semuaPeserta = [];

   // =========================
  // VALIDASI BAJU (LETak SINI)
  // =========================
  if (form.jenis.value === "baju") {

    const saizRadio = form.querySelector("input[name='saiz_baju']:checked");

    if (!saizRadio) {
      alert("Sila pilih saiz baju.");
      button.disabled = false;
      spinner.style.display = "none";
      btnText.textContent = "Hantar Pendaftaran";
      return;
    }

    if (
      saizRadio.value === "lain" &&
      (!form.saiz_baju_lain || !form.saiz_baju_lain.value.trim())
    ) {
      alert("Sila nyatakan saiz baju lain-lain.");
      button.disabled = false;
      spinner.style.display = "none";
      btnText.textContent = "Hantar Pendaftaran";
      return;
    }

    if (!form.alamat || !form.alamat.value.trim()) {
      alert("Sila isi alamat penghantaran.");
      button.disabled = false;
      spinner.style.display = "none";
      btnText.textContent = "Hantar Pendaftaran";
      return;
    }
  }

  // ambil saiz baju
  let saiz = "";

    // ambil saiz baju
    let saiz = "";
    const saizRadio = form.querySelector("input[name='saiz_baju']:checked");
    if (saizRadio) {
      if (saizRadio.value === "lain") {
        saiz = form.saiz_baju_lain.value;
      } else {
        saiz = saizRadio.value;
      }
    }

    // ambil negeri
    let negeri = form.negeri.value;
    if (negeri === "lain" && form.negeri_lain) {
      negeri = form.negeri_lain.value;
    }


button.disabled = true;
spinner.style.display = "inline";
btnText.textContent = "Menghantar...";

    // ambil resit
    const file = form.resit.files[0];
    let fileData = "";
    let fileName = "";
    let fileType = "";

    const reader = new FileReader();

    reader.onload = function () {
      if (file) {
        fileData = reader.result.split(",")[1];
        fileName = file.name;
        fileType = file.type;
      }
      hantarSemua();
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      hantarSemua();
    }

    function hantarSemua() {

      const semuaPeserta = [];

      // peserta utama
      semuaPeserta.push({
        nama_penuh: form.nama_penuh.value,
        nama_kelab: form.nama_kelab.value,
        kategori_karbon: form.kategori_karbon.value,
        kategori_natural: form.kategori_natural.value,
        negeri: negeri,
        ic: form.ic.value,
        telefon: form.telefon.value,
        jenis: form.jenis.value,
        saiz_baju: saiz,
        catatan_baju: form.catatan_baju?.value || "",
        alamat: form.alamat?.value || "",
        fileName,
        fileType,
        fileData
      });

      // peserta tambahan
      const namaTambahan = form.querySelectorAll("input[name='nama_penuh_tambahan[]']");
      const icTambahan = form.querySelectorAll("input[name='ic_tambahan[]']");
      const karbonTambahan = form.querySelectorAll("select[name='kategori_karbon_tambahan[]']");
      const naturalTambahan = form.querySelectorAll("select[name='kategori_natural_tambahan[]']");

      for (let i = 0; i < namaTambahan.length; i++) {
        if (!namaTambahan[i].value.trim()) continue;

        semuaPeserta.push({
          nama_penuh: namaTambahan[i].value,
          nama_kelab: form.nama_kelab.value,
          kategori_karbon: karbonTambahan[i].value,
          kategori_natural: naturalTambahan[i].value,
          negeri: "",
          ic: icTambahan[i].value,
          telefon: "",
          jenis: "pukal",
          saiz_baju: "",
          catatan_baju: "",
          alamat: "",
          fileName: "",
          fileType: "",
          fileData: ""
        });
      }

      fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(semuaPeserta)
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
  button.disabled = false;
  spinner.style.display = "none";
  btnText.textContent = "Hantar Pendaftaran";
});  

    }

  });

});







