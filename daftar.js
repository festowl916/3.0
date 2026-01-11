document.getElementById("daftarForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const status = document.getElementById("status");
  const data = new FormData(this);

  console.log("=== DATA DIHANTAR ===");
  for (let item of data.entries()) {
    console.log(item[0], item[1]);
  }

  status.textContent = "✅ Pendaftaran diterima (MODE TEST)";
  status.style.color = "green";

  this.reset();
});