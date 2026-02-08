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
      <label>Nama Penuh *</label>
      <input type="text" name="nama_penuh_tambahan[]" required>

      <label>No IC *</label>
      <input type="text" name="ic_tambahan[]" required>
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
    const karbon = form.kategori_karbon.value.toUpperCase();

    // IC mesti 12 digit
    if (!/^\d{12}$/.test(ic)) {
      alert("IC mesti 12 digit");
      resetBtn();
      return;
    }

    // kira umur dari IC
    const tahun = parseInt(ic.substring(0, 2));
    const currentYear = new Date().getFullYear() % 100;

    let fullYear = tahun > currentYear
      ? 1900 + tahun
      : 2000 + tahun;

    const umur = new Date().getFullYear() - fullYear;

    // VALIDASI CILIK
    if (umur <= 12 && !karbon.includes("CILIK")) {
      alert("Umur 12 tahun ke bawah hanya kategori CILIK");
      resetBtn();
      return;
    }

    // VALIDASI REMAJA
    if (umur >= 13 && umur <= 17 && !karbon.includes("REMAJA")) {
      alert("Umur 13–17 hanya kategori REMAJA");
      resetBtn();
      return;
    }

    // VALIDASI BAJU
    if (form.jenis.value === "baju") {
      const saizRadio = form.querySelector("input[name='saiz_baju']:checked");

      if (!saizRadio) {
        alert("Sila pilih saiz baju");
        resetBtn();
        return;
      }

      if (saizRadio.value === "lain" &&
          !form.saiz_baju_lain.value.trim()) {
        alert("Sila isi saiz lain");
        resetBtn();
        return;
      }

      if (!form.alamat.value.trim()) {
        alert("Sila isi alamat");
        resetBtn();
        return;
      }
    }

    // hantar data
    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        nama: form.nama_penuh.value
      })
    })
    .then(res => res.text())
    .then(text => {
      form.innerHTML = `
        <div style="text-align:center;padding:30px">
          <h2>${text}</h2>
          <button onclick="location.reload()">Daftar lagi</button>
        </div>
      `;
    })
    .catch(()=>{
      alert("Gagal hantar");
      resetBtn();
    });

  });

});
