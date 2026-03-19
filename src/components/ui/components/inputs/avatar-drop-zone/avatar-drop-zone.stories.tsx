import type { Meta, StoryFn } from "@storybook/react-vite";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/primitives";
import { AvatarDropZone, type AvatarImage } from "./avatar-drop-zone";

import avatarPlaceholder from "@/assets/avatar-placeholder.svg";

const meta: Meta<typeof AvatarDropZone> = {
  title: "Components/Inputs/AvatarDropZone",
  component: AvatarDropZone,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    dragActiveText: { control: { type: "text" } },
    dragInactiveText: { control: { type: "text" } },
    maxSizeBytes: { control: { type: "number" } },
    uploading: { control: { type: "boolean" } },
    uploadProgress: { control: { type: "number" } },
    error: { control: { type: "text" } },
    success: { control: { type: "boolean" } },
  },
};

export default meta;

type StoryArgs = {
  dragActiveText?: string;
  dragInactiveText?: string;
  maxSizeBytes: number;
  uploading?: boolean;
  uploadProgress?: number;
  error?: string;
  success?: boolean;
};

const createMockAvatar = (): AvatarImage => {
  const file = new File([], "avatar.svg", { type: "image/svg+xml" });
  return {
    file,
    preview: avatarPlaceholder,
  };
};

export const Default: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [avatar, setAvatar] = React.useState<AvatarImage | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <AvatarDropZone
        avatar={avatar}
        onChange={(value) => setAvatar(value)}
        maxSizeBytes={args.maxSizeBytes}
        uploading={args.uploading}
        uploadProgress={args.uploadProgress}
        dragActiveText={args.dragActiveText}
        dragInactiveText={args.dragInactiveText}
        error={args.error}
        success={args.success}
      />

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setAvatar(null)}>
          {t("common.clear")}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setAvatar(createMockAvatar())}
        >
          {t("components.avatarDropZone.setMockAvatar")}
        </Button>
      </div>
    </div>
  );
};

Default.args = {
  maxSizeBytes: 10_000_000,
  uploading: false,
};

export const Uploading: StoryFn<StoryArgs> = (args) => {
  const [avatar, setAvatar] = React.useState<AvatarImage | null>(() =>
    createMockAvatar(),
  );

  return (
    <AvatarDropZone
      avatar={avatar}
      onChange={(value) => setAvatar(value)}
      maxSizeBytes={args.maxSizeBytes}
      uploading={args.uploading}
      uploadProgress={args.uploadProgress}
      dragActiveText={args.dragActiveText}
      dragInactiveText={args.dragInactiveText}
      error={args.error}
      success={args.success}
    />
  );
};

Uploading.args = {
  maxSizeBytes: 10_000_000,
  uploading: true,
  uploadProgress: 42,
};

export const WithInitialAvatar: StoryFn<StoryArgs> = (args) => {
  const [avatar, setAvatar] = React.useState<AvatarImage | null>(() =>
    createMockAvatar(),
  );

  return (
    <AvatarDropZone
      avatar={avatar}
      onChange={(value) => setAvatar(value)}
      maxSizeBytes={args.maxSizeBytes}
      uploading={args.uploading}
      uploadProgress={args.uploadProgress}
      dragActiveText={args.dragActiveText}
      dragInactiveText={args.dragInactiveText}
      error={args.error}
      success={args.success}
    />
  );
};

WithInitialAvatar.args = {
  maxSizeBytes: 10_000_000,
  uploading: false,
};

export const WithError: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [avatar, setAvatar] = React.useState<AvatarImage | null>(() =>
    createMockAvatar(),
  );

  return (
    <AvatarDropZone
      avatar={avatar}
      onChange={(value) => setAvatar(value)}
      maxSizeBytes={args.maxSizeBytes}
      error={args.error ?? t("components.avatarDropZone.errors.invalidType")}
      uploading={false}
    />
  );
};

WithError.args = {
  maxSizeBytes: 10_000_000,
};

export const WithSuccess: StoryFn<StoryArgs> = (args) => {
  const [avatar, setAvatar] = React.useState<AvatarImage | null>(() =>
    createMockAvatar(),
  );

  return (
    <AvatarDropZone
      avatar={avatar}
      onChange={(value) => setAvatar(value)}
      maxSizeBytes={args.maxSizeBytes}
      success={args.success ?? true}
      uploading={false}
    />
  );
};

WithSuccess.args = {
  maxSizeBytes: 10_000_000,
  success: true,
};
