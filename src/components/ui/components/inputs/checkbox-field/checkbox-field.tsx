import * as React from "react";
import { Checkbox, Label } from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import type { ReactNode } from "react";

export interface CheckboxFieldProps {
  /** Checkbox id */
  id?: string;
  /** Checkbox label */
  label?: string | ReactNode;
  /** Field description/help text */
  description?: string;
  /** Error message to display */
  error?: string;
  /** Checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Indeterminate state (for "select all" checkboxes) */
  indeterminate?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Additional className */
  className?: string;
}

export const CheckboxField = React.forwardRef<
  React.ComponentRef<typeof Checkbox>,
  CheckboxFieldProps
>(
  (
    {
      id,
      label,
      description,
      error,
      checked,
      defaultChecked,
      disabled,
      required,
      indeterminate,
      onCheckedChange,
      className,
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    const errorId = error ? `${checkboxId}-error` : undefined;

    // Handle indeterminate state
    const checkedValue = indeterminate ? "indeterminate" : checked;

    return (
      <div className={cn("space-y-1", className)}>
        <div className="flex items-start space-x-3">
          <Checkbox
            ref={ref}
            id={checkboxId}
            checked={checkedValue}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onCheckedChange={(value) => {
              // Only call with boolean value, ignore "indeterminate"
              if (typeof value === "boolean") {
                onCheckedChange?.(value);
              }
            }}
            aria-describedby={
              [descriptionId, errorId].filter(Boolean).join(" ") || undefined
            }
            aria-invalid={error ? "true" : undefined}
            className={cn(
              label && "mt-0.5",
              error && "border-destructive data-[state=checked]:bg-destructive",
            )}
          />

          {label && (
            <div className="grid gap-1.5">
              <Label
                htmlFor={checkboxId}
                className={cn(
                  "cursor-pointer select-none",
                  disabled && "cursor-not-allowed opacity-50",
                  error && "text-destructive",
                )}
              >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </Label>

              {description && !error && (
                <p id={descriptionId} className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200 ml-7"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

CheckboxField.displayName = "CheckboxField";
