document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-Irmyl9MK242dz7nz8NQCJ4XWIv6GsCsUEL4-rnWEvF0VFVFMEwnxRY91JrEmG-ErBg/exec";

  /* =========================
     AUTO HIDE SECTION BAJU
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
     NEGERI LAIN-LAIN
  ========================= */
  const negeriSelect = document.getElementById("negeri");
  const inputNegeriLain = document.getElementById("inputNegeriLain");

  negeriSelect.addEventListener("change", function () {
    if (this.value === "lain") {
      inputNegeriLain.style.display = "block";
    } else {
      inputNegeriLain.style.display = "none";
    }
  });

  /* =========================
     SAIZ LAIN-LAIN
  ========================= */
  const radios = document.querySelectorAll("input[name='saiz_baju']");
  const inputSaizLain = document.getElementById("inputSaizLain");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "lain" && radio.checked) {
        inputSaizLain.style.display = "block";
      } else if (radio.checked) {
        inputSaizLain.style.display = "none";
      }
    });
  });

  /* =========================
     HANTAR DATA KE GOOGLE SCRIPT
  ========================= */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const file = form.resit.files[0];
    if (!file) return alert("Sila upload resit");

    const reader = new FileReader();
    reader.onload = async function () {

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
        fileName: file.name,
        fileType: file.type,
        fileData: reader.result.split(",")[1]
      };

      try {
        const res = await fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(data)
        });

        const text = await res.text();
        alert(text);
        form.reset();
        toggleBaju();

      } catch(err) {
        alert("Gagal hantar");
      }
    };

    reader.readAsDataURL(file);
  });

});
