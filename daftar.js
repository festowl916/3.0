const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzmU1BgQ7h1w_-Hfu417Gjtb-FgwWqmpGJjPLZSwBLrXonQyM0gSK24hn8OngyDHHXDJQ/exec";

document.getElementById("daftarForm").addEventListener("submit", function(e){
  e.preventDefault();

  const form = e.target;

  const data = new FormData(form);

  fetch(SCRIPT_URL, {
    method: "POST",
    body: data
  })
  .then(r => r.text())
  .then(() => {
    alert("Pendaftaran berjaya");
    form.reset();
  })
  .catch(() => alert("Gagal hantar"));
});
