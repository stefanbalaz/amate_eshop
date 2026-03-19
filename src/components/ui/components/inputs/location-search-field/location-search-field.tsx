import * as React from "react";
import { AlertCircle, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { LocationSearchFieldLabel } from "./location-search-field-label";
import { LocationSearchFieldSuggestions } from "./location-search-field-suggestions";
import type {
  LocationSearchFieldHandle,
  LocationSearchFieldProps,
  LocationSearchFieldStatus,
  LocationSuggestion,
} from "./location-search-field.types";

export const LocationSearchField = React.forwardRef<
  LocationSearchFieldHandle,
  LocationSearchFieldProps
>(
  (
    {
      handleAddressSelect,
      handleAddressChange,
      autocompleteAddress,
      name,
      autoComplete,
      ariaLabel,
      placeholder,
      inputRootClass,
      inputClass,
      validate,
      required = false,
      autoFocus = false,
      info,
      infoContent,
      infoTitle,
      label,
      description,
      errorMessage,
      id,
      showRequiredSymbol = true,
      nodeBefore,
      nodeAfter,
      suggestions,
      loading = false,
      loadingText,
      emptyText,
      className,
    },
    locationSearchFieldRef,
  ) => {
    const { t } = useTranslation();
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = errorMessage ? `${inputId}-error` : undefined;
    const rootRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [inputStatus, setInputStatus] =
      React.useState<LocationSearchFieldStatus>("default");
    const [isSuggestionsVisible, setIsSuggestionsVisible] =
      React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(-1);

    const resolvedSuggestions = suggestions ?? [];
    const hasExternalError = Boolean(
      errorMessage && errorMessage.trim().length > 0,
    );
    const hasValidationError = Boolean(validate) && inputStatus === "error";
    const hasError = hasExternalError || hasValidationError;
    const hasSuccess =
      !hasExternalError && Boolean(validate) && inputStatus === "success";
    const hasQuery = Boolean(autocompleteAddress?.trim().length);
    const shouldShowEmptyState =
      hasQuery && !loading && resolvedSuggestions.length === 0;
    const isSuggestionsDropdownVisible =
      isSuggestionsVisible &&
      (loading || resolvedSuggestions.length > 0 || shouldShowEmptyState);
    const resolvedAutoComplete = autoComplete ?? "street-address";
    const resolvedAriaLabel =
      ariaLabel ?? t("components.locationSearch.ariaLabel");
    const resolvedLoadingText =
      loadingText ?? t("components.locationSearch.loading");
    const resolvedEmptyText =
      emptyText ?? t("components.locationSearch.noResults");
    const helperTextId = hasError && errorMessage ? errorId : descriptionId;

    const runValidation = React.useCallback(
      (value: string) => {
        if (!validate) {
          setInputStatus("default");
          return;
        }

        setInputStatus(validate(value) ? "success" : "error");
      },
      [validate],
    );

    React.useImperativeHandle(locationSearchFieldRef, () => ({
      highlight: (scroll = true) => {
        setInputStatus("error");

        if (scroll && rootRef.current) {
          const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          rootRef.current.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "center",
          });
        }

        inputRef.current?.focus();
      },
    }));

    const onChangeHandler = (value: string) => {
      setIsSuggestionsVisible(true);
      setActiveIndex(-1);
      handleAddressChange(value);

      if (validate) {
        setInputStatus(validate(value) ? "success" : "error");
      }
    };

    const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsSuggestionsVisible(false);
      handleAddressChange(event.target.value);

      if (validate) {
        setInputStatus(validate(event.target.value) ? "success" : "error");
      } else {
        setInputStatus("default");
      }
    };

    const onSuggestionSelect = (suggestion: LocationSuggestion) => {
      handleAddressChange(suggestion.description);
      handleAddressSelect?.(suggestion.description, suggestion.placeId);
      runValidation(suggestion.description);
      setIsSuggestionsVisible(false);
      setActiveIndex(-1);
      inputRef.current?.focus();
    };

    const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isSuggestionsDropdownVisible || resolvedSuggestions.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) =>
          prev >= resolvedSuggestions.length - 1 ? 0 : prev + 1,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) =>
          prev <= 0 ? resolvedSuggestions.length - 1 : prev - 1,
        );
        return;
      }

      if (event.key === "Enter" && activeIndex >= 0) {
        event.preventDefault();
        onSuggestionSelect(resolvedSuggestions[activeIndex]);
        return;
      }

      if (event.key === "Escape") {
        setIsSuggestionsVisible(false);
        setActiveIndex(-1);
      }
    };

    return (
      <div ref={rootRef} className={cn("space-y-2", className)}>
        <LocationSearchFieldLabel
          inputId={inputId}
          label={label}
          required={required}
          showRequiredSymbol={showRequiredSymbol}
          hasError={hasError}
          info={info}
          infoContent={infoContent}
          infoTitle={infoTitle}
          nodeBefore={nodeBefore}
          nodeAfter={nodeAfter}
        />

        <div className={cn("relative", inputRootClass)}>
          <div className="relative">
            <Input
              ref={inputRef}
              id={inputId}
              name={name ?? inputId}
              value={autocompleteAddress ?? ""}
              placeholder={placeholder}
              autoComplete={resolvedAutoComplete}
              autoFocus={autoFocus}
              onChange={(event) => onChangeHandler(event.target.value)}
              onBlur={onBlurHandler}
              onFocus={() => {
                if (resolvedSuggestions.length > 0 || loading) {
                  setIsSuggestionsVisible(true);
                }
              }}
              onKeyDown={onInputKeyDown}
              role="combobox"
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-required={required ? true : undefined}
              aria-expanded={isSuggestionsDropdownVisible}
              aria-controls={
                isSuggestionsDropdownVisible
                  ? `${inputId}-suggestions`
                  : undefined
              }
              aria-activedescendant={
                activeIndex >= 0
                  ? `${inputId}-suggestion-${activeIndex}`
                  : undefined
              }
              aria-describedby={helperTextId}
              aria-invalid={hasError ? "true" : undefined}
              aria-label={!label ? resolvedAriaLabel : undefined}
              className={cn(
                "pr-10",
                hasError &&
                  "border-destructive/70 ring-1 ring-destructive/20 focus-visible:border-destructive",
                hasSuccess &&
                  "border-emerald-500 ring-1 ring-emerald-500/20 focus-visible:border-emerald-500",
                inputClass,
              )}
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              {hasSuccess ? (
                <Check className="h-4 w-4 text-emerald-500 motion-safe:animate-in motion-safe:fade-in" />
              ) : null}
              {hasError ? (
                <AlertCircle className="h-4 w-4 text-destructive motion-safe:animate-in motion-safe:fade-in" />
              ) : null}
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {hasError
              ? t("components.locationSearch.validationInvalid")
              : hasSuccess
                ? t("components.locationSearch.validationValid")
                : ""}
            {isSuggestionsDropdownVisible &&
            !loading &&
            resolvedSuggestions.length > 0
              ? ` ${t("components.locationSearch.suggestionsCount", { count: resolvedSuggestions.length })}`
              : ""}
          </p>

          <LocationSearchFieldSuggestions
            inputId={inputId}
            isVisible={isSuggestionsDropdownVisible}
            isLoading={loading}
            shouldShowEmptyState={shouldShowEmptyState}
            loadingText={resolvedLoadingText}
            emptyText={resolvedEmptyText}
            suggestions={resolvedSuggestions}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            onSelectSuggestion={onSuggestionSelect}
          />
        </div>

        {hasError && errorMessage ? (
          <p
            id={errorId}
            className="text-sm text-destructive motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-200"
          >
            {errorMessage}
          </p>
        ) : description ? (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    );
  },
);

LocationSearchField.displayName = "LocationSearchField";
