import { useStore } from "@tanstack/react-form"
import { nanoid } from "nanoid"
import { useMemo } from "react"

import { getDisplayedFieldError } from "@/utils/form/form-errors"
import { cn } from "@/utils/style"
import { useFieldContext } from "@/hooks/form-context"
import { Text } from "../components/text"
import { Input } from "../primitives"

interface FormTextInputProps {
  label: string
  required?: boolean
  type?: string
  readOnly?: boolean
  disabled?: boolean
  className?: string
  wrapperClassName?: string
  description?: string
  hint?: string
  autoComplete?: string
  initiallyFilled?: boolean
}

export default function FormTextInput({
  label,
  type = "text",
  readOnly,
  disabled,
  className,
  wrapperClassName,
  description,
  hint,
  required = false,
  autoComplete,
  initiallyFilled = false,
}: FormTextInputProps) {
  const field = useFieldContext<string>()
  const meta = useStore(field.store, (state) => state.meta)

  const error = getDisplayedFieldError(meta, {
    initiallyFilled,
  })
  const id = useMemo(() => nanoid(), [])

  return (
    <div className={wrapperClassName ?? "mb-8"}>
      {label && (
        <Text
          size="sm"
          weight="medium"
          as="label"
          htmlFor={id}
          className={cn("mb-1 block", error && "text-button-destructive")}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Text>
      )}
      {description && (
        <Text size="sm" variant="subtle" className="mb-1">
          {description}
        </Text>
      )}
      <Input
        name={field.name}
        type={type}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        readOnly={readOnly}
        disabled={disabled}
        error={error ? true : false}
        required={required}
        className={`${className} ${readOnly && !disabled ? "bg-gray-100 text-gray-500" : ""}`}
        autoComplete={autoComplete}
      />
      {error && (
        <Text variant="danger" size="sm" as="span" className="mt-1 block">
          {error}
        </Text>
      )}
      {hint && (
        <Text size="sm" variant="hint" className="mt-1">
          {hint}
        </Text>
      )}
    </div>
  )
}
