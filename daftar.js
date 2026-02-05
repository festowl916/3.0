

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-Irmyl9MK242dz7nz8NQCJ4XWIv6GsCsUEL4-rnWEvF0VFVFMEwnxRY91JrEmG-ErBg/exec";

document.getElementById("daftarForm").addEventListener("submit", function(e){
  e.preventDefault();

  const form = e.target;
  const file = form.resit.files[0];
  if (!file) return alert("Pilih fail dulu");

  const reader = new FileReader();
  reader.onload = function () {

    const data = {
      nama_penuh: form.nama_penuh.value,
      fileName: file.name,
      fileType: file.type,
      fileData: reader.result.split(",")[1]
    };

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.text())
    .then(text => {
      alert(text);   // akan tunjuk BERJAYA atau ERROR
    })
    .catch(err => {
      alert("Gagal: " + err);
    });
  };

  reader.readAsDataURL(file);
});
