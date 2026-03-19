import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { PHONE_PREFIXES } from "@/utils/phone";
import { X } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

export type CountryOption = {
  value: string;
  label: string;
};

export type CountryFieldHandle = {
  highlight(scroll?: boolean): void;
};

export interface CountryFieldProps {
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
  /** Field placeholder */
  placeholder?: string;
  /** Current value */
  value?: CountryOption | null;
  /** Callback when selection changes */
  onChange?: (value: CountryOption | null) => void;
  /** Options to render */
  options?: CountryOption[];
  /** Allow clearing the selection */
  clearable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Input element ID */
  id?: string;
  /** Disable the field */
  disabled?: boolean;
  /** Max width of the field */
  maxWidth?: number;
  /** Form field name */
  name?: string;
  /** Autocomplete value */
  autoComplete?: string;
  /** Accessible label when no visible label is provided */
  ariaLabel?: string;
}

export const CountryField = React.forwardRef<
  CountryFieldHandle,
  CountryFieldProps
>(
  (
    {
      label,
      description,
      error,
      success,
      required,
      placeholder,
      value,
      onChange,
      options,
      clearable = false,
      className,
      id,
      disabled,
      maxWidth,
      name,
      autoComplete,
      ariaLabel,
    },
    countryRef,
  ) => {
    const { t } = useTranslation();
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);

    const prefersReducedMotion = React.useMemo(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    const normalizedOptions = options ?? PHONE_PREFIXES;
    const selectedValue = value?.value ?? "";
    const showClear = Boolean(clearable && value && !disabled);
    const placeholderText = placeholder ?? t("components.country.placeholder");
    const clearAriaLabel = t("components.country.clearAria");
    const ariaLabelText =
      typeof label === "string" && label.length > 0
        ? label
        : ariaLabel || t("components.country.label");
    const showSuccess = Boolean(success) && !error;
    const showError = Boolean(error);

    React.useImperativeHandle(countryRef, () => ({
      highlight: (scroll = true) => {
        if (scroll && rootRef.current) {
          rootRef.current.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "center",
          });
        }
        setOpen(true);
        const triggerElement = document.getElementById(inputId);
        triggerElement?.focus();
      },
    }));

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onChange?.(null);
      setOpen(false);
    };

    return (
      <div
        ref={rootRef}
        style={{ maxWidth: maxWidth ?? "unset" }}
        className={cn("space-y-2", className)}
      >
        {label ? (
          <div className="flex flex-wrap items-center gap-2">
            <Label
              htmlFor={inputId}
              className={cn(
                "text-foreground inline-flex items-center gap-1 font-medium",
                showError && "text-destructive",
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          </div>
        ) : null}

        <div className="relative">
          <Select
            value={selectedValue}
            onValueChange={(nextValue) => {
              const foundValue = normalizedOptions.find(
                (option) => option.value === nextValue,
              );
              onChange?.(foundValue ?? null);
            }}
            name={name ?? inputId}
            autoComplete={autoComplete ?? "country-name"}
            open={open}
            onOpenChange={setOpen}
            disabled={disabled}
          >
            <SelectTrigger
              id={inputId}
              aria-describedby={
                [
                  description && !showError ? descriptionId : null,
                  showError ? errorId : null,
                ]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
              aria-label={!label ? ariaLabelText : undefined}
              aria-invalid={showError}
              className={cn(
                "w-full justify-between min-w-0",
                showClear && "pr-12",
                showError &&
                  "border-destructive/70 shadow-sm ring-1 ring-destructive/20",
                showSuccess && "border-emerald-500 ring-1 ring-emerald-500/20",
              )}
            >
              <SelectValue placeholder={placeholderText} />
            </SelectTrigger>
            <SelectContent
              align="start"
              className="min-w-[var(--radix-select-trigger-width)] max-h-60"
            >
              {normalizedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {showClear ? (
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={clearAriaLabel}
              onPointerDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onClick={handleClear}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {description && !showError ? (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}

        {showError ? (
          <p
            id={errorId}
            className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

CountryField.displayName = "CountryField";
