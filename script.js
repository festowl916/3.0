document.addEventListener("DOMContentLoaded", () => {

  /* MODE TEST */
  const TEST_MODE = false;
  const TEST_NOW  = new Date("2026-02-15T12:00:00").getTime();
  const nowTime = () => TEST_MODE ? TEST_NOW : Date.now();

  /* TARIKH MASTER */
  const TARIKH = {
    daftarBuka:  "2026-03-01T00:00:00",
    daftarTutup: "2026-07-20T23:59:59",
    event:       "2026-07-04T08:00:00"
  };

  const daftarBuka  = new Date(TARIKH.daftarBuka).getTime();
  const daftarTutup = new Date(TARIKH.daftarTutup).getTime();
  const eventDate   = new Date(TARIKH.event).getTime();
