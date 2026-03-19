import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Button,
} from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { useTranslation } from "react-i18next";

export interface DialogModalProps {
  /** Whether the dialog is open */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Dialog title */
  title?: string;
  /** Dialog description */
  description?: string;
  /** Dialog content */
  children?: React.ReactNode;
  /** Footer content (overrides default buttons) */
  footer?: React.ReactNode;
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Show cancel button in footer */
  showCancel?: boolean;
  /** Show confirm button in footer */
  showConfirm?: boolean;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Confirm button variant */
  confirmVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /** Callback when cancel is clicked */
  onCancel?: () => void;
  /** Callback when confirm is clicked */
  onConfirm?: () => void;
  /** Loading state for confirm button */
  loading?: boolean;
  /** Disable confirm button */
  confirmDisabled?: boolean;
  /** Dialog size */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Additional className for content */
  className?: string;
}

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
  full: "sm:max-w-[calc(100vw-4rem)] sm:h-[calc(100vh-4rem)]",
};

export const DialogModal = React.forwardRef<
  React.ComponentRef<typeof DialogContent>,
  DialogModalProps
>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      children,
      footer,
      showCloseButton = true,
      showCancel = true,
      showConfirm = true,
      cancelText,
      confirmText,
      confirmVariant = "default",
      onCancel,
      onConfirm,
      loading = false,
      confirmDisabled = false,
      size = "md",
      className,
    },
    ref,
  ) => {
    const { t } = useTranslation();

    const handleCancel = () => {
      onCancel?.();
      onOpenChange?.(false);
    };

    const handleConfirm = () => {
      onConfirm?.();
    };

    const defaultFooter = (showCancel || showConfirm) && (
      <DialogFooter>
        {showCancel && (
          <DialogClose asChild>
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              {cancelText || t("common.cancel")}
            </Button>
          </DialogClose>
        )}
        {showConfirm && (
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={loading || confirmDisabled}
          >
            {loading ? t("common.loading") : confirmText || t("common.confirm")}
          </Button>
        )}
      </DialogFooter>
    );

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          ref={ref}
          showCloseButton={showCloseButton}
          className={cn(sizeClasses[size], className)}
        >
          {(title || description) && (
            <DialogHeader>
              {title && (
                <DialogTitle>
                  {title || t("components.dialog.defaultTitle")}
                </DialogTitle>
              )}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}

          {children && <div className="py-4">{children}</div>}

          {footer !== undefined ? footer : defaultFooter}
        </DialogContent>
      </Dialog>
    );
  },
);

DialogModal.displayName = "DialogModal";
