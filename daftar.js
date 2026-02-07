window.onerror = function(msg, url, line) {
  alert("JS Error: " + msg + " (line " + line + ")");
};

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-Irmyl9MK242dz7nz8NQCJ4XWIv6GsCsUEL4-rnWEvF0VFVFMEwnxRY91JrEmG-ErBg/exec";

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

  if (mode && bulkControls) {
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

    const semuaPeserta = [];

    // peserta utama
    semuaPeserta.push({
      nama_penuh: form.nama_penuh.value,
      nama_kelab: form.nama_kelab.value,
      kategori_karbon: form.kategori_karbon.value,
      kategori_natural: form.kategori_natural.value,
      negeri: form.negeri.value,
      ic: form.ic.value,
      telefon: form.telefon.value,
      jenis: form.jenis.value,
      saiz_baju: "",
      catatan_baju: "",
      alamat: "",
      fileName: "",
      fileType: "",
      fileData: ""
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
          <p>Data telah diterima oleh pihak penganjur.</p>
          <button onclick="location.reload()">
            Daftar peserta lain
          </button>
        </div>
      `;
    })
    .catch(()=>{
      alert("Gagal hantar");
    });

  });

});
