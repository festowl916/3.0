window.onerror = function(msg, url, line) {
  alert("JS Error: " + msg + " (line " + line + ")");
};

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYIEIatnIu3-aah8PawT4NV29r_upDMCnhrQzUAudMh1Uaqi7ncpfBnZQfVI47iSpvRQ/exec";

  const jenis = document.getElementById("jenis");
const sectionBaju = document.getElementById("sectionBaju");
const descBaju = document.getElementById("descBaju");

  /* TOGGLE BAJU */
  function toggleBaju(){
  if (!sectionBaju || !jenis) return;

  const show = jenis.value === "daftar+baju";

  sectionBaju.style.display = show ? "block" : "none";

  if (descBaju) {
    descBaju.style.display = show ? "block" : "none";
  }
}
  if (jenis) {
    jenis.addEventListener("change", toggleBaju);
    toggleBaju();
  }

  /* NEGERI LAIN */
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

  const negeri = negeriSelect.value;

  const luarNegara = [
    "BRUNEI",
    "SINGAPURA",
    "INDONESIA",
    "THAILAND"
  ];

  const isLuar = luarNegara.includes(negeri) || negeri === "lain";

  // peserta utama
  const icInput = document.querySelector("input[name='ic']");
  if (icInput) {
    if (isLuar) {
      icInput.removeAttribute("pattern");
      icInput.removeAttribute("maxlength");
      icInput.removeAttribute("inputmode");
      icInput.placeholder = "contoh: A1234567 (Pasport)";
    } else {
      icInput.setAttribute("pattern", "[0-9]{12}");
      icInput.setAttribute("maxlength", "12");
      icInput.setAttribute("inputmode", "numeric");
      icInput.placeholder = "contoh: 900110115678 (12 digit)";
    }
  }

  // peserta tambahan
  const icTambahanList = document.querySelectorAll("input[name='ic_tambahan[]']");
      icTambahanList.forEach(input => {
  if (isLuar) {
    input.removeAttribute("pattern");
    input.removeAttribute("maxlength");
    input.removeAttribute("inputmode");
    input.placeholder = "Pasport";
  } else {
    input.setAttribute("pattern", "[0-9]{12}");
    input.setAttribute("maxlength", "12");
    input.setAttribute("inputmode", "numeric");
    input.placeholder = "contoh: 900110115678 (12 digit)";
  }
});  
}
      
    negeriSelect.addEventListener("change", toggleNegeri);
    toggleNegeri();
  }

  /* KIRA UMUR */
  function kiraUmur(ic) {
    const tahun = parseInt(ic.substring(0,2));
    const currentYear = new Date().getFullYear() % 100;

    let fullYear = tahun > currentYear
      ? 1900 + tahun
      : 2000 + tahun;

    return new Date().getFullYear() - fullYear;
  }

  function semakKategoriUmur() {
    const ic = form.ic.value;
    if (ic.length < 6) return true;

    const umur = kiraUmur(ic);
    const karbon = (form.kategori_karbon.value || "").toUpperCase();

    if (umur <= 12 && !karbon.includes("CILIK")) {
      alert("“No. IC tidak sepadan dengan kategori CILIK. Sila masukan semula IC 12 thn kebawah.”.");
      return false;
    }

    if (umur >= 13 && umur <= 17 && !karbon.includes("REMAJA")) {
      alert("No. IC tidak sepadan dengan kategori REMAJA. Sila masukan semula IC 13-17 thn");
      return false;
    }

    if (umur >= 18 &&
        (karbon.includes("CILIK") || karbon.includes("REMAJA"))) {
      alert("Sila semak no. IC yang sepadan dengan kategori.");
      return false;
    }
    // ======================
  // TAMBAHAN KATEGORI BARU
  // ======================
  const natural = (form.kategori_natural.value || "").toUpperCase();

  if (karbon.includes("VETERAN LELAKI") && umur < 50) {
    alert("Kategori VETERAN LELAKI hanya untuk umur 50 tahun ke atas.");
    return false;
  }

  if (karbon.includes("DEWASA LELAKI") && (umur < 18 || umur > 49)) {
    alert("Kategori DEWASA LELAKI hanya untuk umur 18 hingga 49 tahun.");
    return false;
  }

  if (karbon.includes("DEWASA WANITA") && umur < 18) {
    alert("Kategori DEWASA WANITA hanya untuk umur 18 tahun ke atas.");
    return false;
  }

  if (natural.includes("TERBUKA") && umur < 18) {
    alert("Kategori TERBUKA hanya untuk umur 18 tahun ke atas.");
    return false;
  }

    return true;
  }
  
if (!semakKategoriUmur()) return;

const button = document.getElementById("submitBtn");
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btnText");

const file = form.resit.files[0];
 
  /* SUBMIT */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    if (
      !form.kategori_karbon.value &&
      !form.kategori_natural.value
    ) {
      alert("Sila pilih sekurang-kurangnya satu kategori (Karbon atau Natural).");
      return;
    }

    if (!semakKategoriUmur()) return;
    /* =========================
   VALIDASI BAJU (WAJIB)
      ========================= */
if (form.jenis.value === "daftar+baju") {

  const saizRadio = form.querySelector("input[name='saiz_baju']:checked");

  if (!saizRadio) {
    alert("Sila pilih saiz baju.");
    return;
  }
const jenis = document.getElementById("jenis").value;
const cara = document.getElementById("caraHantar").value;
const alamat = document.getElementById("alamat").value.trim();

if (jenis === "daftar+baju") {

  if (!cara) {
    alert("Sila pilih cara penghantaran.");
    return false;
  }

  if (cara !== "WALK-IN" && !alamat) {
    alert("Sila isi alamat penghantaran.");
    return false;
  }

}
  if (
    saizRadio.value === "lain" &&
    (!form.saiz_baju_lain || !form.saiz_baju_lain.value.trim())
  ) {
    alert("Sila nyatakan saiz baju lain-lain.");
    return;
  }

  const cara = document.getElementById("caraPenghantaran").value;
const alamatValue = document.getElementById("alamatField").value.trim();

if (cara === "pos" && alamatValue === "") {
  alert("Sila isi alamat penghantaran.");
  return;
}
}

    const button = document.getElementById("submitBtn");
    const spinner = document.getElementById("spinner");
    const btnText = document.getElementById("btnText");

    const file = form.resit.files[0];

    button.disabled = true;
    spinner.style.display = "inline-block";
    btnText.textContent = "Menghantar...";

    function resetBtn(){
      button.disabled = false;
      spinner.style.display = "none";
      btnText.textContent = "Hantar Pendaftaran";
    }

    function hantarData(fileData="", fileName="", fileType="") {

      let negeri = form.negeri.value;
      if (negeri === "lain" && form.negeri_lain) {
        negeri = form.negeri_lain.value;
      }

      let saiz = "";
      const saizRadio = form.querySelector("input[name='saiz_baju']:checked");

      if (saizRadio) {
        saiz = saizRadio.value === "lain"
          ? form.saiz_baju_lain.value
          : saizRadio.value;
      }
      let data = [];
      // gabung catatan lelaki, wanita, cilik

// ===== KIRA BAJU TAMBAHAN PUKAL =====
let catatanGabung = [];

function ambilJumlah(name, label) {
  if (form[name] && form[name].value) {
    const val = parseInt(form[name].value);
    if (val > 0) {
      catatanGabung.push(label + " (" + val + ")");
    }
  }
}

// Lelaki
ambilJumlah("lelaki_xs", "Lelaki XS");
ambilJumlah("lelaki_s", "Lelaki S");
ambilJumlah("lelaki_m", "Lelaki M");
ambilJumlah("lelaki_l", "Lelaki L");
ambilJumlah("lelaki_xl", "Lelaki XL");
ambilJumlah("lelaki_2xl", "Lelaki 2XL");
ambilJumlah("lelaki_3xl", "Lelaki 3XL");
ambilJumlah("lelaki_4xl", "Lelaki 4XL");
ambilJumlah("lelaki_5xl", "Lelaki 5XL");

// Wanita
ambilJumlah("wanita_xs", "Wanita XS");
ambilJumlah("wanita_s", "Wanita S");
ambilJumlah("wanita_m", "Wanita M");
ambilJumlah("wanita_l", "Wanita L");
ambilJumlah("wanita_xl", "Wanita XL");
ambilJumlah("wanita_2xl", "Wanita 2XL");
ambilJumlah("wanita_3xl", "Wanita 3XL");
ambilJumlah("wanita_4xl", "Wanita 4XL");
ambilJumlah("wanita_5xl", "Wanita 5XL");

// Cilik
ambilJumlah("cilik_22", "Cilik 22");
ambilJumlah("cilik_24", "Cilik 24");
ambilJumlah("cilik_26", "Cilik 26");
ambilJumlah("cilik_28", "Cilik 28");
ambilJumlah("cilik_30", "Cilik 30");
ambilJumlah("cilik_32", "Cilik 32");

catatanGabung = catatanGabung.join(" | ");
      // peserta utama
data.push({
  nama_penuh: form.nama_penuh.value,
  nama_kelab: form.nama_kelab.value,
  kategori_karbon: form.kategori_karbon.value,
  kategori_natural: form.kategori_natural.value,
  negeri: negeri,
  ic: form.ic.value,
  telefon: form.telefon.value,
  jenis: form.jenis.value,
  saiz_baju: saiz,
  catatan_baju: catatanGabung,
  alamat: document.getElementById("alamatField")
  ? document.getElementById("alamatField").value
  : "",
  fileName,
  fileType,
  fileData
});

// peserta tambahan (mode pukal)
const namaList = form.querySelectorAll("input[name='nama_penuh_tambahan[]']");
const icList = form.querySelectorAll("input[name='ic_tambahan[]']");
const telList = form.querySelectorAll("input[name='telefon_tambahan[]']");
const karbonList = form.querySelectorAll("select[name='kategori_karbon_tambahan[]']");
const naturalList = form.querySelectorAll("select[name='kategori_natural_tambahan[]']");

for (let i = 0; i < namaList.length; i++) {
  // wajib pilih sekurang-kurangnya satu kategori
  if (
    !karbonList[i].value &&
    !naturalList[i].value
  ) {
    alert("Peserta tambahan mesti pilih sekurang-kurangnya satu kategori.");
    resetBtn();
    return;
  }

  const icTambahan = icList[i].value;
  const karbonTambahan = (karbonList[i].value || "").toUpperCase();

  // kira umur peserta tambahan
  const umur = kiraUmur(icTambahan);

  // semakan umur ikut kategori
  if (umur <= 12 && !karbonTambahan.includes("CILIK")) {
    alert("Peserta tambahan umur 12 ke bawah hanya kategori CILIK.");
resetBtn();
return;
  }

  if (umur >= 13 && umur <= 17 && !karbonTambahan.includes("REMAJA")) {
    alert("Peserta tambahan umur 13–17 hanya kategori REMAJA.");
resetBtn();
return;
  }

  if (umur >= 18 &&
      (karbonTambahan.includes("CILIK") || karbonTambahan.includes("REMAJA"))) {
    alert("Peserta tambahan umur 18 ke atas tidak boleh kategori CILIK/REMAJA.");
resetBtn();
return;
  }
  // ==========================
// TAMBAHAN KATEGORI DEWASA
// ==========================
const naturalTambahan = (naturalList[i].value || "").toUpperCase();

if (karbonTambahan.includes("VETERAN LELAKI") && umur < 50) {
  alert("Peserta tambahan kategori VETERAN LELAKI mesti umur 50 tahun ke atas.");
  resetBtn();
  return;
}

if (karbonTambahan.includes("DEWASA LELAKI") && (umur < 18 || umur > 49)) {
  alert("Peserta tambahan DEWASA LELAKI hanya umur 18–49 tahun.");
  resetBtn();
  return;
}

if (karbonTambahan.includes("DEWASA WANITA") && umur < 18) {
  alert("Peserta tambahan DEWASA WANITA hanya umur 18 tahun ke atas.");
  resetBtn();
  return;
}

if (naturalTambahan.includes("TERBUKA") && umur < 18) {
  alert("Peserta tambahan kategori TERBUKA hanya untuk umur 18 tahun ke atas.");
  resetBtn();
  return;
}
  data.push({
    nama_penuh: namaList[i].value,
    nama_kelab: form.nama_kelab.value,
    kategori_karbon: karbonList[i].value,
    kategori_natural: naturalList[i].value,
    negeri: negeri,
    ic: icTambahan,
    telefon: telList[i].value,
    jenis: "pukal/kelab",
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
        body: JSON.stringify(data)
      })
      .then(res => res.text())
        .then(text => {

  // jika gagal (duplicate IC atau error lain)
  if (text.startsWith("Gagal")) {
    alert(text);
    resetBtn();
    return;
  }
         // jika berjaya
form.innerHTML = `
  <div style="text-align:center;padding:30px">
    <h2>Terima kasih atas pendaftaran anda.</h2>
    <p>Data telah diterima oleh pihak penganjur.</p>

    <button onclick="location.reload()" class="btn-daftar">
      Daftar peserta lain
    </button>

    <br><br>

    <a href="index.html" class="btn-home">
      ← Kembali
    </a>
  </div>
`; 
         
})              
      .catch(()=>{
        alert("Gagal hantar");
        resetBtn();
      });
    }

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Saiz fail melebihi 10MB");
        resetBtn();
        return;
      }

      const reader = new FileReader();
      reader.onload = function () {
        hantarData(
          reader.result.split(",")[1],
          file.name,
          file.type
        );
      };
      reader.readAsDataURL(file);
    } else {
      hantarData();
    }

  });

});

// ===============================
// MODE PENDAFTARAN PUKAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {

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
      card.className = "card card-peserta";
      card.innerHTML = `
        <h3>Peserta Tambahan</h3>

        <label>Nama Penuh *</label>
        <input type="text" name="nama_penuh_tambahan[]" required>
        <label>Nombor IC *</label>
<input type="text" name="ic_tambahan[]" 
       pattern="[0-9]{12}" 
       inputmode="numeric"
       placeholder="contoh: 900110115678 (12 digit)"
       required>

        <label>Nombor Telefon *</label>
        <input type="tel" name="telefon_tambahan[]" required>

        <label>Kategori Arrow Karbon</label>
        <select name="kategori_karbon_tambahan[]">
          <option value="">pilih kategori</option>
          <option>VETERAN LELAKI</option>
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

});


document.addEventListener("DOMContentLoaded", function() {

  const jenis = document.getElementById("jenis");
  const nota = document.getElementById("notaPos");

  if (!jenis || !nota) return;

  function updateNota() {
    nota.style.display = jenis.value === "daftar+baju" ? "block" : "none";
  }

  jenis.addEventListener("change", updateNota);
  updateNota();

});



const caraSelect = document.getElementById("caraPenghantaran");
const alamatContainer = document.getElementById("alamatContainer");
const alamatField = document.getElementById("alamatField");

if (caraSelect && alamatContainer) {

  function toggleAlamat() {
    if (caraSelect.value === "pos") {
      alamatContainer.style.display = "block";
      if (alamatField) alamatField.required = true;
    } else {
      alamatContainer.style.display = "none";
      if (alamatField) {
        alamatField.required = false;
        alamatField.value = "";
      }
    }
  }

  caraSelect.addEventListener("change", toggleAlamat);
  toggleAlamat();
}

































