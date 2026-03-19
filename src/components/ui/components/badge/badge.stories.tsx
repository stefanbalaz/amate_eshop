import type { Meta, StoryFn } from "@storybook/react-vite";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge, type BadgeProps } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
    tagSize: {
      control: { type: "select" },
      options: ["xsmall", "small", "medium", "big"],
    },
    paddingHorizontal: {
      control: { type: "text" },
    },
    paddingVertical: {
      control: { type: "text" },
    },
  },
};

export default meta;

type StoryArgs = {
  variant?: BadgeProps["variant"];
  tagSize?: BadgeProps["tagSize"];
  paddingHorizontal?: string;
  paddingVertical?: string;
  label?: string;
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();

  return (
    <Badge
      variant={args.variant}
      tagSize={args.tagSize}
      paddingHorizontal={args.paddingHorizontal}
      paddingVertical={args.paddingVertical}
    >
      {args.label ?? t("components.badge.default")}
    </Badge>
  );
};

Default.args = {
  variant: "default",
  tagSize: "medium",
};

export const Variants: StoryFn = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>{t("components.badge.default")}</Badge>
      <Badge variant="secondary">{t("components.badge.secondary")}</Badge>
      <Badge variant="destructive">{t("components.badge.destructive")}</Badge>
      <Badge variant="outline">{t("components.badge.outline")}</Badge>
      <Badge variant="ghost">{t("components.badge.ghost")}</Badge>
      <Badge variant="link">{t("components.badge.link")}</Badge>
    </div>
  );
};

export const WithIcon: StoryFn = () => {
  const { t } = useTranslation();

  return (
    <Badge variant="secondary">
      <CheckIcon aria-hidden="true" />
      {t("components.badge.verified")}
    </Badge>
  );
};

export const WithSpinner: StoryFn = () => {
  const { t } = useTranslation();

  return (
    <Badge variant="secondary">
      <LoaderCircleIcon className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
      {t("components.badge.loading")}
    </Badge>
  );
};

export const Sizes: StoryFn = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tagSize="xsmall">{t("components.badge.xsmall")}</Badge>
      <Badge tagSize="small">{t("components.badge.small")}</Badge>
      <Badge tagSize="medium">{t("components.badge.medium")}</Badge>
      <Badge tagSize="big">{t("components.badge.big")}</Badge>
    </div>
  );
};

export const PaddingHorizontal: StoryFn = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge paddingHorizontal="8px">{t("components.badge.compactHorizontal")}</Badge>
      <Badge>{t("components.badge.defaultHorizontal")}</Badge>
      <Badge paddingHorizontal="28px">{t("components.badge.wideHorizontal")}</Badge>
    </div>
  );
};

export const PaddingVertical: StoryFn = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge paddingVertical="2px">{t("components.badge.tightVertical")}</Badge>
      <Badge>{t("components.badge.defaultVertical")}</Badge>
      <Badge paddingVertical="10px">{t("components.badge.looseVertical")}</Badge>
    </div>
  );
};

export const Link: StoryFn = () => {
  const { t } = useTranslation();

  return (
    <Badge asChild variant="link">
      <a href="#" onClick={(e) => e.preventDefault()}>
        {t("components.badge.documentation")}
      </a>
    </Badge>
  );
};

export const CustomColors: StoryFn = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
        {t("components.badge.colorBlue")}
      </Badge>
      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        {t("components.badge.colorGreen")}
      </Badge>
      <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
        {t("components.badge.colorSky")}
      </Badge>
      <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
        {t("components.badge.colorPurple")}
      </Badge>
      <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
        {t("components.badge.colorRed")}
      </Badge>
    </div>
  );
};
