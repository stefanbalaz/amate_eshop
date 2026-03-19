import * as React from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { Progress, Spinner } from "@/components/ui/primitives";
import { cn } from "@/utils/style";

export type AvatarImage = {
  preview: string;
  file?: File;
};

export type AvatarDropZoneProps = {
  /** Optional override for active drag text (defaults to i18n) */
  dragActiveText?: string;
  /** Optional override for inactive drag text (defaults to i18n) */
  dragInactiveText?: string;

  avatar: AvatarImage | null;
  onChange: (value: AvatarImage | null) => void;

  /** Max file size in bytes */
  maxSizeBytes: number;

  /** @deprecated Use maxSizeBytes */
  maxSize?: number;

  uploading?: boolean;
  uploadProgress?: number;

  /** Error message shown below the control */
  error?: string;
  /** Success state (green ring/border) */
  success?: boolean;
};

const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpeg", ".jpg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/bmp": [".bmp"],
  "image/gif": [".gif"],
  "image/tiff": [".tif", ".tiff"],
  "image/svg+xml": [".svg"],
  "image/avif": [".avif"],
  "image/vnd.microsoft.icon": [".ico"],
} as const;

const isBlobUrl = (url: string) => url.startsWith("blob:");

const hasErrorCode = (rejections: FileRejection[], code: string) =>
  rejections.some((rejection) =>
    rejection.errors.some((error) => error.code === code),
  );

export const AvatarDropZone = ({
  dragActiveText,
  dragInactiveText,
  avatar,
  onChange,
  maxSizeBytes,
  maxSize,
  uploading = false,
  uploadProgress,
  error,
  success,
}: AvatarDropZoneProps) => {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const isDisabled = uploading || isProcessing;
  const effectiveMaxSizeBytes = maxSizeBytes ?? maxSize;

  const resolvedDragActiveText =
    dragActiveText ?? t("components.avatarDropZone.dragActiveText");
  const resolvedDragInactiveText =
    dragInactiveText ?? t("components.avatarDropZone.dragInactiveText");

  const generatedId = React.useId();
  const errorId = error ? `${generatedId}-error` : undefined;

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (isDisabled) return;

      const file = acceptedFiles[0];
      if (!file) return;

      if (
        typeof effectiveMaxSizeBytes === "number" &&
        file.size > effectiveMaxSizeBytes
      ) {
        toast.error(
          t("components.avatarDropZone.errors.tooLarge", {
            sizeMb: Math.round(effectiveMaxSizeBytes / 1000000),
          }),
        );
        return;
      }

      setIsProcessing(true);

      let previewUrl: string | undefined;
      try {
        previewUrl = URL.createObjectURL(file);
        onChange({ file, preview: previewUrl });
      } catch {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        toast.error(t("components.avatarDropZone.errors.processing"));
      } finally {
        setIsProcessing(false);
      }
    },
    [effectiveMaxSizeBytes, isDisabled, onChange, t],
  );

  const handleDropRejected = React.useCallback(
    (rejections: FileRejection[]) => {
      if (isDisabled) return;

      if (hasErrorCode(rejections, "file-too-large")) {
        toast.error(
          t("components.avatarDropZone.errors.tooLarge", {
            sizeMb: Math.round(effectiveMaxSizeBytes / 1000000),
          }),
        );
        return;
      }

      if (hasErrorCode(rejections, "file-invalid-type")) {
        toast.error(t("components.avatarDropZone.errors.invalidType"));
        return;
      }

      toast.error(t("components.avatarDropZone.errors.processing"));
    },
    [effectiveMaxSizeBytes, isDisabled, t],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    onDropRejected: handleDropRejected,
    accept: ACCEPTED_IMAGE_TYPES,
    maxFiles: 1,
    multiple: false,
    disabled: isDisabled,
    maxSize: effectiveMaxSizeBytes,
  });

  React.useEffect(() => {
    return () => {
      if (avatar?.preview && isBlobUrl(avatar.preview)) {
        URL.revokeObjectURL(avatar.preview);
      }
    };
  }, [avatar]);

  const progressValue =
    typeof uploadProgress === "number"
      ? Math.min(100, Math.max(0, uploadProgress))
      : undefined;

  const showSuccess = Boolean(success) && !error;

  return (
    <div className="inline-flex flex-col items-center space-y-2">
      <button
        type="button"
        disabled={isDisabled}
        aria-label={t("components.avatarDropZone.aria.dropzone")}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId}
        {...getRootProps({
          role: "button",
          className: cn(
            "touch-manipulation relative flex h-[150px] w-[150px] flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed bg-muted/30 text-muted-foreground transition-colors",
            "select-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isDisabled && "cursor-not-allowed opacity-60",
            !isDisabled && "cursor-pointer hover:bg-muted/40",
            isDragActive && "border-blue-500",
            isDragAccept && "border-emerald-500",
            isDragReject && "border-destructive",
            error && "border-destructive focus-visible:ring-destructive/20",
            showSuccess &&
              "border-green-500 focus-visible:ring-green-500/20 focus-visible:border-green-500",
          ),
        })}
      >
        {!isDisabled ? (
          <input {...getInputProps({ className: "hidden" })} />
        ) : null}

        {isProcessing ? (
          <Spinner
            className="size-6"
            aria-label={t("components.loadingSpinner.processing")}
          />
        ) : uploading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Spinner
              className="size-6"
              aria-label={t("components.avatarDropZone.aria.uploading")}
            />
            {progressValue !== undefined ? (
              <div className="w-[90px] space-y-2">
                <Progress value={progressValue} />
                <p className="text-center text-xs text-muted-foreground">
                  {Math.round(progressValue)}%
                </p>
              </div>
            ) : null}
          </div>
        ) : avatar ? (
          <img
            src={avatar.preview}
            alt={t("components.avatarDropZone.imageAlt")}
            width={150}
            height={150}
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : isDragActive ? (
          <p className="px-3 text-center text-sm leading-snug">
            {resolvedDragActiveText}
          </p>
        ) : (
          <p className="px-3 text-center text-sm leading-snug">
            {resolvedDragInactiveText}
          </p>
        )}
      </button>

      {error ? (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
};

AvatarDropZone.displayName = "AvatarDropZone";
