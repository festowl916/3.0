document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-Irmyl9MK242dz7nz8NQCJ4XWIv6GsCsUEL4-rnWEvF0VFVFMEwnxRY91JrEmG-ErBg/exec";

  const jenis = document.getElementById("jenis");
  const sectionBaju = document.getElementById("sectionBaju");

  /* =========================
     TOGGLE SECTION BAJU
  ========================= */
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
     KIRA UMUR DARI IC
  ========================= */
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
      alert("Umur 12 tahun ke bawah hanya kategori CILIK.");
      return false;
    }

    if (umur >= 13 && umur <= 17 && !karbon.includes("REMAJA")) {
      alert("Umur 13–17 hanya kategori REMAJA.");
      return false;
    }

    if (umur >= 18 &&
        (karbon.includes("CILIK") || karbon.includes("REMAJA"))) {
      alert("Umur 18 tahun ke atas tidak boleh kategori CILIK/REMAJA.");
      return false;
    }

    return true;
  }

  /* =========================
     SUBMIT FORM
  ========================= */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    if (!semakKategoriUmur()) return;

    const button = form.querySelector("button");

    // VALIDASI BAJU (hanya bila pilih baju)
    if (form.jenis.value === "baju") {

      const saizRadio = form.querySelector("input[name='saiz_baju']:checked");

      if (!saizRadio) {
        alert("Sila pilih saiz baju.");
        return;
      }

      if (
        saizRadio.value === "lain" &&
        (!form.saiz_baju_lain || !form.saiz_baju_lain.value.trim())
      ) {
        alert("Sila nyatakan saiz baju lain-lain.");
        return;
      }

      if (!form.alamat || !form.alamat.value.trim()) {
        alert("Sila isi alamat penghantaran.");
        return;
      }
    }

    const file = form.resit.files[0];

    button.disabled = true;
    button.textContent = "Menghantar...";

    function hantarData(fileData="", fileName="", fileType="") {

      let negeri = form.negeri.value;
      if (negeri === "lain" && form.negeri_lain) {
        negeri = form.negeri_lain.value;
      }

      let saiz = "";
      const saizRadio = form.querySelector("input[name='saiz_baju']:checked");

      if (saizRadio) {
        if (saizRadio.value === "lain") {
          saiz = form.saiz_baju_lain.value;
        } else {
          saiz = saizRadio.value;
        }
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
        catatan_baju: form.catatan_baju
          ? form.catatan_baju.value
          : "",
        alamat: form.alamat
          ? form.alamat.value
          : "",
        fileName,
        fileType,
        fileData
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
            <p>Data telah diterima oleh pihak penganjur.</p>
            <button onclick="location.reload()">
              Daftar peserta lain
            </button>
          </div>
        `;
      })
      .catch(()=>{
        alert("Gagal hantar");
        button.disabled = false;
        button.textContent = "Hantar Pendaftaran";
      });
    }

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Saiz fail melebihi 10MB");
        button.disabled = false;
        button.textContent = "Hantar Pendaftaran";
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
