document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     BACKUP TARIKH PENTING
     (MUDAH EDIT MASA DEPAN)
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
  const TEST_NOW  = new Date("2026-01-01T12:00:00").getTime();
  const nowTime = () => TEST_MODE ? TEST_NOW : Date.now();

  /* =====================
     TARIKH PENDAFTARAN
  ===================== */
  const daftarBuka  = new Date(TARIKH.daftarBuka).getTime();
  const daftarTutup = new Date(TARIKH.daftarTutup).getTime();

  /* =====================
     TARIKH FESTIVAL
  ===================== */
  const eventDate = new Date(TARIKH.event).getTime();

  // … kod pendaftaran & countdown kau yang sedia ada …
});
