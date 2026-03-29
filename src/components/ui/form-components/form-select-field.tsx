"use client"

import { useStore } from "@tanstack/react-form"

import { useFieldContext } from "@/hooks/form-context"
import { cn } from "@/utils/style"
import { Text } from "../components/text"
import { getDisplayedFieldError } from "@/utils/form/form-errors"
import type { SelectOption } from "../components/inputs/select-field/select-field"
import { SelectField } from "../components"

interface FormSelectFieldProps {
  label: string
  required?: boolean
  options: SelectOption[]
  className?: string
  wrapperClassName?: string
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
  description?: string
  hint?: string
  fullWidth?: boolean
  closeMenuOnSelect?: boolean
  isMulti?: boolean
  initiallyFilled?: boolean
}

export default function FormSelectField({
  label,
  required = false,
  options,
  className,
  wrapperClassName,
  placeholder,
  readOnly,
  disabled,
  description,
  hint,
  initiallyFilled = false,
  ...props
}: FormSelectFieldProps) {
  const field = useFieldContext<string | string[]>()
  const meta = useStore(field.store, (state) => state.meta)

  const error = getDisplayedFieldError(meta, {
    initiallyFilled,
  })

  const { isMulti = false, fullWidth = false, closeMenuOnSelect = true } = props

  const selectedOption = isMulti
    ? options.filter((opt) =>
        Array.isArray(field.state.value)
          ? field.state.value.includes(opt.value)
          : false
      )
    : (options.find((opt) => opt.value === field.state.value) ?? null)

  return (
    <div className={wrapperClassName ?? "mb-8"}>
      <Text
        size="sm"
        weight="medium"
        className={cn("mb-1 block", error && "text-button-destructive")}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Text>
      {description && (
        <Text size="sm" variant="subtle" className="mb-1">
          {description}
        </Text>
      )}

      <SelectField
        name={field.name}
        value={selectedOption}
        onChange={(selected) => {
          let safeValue
          if (isMulti) {
            safeValue = Array.isArray(selected)
              ? selected.map((opt) => opt.value)
              : []
          } else {
            safeValue = selected ? (selected as { value: string }).value : ""
          }
          field.handleChange(safeValue)
        }}
        onBlur={() => {
          field.handleBlur()
        }}
        options={options}
        placeholder={placeholder || "Vybrať..."}
        isDisabled={readOnly || disabled}
        className={className}
        error={error}
        fullWidth={fullWidth}
        isMulti={isMulti}
        closeMenuOnSelect={closeMenuOnSelect}
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
