function doPost(e) {

  const FOLDER_ID = "PASTE_FOLDER_ID_GOOGLE_DRIVE_KAU";
  const SHEET_ID  = "PASTE_SPREADSHEET_ID_KAU";
  const SHEET_NAME = "OWL916";

  const folder = DriveApp.getFolderById(FOLDER_ID);
  const sheet = SpreadsheetApp.openById(SHEET_ID)
                .getSheetByName(SHEET_NAME);

  let fileLink = "";

  // 🔹 Jika ada fail resit
  if (e.files && e.files.resit) {
    const blob = e.files.resit;

    // simpan fail ke Drive
    const file = folder.createFile(blob);

    // set akses view (optional tapi disyorkan)
    file.setSharing(
      DriveApp.Access.ANYONE_WITH_LINK,
      DriveApp.Permission.VIEW
    );

    // ambil LINK Drive
    fileLink = file.getUrl();
  }

  // 🔹 Simpan ke Sheet (LINK sahaja)
  sheet.appendRow([
    new Date(),
    e.parameter.jenis_pendaftaran || "",
    e.parameter.nama_penuh || "",
    e.parameter.kelab || "",
    e.parameter.arrow_carbon || "",
    e.parameter.arrow_natural || "",
    e.parameter.negeri || "",
    e.parameter.saiz_baju || "",
    e.parameter.alamat_penghantaran || "",
    fileLink   // ✅ LINK DRIVE
  ]);

  return ContentService
    .createTextOutput("SUCCESS")
    .setMimeType(ContentService.MimeType.TEXT);
}
