const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzmU1BgQ7h1w_-Hfu417Gjtb-FgwWqmpGJjPLZSwBLrXonQyM0gSK24hn8OngyDHHXDJQ/exec";

document.getElementById("daftarForm").addEventListener("submit", function(e){
  e.preventDefault();

  const form = e.target;
  const file = form.resit.files[0];
  if (!file) { alert("Sila upload resit"); return; }

  const reader = new FileReader();
  reader.onload = function () {

    const data = {
      jenis_pendaftaran: form.jenis_pendaftaran.value,
      nama_penuh: form.nama_penuh.value,
      kelab: form.kelab.value,
      arrow_carbon: form.arrow_carbon.value,
      arrow_natural: form.arrow_natural.value,
      negeri: form.negeri.value,
      saiz_baju: form.saiz_baju.value,
      alamat_penghantaran: form.alamat_penghantaran.value,
      ic: form.ic.value,
      telefon: form.telefon.value,
      fileName: file.name,
      fileType: file.type,
      fileData: reader.result.split(",")[1]
    };

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    .then(r => r.text())
    .then(() => {
      alert("Pendaftaran berjaya");
      form.reset();
    })
    .catch(() => alert("Gagal hantar"));
  };

  reader.readAsDataURL(file);
});

