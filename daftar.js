function doPost(e) {

  const SHEET_ID = "ID_SHEET_KAU";
  const FOLDER_ID = "ID_FOLDER_KAU";
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("OWL916");
  const folder = DriveApp.getFolderById(FOLDER_ID);

  let fileLink = "";

  if (e.files && e.files.resit) {
    const file = folder.createFile(e.files.resit);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    fileLink = file.getUrl();
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
    fileLink
  ]);

  return ContentService.createTextOutput("SUCCESS");
}
