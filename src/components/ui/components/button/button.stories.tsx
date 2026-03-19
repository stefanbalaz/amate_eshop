import type { Meta, StoryFn } from "@storybook/react-vite";
import { useTranslation } from "react-i18next";
import { Button, ButtonSize } from "./button";
import { Rocket } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

// Using StoryFn for components with union props to avoid TypeScript inference issues
// See: https://github.com/storybookjs/storybook/issues/25492
// We explicitly pick props instead of spreading to handle the discriminated union

type StoryArgs = {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  labelLoading?: string;
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading}
      label={args.label || t("components.button.button")}
    />
  );
};
Default.args = {
  label: "Button",
};

export const Secondary: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant ?? "secondary"}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading}
      label={args.label || t("components.button.secondary")}
    />
  );
};
Secondary.args = {
  variant: "secondary",
  label: "Secondary",
};

export const Destructive: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant ?? "destructive"}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading}
      label={args.label || t("components.button.destructive")}
    />
  );
};
Destructive.args = {
  variant: "destructive",
  label: "Destructive",
};

export const Outline: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant ?? "outline"}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading}
      label={args.label || t("components.button.outline")}
    />
  );
};
Outline.args = {
  variant: "outline",
  label: "Outline",
};

export const Ghost: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant ?? "ghost"}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading}
      label={args.label || t("components.button.ghost")}
    />
  );
};
Ghost.args = {
  variant: "ghost",
  label: "Ghost",
};

export const Link: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant ?? "link"}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading}
      label={args.label || t("components.button.link")}
    />
  );
};
Link.args = {
  variant: "link",
  label: "Link",
};

export const Small: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant}
      size={args.size ?? ButtonSize.SM}
      disabled={args.disabled}
      loading={args.loading}
      label={args.label || t("components.button.small")}
    />
  );
};
Small.args = {
  size: ButtonSize.SM,
  label: "Small",
};

export const Large: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant}
      size={args.size ?? ButtonSize.LG}
      disabled={args.disabled}
      loading={args.loading}
      label={args.label || t("components.button.large")}
    />
  );
};
Large.args = {
  size: ButtonSize.LG,
  label: "Large",
};

export const Icon: StoryFn<StoryArgs> = (args) => {
  return (
    <Button
      variant={args.variant}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading}
      icon={<Rocket />}
    />
  );
};

export const IconWithLeftIcon: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading}
      label={args.label || t("components.button.button")}
      iconLeft={<Rocket />}
    />
  );
};
IconWithLeftIcon.args = {
  label: "Button",
};

export const IconWithRightIcon: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading}
      label={args.label || t("components.button.button")}
      iconRight={<Rocket />}
    />
  );
};
IconWithRightIcon.args = {
  label: "Button",
};

export const Disabled: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant}
      size={args.size}
      disabled={args.disabled ?? true}
      loading={args.loading}
      label={args.label || t("components.button.disabled")}
    />
  );
};
Disabled.args = {
  disabled: true,
  label: "Disabled",
};

export const Loading: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading ?? true}
      label={args.label || t("components.button.button")}
    />
  );
};
Loading.args = {
  loading: true,
  label: "Button",
};

export const LoadingWithCustomLoadingLabel: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={args.variant}
      size={args.size}
      disabled={args.disabled}
      loading={args.loading ?? true}
      label={args.label || t("components.button.button")}
      labelLoading={args.labelLoading || t("components.button.loading")}
    />
  );
};
LoadingWithCustomLoadingLabel.args = {
  loading: true,
  label: "Button",
  labelLoading: "Loading...",
};
