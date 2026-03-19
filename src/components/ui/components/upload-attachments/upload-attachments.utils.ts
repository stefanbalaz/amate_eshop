import { nanoid } from "nanoid";
import type { UploadAttachment } from "./upload-attachments.types";

export function createAttachmentFromFile(file: File): UploadAttachment {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  return {
    id: `${file.name}-${nanoid()}`,
    name: file.name,
    type: file.type,
    extension,
    size: file.size,
    preview: URL.createObjectURL(file),
    uploadStatus: false,
    uploading: false,
    processing: false,
  };
}

export function revokeBlobPreview(preview: string): void {
  if (preview?.startsWith("blob:")) {
    URL.revokeObjectURL(preview);
  }
}
