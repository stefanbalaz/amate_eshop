import type { Meta, StoryFn } from "@storybook/react-vite";
import { useTranslation } from "react-i18next";
import { Avatar } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  args: {
    src: "/img/no-image.svg",
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "text" } },
    showBadge: { control: { type: "boolean" } },
    badgeType: { control: { type: "select" }, options: ["text", "dot"] },
    src: { control: { type: "text" } },
  },
};

export default meta;

type StoryArgs = {
  size?: string;
  showBadge?: boolean;
  badgeType?: "text" | "dot";
  src?: string;
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Avatar
      size={args.size ?? "96px"}
      showBadge={args.showBadge ?? false}
      badgeType={args.badgeType ?? "text"}
      badgeContent={t("components.avatar.badgeText")}
      src={args.src}
    />
  );
};

export const WithBadgeText: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Avatar
      size={args.size ?? "96px"}
      showBadge
      badgeType="text"
      badgeContent={t("components.avatar.badgeText")}
      src={args.src}
    />
  );
};

export const WithBadgeDot: StoryFn<StoryArgs> = (args) => {
  return (
    <Avatar
      size={args.size ?? "96px"}
      showBadge
      badgeType="dot"
      src={args.src}
    />
  );
};

export const Clickable: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <Avatar
      size={args.size ?? "96px"}
      showBadge={args.showBadge ?? false}
      badgeType={args.badgeType ?? "text"}
      badgeContent={t("components.avatar.badgeText")}
      src={args.src}
      onClick={() => {}}
    />
  );
};

export const Fallback: StoryFn<StoryArgs> = (args) => {
  return (
    <Avatar
      size={args.size ?? "96px"}
      showBadge={args.showBadge ?? false}
      badgeType={args.badgeType ?? "text"}
      src={undefined}
    />
  );
};
