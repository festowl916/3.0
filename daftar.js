const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgUTTlXo37xUvYnLYMDtdt6nrwh7lFq2T3Wx-CId9ZEZsBnQ29qszcqXFjpb4T_UAH/exec";

document.getElementById("daftarForm").addEventListener("submit", function(e){
  e.preventDefault();

  const form = e.target;
  const file = form.resit.files[0];
  if (!file) return alert("Upload resit dulu");

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
    .then(()=>alert("Berjaya"))
    .catch(()=>alert("Gagal"));
  };
  reader.readAsDataURL(file);
});

