document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     BACKUP TARIKH (MASTER)
  ===================== */
  const TARIKH = {
    daftarBuka:  "2026-03-01T00:00:00",
    daftarTutup: "2026-07-20T23:59:59",
    event:       "2026-07-04T08:00:00"
  };

  /* =====================
     MODE TEST
  ===================== */
  const TEST_MODE = false;
  const nowTime = () => Date.now();

  /* =====================
     TARIKH AKTIF
  ===================== */
  const daftarBuka  = new Date(TARIKH.daftarBuka).getTime();
  const daftarTutup = new Date(TARIKH.daftarTutup).getTime();
  const eventDate   = new Date(TARIKH.event).getTime();
