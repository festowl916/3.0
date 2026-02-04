const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz27PbzQzPc_JEm3RnhR1dGzUYPuNsLLRiFapQHxis0Scon3uPqMSVVFR_8gAcpSSzU/exec";

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
