document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "PASTE_URL_WEB_APP_KAU_DI_SINI";

  const jenis = document.getElementById("jenis");
  const sectionBaju = document.getElementById("sectionBaju");

  function toggleBaju(){
    if (!sectionBaju) return;
    sectionBaju.style.display =
      jenis.value === "baju" ? "block" : "none";
  }
  if (jenis) {
    jenis.addEventListener("change", toggleBaju);
    toggleBaju();
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

    // ≤12 → CILIK sahaja
    if (umur <= 12) {
      if (!karbon.includes("CILIK")) {
        alert("Umur 12 tahun ke bawah hanya kategori CILIK.");
        return false;
      }
    }

    // 13–17 → REMAJA sahaja
    else if (umur >= 13 && umur <= 17) {
      if (!karbon.includes("REMAJA")) {
        alert("Umur 13–17 hanya kategori REMAJA.");
        return false;
      }
    }

    // ≥18 → tak boleh CILIK/REMAJA
    else if (umur >= 18) {
      if (karbon.includes("CILIK") || karbon.includes("REMAJA")) {
        alert("Umur 18 tahun ke atas tidak boleh kategori CILIK/REMAJA.");
        return false;
      }
    }

    return true;
  }

  /* =========================
     SUBMIT
  ========================= */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    if (!semakKategoriUmur()) return;

    const file = form.resit.files[0];
    const button = form.querySelector("button");

    button.disabled = true;
    button.textContent = "Menghantar...";

    function hantarData(fileData="", fileName="", fileType="") {

      const saiz =
        form.saiz_baju && form.saiz_baju.value === "lain"
          ? form.saiz_baju_lain.value
          : (form.saiz_baju ? form.saiz_baju.value : "");

      const negeri =
        form.negeri.value === "lain"
          ? form.negeri_lain.value
          : form.negeri.value;

      const data = {
        nama_penuh: form.nama_penuh.value,
        nama_kelab: form.nama_kelab.value,
        kategori_karbon: form.kategori_karbon.value,
        kategori_natural: form.kategori_natural
          ? form.kategori_natural.value
          : "",
        negeri: negeri,
        ic: form.ic.value,
        telefon: form.telefon.value,
        jenis: form.jenis.value,
        saiz_baju: saiz,
        catatan_baju: form.catatan_baju
          ? form.catatan_baju.value
          : "",
        alamat: form.alamat ? form.alamat.value : "",
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

    // Jika ada resit
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
      // Tanpa resit
      hantarData();
    }

  });

});
