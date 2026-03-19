import * as React from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { Paperclip } from "lucide-react";
import { cn } from "@/utils/style";

export interface UploadAttachmentsOverlayProps {
  onFilesSelected: (files: File[]) => void;
  uploading: boolean;
  canAddMore: boolean;
  children: React.ReactNode;
  dragActiveText?: string;
}

export const UploadAttachmentsOverlay = React.memo(
  function UploadAttachmentsOverlay({
    onFilesSelected,
    uploading,
    canAddMore,
    children,
    dragActiveText,
  }: UploadAttachmentsOverlayProps) {
    const { t } = useTranslation();
    const id = React.useId();
    const resolvedDragActiveText =
      dragActiveText ?? t("components.uploadAttachments.dragActiveText");

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } =
      useDropzone({
        onDrop: onFilesSelected,
        noClick: true,
        noKeyboard: true,
      });

    const isDropZoneVisible = canAddMore && !uploading;

    return (
      <div className="relative">
        {isDropZoneVisible ? (
          <div
            {...getRootProps({
              className: cn(
                "relative flex flex-1 flex-col rounded-xl border-2 border-dashed border-border/40 p-3 outline-none transition-[border-color,background-color] duration-200 motion-reduce:transition-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isDragActive && "border-primary/50 bg-primary/5",
                isDragAccept && "border-emerald-500 bg-emerald-500/5",
                isDragReject && "border-destructive bg-destructive/5"
              ),
              "aria-label": resolvedDragActiveText,
            })}
          >
            <input {...getInputProps({ className: "hidden" })} id={id} aria-label={resolvedDragActiveText} />
            {isDragActive ? (
              <div
                className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/80 text-center backdrop-blur-sm"
                role="presentation"
              >
                <Paperclip className="size-10 text-primary" aria-hidden />
                <span className="text-sm font-medium text-primary">{resolvedDragActiveText}</span>
              </div>
            ) : null}
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
);

UploadAttachmentsOverlay.displayName = "UploadAttachmentsOverlay";
