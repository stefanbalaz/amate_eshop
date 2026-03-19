import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SwitchField } from "./switch-field";

const meta: Meta<typeof SwitchField> = {
  title: "Components/Inputs/SwitchField",
  component: SwitchField,
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
    labelPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
  },
};

export default meta;

type StoryArgs = {
  disabled?: boolean;
  required?: boolean;
  labelPosition?: "left" | "right";
  label?: string;
  description?: string;
  error?: string;
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <SwitchField
      label={args.label || t("components.switch.airplaneMode")}
      disabled={args.disabled}
      required={args.required}
      labelPosition={args.labelPosition}
    />
  );
};
Default.args = {
  label: "Airplane Mode",
};

export const WithDescription: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <SwitchField
      label={args.label || t("components.switch.marketingEmails")}
      description={args.description || t("components.switch.marketingDescription")}
      disabled={args.disabled}
      required={args.required}
      labelPosition={args.labelPosition}
    />
  );
};
WithDescription.args = {
  label: "Marketing Emails",
  description: "Receive emails about new products and features",
};

export const Required: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <SwitchField
      label={args.label || t("components.switch.enableNotifications")}
      required={args.required ?? true}
      disabled={args.disabled}
      labelPosition={args.labelPosition}
    />
  );
};
Required.args = {
  label: "Enable Notifications",
  required: true,
};

export const Checked: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <SwitchField
      label={args.label || t("components.switch.checkedSwitch")}
      defaultChecked
      disabled={args.disabled}
      required={args.required}
      labelPosition={args.labelPosition}
    />
  );
};
Checked.args = {
  label: "Checked Switch",
};

export const WithError: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <SwitchField
      label={args.label || t("components.switch.acceptTerms")}
      error={args.error || t("components.switch.termsError")}
      disabled={args.disabled}
      required={args.required}
      labelPosition={args.labelPosition}
    />
  );
};
WithError.args = {
  label: "Accept Terms",
  error: "You must accept the terms",
};

export const Disabled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <SwitchField
      label={args.label || t("components.switch.disabledSwitch")}
      disabled={args.disabled ?? true}
      required={args.required}
      labelPosition={args.labelPosition}
    />
  );
};
Disabled.args = {
  label: "Disabled Switch",
  disabled: true,
};

export const DisabledChecked: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <SwitchField
      label={args.label || t("components.switch.disabledCheckedSwitch")}
      disabled={args.disabled ?? true}
      defaultChecked
      required={args.required}
      labelPosition={args.labelPosition}
    />
  );
};
DisabledChecked.args = {
  label: "Disabled Checked Switch",
  disabled: true,
};

export const LabelLeft: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <SwitchField
      label={args.label || t("components.switch.enableFeature")}
      labelPosition={args.labelPosition ?? "left"}
      disabled={args.disabled}
      required={args.required}
    />
  );
};
LabelLeft.args = {
  label: "Enable Feature",
  labelPosition: "left",
};

export const Controlled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  return (
    <div className="space-y-4">
      <SwitchField
        label={t("components.switch.controlledSwitch")}
        checked={checked}
        onCheckedChange={setChecked}
        disabled={args.disabled}
        required={args.required}
        labelPosition={args.labelPosition}
      />
      <p className="text-sm text-muted-foreground">
        Status: {checked ? t("common.yes") : t("common.no")}
      </p>
    </div>
  );
};

export const NoLabel: StoryFn<StoryArgs> = (args) => {
  return (
    <SwitchField
      disabled={args.disabled}
      required={args.required}
      labelPosition={args.labelPosition}
    />
  );
};

export const AllStates: StoryFn<StoryArgs> = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 w-80">
      <SwitchField label={t("components.switch.airplaneMode")} />
      <SwitchField
        label={t("components.switch.checkedSwitch")}
        defaultChecked
      />
      <SwitchField
        label={t("components.switch.marketingEmails")}
        description={t("components.switch.marketingDescription")}
      />
      <SwitchField
        label={t("components.switch.enableNotifications")}
        required
      />
      <SwitchField
        label={t("components.switch.acceptTerms")}
        error={t("validation.required")}
      />
      <SwitchField label={t("components.switch.disabledSwitch")} disabled />
      <SwitchField
        label={t("components.switch.disabledCheckedSwitch")}
        disabled
        defaultChecked
      />
      <SwitchField
        label={t("components.switch.enableFeature")}
        labelPosition="left"
      />
    </div>
  );
};

export const SettingsExample: StoryFn<StoryArgs> = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    marketing: false,
    analytics: true,
  });

  return (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-medium">Notification Settings</h3>
      <div className="space-y-4">
        <SwitchField
          label="Push notifications"
          description="Receive push notifications for important updates."
          checked={settings.notifications}
          onCheckedChange={(checked) =>
            setSettings({ ...settings, notifications: checked })
          }
        />
        <SwitchField
          label="Marketing emails"
          description="Receive emails about new features and offers."
          checked={settings.marketing}
          onCheckedChange={(checked) =>
            setSettings({ ...settings, marketing: checked })
          }
        />
        <SwitchField
          label="Analytics"
          description="Help us improve by sharing anonymous usage data."
          checked={settings.analytics}
          onCheckedChange={(checked) =>
            setSettings({ ...settings, analytics: checked })
          }
        />
      </div>
    </div>
  );
};
