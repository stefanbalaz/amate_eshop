import { useStore } from "@tanstack/react-form";
import { nanoid } from "nanoid";
import { useMemo } from "react";

import { getDisplayedFieldError } from "@/utils/form/form-errors";
import { cn } from "@/utils/style";
import { useFieldContext } from "@/hooks/form-context";
import { Text } from "../components/text";
import { Textarea } from "../primitives";

interface FormTextAreaProps {
  label: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
  description?: string;
  hint?: string;
  maxCharactersLength?: number;
  charactersLimitReachedMessage?: string;
  autoComplete?: string;
  initiallyFilled?: boolean;
  rows?: number;
}

export default function FormTextArea({
  label,
  readOnly,
  disabled,
  className,
  wrapperClassName,
  description,
  hint,
  maxCharactersLength = 1500,
  charactersLimitReachedMessage,
  required = false,
  autoComplete,
  initiallyFilled = false,
  rows,
}: FormTextAreaProps) {
  const field = useFieldContext<string>();
  const meta = useStore(field.store, (state) => state.meta);

  const fieldError = getDisplayedFieldError(meta, {
    initiallyFilled,
  });
  const id = useMemo(() => nanoid(), []);
  const fieldValue = field.state.value ?? "";
  const remainingCharacters = Math.max(
    maxCharactersLength - fieldValue.length,
    0,
  );
  const reachedCharactersLimit = fieldValue.length === maxCharactersLength;
  const reachedLimitErrorMessage = reachedCharactersLimit
    ? (charactersLimitReachedMessage ??
      `Dosiahli ste maximálny počet znakov (${maxCharactersLength}).`)
    : undefined;
  const errorMessage = fieldError ?? reachedLimitErrorMessage;
  const hasVisualError = Boolean(fieldError);

  const hintElement = (
    <Text size="sm" variant="hint" className="mt-1 whitespace-nowrap">
      {hint}
    </Text>
  );

  const remainingCharactersElement = (
    <Text size="sm" variant="hint" className="mt-1 whitespace-nowrap">
      {`Zostáva ${remainingCharacters} znakov`}
    </Text>
  );

  return (
    <div className={wrapperClassName ?? "mb-8"}>
      {label && (
        <Text
          size="sm"
          weight="medium"
          as="label"
          htmlFor={id}
          className={cn(
            "mb-1 block",
            hasVisualError && "text-button-destructive",
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Text>
      )}
      {description && (
        <Text size="sm" variant="subtle" className="mb-1">
          {description}
        </Text>
      )}
      <Textarea
        id={id}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        maxLength={maxCharactersLength}
        readOnly={readOnly}
        disabled={disabled}
        error={hasVisualError}
        required={required}
        className={cn(
          "h-auto min-h-0",
          className,
          readOnly && !disabled && "bg-gray-100 text-gray-500",
        )}
        autoComplete={autoComplete}
        rows={rows}
      />
      {errorMessage && (
        <Text variant="danger" size="sm" as="span" className="mt-1 block">
          {errorMessage}
        </Text>
      )}
      {hint ? (
        <div className="flex items-center justify-between gap-3">
          {hintElement}
          {remainingCharactersElement}
        </div>
      ) : (
        remainingCharactersElement
      )}
    </div>
  );
}
