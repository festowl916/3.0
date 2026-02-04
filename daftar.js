const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxPe3dONuSm9IWmjbIatP64zkBwXXRmvN4HGQupz0n5OEf_Gpv6Y8v60ERvGdy5Ko8Asg/exec";

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

