import * as React from "react";
import { cn } from "@/utils/style";
import { Button } from "@/components/ui/primitives";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertMessageProps extends React.ComponentProps<"div"> {
  /** Alert variant/type */
  variant?: AlertVariant;
  /** Alert title */
  title?: string;
  /** Alert message content */
  children?: React.ReactNode;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Hide the icon */
  hideIcon?: boolean;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
}

const variantStyles: Record<AlertVariant, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100",
  success:
    "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
  warning:
    "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100",
  error:
    "bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100",
};

const variantIcons: Record<AlertVariant, React.ReactNode> = {
  info: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  success: (
    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
  ),
  warning: (
    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
  ),
  error: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
};

export const AlertMessage = React.forwardRef<HTMLDivElement, AlertMessageProps>(
  (
    {
      variant = "info",
      title,
      children,
      dismissible = false,
      onDismiss,
      icon,
      hideIcon = false,
      action,
      className,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const [dismissed, setDismissed] = React.useState(false);

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    if (dismissed) {
      return null;
    }

    const displayIcon = icon ?? variantIcons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex gap-3 rounded-lg border p-4",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {!hideIcon && (
          <div className="flex-shrink-0" aria-hidden="true">
            {displayIcon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {title && <h5 className="font-medium leading-tight mb-1">{title}</h5>}

          {children && <div className="text-sm opacity-90">{children}</div>}

          {action && (
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className="bg-white/50 dark:bg-black/20"
              >
                {action.label}
              </Button>
            </div>
          )}
        </div>

        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 flex-shrink-0 opacity-70 hover:opacity-100"
            onClick={handleDismiss}
            aria-label={t("common.close")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  },
);

AlertMessage.displayName = "AlertMessage";
