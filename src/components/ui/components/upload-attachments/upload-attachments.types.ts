export interface UploadAttachment {
  id: string;
  name: string;
  type: string;
  extension: string;
  size: number;
  preview: string;
  uploadStatus: boolean;
  uploading: boolean;
  processing: boolean;
}

export interface UploadAttachmentsFieldHandles {
  highlight(scroll?: boolean): void;
}
