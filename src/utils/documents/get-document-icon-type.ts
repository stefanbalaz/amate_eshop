/**
 * Maps MIME type (or file type string) to a document icon category.
 * Used for displaying the correct icon per attachment type.
 */
export function getDocumentIconType(fileType: string): string {
  if (fileType.includes("image/")) {
    return "image";
  }
  if (fileType.includes("video/")) {
    return "video";
  }
  if (
    fileType.includes("audio/") ||
    fileType.includes("application/x-cdf")
  ) {
    return "audio";
  }
  if (
    fileType.includes("application/x-freearc") ||
    fileType.includes("application/x-bzip") ||
    fileType.includes("application/x-bzip2") ||
    fileType.includes("application/gzip") ||
    fileType.includes("application/java-archive") ||
    fileType.includes("application/vnd.rar") ||
    fileType.includes("application/x-tar") ||
    fileType.includes("application/zip") ||
    fileType.includes("application/x-7z-compressed")
  ) {
    return "archive";
  }
  if (
    fileType.includes("application/vnd.ms-excel") ||
    fileType.includes("application/msexcel") ||
    fileType.includes(
      "application/vnd.openxmlformats-officedocument.spreadsheetml"
    ) ||
    fileType.includes("application/vnd.oasis.opendocument.spreadsheet") ||
    fileType.includes("text/csv") ||
    fileType.includes("application/csv")
  ) {
    return "excel";
  }
  if (
    fileType.includes("application/msword") ||
    fileType.includes("application/vnd.ms-word") ||
    fileType.includes(
      "application/vnd.openxmlformats-officedocument.wordprocessingml"
    ) ||
    fileType.includes("application/vnd.oasis.opendocument.text")
  ) {
    return "word";
  }
  if (
    fileType.includes("application/mspowerpoint") ||
    fileType.includes("application/vnd.ms-powerpoint") ||
    fileType.includes(
      "application/vnd.openxmlformats-officedocument.presentationml"
    ) ||
    fileType.includes("application/vnd.oasis.opendocument.presentation")
  ) {
    return "powerpoint";
  }
  if (fileType.includes("application/msaccess")) {
    return "access";
  }
  if (
    fileType.includes("application/rtf") ||
    fileType.includes("text/rtf")
  ) {
    return "rtf";
  }
  if (fileType.includes("application/pdf")) {
    return "pdf";
  }
  if (
    fileType.includes("text/html") ||
    fileType.includes("application/xhtml+xml")
  ) {
    return "html";
  }
  if (
    fileType.includes("application/xml") ||
    fileType.includes("application/atom+xml") ||
    fileType.includes("application/vnd.mozilla.xul+xml") ||
    fileType.includes("text/xml")
  ) {
    return "xml";
  }
  if (
    fileType.includes("application/x-sh") ||
    fileType.includes("application/x-csh")
  ) {
    return "script";
  }
  if (
    fileType.includes("application/octet-stream") ||
    fileType.includes("application/vnd.apple.installer+xml") ||
    fileType.includes("application/vnd.microsoft.portable-executable")
  ) {
    return "executable";
  }
  if (
    fileType.includes("application/vnd.amazon.ebook") ||
    fileType.includes("application/epub+zip")
  ) {
    return "ebook";
  }
  if (
    fileType.includes("text/javascript") ||
    fileType.includes("application/epub+zip")
  ) {
    return "javascript";
  }
  if (
    fileType.includes("font/woff") ||
    fileType.includes("font/ttf") ||
    fileType.includes("font/otf") ||
    fileType.includes("application/vnd.ms-fontobject")
  ) {
    return "font";
  }
  if (fileType.includes("application/vnd.visio")) {
    return "visio";
  }
  if (fileType.includes("text/calendar")) {
    return "calendar";
  }
  if (fileType.includes("text/css")) {
    return "css";
  }
  if (fileType.includes("text/plain")) {
    return "plain";
  }

  return "unknown";
}
