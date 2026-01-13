const scriptURL =
  "https://script.google.com/macros/s/AKfycbxlXXWkwGdPFeIKCpvDa_CkvtXB0wZfOQnSeUxOncHx48A83J1v2WAIm_sBCZrPSs7YAQ/exec";

document.getElementById("daftarForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const fileInput = form.querySelector('input[name="resit"]');
  const file = fileInput.files[0];

  if (!file) {
    alert("Sila upload resit");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const payload = {
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

      // FILE
      fileName: file.name,
      fileType: file.type,
      fileData: reader.result.split(",")[1] // base64
    };

    fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.text())
      .then(() => {
        alert("Pendaftaran berjaya");
        form.reset();
      })
      .catch((err) => {
        alert("Gagal hantar borang");
        console.error(err);
      });
  };

  reader.readAsDataURL(file);
});

