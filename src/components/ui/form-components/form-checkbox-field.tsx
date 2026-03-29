import { useFieldContext } from "@/hooks/form-context"
import { useStore } from "@tanstack/react-form"
import { nanoid } from "nanoid"
import { Text } from "../components/text"
import { CheckboxField } from "../components"
import { cn } from "@/utils/style"
import type { ReactNode } from "react"
import {
  getDisplayedFieldError,
  getFormErrorMessage,
} from "@/utils/form/form-errors"

interface FormCheckboxFieldProps {
  label: string | ReactNode
  required?: boolean
  id?: string
  error?: string
  className?: string
  wrapperClassName?: string
  description?: string
  initiallyFilled?: boolean
}

export default function FormCheckboxField({
  label,
  className = "",
  wrapperClassName,
  description,
  required = false,
  initiallyFilled = false,
  id,
}: FormCheckboxFieldProps) {
  const field = useFieldContext<boolean>()
  // const errors = useStore(field.store, (state) => state.meta.errors);
  const meta = useStore(field.store, (state) => state.meta)

  const displayedError = getDisplayedFieldError(meta, {
    initiallyFilled,
  })
  const submitError =
    getFormErrorMessage(meta.errorMap?.onSubmit) ??
    getFormErrorMessage(meta.errorMap?.onServer)
  const fallbackMetaError = meta.errors
    .map((item) => getFormErrorMessage(item))
    .find(Boolean)
  const error = submitError ?? displayedError ?? fallbackMetaError
  const checkboxId =
    id ??
    (typeof label === "string"
      ? `checkbox-${label.toLowerCase().replace(/\s+/g, "-")}`
      : `checkbox-${nanoid()}`)

  return (
    <div className={wrapperClassName ?? "mb-8"}>
      <CheckboxField
        label={
          <span className="inline">
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </span>
        }
        id={checkboxId}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked)}
        className={cn("mb-1", className)}
      />

      {/* {errors.map((error: string) => (
        <Text key={error} variant="danger" size="sm" className="mt-1">
          {error}
        </Text>
      ))} */}
      {error && (
        <Text variant="danger" size="sm" as="span" className="mt-1 block">
          {error}
        </Text>
      )}
      {description && (
        <Text size="sm" variant="subtle" className="mt-1">
          {description}
        </Text>
      )}
    </div>
  )
}
