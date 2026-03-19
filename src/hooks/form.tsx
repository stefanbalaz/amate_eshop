import { createFormHook, type FormValidateOrFn } from "@tanstack/react-form"

import { fieldContext, formContext } from "./form-context"
import {
  FormCheckboxField,
  FormSelectField,
  FormTextArea,
  FormTextInput,
  SubscribeButton,
} from "@/components/ui"

export type FormConfig<TData> = {
  defaultValues: TData
  onSubmit: (values: TData) => Promise<void | string>
  onSubmitValidate?: FormValidateOrFn<TData>
  onChange?: (store: unknown) => void
}

const formHook = createFormHook({
  fieldComponents: {
    FormTextInput,
    FormSelectField,
    FormCheckboxField,
    FormTextArea,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})

export const useAppForm = formHook.useAppForm
