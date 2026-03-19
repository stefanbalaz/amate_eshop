import * as React from "react";
import { Input, Label, Button } from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { Minus, Plus, AlertCircle, Check, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface NumberFieldProps extends Omit<
  React.ComponentProps<typeof Input>,
  "type" | "onChange" | "error"
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
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value for increment/decrement */
  step?: number;
  /** Show increment/decrement buttons */
  showControls?: boolean;
  /** Current value */
  value?: number | "";
  /** Callback when value changes */
  onChange?: (value: number | undefined) => void;
  /** Unit adornment (e.g., "kg", "$") */
  unit?: string;
  /** Allow decimal values */
  allowDecimals?: boolean;
  /** Decimal places to show */
  decimalPlaces?: number;
}

export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      label,
      description,
      error,
      success,
      required,
      loading,
      min,
      max,
      step = 1,
      showControls = true,
      value,
      onChange,
      unit,
      allowDecimals = false,
      decimalPlaces = 2,
      className,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const showSuccess = success && !error && !loading;
    const showError = error && !loading;

    const numValue = value === "" || value === undefined ? undefined : value;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (inputValue === "") {
        onChange?.(undefined);
        return;
      }

      const parsed = allowDecimals
        ? parseFloat(inputValue)
        : parseInt(inputValue, 10);

      if (!isNaN(parsed)) {
        let newValue = parsed;
        if (min !== undefined && newValue < min) newValue = min;
        if (max !== undefined && newValue > max) newValue = max;
        onChange?.(newValue);
      }
    };

    const handleIncrement = () => {
      if (disabled || loading) return;
      const current = numValue ?? min ?? 0;
      let newValue = current + step;
      if (max !== undefined && newValue > max) newValue = max;
      onChange?.(
        allowDecimals ? parseFloat(newValue.toFixed(decimalPlaces)) : newValue,
      );
    };

    const handleDecrement = () => {
      if (disabled || loading) return;
      const current = numValue ?? min ?? 0;
      let newValue = current - step;
      if (min !== undefined && newValue < min) newValue = min;
      onChange?.(
        allowDecimals ? parseFloat(newValue.toFixed(decimalPlaces)) : newValue,
      );
    };

    const canIncrement = max === undefined || (numValue ?? 0) < max;
    const canDecrement = min === undefined || (numValue ?? 0) > min;

    const displayValue =
      numValue !== undefined
        ? allowDecimals
          ? numValue.toFixed(decimalPlaces)
          : numValue.toString()
        : "";

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={inputId} className={cn(error && "text-destructive")}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}

        <div className="flex items-center gap-2">
          {showControls && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              disabled={disabled || loading || !canDecrement}
              aria-label={t("common.previous")}
              className="h-10 w-10 shrink-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}

          <div className="relative flex-1">
            <Input
              ref={ref}
              id={inputId}
              type="text"
              inputMode={allowDecimals ? "decimal" : "numeric"}
              pattern={allowDecimals ? "[0-9]*\\.?[0-9]*" : "[0-9]*"}
              value={displayValue}
              onChange={handleInputChange}
              disabled={disabled || loading}
              aria-describedby={
                [descriptionId, errorId].filter(Boolean).join(" ") || undefined
              }
              aria-invalid={error ? "true" : undefined}
              className={cn(
                "text-center",
                (unit || showSuccess || showError || loading) && "pr-10",
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

              {unit && !loading && (
                <span className="text-sm text-muted-foreground">{unit}</span>
              )}
            </div>
          </div>

          {showControls && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleIncrement}
              disabled={disabled || loading || !canIncrement}
              aria-label={t("common.next")}
              className="h-10 w-10 shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
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

NumberField.displayName = "NumberField";
