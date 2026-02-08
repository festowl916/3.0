document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("daftarForm");
  if (!form) return;

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzYlxhtacak8h9A2uhwZerlSkSixdpdz58TmIcHz0jw4IrqIVia6Ezx92ZpsfV1k37e-g/exec";

  const button = document.getElementById("submitBtn");
  const spinner = document.getElementById("spinner");
  const btnText = document.getElementById("btnText");

  function resetBtn(){
    button.disabled = false;
    spinner.style.display = "none";
    btnText.textContent = "Hantar Pendaftaran";
  }

  /* =========================
     TOGGLE BAJU
  ========================= */
  const jenis = document.getElementById("jenis");
  const sectionBaju = document.getElementById("sectionBaju");

  function toggleBaju(){
    if (!sectionBaju || !jenis) return;
    sectionBaju.style.display =
      jenis.value === "baju" ? "block" : "none";
  }

  if (jenis) {
    jenis.addEventListener("change", toggleBaju);
    toggleBaju();
  }

  /* =========================
     NEGERI LAIN-LAIN
  ========================= */
  const negeriSelect = document.getElementById("negeri");
  const inputNegeriLain = document.getElementById("inputNegeriLain");

  if (negeriSelect && inputNegeriLain) {
    function toggleNegeri(){
      if (negeriSelect.value === "lain") {
        inputNegeriLain.style.display = "block";
      } else {
        inputNegeriLain.style.display = "none";
        inputNegeriLain.value = "";
      }
    }
    negeriSelect.addEventListener("change", toggleNegeri);
    toggleNegeri();
  }

  /* =========================
     SAIZ LAIN-LAIN
  ========================= */
  const radios = document.querySelectorAll("input[name='saiz_baju']");
  const inputSaizLain = document.getElementById("inputSaizLain");

  if (radios.length && inputSaizLain) {
    radios.forEach(radio => {
      radio.addEventListener("change", () => {
        inputSaizLain.style.display =
          (radio.value === "lain" && radio.checked)
          ? "block"
          : "none";
      });
    });
  }

  /* =========================
     MODE PUKAL
  ========================= */
  const mode = document.getElementById("mode");
  const bulkControls = document.getElementById("bulkControls");
  const tambahBtn = document.getElementById("tambahPeserta");
  const pesertaContainer = document.getElementById("pesertaTambahan");

  if (mode && bulkControls && pesertaContainer) {
    mode.addEventListener("change", () => {
      if (mode.value === "pukal") {
        bulkControls.style.display = "block";
      } else {
        bulkControls.style.display = "none";
        pesertaContainer.innerHTML = "";
      }
    });
  }

  if (tambahBtn && pesertaContainer) {
    tambahBtn.addEventListener("click", () => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>Peserta Tambahan</h3>
        <label>Nama Penuh *</label>
        <input type="text" name="nama_penuh_tambahan[]" required>
        <label>No IC *</label>
        <input type="text" name="ic_tambahan[]" required>
      `;
      pesertaContainer.appendChild(card);
    });
  }

  /* =========================
     SUBMIT
  ========================= */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    button.disabled = true;
    spinner.style.display = "inline";
    btnText.textContent = "Menghantar...";

    const ic = form.ic.value.trim();

    if (!/^\d{12}$/.test(ic)) {
      alert("Nombor IC mesti 12 digit.");
      resetBtn();
      return;
    }

    // VALIDASI BAJU
    if (form.jenis.value === "baju") {

      const saizRadio = form.querySelector("input[name='saiz_baju']:checked");

      if (!saizRadio) {
        alert("Sila pilih saiz baju.");
        resetBtn();
        return;
      }

      if (saizRadio.value === "lain" &&
          !form.saiz_baju_lain.value.trim()) {
        alert("Sila nyatakan saiz baju lain-lain.");
        resetBtn();
        return;
      }

      if (!form.alamat.value.trim()) {
        alert("Sila isi alamat penghantaran.");
        resetBtn();
        return;
      }
    }

    // hantar data
    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        nama: form.nama_penuh.value
      })
    })
    .then(res => res.text())
    .then(text => {
      form.innerHTML = `
        <div style="text-align:center;padding:30px">
          <h2>${text}</h2>
          <button onclick="location.reload()">Daftar peserta lain</button>
        </div>
      `;
    })
    .catch(()=>{
      alert("Gagal hantar");
      resetBtn();
    });

  });

});
