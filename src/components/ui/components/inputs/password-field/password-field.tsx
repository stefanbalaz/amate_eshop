import * as React from "react";
import { Input, Label } from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface PasswordFieldProps extends Omit<
  React.ComponentProps<typeof Input>,
  "type" | "error"
> {
  /** Field label */
  label?: string;
  /** Field description/help text */
  description?: string;
  /** Error message to display */
  error?: string;
  /** Show required indicator */
  required?: boolean;
  /** Loading state */
  loading?: boolean;
}

export const PasswordField = React.forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(
  (
    {
      label,
      description,
      error,
      required,
      loading,
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = React.useState(false);

    const generatedId = React.useId();
    const inputId = id || generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={inputId} className={cn(error && "text-destructive")}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}

        <div className="relative">
          <Input
            ref={ref}
            id={inputId}
            type={showPassword ? "text" : "password"}
            disabled={disabled || loading}
            aria-describedby={
              [descriptionId, errorId].filter(Boolean).join(" ") || undefined
            }
            aria-invalid={error ? "true" : undefined}
            className={cn(
              "pr-10",
              error &&
                "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive",
            )}
            error={Boolean(error)}
            {...props}
          />

          {/* Right side adornments */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}

            {error && !loading && (
              <AlertCircle className="h-4 w-4 text-destructive animate-in fade-in duration-200" />
            )}

            {!loading && (
              <button
                type="button"
                onClick={toggleVisibility}
                disabled={disabled}
                className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={
                  showPassword
                    ? t("components.password.hide")
                    : t("components.password.show")
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {description && !error && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";
