import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { format } from "date-fns";
import { de, enUS } from "date-fns/locale";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  Check,
  Loader2,
  X,
} from "lucide-react";
import { nanoid } from "nanoid";
import * as React from "react";
import { useTranslation } from "react-i18next";

// Reduced motion styles for accessibility
const reducedMotionClass =
  "motion-reduce:animate-none motion-reduce:transition-none";

export type DatePickerMode = "date" | "month" | "year";

export interface DatePickerFieldProps {
  /** Current date value */
  value?: Date | null;
  /** Callback when date changes */
  onChange?: (date: Date | null) => void;
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
  /** Disabled state */
  disabled?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Date picker mode */
  mode?: DatePickerMode;
  /** Allow clearing the selected date */
  clearable?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Input element ID */
  id?: string;
}

export interface DatePickerFieldHandle {
  /** Focus the input and optionally scroll into view */
  highlight: (scroll?: boolean) => void;
  /** Focus the input element */
  focus: () => void;
}

const getLocale = (locale: string) => {
  return locale === "de" ? de : enUS;
};

const formatDate = (
  date: Date | null,
  mode: DatePickerMode,
  locale: string,
): string => {
  if (!date) return "";

  const dateLocale = getLocale(locale);
  const localeCode = locale === "de" ? "de-DE" : "en-US";

  switch (mode) {
    case "year":
      return format(date, "yyyy", { locale: dateLocale });
    case "month":
      return format(date, "MMM yyyy", { locale: dateLocale });
    default:
      // Use Intl.DateTimeFormat for locale-aware date formatting
      return new Intl.DateTimeFormat(localeCode, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
  }
};

export const DatePickerField = React.forwardRef<
  DatePickerFieldHandle,
  DatePickerFieldProps
>(
  (
    {
      value,
      onChange,
      label,
      description,
      error,
      success,
      required,
      loading,
      disabled,
      minDate,
      maxDate,
      mode = "date",
      clearable,
      placeholder,
      autoFocus,
      className,
      id,
    },
    ref,
  ) => {
    const { i18n } = useTranslation();
    const locale = i18n.language === "de" ? "de" : "en";

    const generatedId = React.useMemo(() => nanoid(5), []);
    const inputId = id || generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);

    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;
    const showSuccess = hasSuccess && !loading;
    const showError = hasError && !loading;
    const showClear = clearable && value && !disabled && !loading;

    // Check for reduced motion preference
    const prefersReducedMotion = React.useMemo(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    // Imperative handle for highlight/focus
    React.useImperativeHandle(ref, () => ({
      highlight: (scroll = true) => {
        if (scroll && containerRef.current) {
          containerRef.current.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "center",
          });
        }
        setOpen(true);
      },
      focus: () => {
        setOpen(true);
        inputRef.current?.focus();
      },
    }));

    // Handle date selection based on mode
    const handleDateSelect = React.useCallback(
      (date: Date | undefined) => {
        if (!date) {
          if (onChange) {
            onChange(null);
          }
          return;
        }

        let selectedDate: Date;

        // For year mode, select first day of the year
        if (mode === "year") {
          selectedDate = new Date(date.getFullYear(), 0, 1);
        }
        // For month mode, select first day of the month
        else if (mode === "month") {
          selectedDate = new Date(date.getFullYear(), date.getMonth(), 1);
        }
        // For date mode, use the selected date as-is
        else {
          selectedDate = date;
        }

        if (onChange) {
          onChange(selectedDate);
        }
        // Close popover after selection for date mode
        // For year/month modes, keep open to allow selecting from dropdowns
        if (mode === "date") {
          setOpen(false);
        }
      },
      [onChange, mode],
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (onChange) {
          onChange(null);
        }
      },
      [onChange],
    );

    // Determine calendar mode for react-day-picker (always single)
    const calendarMode = "single";

    // Determine month to display in calendar
    const calendarMonth = value || new Date();

    // Format display value
    const displayValue = value ? formatDate(value, mode, locale) : "";

    // Determine caption layout - use dropdown for year/month modes
    // This enables year and month picker dropdowns for easier selection
    const captionLayout =
      mode === "year" || mode === "month" ? "dropdown" : "label";

    // For year mode: limit navigation to show decade ranges
    // For month mode: limit navigation to show year ranges
    // This helps users navigate and select years/months more easily
    const getStartEndMonths = () => {
      if (mode === "year") {
        const baseDate = value || new Date();
        const year = baseDate.getFullYear();
        // Show decade view: allow navigation within a decade range
        const decadeStart = Math.floor(year / 10) * 10 - 10; // Show previous decade too
        const decadeEnd = Math.floor(year / 10) * 10 + 20; // Show next decade too
        return {
          startMonth: new Date(decadeStart, 0, 1),
          endMonth: new Date(decadeEnd, 11, 31),
        };
      } else if (mode === "month") {
        const baseDate = value || new Date();
        const year = baseDate.getFullYear();
        // Show year view: all 12 months of the year
        return {
          startMonth: new Date(year, 0, 1),
          endMonth: new Date(year, 11, 31),
        };
      }
      return { startMonth: undefined, endMonth: undefined };
    };

    const { startMonth, endMonth } = getStartEndMonths();

    return (
      <div ref={containerRef} className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={inputId} className={cn(error && "text-destructive")}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              className="relative"
              tabIndex={disabled || loading ? -1 : 0}
              aria-label={label || "Date picker"}
              aria-expanded={open}
              aria-haspopup="dialog"
              onKeyDown={(e) => {
                // Handle keyboard access for the wrapper div
                if (
                  (e.key === "Enter" || e.key === " ") &&
                  !disabled &&
                  !loading
                ) {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            >
              <Input
                ref={inputRef}
                id={inputId}
                type="text"
                value={displayValue}
                placeholder={placeholder}
                readOnly
                disabled={disabled || loading}
                autoFocus={
                  autoFocus &&
                  typeof window !== "undefined" &&
                  window.innerWidth >= 768
                }
                autoComplete="off"
                aria-describedby={
                  [descriptionId, errorId].filter(Boolean).join(" ") ||
                  undefined
                }
                aria-invalid={error ? "true" : undefined}
                className={cn(
                  "pr-10",
                  hasError &&
                    "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive",
                  hasSuccess &&
                    !hasError &&
                    "border-green-500 focus-visible:ring-green-500/20 focus-visible:border-green-500",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled && !loading) {
                    setOpen(true);
                  }
                }}
                onFocus={(e) => {
                  e.stopPropagation();
                  if (!disabled && !loading) {
                    setOpen(true);
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {loading && (
                  <Loader2
                    className={cn(
                      "h-3.5 w-3.5 animate-spin text-muted-foreground",
                      reducedMotionClass,
                    )}
                    aria-hidden="true"
                  />
                )}
                {showSuccess && (
                  <Check
                    className={cn(
                      "h-3.5 w-3.5 text-green-500 animate-in fade-in duration-200",
                      reducedMotionClass,
                    )}
                    aria-hidden="true"
                  />
                )}
                {showError && (
                  <AlertCircle
                    className={cn(
                      "h-3.5 w-3.5 text-destructive animate-in fade-in duration-200",
                      reducedMotionClass,
                    )}
                    aria-hidden="true"
                  />
                )}
                {showClear && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                    onClick={handleClear}
                    tabIndex={-1}
                    aria-label="Clear date"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground"
                  disabled={disabled}
                  tabIndex={disabled ? -1 : 0}
                  aria-label="Open calendar"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!disabled && !loading) {
                      setOpen(true);
                    }
                  }}
                >
                  <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode={calendarMode}
              selected={value ?? undefined}
              onSelect={handleDateSelect}
              disabled={disabled || loading}
              defaultMonth={calendarMonth}
              captionLayout={captionLayout}
              locale={getLocale(locale)}
              fromDate={minDate}
              toDate={maxDate}
              startMonth={startMonth}
              endMonth={endMonth}
              className="rounded-md border-0"
            />
          </PopoverContent>
        </Popover>

        {description && !error && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            className={cn(
              "text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200",
              reducedMotionClass,
            )}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

DatePickerField.displayName = "DatePickerField";
