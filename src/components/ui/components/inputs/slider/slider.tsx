import { Label, Slider as SliderPrimitive } from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  AUTO_MARKS_LIMIT,
  THUMB,
  THUMB_CURSOR,
  THUMB_DISABLED,
  THUMB_ERROR,
  THUMB_SUCCESS,
} from "./constants";
import { SliderMarks } from "./slider-marks";
import { SliderValueBadge } from "./slider-value-badge";
import type { SliderProps } from "./types";
import {
  getActiveThumbIndex,
  getBounds,
  getDisplayValue,
  normalizeValues,
  resolveMarks,
} from "./utils";

export type { SliderProps, SliderMark } from "./types";

export const Slider = ({
  classNameRoot,
  label,
  description,
  error,
  success,
  required,
  value,
  onChange,
  defaultValue,
  valueLabelFormat,
  getAriaValueText,
  step = 1,
  valueLabelDisplay = "on",
  marks,
  min,
  max,
  className,
  id,
  disabled,
  ariaLabel,
  name,
  orientation = "horizontal",
  ...props
}: SliderProps): React.JSX.Element => {
  const { t } = useTranslation();
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const labelId = label ? `${inputId}-label` : undefined;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const hasError = Boolean(error);
  const isSuccess = Boolean(success) && !hasError;
  const isVertical = orientation === "vertical";

  const [safeMin, safeMax] = getBounds(min, max);
  const thumbCount = React.useMemo(() => {
    const valueCount = Array.isArray(value) ? value.length : 0;
    const defaultValueCount = Array.isArray(defaultValue)
      ? defaultValue.length
      : 0;
    return Math.max(1, valueCount, defaultValueCount);
  }, [value, defaultValue]);
  const isMultiThumb = thumbCount > 1;

  const normalizedDefaultValue = React.useMemo(
    () => normalizeValues(defaultValue, thumbCount, safeMin, safeMax),
    [defaultValue, thumbCount, safeMin, safeMax],
  );

  const [uncontrolledValue, setUncontrolledValue] = React.useState<number[]>(
    normalizedDefaultValue,
  );

  React.useEffect(() => {
    if (value !== undefined) return;
    setUncontrolledValue(normalizedDefaultValue);
  }, [value, normalizedDefaultValue]);

  const controlledValue = React.useMemo(
    () =>
      value === undefined
        ? undefined
        : normalizeValues(value, thumbCount, safeMin, safeMax),
    [value, thumbCount, safeMin, safeMax],
  );

  const currentValue = controlledValue ?? uncontrolledValue;
  const activeThumbRef = React.useRef(0);
  const [isInteracting, setIsInteracting] = React.useState(false);

  const shouldRenderValueBadgeSlot = valueLabelDisplay !== "off";
  const shouldShowValueLabel =
    valueLabelDisplay === "on" ||
    (valueLabelDisplay === "auto" && isInteracting);

  const resolvedValueLabel = currentValue.map((item, index) =>
    getDisplayValue(item, index, valueLabelFormat),
  );

  const resolvedAriaValueText =
    typeof getAriaValueText === "function"
      ? currentValue
          .map((item, index) => getAriaValueText(item, index))
          .join(", ")
      : undefined;

  const sliderMarks = React.useMemo(
    () => resolveMarks(marks, step, safeMin, safeMax, AUTO_MARKS_LIMIT),
    [marks, step, safeMin, safeMax],
  );
  const hasMarkLabels = sliderMarks.some((mark) => mark.label !== undefined);
  const shouldRenderMarks = sliderMarks.length > 0 && !isVertical;

  const handlePointerDownCapture = React.useCallback(
    (event: React.PointerEvent<HTMLSpanElement>): void => {
      if (!isVertical) return;

      const target = event.target as HTMLElement | null;
      const isThumbInteraction = Boolean(
        target?.closest("[data-slot='slider-thumb']"),
      );

      if (isThumbInteraction) return;

      event.preventDefault();
    },
    [isVertical],
  );

  const handleValueChange = React.useCallback(
    (nextValues: number[]): void => {
      const activeThumb = getActiveThumbIndex(
        currentValue,
        nextValues,
        activeThumbRef.current,
      );
      activeThumbRef.current = activeThumb;

      if (controlledValue === undefined) {
        setUncontrolledValue(nextValues);
      }

      setIsInteracting(true);
      const normalizedValue = isMultiThumb
        ? nextValues
        : (nextValues[0] ?? safeMin);
      onChange?.(undefined, normalizedValue, activeThumb);
    },
    [currentValue, controlledValue, isMultiThumb, safeMin, onChange],
  );

  const handleValueCommit = React.useCallback(
    () => setIsInteracting(false),
    [],
  );
  const handleFocusCapture = React.useCallback(
    () => setIsInteracting(true),
    [],
  );
  const handleBlurCapture = React.useCallback(
    () => setIsInteracting(false),
    [],
  );

  return (
    <div className={cn("space-y-2", classNameRoot)}>
      {(label || shouldRenderValueBadgeSlot) && (
        <div className="flex w-full items-center justify-between gap-2">
          {label && (
            <Label
              id={labelId}
              className={cn(
                "w-fit",
                hasError && "text-destructive",
                disabled && "opacity-60",
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
          {shouldRenderValueBadgeSlot && (
            <SliderValueBadge
              valueLabels={resolvedValueLabel}
              currentValues={currentValue}
              isVisible={shouldShowValueLabel}
              disabled={disabled}
              hasError={hasError}
              isSuccess={isSuccess}
            />
          )}
        </div>
      )}

      <div
        className={cn("space-y-2", isVertical && "flex flex-col items-center")}
      >
        <div
          className={cn(
            "w-full",
            isVertical && shouldRenderMarks && "flex items-stretch gap-3",
          )}
        >
          <div className="relative w-full">
            <SliderPrimitive
              id={inputId}
              name={name}
              value={currentValue}
              min={safeMin}
              max={safeMax}
              step={step === null ? undefined : step}
              orientation={orientation}
              disabled={disabled}
              aria-describedby={
                [
                  description && !hasError ? descriptionId : null,
                  hasError ? errorId : null,
                ]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
              aria-labelledby={label ? labelId : undefined}
              aria-label={
                !label
                  ? (ariaLabel ?? t("components.slider.ariaLabel"))
                  : ariaLabel
              }
              aria-invalid={hasError}
              aria-valuetext={resolvedAriaValueText}
              className={cn(
                "relative z-10 w-full",
                THUMB,
                THUMB_CURSOR,
                isVertical && "h-56 w-auto",
                disabled && THUMB_DISABLED,
                hasError && THUMB_ERROR,
                isSuccess && THUMB_SUCCESS,
                className,
              )}
              onValueChange={handleValueChange}
              onValueCommit={handleValueCommit}
              onFocusCapture={handleFocusCapture}
              onBlurCapture={handleBlurCapture}
              onPointerDownCapture={handlePointerDownCapture}
              {...props}
            />

            {shouldRenderMarks && (
              <SliderMarks
                marks={sliderMarks}
                min={safeMin}
                max={safeMax}
                hasMarkLabels={hasMarkLabels}
              />
            )}
          </div>
        </div>
      </div>

      {description && !hasError && (
        <p
          id={descriptionId}
          className={cn(
            "text-sm text-muted-foreground",
            shouldRenderMarks && "mt-12",
          )}
        >
          {description}
        </p>
      )}

      {hasError && (
        <p
          id={errorId}
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200 motion-reduce:animate-none motion-reduce:transform-none"
        >
          {error}
        </p>
      )}
    </div>
  );
};
