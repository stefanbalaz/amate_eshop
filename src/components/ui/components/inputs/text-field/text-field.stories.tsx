import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "./text-field";

const meta: Meta<typeof TextField> = {
  title: "Components/Inputs/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "url", "tel"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    clearable: {
      control: { type: "boolean" },
    },
    success: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type StoryArgs = {
  type?: "text" | "email" | "url" | "tel";
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  clearable?: boolean;
  success?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  unit?: string;
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <TextField
      label={args.label || t("components.textField.name")}
      placeholder={args.placeholder || t("components.textField.namePlaceholder")}
      type={args.type}
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
      clearable={args.clearable}
      success={args.success}
    />
  );
};
Default.args = {
  label: "Name",
  placeholder: "Enter your name",
};

export const WithDescription: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <TextField
      label={args.label || t("components.textField.email")}
      placeholder={args.placeholder || t("components.textField.emailPlaceholder")}
      description={args.description || t("components.textField.emailDescription")}
      type={args.type ?? "email"}
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
      clearable={args.clearable}
      success={args.success}
    />
  );
};
WithDescription.args = {
  label: "Email",
  placeholder: "Enter your email",
  description: "We'll never share your email",
  type: "email",
};

export const Required: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <TextField
      label={args.label || t("components.textField.username")}
      placeholder={args.placeholder || t("components.textField.usernamePlaceholder")}
      required={args.required ?? true}
      type={args.type}
      disabled={args.disabled}
      loading={args.loading}
      clearable={args.clearable}
      success={args.success}
    />
  );
};
Required.args = {
  label: "Username",
  placeholder: "Enter username",
  required: true,
};

export const WithError: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <TextField
      label={args.label || t("components.textField.email")}
      placeholder={args.placeholder || t("components.textField.emailPlaceholder")}
      error={args.error || t("validation.email")}
      defaultValue="invalid-email"
      type={args.type ?? "email"}
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
      clearable={args.clearable}
      success={args.success}
    />
  );
};
WithError.args = {
  label: "Email",
  placeholder: "Enter your email",
  error: "Please enter a valid email",
  type: "email",
};

export const WithSuccess: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <TextField
      label={args.label || t("components.textField.username")}
      placeholder={args.placeholder || t("components.textField.usernamePlaceholder")}
      success={args.success ?? true}
      defaultValue="johndoe"
      type={args.type}
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
      clearable={args.clearable}
    />
  );
};
WithSuccess.args = {
  label: "Username",
  placeholder: "Enter username",
  success: true,
};

export const Loading: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <TextField
      label={args.label || t("components.textField.search")}
      placeholder={args.placeholder || t("components.textField.searchPlaceholder")}
      loading={args.loading ?? true}
      defaultValue="react"
      type={args.type}
      disabled={args.disabled}
      required={args.required}
      clearable={args.clearable}
      success={args.success}
    />
  );
};
Loading.args = {
  label: "Search",
  placeholder: "Search...",
  loading: true,
};

export const WithUnit: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <TextField
      label={args.label || t("components.textField.weight")}
      placeholder={args.placeholder || t("components.textField.weightPlaceholder")}
      unit={args.unit || "kg"}
      type={args.type}
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
      clearable={args.clearable}
      success={args.success}
    />
  );
};
WithUnit.args = {
  label: "Weight",
  placeholder: "Enter weight",
  unit: "kg",
};

export const Clearable: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("Some text to clear");
  return (
    <TextField
      label={args.label || t("components.textField.clearableLabel")}
      placeholder={args.placeholder || t("components.textField.clearablePlaceholder")}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      clearable={args.clearable ?? true}
      onClear={() => setValue("")}
      type={args.type}
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
      success={args.success}
    />
  );
};
Clearable.args = {
  label: "Clearable field",
  placeholder: "Type something...",
  clearable: true,
};

export const Disabled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <TextField
      label={args.label || t("components.textField.disabledLabel")}
      placeholder={args.placeholder || t("components.textField.disabledPlaceholder")}
      disabled={args.disabled ?? true}
      defaultValue="Disabled value"
      type={args.type}
      required={args.required}
      loading={args.loading}
      clearable={args.clearable}
      success={args.success}
    />
  );
};
Disabled.args = {
  label: "Disabled field",
  placeholder: "Cannot edit",
  disabled: true,
};

export const NoLabel: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <TextField
      placeholder={args.placeholder || t("components.textField.noLabelPlaceholder")}
      type={args.type}
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
      clearable={args.clearable}
      success={args.success}
    />
  );
};
NoLabel.args = {
  placeholder: "No label placeholder",
};

export const AllStates: StoryFn<StoryArgs> = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 w-80">
      <TextField
        label={t("components.textField.name")}
        placeholder={t("components.textField.namePlaceholder")}
      />
      <TextField
        label={t("components.textField.name")}
        placeholder={t("components.textField.namePlaceholder")}
        defaultValue="Hello World"
      />
      <TextField
        label={t("components.textField.username")}
        placeholder={t("components.textField.usernamePlaceholder")}
        required
      />
      <TextField
        label={t("components.textField.email")}
        placeholder={t("components.textField.emailPlaceholder")}
        error={t("validation.email")}
        defaultValue="Invalid"
      />
      <TextField
        label={t("components.textField.username")}
        placeholder={t("components.textField.usernamePlaceholder")}
        success
        defaultValue="Valid input"
      />
      <TextField
        label={t("components.textField.search")}
        placeholder={t("common.loading")}
        loading
        defaultValue="Checking..."
      />
      <TextField
        label={t("components.textField.disabledLabel")}
        placeholder={t("components.textField.disabledPlaceholder")}
        disabled
        defaultValue="Cannot edit"
      />
      <TextField
        label={t("components.textField.weight")}
        placeholder={t("components.textField.weightPlaceholder")}
        unit="USD"
        defaultValue="100"
      />
    </div>
  );
};
