import * as React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  DEFAULT_MAX_FILES,
  DEFAULT_MAX_FILE_SIZE_BYTES,
  MAX_TOTAL_SIZE_BYTES,
} from "./upload-attachments.constants";
import type { UploadAttachment } from "./upload-attachments.types";
import { createAttachmentFromFile, revokeBlobPreview } from "./upload-attachments.utils";

export interface UseUploadAttachmentsOptions {
  maxFiles?: number;
  maxSize?: number;
  messageTotalSizeExceeded?: string;
  messageMaxFilesExceeded?: string;
}

export function useUploadAttachments(
  initialAttachments: UploadAttachment[] = [],
  options: UseUploadAttachmentsOptions = {}
) {
  const {
    maxFiles = DEFAULT_MAX_FILES,
    maxSize = DEFAULT_MAX_FILE_SIZE_BYTES,
    messageTotalSizeExceeded,
    messageMaxFilesExceeded,
  } = options;

  const { t } = useTranslation();
  const [attachments, setAttachments] = React.useState<UploadAttachment[]>(initialAttachments);
  const attachmentsRef = React.useRef(attachments);

  React.useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  const resolvedTotalSizeMessage =
    messageTotalSizeExceeded ?? t("components.uploadAttachments.messageTotalSizeExceeded");
  const resolvedMaxFilesMessage =
    messageMaxFilesExceeded ??
    t("components.uploadAttachments.messageMaxFilesExceeded", { max: maxFiles });

  const handleFilesSelected = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const current = attachmentsRef.current;
      const currentFilesSize = current.reduce((acc, a) => acc + a.size, 0);
      let newAttachments = acceptedFiles.map(createAttachmentFromFile);
      let newAttachmentsSize = 0;

      newAttachments = newAttachments.filter((newAttachment) => {
        if (newAttachment.size > maxSize) {
          toast.error(resolvedTotalSizeMessage);
          return false;
        }
        if (
          currentFilesSize + newAttachmentsSize + newAttachment.size >
          MAX_TOTAL_SIZE_BYTES
        ) {
          toast.error(resolvedTotalSizeMessage);
          return false;
        }
        newAttachmentsSize += newAttachment.size;
        return true;
      });

      const currentCount = current.length;
      const hasExceededMaxFiles = currentCount + newAttachments.length > maxFiles;
      if (hasExceededMaxFiles) {
        toast.error(resolvedMaxFilesMessage);
      }

      setAttachments((prev) => {
        if (prev.length + newAttachments.length > maxFiles) {
          const allowed = newAttachments.slice(0, maxFiles - prev.length);
          return [...prev, ...allowed];
        }
        return [...prev, ...newAttachments];
      });
    },
    [maxFiles, maxSize, resolvedMaxFilesMessage, resolvedTotalSizeMessage, setAttachments]
  );

  const removeAttachment = React.useCallback((attachmentId: string) => {
    const found = attachmentsRef.current.find((a) => a.id === attachmentId);
    if (found) revokeBlobPreview(found.preview);
    setAttachments((prev) => prev.filter((a) => a.id !== attachmentId));
  }, [setAttachments]);

  React.useEffect(
    () => () => {
      attachmentsRef.current.forEach((a) => revokeBlobPreview(a.preview));
    },
    []
  );

  return {
    attachments,
    setAttachments,
    handleFilesSelected,
    removeAttachment,
    canAddMore: attachments.length < maxFiles,
  };
}
