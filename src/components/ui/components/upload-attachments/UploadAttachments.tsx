import * as React from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { Paperclip, X, Check } from "lucide-react";
import { Button, ButtonSize } from "@/components/ui/components/button";
import { Progress } from "@/components/ui/shadcn/progress";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { cn } from "@/utils/style";
import { getDocumentIconType } from "@/utils/documents/get-document-icon-type";
import { DocumentIcon } from "./DocumentIcon";
import type {
  UploadAttachment,
  UploadAttachmentsFieldHandles,
} from "./upload-attachments.types";

export interface UploadAttachmentsProps {
  attachments: UploadAttachment[];
  onFilesSelected: (files: File[]) => void;
  onRemove: (attachmentId: string) => void;
  uploading: boolean;
  uploadProgress: number;
  attachButtonLabel?: string;
}

export const UploadAttachments = React.forwardRef<
  UploadAttachmentsFieldHandles,
  UploadAttachmentsProps
>(function UploadAttachments(
  {
    attachments,
    onFilesSelected,
    onRemove,
    uploading,
    uploadProgress,
    attachButtonLabel,
  },
  ref,
) {
  const { t } = useTranslation();
  const [inputStatus, setInputStatus] = React.useState<
    "success" | "error" | "default"
  >("default");
  const sectionRef = React.useRef<HTMLElement>(null);
  const id = React.useId();
  const inputId = `${id}-file-input`;
  const buttonId = `${id}-attach-button`;

  React.useImperativeHandle(
    ref,
    () => ({
      highlight(scroll = true) {
        setInputStatus("error");
        if (scroll && sectionRef.current) {
          const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          sectionRef.current.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "center",
          });
        }
      },
    }),
    [],
  );

  const { getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: onFilesSelected,
  });

  const resolvedAttachLabel =
    attachButtonLabel ?? t("components.uploadAttachments.attach");
  const progressValue = Math.min(100, Math.max(0, uploadProgress));
  const isUploadingBarVisible = uploading && attachments.length === 0;

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-3 w-full"
      aria-label={t("components.uploadAttachments.aria.attachments")}
    >
      {isUploadingBarVisible ? (
        <div
          className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 px-3 py-2.5"
          role="status"
          aria-live="polite"
        >
          <Spinner
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-muted-foreground">
                {t("components.uploadAttachments.uploading")}
              </span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {Math.round(progressValue)}%
              </span>
            </div>
            <Progress value={progressValue} className="h-1.5" />
          </div>
        </div>
      ) : null}

      <div className="flex flex-row justify-between items-start gap-4">
        <ul className="flex flex-row flex-wrap gap-2 min-w-0 flex-1 list-none">
          {attachments.map((attachment) => {
            const documentIconType = getDocumentIconType(attachment.type);
            const isImage =
              documentIconType === "image" && !!attachment.preview;
            return (
              <li key={attachment.id} className="shrink-0">
                <div
                  className={cn(
                    "flex w-60 items-center gap-2 rounded-lg border border-border px-2.5 py-1.5",
                    "transition-colors hover:bg-muted/40",
                  )}
                >
                  <div className="flex size-5 shrink-0 items-center justify-center">
                    {isImage ? (
                      <img
                        src={attachment.preview}
                        alt=""
                        width={20}
                        height={20}
                        className="size-full rounded-sm object-contain"
                      />
                    ) : (
                      <DocumentIcon
                        fileType={attachment.type}
                        className="size-4 shrink-0"
                      />
                    )}
                  </div>
                  <span
                    className="flex-1 min-w-0 truncate text-sm"
                    title={attachment.name}
                  >
                    {attachment.name}
                  </span>
                  <div className="flex shrink-0 items-center gap-0.5">
                    <Button
                      variant="ghost"
                      size={ButtonSize.SM}
                      type="button"
                      onClick={() => onRemove(attachment.id)}
                      disabled={uploading}
                      aria-label={t(
                        "components.uploadAttachments.aria.removeFile",
                        { name: attachment.name },
                      )}
                      icon={<X className="size-3.5" aria-hidden />}
                      className="size-6! text-muted-foreground"
                    />
                    <div
                      className="flex size-6 shrink-0 items-center justify-center"
                      role="status"
                      aria-live="polite"
                    >
                      {attachment.uploadStatus ? (
                        <Check
                          className="size-3.5 text-emerald-600"
                          aria-hidden
                        />
                      ) : attachment.uploading ? (
                        <Progress value={progressValue} className="h-1.5 w-4" />
                      ) : attachment.processing ? (
                        <Spinner
                          className="size-3.5 text-muted-foreground"
                          aria-label={t(
                            "components.uploadAttachments.aria.processing",
                          )}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <input
          {...getInputProps()}
          id={inputId}
          className="hidden"
          aria-label={t("components.uploadAttachments.aria.attachments")}
        />
        <div className="shrink-0">
          <Button
            type="button"
            variant="outline"
            iconLeft={<Paperclip className="size-4" aria-hidden />}
            label={resolvedAttachLabel}
            onClick={open}
            disabled={uploading}
            id={buttonId}
            aria-controls={inputId}
            className={cn(
              "border",
              inputStatus === "error" &&
                "border-destructive focus-visible:ring-destructive/20",
            )}
          />
        </div>
      </div>
    </section>
  );
});

UploadAttachments.displayName = "UploadAttachments";
