import * as React from "react";
import { Spinner } from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { useTranslation } from "react-i18next";

export interface LoadingSpinnerProps extends React.ComponentProps<"div"> {
  /** Size of the spinner */
  size?: "sm" | "md" | "lg" | "xl";
  /** Loading text to display */
  text?: string;
  /** Show as full-screen overlay */
  overlay?: boolean;
  /** Center the spinner in its container */
  centered?: boolean;
  /** Screen reader text (uses i18n common.loading by default) */
  srText?: string;
}

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
};

const textSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export const LoadingSpinner = React.forwardRef<
  HTMLDivElement,
  LoadingSpinnerProps
>(
  (
    {
      size = "md",
      text,
      overlay = false,
      centered = false,
      srText,
      className,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const loadingText = srText || t("common.loading");

    const spinnerContent = (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "flex flex-col items-center justify-center gap-2",
          centered && "absolute inset-0",
          className,
        )}
        {...props}
      >
        <Spinner className={sizeClasses[size]} aria-hidden="true" />
        {text ? (
          <span className={cn("text-muted-foreground", textSizeClasses[size])}>
            {text}
          </span>
        ) : (
          <span className="sr-only">{loadingText}</span>
        )}
      </div>
    );

    if (overlay) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          {spinnerContent}
        </div>
      );
    }

    return spinnerContent;
  },
);

LoadingSpinner.displayName = "LoadingSpinner";
