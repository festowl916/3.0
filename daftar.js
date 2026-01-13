function doPost(e) {

  const SHEET_ID = "ID_SHEET_KAU";
  const FOLDER_ID = "ID_FOLDER_KAU";
  const SHEET_NAME = "OWL916";

  const sheet = SpreadsheetApp
    .openById(SHEET_ID)
    .getSheetByName(SHEET_NAME);

  const folder = DriveApp.getFolderById(FOLDER_ID);

  let fileUrl = "";

  // 🔴 FILE UPLOAD DARI HTML FORM
  if (e.files && e.files.resit) {
    const file = folder.createFile(e.files.resit);
    file.setSharing(
      DriveApp.Access.ANYONE_WITH_LINK,
      DriveApp.Permission.VIEW
    );
    fileUrl = file.getUrl();
  }

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
    e.parameter.ic || "",
    e.parameter.telefon || "",
    fileUrl
  ]);

  return ContentService.createTextOutput("SUCCESS");
}
