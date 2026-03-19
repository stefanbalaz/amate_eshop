import type * as React from "react";
import { Input } from "@/components/ui/primitives";
import type { PhonePrefixOption } from "@/utils/phone";

export type InputStatus = "default" | "success" | "error";

export type PhoneFieldLabelSize = "xsmall" | "small" | "medium" | "large";

export type PhoneFieldHandle = {
  highlight(scroll?: boolean): void;
};

export type PhonePrefixActionMeta = {
  action: "select-option";
  name?: string;
  option?: PhonePrefixOption;
};

export interface PhoneFieldProps extends Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange" | "type"
> {
  /** Field label */
  label?: React.ReactNode;
  /** Description/help text shown below the field */
  description?: React.ReactNode;
  /** Show additional info popover icon */
  hasInfo?: boolean;
  /** Info popover content */
  infoContent?: React.ReactNode;
  /** Info popover title */
  infoTitle?: string;
  /** Label size variant */
  labelSize?: PhoneFieldLabelSize;
  nodeBefore?: React.ReactNode;
  nodeAfter?: React.ReactNode;
  hasErrorLabel?: boolean;
  /** Selected phone prefix option */
  prefixValue: PhonePrefixOption;
  /** Prefix change callback (Blueprint-compatible signature) */
  prefixOnChange: (
    value: PhonePrefixOption,
    actionMeta: PhonePrefixActionMeta,
  ) => void;
  /** Phone number value */
  phoneValue: string;
  /** Phone value change callback */
  phoneOnChange: (value: string) => void;
  /** Optional validation callback to drive success/error state */
  validate?: (value: string) => boolean;
  /** Visible error message when validation fails; uses default from i18n if omitted */
  errorMessage?: string;
  /** Marks the input as required for form semantics */
  required?: boolean;
  options?: PhonePrefixOption[];
  prefixName?: string;
  /** CSS max-width value, e.g. "320px", "28rem", "100%". Numeric strings use px. */
  maxWidth?: string;
}
