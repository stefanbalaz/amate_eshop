import type { Meta, StoryFn } from "@storybook/react-vite";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Slider, type SliderProps } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Inputs/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-85 p-2">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    label: { control: { type: "text" } },
    description: { control: { type: "text" } },
    error: { control: { type: "text" } },
    success: { control: { type: "boolean" } },
    required: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
    valueLabelDisplay: {
      control: { type: "radio" },
      options: ["off", "auto", "on"],
    },
    marks: { control: { type: "boolean" } },
  },
};

export default meta;
type StoryArgs = Pick<
  SliderProps,
  | "label"
  | "description"
  | "error"
  | "success"
  | "required"
  | "disabled"
  | "min"
  | "max"
  | "step"
  | "orientation"
  | "valueLabelDisplay"
> & {
  marks?: boolean;
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();

  return (
    <Slider
      label={args.label || t("components.slider.defaultLabel")}
      description={args.description || t("components.slider.defaultDescription")}
      defaultValue={60}
      min={args.min ?? 0}
      max={args.max ?? 100}
      step={args.step ?? 5}
      marks={args.marks ?? false}
      orientation={args.orientation ?? "horizontal"}
      valueLabelDisplay={args.valueLabelDisplay}
      disabled={args.disabled}
      required={args.required}
      success={args.success}
      error={args.error}
    />
  );
};

export const Range: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();

  return (
    <Slider
      label={args.label || t("components.slider.rangeLabel")}
      description={args.description || t("components.slider.rangeDescription")}
      defaultValue={[20, 80]}
      min={args.min ?? 0}
      max={args.max ?? 100}
      step={args.step ?? 5}
      orientation={args.orientation ?? "horizontal"}
      valueLabelDisplay={args.valueLabelDisplay ?? "on"}
      disabled={args.disabled}
      required={args.required}
      success={args.success}
      error={args.error}
    />
  );
};

export const WithMarks: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();

  return (
    <Slider
      label={args.label || t("components.slider.marksLabel")}
      description={args.description || t("components.slider.marksDescription")}
      defaultValue={3}
      min={args.min ?? 0}
      max={args.max ?? 10}
      step={args.step ?? 1}
      orientation={args.orientation ?? "horizontal"}
      marks={[
        { value: 0, label: t("components.slider.yearsShort", { value: 0 }) },
        { value: 3, label: t("components.slider.yearsShort", { value: 3 }) },
        { value: 5, label: t("components.slider.yearsShort", { value: 5 }) },
        { value: 10, label: t("components.slider.yearsShort", { value: 10 }) },
      ]}
      valueLabelFormat={(value) => t("components.slider.yearsShort", { value })}
      valueLabelDisplay={args.valueLabelDisplay ?? "on"}
      disabled={args.disabled}
      required={args.required}
      success={args.success}
      error={args.error}
    />
  );
};

export const ErrorState: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();

  return (
    <Slider
      label={args.label || t("components.slider.errorLabel")}
      defaultValue={95}
      min={args.min ?? 0}
      max={args.max ?? 100}
      step={args.step ?? 1}
      orientation={args.orientation ?? "horizontal"}
      error={args.error || t("components.slider.errorMessage")}
      valueLabelDisplay={args.valueLabelDisplay ?? "on"}
      disabled={args.disabled}
      required={args.required}
      success={args.success}
    />
  );
};

export const SuccessState: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();

  return (
    <Slider
      label={args.label || t("components.slider.successLabel")}
      defaultValue={75}
      min={args.min ?? 0}
      max={args.max ?? 100}
      step={args.step ?? 5}
      orientation={args.orientation ?? "horizontal"}
      success={args.success ?? true}
      description={args.description || t("components.slider.successDescription")}
      valueLabelDisplay={args.valueLabelDisplay ?? "on"}
      disabled={args.disabled}
      required={args.required}
      error={args.error}
    />
  );
};

export const Disabled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();

  return (
    <Slider
      label={args.label || t("components.slider.disabledLabel")}
      defaultValue={40}
      min={args.min ?? 0}
      max={args.max ?? 100}
      disabled={args.disabled ?? true}
      orientation={args.orientation ?? "horizontal"}
      valueLabelDisplay={args.valueLabelDisplay ?? "on"}
      marks={args.marks ?? true}
      required={args.required}
      success={args.success}
      error={args.error}
      description={args.description}
      step={args.step}
    />
  );
};

export const MultiRange: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();

  return (
    <Slider
      label={args.label || t("components.slider.multiRangeLabel")}
      description={args.description || t("components.slider.multiRangeDescription")}
      defaultValue={[20, 45, 75]}
      min={args.min ?? 0}
      max={args.max ?? 100}
      step={args.step ?? 5}
      orientation={args.orientation ?? "horizontal"}
      valueLabelDisplay={args.valueLabelDisplay ?? "on"}
      disabled={args.disabled}
      required={args.required}
      success={args.success}
      error={args.error}
      marks={args.marks}
    />
  );
};

export const Vertical: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();

  return (
    <Slider
      label={args.label || t("components.slider.verticalLabel")}
      description={args.description || t("components.slider.verticalDescription")}
      defaultValue={60}
      min={args.min ?? 0}
      max={args.max ?? 100}
      step={args.step ?? 5}
      orientation={args.orientation ?? "vertical"}
      valueLabelDisplay={args.valueLabelDisplay ?? "on"}
      disabled={args.disabled}
      required={args.required}
      success={args.success}
      error={args.error}
      marks={args.marks ?? false}
    />
  );
};

export const Controlled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(50);

  return (
    <Slider
      label={args.label || t("components.slider.controlledLabel")}
      description={args.description || t("components.slider.controlledDescription")}
      value={value}
      onChange={(_event, newValue) => setValue(newValue as number)}
      min={args.min ?? 0}
      max={args.max ?? 100}
      step={args.step ?? 1}
      orientation={args.orientation ?? "horizontal"}
      valueLabelDisplay={args.valueLabelDisplay ?? "on"}
      disabled={args.disabled}
      required={args.required}
      success={args.success}
      error={args.error}
      marks={args.marks}
    />
  );
};
