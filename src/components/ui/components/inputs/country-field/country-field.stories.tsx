import type { Meta, StoryFn } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PHONE_PREFIXES } from "@/utils/phone";
import { CountryField, type CountryOption } from "./country-field";

const meta: Meta<typeof CountryField> = {
  title: "Components/Inputs/CountryField",
  component: CountryField,
  parameters: {
    layout: "centered",
  },
  args: {
    description: "",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    description: { control: { type: "text" } },
    required: { control: { type: "boolean" } },
    clearable: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    success: { control: { type: "boolean" } },
    error: { control: { type: "text" } },
    maxWidth: { control: { type: "number" } },
  },
};

export default meta;

type StoryArgs = {
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  success?: boolean;
  error?: string;
  maxWidth?: number;
};

const useCountryValue = (initialValue: CountryOption | null) => {
  const [value, setValue] = useState<CountryOption | null>(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return [value, setValue] as const;
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useCountryValue(PHONE_PREFIXES[0]);

  return (
    <CountryField
      label={args.label || t("components.country.label")}
      placeholder={args.placeholder || t("components.country.placeholder")}
      description={args.description || undefined}
      value={value}
      onChange={setValue}
      options={PHONE_PREFIXES}
      required={args.required}
      clearable={args.clearable}
      disabled={args.disabled}
      success={args.success}
      error={args.error}
      maxWidth={args.maxWidth}
    />
  );
};
export const Required: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useCountryValue(PHONE_PREFIXES[0]);

  return (
    <CountryField
      label={args.label || t("components.country.requiredLabel")}
      description={args.description || undefined}
      value={value}
      onChange={setValue}
      options={PHONE_PREFIXES}
      required={args.required ?? true}
      clearable={args.clearable}
      disabled={args.disabled}
      success={args.success}
      error={args.error}
    />
  );
};
export const Clearable: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useCountryValue(PHONE_PREFIXES[3]);

  return (
    <CountryField
      label={args.label || t("components.country.clearableLabel")}
      description={args.description || undefined}
      value={value}
      onChange={setValue}
      options={PHONE_PREFIXES}
      clearable={args.clearable ?? true}
      disabled={args.disabled}
      success={args.success}
      error={args.error}
    />
  );
};
export const WithDescription: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useCountryValue(PHONE_PREFIXES[0]);

  return (
    <CountryField
      label={args.label || t("components.country.label")}
      description={args.description || t("components.country.description")}
      value={value}
      onChange={setValue}
      options={PHONE_PREFIXES}
      required={args.required}
      clearable={args.clearable}
      disabled={args.disabled}
      success={args.success}
      error={args.error}
    />
  );
};
export const WithError: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useCountryValue(PHONE_PREFIXES[0]);

  return (
    <CountryField
      label={args.label || t("components.country.label")}
      error={args.error || t("validation.required")}
      description={args.description || undefined}
      value={value}
      onChange={setValue}
      options={PHONE_PREFIXES}
      required={args.required}
      clearable={args.clearable}
      disabled={args.disabled}
      success={args.success}
    />
  );
};
export const WithoutLabel: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useCountryValue(PHONE_PREFIXES[0]);

  return (
    <CountryField
      placeholder={args.placeholder || t("components.country.withoutLabelPlaceholder")}
      description={args.description || undefined}
      value={value}
      onChange={setValue}
      options={PHONE_PREFIXES}
      required={args.required}
      clearable={args.clearable}
      disabled={args.disabled}
      success={args.success}
      error={args.error}
    />
  );
};
export const MaxWidth: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useCountryValue(PHONE_PREFIXES[0]);

  return (
    <CountryField
      label={args.label || t("components.country.maxWidthLabel")}
      maxWidth={args.maxWidth ?? 280}
      description={args.description || undefined}
      value={value}
      onChange={setValue}
      options={PHONE_PREFIXES}
      required={args.required}
      clearable={args.clearable}
      disabled={args.disabled}
      success={args.success}
      error={args.error}
    />
  );
};
