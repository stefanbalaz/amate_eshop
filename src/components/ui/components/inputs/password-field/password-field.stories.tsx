import type { Meta, StoryFn } from "@storybook/react-vite";
import { useTranslation } from "react-i18next";
import { PasswordField } from "./password-field";

const meta: Meta<typeof PasswordField> = {
  title: "Components/Inputs/PasswordField",
  component: PasswordField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type StoryArgs = {
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <PasswordField
      label={args.label || t("components.password.label")}
      placeholder={args.placeholder || t("components.password.placeholder")}
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
    />
  );
};
Default.args = {
  label: "Password",
  placeholder: "Enter your password",
};

export const WithDescription: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <PasswordField
      label={args.label || t("components.password.label")}
      placeholder={args.placeholder || t("components.password.placeholder")}
      description={args.description || t("components.password.description")}
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
    />
  );
};
WithDescription.args = {
  label: "Password",
  placeholder: "Enter your password",
  description: "Must be at least 8 characters",
};

export const Required: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <PasswordField
      label={args.label || t("components.password.label")}
      placeholder={args.placeholder || t("components.password.placeholder")}
      required={args.required ?? true}
      disabled={args.disabled}
      loading={args.loading}
    />
  );
};
Required.args = {
  label: "Password",
  placeholder: "Enter your password",
  required: true,
};

export const WithError: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <PasswordField
      label={args.label || t("components.password.label")}
      placeholder={args.placeholder || t("components.password.placeholder")}
      error={args.error || t("components.password.error")}
      defaultValue="short"
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
    />
  );
};
WithError.args = {
  label: "Password",
  placeholder: "Enter your password",
  error: "Password is too weak",
};

export const Loading: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <PasswordField
      label={args.label || t("components.password.label")}
      placeholder={args.placeholder || t("components.password.verifying")}
      loading={args.loading ?? true}
      defaultValue="password123"
      disabled={args.disabled}
      required={args.required}
    />
  );
};
Loading.args = {
  label: "Password",
  placeholder: "Verifying...",
  loading: true,
};

export const Disabled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <PasswordField
      label={args.label || t("components.password.label")}
      placeholder={args.placeholder || t("components.password.cannotEdit")}
      disabled={args.disabled ?? true}
      defaultValue="disabled-password"
      required={args.required}
      loading={args.loading}
    />
  );
};
Disabled.args = {
  label: "Password",
  placeholder: "Cannot edit",
  disabled: true,
};

export const NoLabel: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <PasswordField
      placeholder={args.placeholder || t("components.password.withoutLabel")}
      disabled={args.disabled}
      required={args.required}
      loading={args.loading}
    />
  );
};
NoLabel.args = {
  placeholder: "Password without label",
};

export const AllStates: StoryFn<StoryArgs> = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 w-80">
      <PasswordField
        label={t("components.password.label")}
        placeholder={t("components.password.placeholder")}
      />
      <PasswordField
        label={t("components.password.label")}
        placeholder={t("components.password.placeholder")}
        defaultValue="secretpassword"
      />
      <PasswordField
        label={t("components.password.label")}
        placeholder={t("components.password.placeholder")}
        required
      />
      <PasswordField
        label={t("components.password.label")}
        placeholder={t("components.password.placeholder")}
        error={t("components.password.error")}
        defaultValue="weak"
      />
      <PasswordField
        label={t("components.password.label")}
        placeholder={t("common.loading")}
        loading
        defaultValue="checking..."
      />
      <PasswordField
        label={t("components.password.label")}
        placeholder={t("components.password.cannotEdit")}
        disabled
        defaultValue="cannot-edit"
      />
    </div>
  );
};
