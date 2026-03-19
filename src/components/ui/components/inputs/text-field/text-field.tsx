import * as React from "react";
import { Input, Label } from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { X, Check, AlertCircle, Loader2 } from "lucide-react";

export interface TextFieldProps extends Omit<
  React.ComponentProps<typeof Input>,
  "type" | "error"
> {
  /** Field label */
  label?: string;
  /** Field description/help text */
  description?: string;
  /** Error message to display */
  error?: string;
  /** Success state */
  success?: boolean;
  /** Show required indicator */
  required?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Allow clearing the input */
  clearable?: boolean;
  /** Unit adornment (e.g., "kg", "$") */
  unit?: string;
  /** Input type */
  type?: "text" | "email" | "url" | "tel";
  /** Callback when clear button is clicked */
  onClear?: () => void;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      description,
      error,
      success,
      required,
      loading,
      clearable,
      unit,
      type = "text",
      onClear,
      className,
      id,
      value,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const hasValue = value !== undefined && value !== "";
    const showClear = clearable && hasValue && !disabled && !loading;
    const showUnit = unit && !loading;
    const showSuccess = success && !error && !loading;
    const showError = error && !loading;

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        // Simulate clearing the input
        const syntheticEvent = {
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
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
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled || loading}
            aria-describedby={
              [descriptionId, errorId].filter(Boolean).join(" ") || undefined
            }
            aria-invalid={error ? "true" : undefined}
            className={cn(
              "pr-10",
              error &&
                "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive",
              success &&
                !error &&
                "border-green-500 focus-visible:ring-green-500/20 focus-visible:border-green-500",
            )}
            error={Boolean(error)}
            {...props}
          />

          {/* Right side adornments */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}

            {showSuccess && (
              <Check className="h-4 w-4 text-green-500 animate-in fade-in duration-200" />
            )}

            {showError && (
              <AlertCircle className="h-4 w-4 text-destructive animate-in fade-in duration-200" />
            )}

            {showUnit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}

            {showClear && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
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

TextField.displayName = "TextField";
