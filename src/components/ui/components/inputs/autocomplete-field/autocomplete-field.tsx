import * as React from "react";
import { ChevronsUpDown, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Badge,
  Label,
  Button,
  Checkbox,
} from "@/components/ui/primitives";
import { cn } from "@/utils/style";

export type AutocompleteOption<T extends string = string> = {
  value: T;
  label: string;
};

export interface AutocompleteFieldProps<T extends string = string> {
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
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Placeholder text when no items are selected */
  triggerPlaceholder?: string;
  /** Available options to select from */
  options: AutocompleteOption<T>[];
  /** Currently selected values */
  value: T[];
  /** Callback when selection changes */
  onChange: (value: T[]) => void;
  /** Maximum number of tags to display before collapsing */
  maxDisplayedTags?: number;
  /** Whether to sort options alphabetically */
  sortOptions?: boolean;
  /** Empty state message when no options match the search */
  emptyMessage?: string;
  /** Additional class name for the root element */
  className?: string;
  /** Disable the field */
  disabled?: boolean;
}

export const AutocompleteField = <T extends string = string>({
  label,
  description,
  error,
  success,
  required,
  placeholder,
  triggerPlaceholder,
  options,
  value,
  onChange,
  maxDisplayedTags = 3,
  sortOptions = true,
  emptyMessage,
  className,
  disabled,
}: AutocompleteFieldProps<T>): React.JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const generatedId = React.useId();

  const resolvedPlaceholder =
    placeholder ?? t("components.autocomplete.searchPlaceholder");
  const resolvedTriggerPlaceholder =
    triggerPlaceholder ?? t("components.autocomplete.selectPlaceholder");
  const resolvedEmptyMessage =
    emptyMessage ?? t("components.autocomplete.noResults");
  const triggerId = `${generatedId}-trigger`;
  const descriptionId = description ? `${generatedId}-description` : undefined;
  const errorId = error ? `${generatedId}-error` : undefined;

  const sortedOptions = React.useMemo(() => {
    if (!sortOptions) return options;
    return [...options].sort((a, b) => a.label.localeCompare(b.label));
  }, [options, sortOptions]);

  const selectedOptions = React.useMemo(() => {
    return options.filter((option) => value.includes(option.value));
  }, [options, value]);

  const handleSelect = (optionValue: T): void => {
    const isSelected = value.includes(optionValue);
    if (isSelected) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (
    optionValue: T,
    event: React.MouseEvent | React.KeyboardEvent,
  ): void => {
    event.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const handleClearAll = (event: React.MouseEvent): void => {
    event.stopPropagation();
    onChange([]);
  };

  const hasError = Boolean(error);
  const hasSuccess = success && !hasError;
  const displayedTags = selectedOptions.slice(0, maxDisplayedTags);
  const remainingCount = Math.max(0, selectedOptions.length - maxDisplayedTags);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label
          htmlFor={triggerId}
          className={cn(hasError && "text-destructive")}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id={triggerId}
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-label={!label ? resolvedTriggerPlaceholder : undefined}
            aria-describedby={
              [descriptionId, errorId].filter(Boolean).join(" ") || undefined
            }
            aria-invalid={hasError ? "true" : undefined}
            disabled={disabled}
            className={cn(
              "w-full justify-between min-h-10 h-auto py-2 px-2 cursor-pointer hover:bg-transparent",
              hasError &&
                "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive",
              hasSuccess &&
                "border-emerald-500 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500",
              disabled && "opacity-50 cursor-not-allowed",
            )}
          >
            <div className="flex flex-wrap gap-1 flex-1 min-w-0">
              {selectedOptions.length === 0 ? (
                <span className="text-muted-foreground font-normal">
                  {resolvedTriggerPlaceholder}
                </span>
              ) : (
                <>
                  {displayedTags.map((option) => (
                    <Badge
                      key={option.value}
                      variant="secondary"
                      className="gap-1 pr-1 max-w-37.5"
                    >
                      <span className="truncate">{option.label}</span>
                      <button
                        type="button"
                        className="rounded-full hover:bg-muted-foreground/20 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                        onClick={(e) => handleRemove(option.value, e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleRemove(option.value, e);
                          }
                        }}
                        aria-label={t("components.autocomplete.remove", {
                          label: option.label,
                        })}
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </Badge>
                  ))}
                  {remainingCount > 0 && (
                    <Badge variant="outline">
                      {t("components.autocomplete.more", {
                        count: remainingCount,
                      })}
                    </Badge>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-1 ml-2 shrink-0">
              {selectedOptions.length > 0 && (
                <button
                  type="button"
                  className="rounded-full hover:bg-muted p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                  onClick={handleClearAll}
                  aria-label={t("components.autocomplete.clearAll")}
                >
                  <X
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </button>
              )}
              <ChevronsUpDown
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput
              placeholder={resolvedPlaceholder}
              autoComplete="off"
            />
            <CommandList>
              <CommandEmpty>{resolvedEmptyMessage}</CommandEmpty>
              <CommandGroup>
                {sortedOptions.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => handleSelect(option.value)}
                      className="gap-2"
                    >
                      <Checkbox
                        checked={isSelected}
                        className="pointer-events-none data-[state=checked]:bg-primary data-[state=checked]:text-white"
                      />
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {description && !hasError && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {hasError && (
        <p
          id={errorId}
          aria-live="polite"
          className="text-sm text-destructive motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-200"
        >
          {error}
        </p>
      )}
    </div>
  );
};
