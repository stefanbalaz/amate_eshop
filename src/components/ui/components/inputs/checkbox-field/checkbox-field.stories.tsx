import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckboxField } from "./checkbox-field";

const meta: Meta<typeof CheckboxField> = {
  title: "Components/Inputs/CheckboxField",
  component: CheckboxField,
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
    indeterminate: {
      control: { type: "boolean" },
    },
    checked: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type StoryArgs = {
  disabled?: boolean;
  required?: boolean;
  indeterminate?: boolean;
  checked?: boolean;
  label?: string;
  description?: string;
  error?: string;
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <CheckboxField
      label={args.label || t("components.checkbox.acceptTerms")}
      disabled={args.disabled}
      required={args.required}
      indeterminate={args.indeterminate}
      checked={args.checked}
    />
  );
};
Default.args = {
  label: "Accept terms",
};

export const WithDescription: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <CheckboxField
      label={args.label || t("components.checkbox.subscribeNewsletter")}
      description={
        args.description || t("components.checkbox.newsletterDescription")
      }
      disabled={args.disabled}
      required={args.required}
      indeterminate={args.indeterminate}
      checked={args.checked}
    />
  );
};
WithDescription.args = {
  label: "Subscribe to newsletter",
  description: "Receive weekly updates",
};

export const Required: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <CheckboxField
      label={args.label || t("components.checkbox.agreeTerms")}
      required={args.required ?? true}
      disabled={args.disabled}
      indeterminate={args.indeterminate}
      checked={args.checked}
    />
  );
};
Required.args = {
  label: "Agree to terms",
  required: true,
};

export const Checked: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <CheckboxField
      label={args.label || t("components.checkbox.checkedCheckbox")}
      defaultChecked={args.checked ?? true}
      disabled={args.disabled}
      required={args.required}
      indeterminate={args.indeterminate}
    />
  );
};
Checked.args = {
  label: "Checked checkbox",
  checked: true,
};

export const WithError: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <CheckboxField
      label={args.label || t("components.checkbox.acceptTerms")}
      error={args.error || t("components.checkbox.termsError")}
      disabled={args.disabled}
      required={args.required}
      indeterminate={args.indeterminate}
      checked={args.checked}
    />
  );
};
WithError.args = {
  label: "Accept terms",
  error: "You must accept the terms",
};

export const Disabled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <CheckboxField
      label={args.label || t("components.checkbox.disabledCheckbox")}
      disabled={args.disabled ?? true}
      required={args.required}
      indeterminate={args.indeterminate}
      checked={args.checked}
    />
  );
};
Disabled.args = {
  label: "Disabled checkbox",
  disabled: true,
};

export const DisabledChecked: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <CheckboxField
      label={args.label || t("components.checkbox.disabledCheckedCheckbox")}
      disabled={args.disabled ?? true}
      defaultChecked
      required={args.required}
      indeterminate={args.indeterminate}
    />
  );
};
DisabledChecked.args = {
  label: "Disabled checked checkbox",
  disabled: true,
};

export const Indeterminate: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <CheckboxField
      label={args.label || t("components.checkbox.selectAll")}
      indeterminate={args.indeterminate ?? true}
      disabled={args.disabled}
      required={args.required}
      checked={args.checked}
    />
  );
};
Indeterminate.args = {
  label: "Select all",
  indeterminate: true,
};

export const Controlled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  return (
    <div className="space-y-4">
      <CheckboxField
        label={t("components.checkbox.controlledCheckbox")}
        checked={checked}
        onCheckedChange={setChecked}
        disabled={args.disabled}
        required={args.required}
        indeterminate={args.indeterminate}
      />
      <p className="text-sm text-muted-foreground">
        Checked: {checked ? t("common.yes") : t("common.no")}
      </p>
    </div>
  );
};

export const NoLabel: StoryFn<StoryArgs> = (args) => {
  return (
    <CheckboxField
      disabled={args.disabled}
      required={args.required}
      indeterminate={args.indeterminate}
      checked={args.checked}
    />
  );
};

export const AllStates: StoryFn<StoryArgs> = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 w-80">
      <CheckboxField label={t("components.checkbox.acceptTerms")} />
      <CheckboxField
        label={t("components.checkbox.checkedCheckbox")}
        defaultChecked
      />
      <CheckboxField
        label={t("components.checkbox.subscribeNewsletter")}
        description={t("components.checkbox.newsletterDescription")}
      />
      <CheckboxField label={t("components.checkbox.agreeTerms")} required />
      <CheckboxField
        label={t("components.checkbox.acceptTerms")}
        error={t("validation.required")}
      />
      <CheckboxField
        label={t("components.checkbox.disabledCheckbox")}
        disabled
      />
      <CheckboxField
        label={t("components.checkbox.disabledCheckedCheckbox")}
        disabled
        defaultChecked
      />
      <CheckboxField
        label={t("components.checkbox.selectAll")}
        indeterminate
      />
    </div>
  );
};

export const SelectAllExample: StoryFn<StoryArgs> = () => {
  const [items, setItems] = useState([
    { id: 1, label: "Item 1", checked: false },
    { id: 2, label: "Item 2", checked: false },
    { id: 3, label: "Item 3", checked: true },
  ]);

  const checkedCount = items.filter((item) => item.checked).length;
  const allChecked = checkedCount === items.length;
  const someChecked = checkedCount > 0 && checkedCount < items.length;

  const handleSelectAll = (checked: boolean) => {
    setItems(items.map((item) => ({ ...item, checked })));
  };

  const handleItemChange = (id: number, checked: boolean) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, checked } : item)),
    );
  };

  const { t } = useTranslation();
  return (
    <div className="space-y-4 w-80">
      <CheckboxField
        label={t("components.checkbox.selectAll")}
        checked={allChecked}
        indeterminate={someChecked}
        onCheckedChange={handleSelectAll}
      />
      <div className="ml-6 space-y-2">
        {items.map((item) => (
          <CheckboxField
            key={item.id}
            label={item.label}
            checked={item.checked}
            onCheckedChange={(checked) => handleItemChange(item.id, checked)}
          />
        ))}
      </div>
    </div>
  );
};
