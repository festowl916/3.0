document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw6dDf5cmVAMNrJL1xdGslzvYCtI4y1LK_e6Y2s8AABb3nxHeNvIcz0LlVwPokKY-lx/exec";

  form.addEventListener("submit", function(e){
    e.preventDefault();

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
});


