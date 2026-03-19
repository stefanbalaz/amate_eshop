import type { Meta, StoryFn } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_PHONE_PREFIX,
  PHONE_PREFIXES,
  type PhonePrefixOption,
} from "@/utils/phone";
import {
  PhoneField,
  type PhoneFieldLabelSize,
} from "./phone-field";

const meta: Meta<typeof PhoneField> = {
  title: "Components/Inputs/PhoneField",
  component: PhoneField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    description: "",
    infoContent: "",
  },
  argTypes: {
    label: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    description: { control: { type: "text" } },
    infoTitle: { control: { type: "text" } },
    infoContent: { control: { type: "text" } },
    errorMessage: {
      control: { type: "text" },
      description: "Custom error message when validation fails.",
    },
    validate: {
      control: false,
      table: {
        type: { summary: "(value: string) => boolean" },
      },
      description:
        "Validation callback that controls success/error state for the phone input.",
    },
    prefixOnChange: { control: false, table: { disable: true } },
    phoneOnChange: { control: false, table: { disable: true } },
    prefixValue: { control: false, table: { disable: true } },
    phoneValue: { control: false, table: { disable: true } },
    options: { control: false, table: { disable: true } },
    prefixName: { control: false, table: { disable: true } },
    labelSize: {
      control: { type: "select" },
      options: ["xsmall", "small", "medium", "large"],
    },
    required: { control: { type: "boolean" } },
    hasErrorLabel: {
      control: false,
      table: { disable: true },
    },
    hasInfo: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    maxWidth: {
      control: { type: "text" },
      description:
        "CSS max-width value (e.g. '320px', '28rem', '100%'). Numeric values like '320' are treated as px.",
    },
  },
};

export default meta;

const validatePhoneNumber = (value: string): boolean => {
  const digitCount = value.replace(/\D/g, "").length;
  return digitCount >= 6;
};

type StoryArgs = {
  label?: string;
  placeholder?: string;
  description?: string;
  infoTitle?: string;
  infoContent?: string;
  errorMessage?: string;
  labelSize?: PhoneFieldLabelSize;
  required?: boolean;
  hasErrorLabel?: boolean;
  hasInfo?: boolean;
  disabled?: boolean;
  maxWidth?: string;
  initialPhone?: string;
  initialPrefix?: PhonePrefixOption;
};

const usePhoneFieldState = (
  initialPrefix: PhonePrefixOption,
  initialPhone: string,
) => {
  const [prefixValue, setPrefixValue] = useState(initialPrefix);
  const [phoneValue, setPhoneValue] = useState(initialPhone);

  useEffect(() => {
    setPrefixValue(initialPrefix);
  }, [initialPrefix]);

  useEffect(() => {
    setPhoneValue(initialPhone);
  }, [initialPhone]);

  return { prefixValue, setPrefixValue, phoneValue, setPhoneValue };
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const { prefixValue, setPrefixValue, phoneValue, setPhoneValue } =
    usePhoneFieldState(
      args.initialPrefix ?? DEFAULT_PHONE_PREFIX,
      args.initialPhone ?? "",
    );

  return (
    <div className="w-80 max-w-full">
      <PhoneField
        label={args.label || t("components.phoneField.label")}
        placeholder={args.placeholder || t("components.phoneField.placeholder")}
        description={args.description || undefined}
        hasInfo={args.hasInfo}
        infoTitle={args.infoTitle}
        infoContent={args.infoContent || undefined}
        labelSize={args.labelSize}
        required={args.required}
        errorMessage={args.errorMessage}
        hasErrorLabel={args.hasErrorLabel}
        disabled={args.disabled}
        maxWidth={args.maxWidth}
        prefixValue={prefixValue}
        prefixOnChange={(value) => {
          setPrefixValue(value);
        }}
        phoneValue={phoneValue}
        phoneOnChange={setPhoneValue}
      />
    </div>
  );
};

Default.args = {
  required: false,
  hasInfo: false,
  disabled: false,
  initialPrefix: PHONE_PREFIXES[0],
};

export const Required: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const { prefixValue, setPrefixValue, phoneValue, setPhoneValue } =
    usePhoneFieldState(
      args.initialPrefix ?? PHONE_PREFIXES[0],
      args.initialPhone ?? "",
    );

  return (
    <div className="w-80 max-w-full">
      <PhoneField
        label={args.label || t("components.phoneField.requiredLabel")}
        placeholder={args.placeholder || t("components.phoneField.placeholder")}
        prefixValue={prefixValue}
        prefixOnChange={(value) => {
          setPrefixValue(value);
        }}
        phoneValue={phoneValue}
        phoneOnChange={setPhoneValue}
        required={args.required ?? true}
        errorMessage={args.errorMessage}
        hasErrorLabel={args.hasErrorLabel}
        disabled={args.disabled}
      />
    </div>
  );
};

export const WithValidation: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const { prefixValue, setPrefixValue, phoneValue, setPhoneValue } =
    usePhoneFieldState(
      args.initialPrefix ?? PHONE_PREFIXES[2],
      args.initialPhone ?? "12345",
    );

  return (
    <div className="w-80 max-w-full">
      <PhoneField
        label={args.label || t("components.phoneField.label")}
        placeholder={args.placeholder || t("components.phoneField.placeholder")}
        description={
          args.description || t("components.phoneField.description")
        }
        errorMessage={args.errorMessage}
        prefixValue={prefixValue}
        prefixOnChange={(value) => {
          setPrefixValue(value);
        }}
        phoneValue={phoneValue}
        phoneOnChange={setPhoneValue}
        validate={validatePhoneNumber}
        hasErrorLabel={args.hasErrorLabel}
        disabled={args.disabled}
      />
    </div>
  );
};

export const WithInfo: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const { prefixValue, setPrefixValue, phoneValue, setPhoneValue } =
    usePhoneFieldState(
      args.initialPrefix ?? PHONE_PREFIXES[0],
      args.initialPhone ?? "",
    );

  return (
    <div className="w-80 max-w-full">
      <PhoneField
        label={args.label || t("components.phoneField.label")}
        placeholder={args.placeholder || t("components.phoneField.placeholder")}
        description={
          args.description || t("components.phoneField.description")
        }
        hasInfo={args.hasInfo ?? true}
        infoTitle={args.infoTitle || t("components.phoneField.infoTitle")}
        infoContent={args.infoContent || t("components.phoneField.infoContent")}
        errorMessage={args.errorMessage}
        prefixValue={prefixValue}
        prefixOnChange={(value) => {
          setPrefixValue(value);
        }}
        phoneValue={phoneValue}
        phoneOnChange={setPhoneValue}
        hasErrorLabel={args.hasErrorLabel}
        disabled={args.disabled}
      />
    </div>
  );
};

export const Disabled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const { prefixValue, setPrefixValue, phoneValue, setPhoneValue } =
    usePhoneFieldState(
      args.initialPrefix ?? PHONE_PREFIXES[0],
      args.initialPhone ?? "176 444 3322",
    );

  return (
    <div className="w-80 max-w-full">
      <PhoneField
        label={args.label || t("components.phoneField.label")}
        placeholder={args.placeholder || t("components.phoneField.placeholder")}
        prefixValue={prefixValue}
        prefixOnChange={(value) => {
          setPrefixValue(value);
        }}
        phoneValue={phoneValue}
        phoneOnChange={setPhoneValue}
        errorMessage={args.errorMessage}
        hasErrorLabel={args.hasErrorLabel}
        disabled={args.disabled ?? true}
      />
    </div>
  );
};
