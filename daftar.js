const SCRIPT_URL = "PASTE_WEB_APP_URL_KAU";

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
    .then(()=>alert("Berjaya upload"))
    .catch(()=>alert("Gagal"));
  };

  reader.readAsDataURL(file);
});
