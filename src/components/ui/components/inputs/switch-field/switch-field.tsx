import * as React from "react";
import { Switch, Label } from "@/components/ui/primitives";
import { cn } from "@/utils/style";

export interface SwitchFieldProps {
  /** Switch id */
  id?: string;
  /** Switch label */
  label?: string;
  /** Field description/help text */
  description?: string;
  /** Error message to display */
  error?: string;
  /** Checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Whether the switch is required */
  required?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Additional className */
  className?: string;
  /** Label position relative to switch */
  labelPosition?: "left" | "right";
}

export const SwitchField = React.forwardRef<
  React.ComponentRef<typeof Switch>,
  SwitchFieldProps
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
      onCheckedChange,
      className,
      labelPosition = "right",
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;
    const descriptionId = description ? `${switchId}-description` : undefined;
    const errorId = error ? `${switchId}-error` : undefined;

    const switchElement = (
      <Switch
        ref={ref}
        id={switchId}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-describedby={
          [descriptionId, errorId].filter(Boolean).join(" ") || undefined
        }
        aria-invalid={error ? "true" : undefined}
        className={cn(error && "data-[state=unchecked]:border-destructive")}
      />
    );

    const labelElement = label && (
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={switchId}
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
    );

    return (
      <div className={cn("space-y-1", className)}>
        <div className="flex items-center space-x-3">
          {labelPosition === "left" && labelElement}
          {switchElement}
          {labelPosition === "right" && labelElement}
        </div>

        {error && (
          <p
            id={errorId}
            className={cn(
              "text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200",
              label && labelPosition === "right" && "ml-[52px]",
              label && labelPosition === "left" && "mr-[52px]",
            )}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

SwitchField.displayName = "SwitchField";
