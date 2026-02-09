document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-Irmyl9MK242dz7nz8NQCJ4XWIv6GsCsUEL4-rnWEvF0VFVFMEwnxRY91JrEmG-ErBg/exec";

  const button = document.getElementById("submitBtn");
  const spinner = document.getElementById("spinner");
  const btnText = document.getElementById("btnText");


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

  /* =========================
     KIRA UMUR
  ========================= */
  function kiraUmur(ic) {
    const tahun = parseInt(ic.substring(0,2));
    const currentYear = new Date().getFullYear() % 100;
    let fullYear = tahun > currentYear ? 1900 + tahun : 2000 + tahun;
    return new Date().getFullYear() - fullYear;
  }

  /* =========================
     SUBMIT
  ========================= */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    if (!form.kategori_karbon.value &&
        !form.kategori_natural.value) {
      alert("Sila pilih sekurang-kurangnya satu kategori.");
      return;
    }

    const ic = form.ic.value.trim();
    if (!/^\d{12}$/.test(ic)) {
      alert("Nombor IC mesti 12 digit.");
      return;
    }

    const umur = kiraUmur(ic);
    const karbon = form.kategori_karbon.value.toUpperCase();

    if (umur <= 12 && !karbon.includes("CILIK")) {
      alert("Umur 12 tahun ke bawah hanya kategori CILIK.");
      return;
    }

    if (umur >= 13 && umur <= 17 && !karbon.includes("REMAJA")) {
      alert("Umur 13–17 hanya kategori REMAJA.");
      return;
    }

    if (form.jenis.value === "baju") {
      const saizRadio = form.querySelector("input[name='saiz_baju']:checked");

      if (!saizRadio) {
        alert("Sila pilih saiz baju.");
        return;
      }

      if (saizRadio.value === "lain" &&
          !form.saiz_baju_lain.value.trim()) {
        alert("Sila nyatakan saiz lain.");
        return;
      }

      if (!form.alamat.value.trim()) {
        alert("Sila isi alamat penghantaran.");
        return;
      }
    }

    button.disabled = true;
    spinner.style.display = "inline-block";
    btnText.textContent = "Menghantar...";

    let negeri = form.negeri.value;
    if (negeri === "lain") negeri = form.negeri_lain.value;

    let saiz = "";
    const saizRadio = form.querySelector("input[name='saiz_baju']:checked");
    if (saizRadio) {
      saiz = saizRadio.value === "lain"
        ? form.saiz_baju_lain.value
        : saizRadio.value;
    }

    const data = {
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
    };

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data)
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


