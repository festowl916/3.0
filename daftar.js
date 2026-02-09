document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzYlxhtacak8h9A2uhwZerlSkSixdpdz58TmIcHz0jw4IrqIVia6Ezx92ZpsfV1k37e-g/exec";

  const button = document.getElementById("submitBtn");
  const spinner = document.getElementById("spinner");
  const btnText = document.getElementById("btnText");

  function resetBtn(){
    button.disabled = false;
    spinner.style.display = "none";
    btnText.textContent = "Hantar Pendaftaran";
  }

  /* =========================
     TOGGLE BAJU
  ========================= */
  const jenis = document.getElementById("jenis");
  const sectionBaju = document.getElementById("sectionBaju");

  function toggleBaju(){
    sectionBaju.style.display =
      jenis.value === "baju" ? "block" : "none";
  }

  jenis.addEventListener("change", toggleBaju);
  toggleBaju();

  /* =========================
     NEGERI LAIN
  ========================= */
  const negeriSelect = document.getElementById("negeri");
  const inputNegeriLain = document.getElementById("inputNegeriLain");

  negeriSelect.addEventListener("change", () => {
    if (negeriSelect.value === "lain") {
      inputNegeriLain.style.display = "block";
    } else {
      inputNegeriLain.style.display = "none";
      inputNegeriLain.value = "";
    }
  });

  /* =========================
     SAIZ LAIN
  ========================= */
  const radios = document.querySelectorAll("input[name='saiz_baju']");
  const inputSaizLain = document.getElementById("inputSaizLain");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      inputSaizLain.style.display =
        (radio.value === "lain" && radio.checked)
        ? "block"
        : "none";
    });
  });

  /* =========================
     MODE PUKAL
  ========================= */
  const mode = document.getElementById("mode");
  const bulkControls = document.getElementById("bulkControls");
  const tambahBtn = document.getElementById("tambahPeserta");
  const pesertaContainer = document.getElementById("pesertaTambahan");

  mode.addEventListener("change", () => {
    if (mode.value === "pukal") {
      bulkControls.style.display = "block";
    } else {
      bulkControls.style.display = "none";
      pesertaContainer.innerHTML = "";
    }
  });

  tambahBtn.addEventListener("click", () => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>Peserta Tambahan</h3>
      <label>Nama *</label>
      <input type="text" name="nama_penuh_tambahan[]" required>
      <label>No IC *</label>
      <input type="text" name="ic_tambahan[]" required>
      <label>Kategori Karbon</label>
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
      <label>Kategori Natural</label>
      <select name="kategori_natural_tambahan[]">
        <option value="">pilih kategori</option>
        <option>TERBUKA LELAKI</option>
        <option>TERBUKA WANITA</option>
      </select>
    `;
    pesertaContainer.appendChild(card);
  });

  /* =========================
     SUBMIT
  ========================= */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    button.disabled = true;
    spinner.style.display = "inline";
    btnText.textContent = "Menghantar...";

    const ic = form.ic.value.trim();

    if (!/^\d{12}$/.test(ic)) {
      alert("Nombor IC mesti 12 digit.");
      resetBtn();
      return;
    }

    if (form.jenis.value === "baju") {
      const saizRadio = form.querySelector("input[name='saiz_baju']:checked");

      if (!saizRadio) {
        alert("Sila pilih saiz baju.");
        resetBtn();
        return;
      }

      if (saizRadio.value === "lain" &&
          !form.saiz_baju_lain.value.trim()) {
        alert("Sila nyatakan saiz baju lain-lain.");
        resetBtn();
        return;
      }

      if (!form.alamat.value.trim()) {
        alert("Sila isi alamat penghantaran.");
        resetBtn();
        return;
      }
    }

    // ambil negeri
    let negeri = form.negeri.value;
    if (negeri === "lain") {
      negeri = form.negeri_lain.value;
    }

    // ambil saiz
    let saiz = "";
    const saizRadio = form.querySelector("input[name='saiz_baju']:checked");
    if (saizRadio) {
      saiz = saizRadio.value === "lain"
        ? form.saiz_baju_lain.value
        : saizRadio.value;
    }

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
      catatan_baju: form.catatan_baju.value,
      alamat: form.alamat.value
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
        alamat: ""
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
          <button onclick="location.reload()">Daftar peserta lain</button>
        </div>
      `;
    })
    .catch(()=>{
      alert("Gagal hantar");
      resetBtn();
    });

  });

});
