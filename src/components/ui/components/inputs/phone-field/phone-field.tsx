import * as React from "react";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/primitives";
import { DEFAULT_PHONE_PREFIX, PHONE_PREFIXES } from "@/utils/phone";
import { cn } from "@/utils/style";
import { AlertCircle, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PhoneFieldLabel } from "./phone-field-label";
import type {
  InputStatus,
  PhoneFieldHandle,
  PhoneFieldProps,
} from "./phone-field.types";
import {
  canAcceptPhoneInput,
  getInputStatus,
  normalizeMaxWidth,
  resolveScrollBehavior,
} from "./phone-field.utils";

type StatusOverride = {
  status: InputStatus;
  phoneSnapshot: string;
} | null;

export const PhoneField = React.forwardRef<PhoneFieldHandle, PhoneFieldProps>(
  (
    {
      label,
      description,
      hasInfo = false,
      infoContent,
      infoTitle,
      labelSize = "small",
      nodeBefore,
      nodeAfter,
      hasErrorLabel = false,
      prefixValue,
      prefixOnChange,
      phoneValue,
      phoneOnChange,
      validate,
      errorMessage,
      required = false,
      options,
      prefixName,
      maxWidth,
      className,
      id,
      name,
      placeholder,
      onBlur,
      autoComplete,
      disabled,
      ...inputProps
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const prefixId = `${inputId}-prefix`;
    const availableOptions = options ?? PHONE_PREFIXES;
    const [statusOverride, setStatusOverride] =
      React.useState<StatusOverride>(null);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const selectedPrefix =
      availableOptions.find((option) => option.value === prefixValue.value) ??
      prefixValue ??
      DEFAULT_PHONE_PREFIX;

    const derivedInputStatus = getInputStatus(phoneValue, validate);
    const inputStatus =
      statusOverride && statusOverride.phoneSnapshot === phoneValue
        ? statusOverride.status
        : derivedInputStatus;

    const hasValidation = Boolean(validate);
    const hasExternalError =
      typeof errorMessage === "string" && errorMessage.trim().length > 0;
    const isValidationSuccess = hasValidation && inputStatus === "success";
    const isValidationError = hasValidation && inputStatus === "error";
    const hasError = hasExternalError || isValidationError;
    const hasSuccess = isValidationSuccess && !hasExternalError;
    const hasLabelError = hasErrorLabel || hasError;

    const prefixAriaLabel = t("components.phoneField.prefixAria");
    const infoAriaLabel = t("components.phoneField.infoAria");
    const resolvedInfoTitle = infoTitle ?? t("components.phoneField.infoTitle");
    const resolvedInfoContent =
      infoContent ?? t("components.phoneField.infoContent");
    const resolvedPlaceholder =
      placeholder ?? t("components.phoneField.placeholder");
    const resolvedMaxWidth = normalizeMaxWidth(maxWidth);
    const statusMessage = hasError
      ? t("components.phoneField.invalidAria")
      : hasSuccess
        ? t("components.phoneField.validAria")
        : "";

    const descriptionId = `${inputId}-description`;
    const errorId = `${inputId}-error`;
    const describedByIds = [
      description && descriptionId,
      hasError && errorId,
    ].filter(Boolean) as string[];
    const { "aria-describedby": passedAriaDescribedBy, ...restInputProps } =
      inputProps;
    const allDescIds = [
      ...describedByIds,
      ...(passedAriaDescribedBy
        ? passedAriaDescribedBy.trim().split(/\s+/).filter(Boolean)
        : []),
    ];
    const mergedAriaDescribedBy =
      allDescIds.length > 0 ? allDescIds.join(" ") : undefined;

    const visibleErrorMessage = hasError
      ? (errorMessage ?? t("components.phoneField.invalidFormat"))
      : undefined;

    const handlePrefixChange = React.useCallback(
      (selectedCountry: string) => {
        const nextPrefix =
          availableOptions.find((option) => option.value === selectedCountry) ??
          DEFAULT_PHONE_PREFIX;

        prefixOnChange(nextPrefix, {
          action: "select-option",
          name: prefixName ?? prefixId,
          option: nextPrefix,
        });
      },
      [availableOptions, prefixOnChange, prefixId, prefixName],
    );

    const handlePhoneChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;
        if (!canAcceptPhoneInput(nextValue)) return;

        setStatusOverride(null);
        phoneOnChange(nextValue);
      },
      [phoneOnChange],
    );

    const handlePhoneBlur = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setStatusOverride(null);
        onBlur?.(event);
      },
      [onBlur],
    );

    React.useImperativeHandle(
      ref,
      () => ({
        highlight: (scroll = true) => {
          setStatusOverride({
            status: "error",
            phoneSnapshot: phoneValue,
          });

          if (scroll && containerRef.current) {
            containerRef.current.scrollIntoView({
              behavior: resolveScrollBehavior(),
              block: "center",
            });
          }

          inputRef.current?.focus();
        },
      }),
      [phoneValue],
    );

    return (
      <div
        ref={containerRef}
        style={{ width: "100%", maxWidth: resolvedMaxWidth }}
        className={cn("space-y-2", className)}
      >
        <PhoneFieldLabel
          label={label}
          required={required}
          inputId={inputId}
          labelSize={labelSize}
          hasLabelError={hasLabelError}
          nodeBefore={nodeBefore}
          nodeAfter={nodeAfter}
          hasInfo={hasInfo}
          infoAriaLabel={infoAriaLabel}
          infoTitle={resolvedInfoTitle}
          infoContent={resolvedInfoContent}
        />

        <div
          role="group"
          aria-label={t("components.phoneField.groupAria")}
          className="grid grid-cols-[minmax(4rem,5.875rem)_minmax(0,1fr)] items-start gap-2"
        >
          <Select
            value={selectedPrefix.value}
            onValueChange={handlePrefixChange}
            disabled={disabled}
            name={prefixName ?? prefixId}
          >
            <SelectTrigger
              id={prefixId}
              aria-label={prefixAriaLabel}
              className={cn(
                "h-9 w-full justify-between px-2.5 font-medium",
                hasError &&
                  "border-destructive/70 shadow-sm ring-1 ring-destructive/20",
                hasSuccess && "border-emerald-500 ring-1 ring-emerald-500/20",
              )}
            >
              <span className="truncate">{selectedPrefix.prefix}</span>
            </SelectTrigger>
            <SelectContent align="start" className="min-w-[13rem] max-h-60">
              {availableOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Input
              ref={inputRef}
              id={inputId}
              type="tel"
              value={phoneValue}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              inputMode="tel"
              autoComplete={autoComplete ?? "tel-national"}
              name={name ?? inputId}
              disabled={disabled}
              required={required}
              placeholder={resolvedPlaceholder}
              aria-label={!label ? t("components.phoneField.label") : undefined}
              aria-invalid={hasError ? "true" : undefined}
              aria-describedby={mergedAriaDescribedBy}
              className={cn(
                "pr-10",
                hasError &&
                  "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive",
                hasSuccess &&
                  "border-emerald-500 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500",
              )}
              {...restInputProps}
            />
            <span className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center">
              {hasSuccess ? (
                <Check
                  className="h-4 w-4 text-emerald-600 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
                  aria-hidden="true"
                />
              ) : null}
              {hasError ? (
                <AlertCircle
                  className="h-4 w-4 text-destructive motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
                  aria-hidden="true"
                />
              ) : null}
            </span>
          </div>
        </div>

        {!visibleErrorMessage && description ? (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}

        {visibleErrorMessage ? (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {visibleErrorMessage}
          </p>
        ) : null}

        <p id={`${inputId}-status`} aria-live="polite" className="sr-only">
          {statusMessage}
        </p>
      </div>
    );
  },
);

PhoneField.displayName = "PhoneField";

export type {
  PhoneFieldHandle,
  PhoneFieldLabelSize,
  PhoneFieldProps,
  PhonePrefixActionMeta,
} from "./phone-field.types";
