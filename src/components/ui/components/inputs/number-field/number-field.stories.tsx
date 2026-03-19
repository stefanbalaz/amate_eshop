import type { Meta, StoryFn } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumberField } from "./number-field";

const meta: Meta<typeof NumberField> = {
  title: "Components/Inputs/NumberField",
  component: NumberField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "number" } },
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    showControls: { control: { type: "boolean" } },
    allowDecimals: { control: { type: "boolean" } },
    decimalPlaces: { control: { type: "number", min: 0, max: 10 } },
    label: { control: { type: "text" } },
    description: { control: { type: "text" } },
    error: { control: { type: "text" } },
    success: { control: { type: "boolean" } },
    loading: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    required: { control: { type: "boolean" } },
    unit: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
  },
};

export default meta;

type StoryArgs = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  showControls?: boolean;
  allowDecimals?: boolean;
  decimalPlaces?: number;
  label?: string;
  description?: string;
  error?: string;
  success?: boolean;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  unit?: string;
  placeholder?: string;
};

const useNumberValue = (initialValue?: number) => {
  const [value, setValue] = useState<number | undefined>(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return [value, setValue] as const;
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value ?? 1);

  return (
    <NumberField
      label={args.label || t("components.numberField.quantity")}
      description={args.description || undefined}
      value={value ?? ""}
      onChange={setValue}
      min={args.min}
      max={args.max}
      step={args.step}
      showControls={args.showControls}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      error={args.error}
      success={args.success}
      loading={args.loading}
      disabled={args.disabled}
      required={args.required}
      unit={args.unit}
      placeholder={args.placeholder}
    />
  );
};

export const WithMinMax: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value ?? 3);

  return (
    <NumberField
      label={args.label || t("components.numberField.rating")}
      description={args.description || t("components.numberField.ratingDescription")}
      min={args.min ?? 1}
      max={args.max ?? 5}
      value={value ?? ""}
      onChange={setValue}
      step={args.step}
      showControls={args.showControls}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      error={args.error}
      success={args.success}
      loading={args.loading}
      disabled={args.disabled}
      required={args.required}
      unit={args.unit}
    />
  );
};

export const WithStep: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value ?? 50);

  return (
    <NumberField
      label={args.label || t("components.numberField.quantity")}
      description={args.description || t("components.numberField.quantityDescription")}
      min={args.min ?? 0}
      max={args.max ?? 100}
      step={args.step ?? 10}
      value={value ?? ""}
      onChange={setValue}
      showControls={args.showControls}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      error={args.error}
      success={args.success}
      loading={args.loading}
      disabled={args.disabled}
      required={args.required}
      unit={args.unit}
    />
  );
};

export const WithUnit: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value ?? 75);

  return (
    <NumberField
      label={args.label || t("components.numberField.weight")}
      unit={args.unit || "kg"}
      min={args.min ?? 0}
      value={value ?? ""}
      onChange={setValue}
      max={args.max}
      step={args.step}
      showControls={args.showControls}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      description={args.description || undefined}
      error={args.error}
      success={args.success}
      loading={args.loading}
      disabled={args.disabled}
      required={args.required}
    />
  );
};

export const Decimals: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value ?? 19.99);

  return (
    <NumberField
      label={args.label || t("components.numberField.price")}
      unit={args.unit || "$"}
      allowDecimals={args.allowDecimals ?? true}
      decimalPlaces={args.decimalPlaces ?? 2}
      step={args.step ?? 0.5}
      min={args.min ?? 0}
      value={value ?? ""}
      onChange={setValue}
      max={args.max}
      showControls={args.showControls}
      description={args.description || undefined}
      error={args.error}
      success={args.success}
      loading={args.loading}
      disabled={args.disabled}
      required={args.required}
    />
  );
};

export const WithoutControls: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value ?? 42);

  return (
    <NumberField
      label={args.label || t("components.numberField.enterNumber")}
      showControls={args.showControls ?? false}
      value={value ?? ""}
      onChange={setValue}
      min={args.min}
      max={args.max}
      step={args.step}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      description={args.description || undefined}
      error={args.error}
      success={args.success}
      loading={args.loading}
      disabled={args.disabled}
      required={args.required}
      unit={args.unit}
    />
  );
};

export const WithError: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value ?? 15);

  return (
    <NumberField
      label={args.label || t("components.numberField.age")}
      error={args.error || t("components.numberField.ageError")}
      min={args.min ?? 18}
      max={args.max ?? 100}
      value={value ?? ""}
      onChange={setValue}
      step={args.step}
      showControls={args.showControls}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      description={args.description || undefined}
      success={args.success}
      loading={args.loading}
      disabled={args.disabled}
      required={args.required}
      unit={args.unit}
    />
  );
};

export const WithSuccess: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value ?? 100);

  return (
    <NumberField
      label={args.label || t("components.numberField.verifiedAmount")}
      success={args.success ?? true}
      value={value ?? ""}
      onChange={setValue}
      min={args.min}
      max={args.max}
      step={args.step}
      showControls={args.showControls}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      description={args.description || undefined}
      error={args.error}
      loading={args.loading}
      disabled={args.disabled}
      required={args.required}
      unit={args.unit}
    />
  );
};

export const Loading: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value ?? 50);

  return (
    <NumberField
      label={args.label || t("components.numberField.loading")}
      loading={args.loading ?? true}
      value={value ?? ""}
      onChange={setValue}
      min={args.min}
      max={args.max}
      step={args.step}
      showControls={args.showControls}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      description={args.description || undefined}
      error={args.error}
      success={args.success}
      disabled={args.disabled}
      required={args.required}
      unit={args.unit}
    />
  );
};

export const Disabled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value ?? 25);

  return (
    <NumberField
      label={args.label || t("components.numberField.disabledField")}
      disabled={args.disabled ?? true}
      value={value ?? ""}
      onChange={setValue}
      min={args.min}
      max={args.max}
      step={args.step}
      showControls={args.showControls}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      description={args.description || undefined}
      error={args.error}
      success={args.success}
      loading={args.loading}
      required={args.required}
      unit={args.unit}
    />
  );
};

export const Required: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value);

  return (
    <NumberField
      label={args.label || t("components.numberField.requiredField")}
      required={args.required ?? true}
      min={args.min ?? 1}
      value={value ?? ""}
      onChange={setValue}
      max={args.max}
      step={args.step}
      showControls={args.showControls}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      description={args.description || undefined}
      error={args.error}
      success={args.success}
      loading={args.loading}
      disabled={args.disabled}
      unit={args.unit}
    />
  );
};

export const Empty: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useNumberValue(args.value);

  return (
    <NumberField
      label={args.label || t("components.numberField.optionalNumber")}
      placeholder={args.placeholder || t("components.numberField.optionalNumberPlaceholder")}
      value={value ?? ""}
      onChange={setValue}
      min={args.min}
      max={args.max}
      step={args.step}
      showControls={args.showControls}
      allowDecimals={args.allowDecimals}
      decimalPlaces={args.decimalPlaces}
      description={args.description || undefined}
      error={args.error}
      success={args.success}
      loading={args.loading}
      disabled={args.disabled}
      required={args.required}
      unit={args.unit}
    />
  );
};

export const AllStates: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value1, setValue1] = useNumberValue(10);
  const [value2, setValue2] = useNumberValue(20);
  const [value3, setValue3] = useNumberValue(-5);
  const [value4, setValue4] = useNumberValue(100);
  const [value5, setValue5] = useNumberValue(50);
  const [value6, setValue6] = useNumberValue(25);
  const [value7, setValue7] = useNumberValue(75);
  const [value8, setValue8] = useNumberValue(42);

  return (
    <div className="space-y-6 w-75">
      <NumberField
        label={t("components.numberField.quantity")}
        value={value1 ?? ""}
        onChange={setValue1}
        min={args.min}
        max={args.max}
      />
      <NumberField
        label={t("components.numberField.quantity")}
        description={t("components.numberField.quantityDescription")}
        value={value2 ?? ""}
        onChange={setValue2}
        min={args.min}
        max={args.max}
      />
      <NumberField
        label={t("components.numberField.age")}
        error={t("components.numberField.ageError")}
        value={value3 ?? ""}
        onChange={setValue3}
        min={args.min}
        max={args.max}
      />
      <NumberField
        label={t("components.numberField.verifiedAmount")}
        success
        value={value4 ?? ""}
        onChange={setValue4}
        min={args.min}
        max={args.max}
      />
      <NumberField
        label={t("components.numberField.loading")}
        loading
        value={value5 ?? ""}
        onChange={setValue5}
        min={args.min}
        max={args.max}
      />
      <NumberField
        label={t("components.numberField.disabledField")}
        disabled
        value={value6 ?? ""}
        onChange={setValue6}
        min={args.min}
        max={args.max}
      />
      <NumberField
        label={t("components.numberField.weight")}
        unit="kg"
        value={value7 ?? ""}
        onChange={setValue7}
        min={args.min}
        max={args.max}
      />
      <NumberField
        label={t("components.numberField.enterNumber")}
        showControls={false}
        value={value8 ?? ""}
        onChange={setValue8}
        min={args.min}
        max={args.max}
      />
    </div>
  );
};
