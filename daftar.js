document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-Irmyl9MK242dz7nz8NQCJ4XWIv6GsCsUEL4-rnWEvF0VFVFMEwnxRY91JrEmG-ErBg/exec";

  const jenis = document.getElementById("jenis");
  const sectionBaju = document.getElementById("sectionBaju");

  function toggleBaju(){
    sectionBaju.style.display =
      jenis.value === "baju" ? "block" : "none";
  }
  jenis.addEventListener("change", toggleBaju);
  toggleBaju();

  /* NEGERI LAIN-LAIN */
  const negeriSelect = document.getElementById("negeri");
  const inputNegeriLain = document.getElementById("inputNegeriLain");

  negeriSelect.addEventListener("change", function () {
    inputNegeriLain.style.display =
      this.value === "lain" ? "block" : "none";
  });

  /* SAIZ LAIN-LAIN */
  const radios = document.querySelectorAll("input[name='saiz_baju']");
  const inputSaizLain = document.getElementById("inputSaizLain");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      inputSaizLain.style.display =
        (radio.value === "lain" && radio.checked)
        ? "block" : "none";
    });
  });

  /* SEMAKAN UMUR */
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

  // CILIK
  if (umur <= 12 && !karbon.includes("CILIK")) {
    alert("Peserta umur 12 tahun ke bawah hanya kategori CILIK.");
    return false;
  }

  // REMAJA
  if (umur >= 13 && umur <= 17 && !karbon.includes("REMAJA")) {
    alert("Peserta umur 13–17 hanya kategori REMAJA.");
    return false;
  }

  return true;
}

  /* HANTAR DATA */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    if (!semakKategoriUmur()) return;

    if (form.jenis.value === "baju") {
      if (!form.saiz_baju.value) {
        alert("Sila pilih saiz baju");
        return;
      }
      if (!form.alamat.value.trim()) {
        alert("Sila isi alamat penghantaran");
        return;
      }
    }

    const file = form.resit.files[0];
    const button = form.querySelector("button");

    button.disabled = true;
    button.textContent = "Menghantar...";

    function hantarData(fileData = "", fileName = "", fileType = "") {

      const saiz =
        form.saiz_baju.value === "lain"
          ? form.saiz_baju_lain.value
          : form.saiz_baju.value;

      const negeri =
        form.negeri.value === "lain"
          ? form.negeri_lain.value
          : form.negeri.value;

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
        alamat: form.alamat.value,
        fileName: fileName,
        fileType: fileType,
        fileData: fileData
      };

      fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(res => res.text())
      .then(() => {
        form.innerHTML = `
          <div style="text-align:center;padding:30px">
            <h2>Terima kasih atas pendaftaran anda</h2>
            <p>Data telah diterima oleh pihak penganjur.</p>
            <button onclick="location.reload()">
              Daftar peserta lain
            </button>
          </div>
        `;
      })
      .catch(() => {
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
      // Hantar tanpa resit
      hantarData();
    }

  });

});

