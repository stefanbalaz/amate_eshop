import type { Meta, StoryFn } from "@storybook/react-vite";
import {
  Controls,
  Primary,
  Stories,
  Title,
} from "@storybook/addon-docs/blocks";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { Slider } from "@/components/ui/shadcn/slider";
import {
  ProgressBar,
  ProgressBarSize,
  type ProgressBarProps,
} from "./progress-bar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
    },
    type: {
      control: { type: "select" },
      options: ["linear", "circular"],
    },
    progressValue: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    itemsCurrent: {
      control: { type: "number", min: 0 },
    },
    itemsTotal: {
      control: { type: "number", min: 0 },
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
  },
};

export default meta;

const StoryContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid w-full max-w-sm gap-6">{children}</div>;
};

const ProgressStory = (args: ProgressBarProps) => {
  const className = args.label
    ? [args.className, "w-full"].filter(Boolean).join(" ")
    : args.className;

  return (
    <StoryContainer>
      <div className="flex justify-center">
        <ProgressBar {...args} className={className} />
      </div>
    </StoryContainer>
  );
};

export const Default: StoryFn<ProgressBarProps> = (args) => (
  <ProgressStory {...args} />
);

Default.args = {
  type: "linear",
  label: "",
  progressValue: 42,
  itemsCurrent: 3,
  itemsTotal: 7,
  size: ProgressBarSize.DEFAULT,
};

export const Labeled: StoryFn<ProgressBarProps> = (args) => {
  const { t } = useTranslation();

  return (
    <ProgressStory
      {...args}
      label={args.label ?? t("components.progressBar.uploadProgress")}
    />
  );
};

Labeled.args = {
  type: "linear",
  progressValue: 66,
  itemsCurrent: 66,
  itemsTotal: 100,
};

export const Zero: StoryFn<ProgressBarProps> = (args) => (
  <ProgressStory {...args} />
);

Zero.args = {
  type: "linear",
  label: "",
  progressValue: 0,
  itemsCurrent: 0,
  itemsTotal: 7,
};

export const Completed: StoryFn<ProgressBarProps> = (args) => (
  <ProgressStory {...args} />
);

Completed.args = {
  type: "linear",
  label: "",
  progressValue: 100,
  itemsCurrent: 7,
  itemsTotal: 7,
};

export const CircularDefault: StoryFn<ProgressBarProps> = (args) => (
  <ProgressStory {...args} />
);

CircularDefault.args = {
  type: "circular",
  label: "",
  progressValue: 42,
  itemsCurrent: 3,
  itemsTotal: 7,
  size: ProgressBarSize.DEFAULT,
};

export const CircularLabeled: StoryFn<ProgressBarProps> = (args) => {
  const { t } = useTranslation();

  return (
    <ProgressStory
      {...args}
      label={args.label ?? t("components.progressBar.uploadProgress")}
    />
  );
};

CircularLabeled.args = {
  type: "circular",
  progressValue: 66,
  itemsCurrent: 66,
  itemsTotal: 100,
  size: ProgressBarSize.DEFAULT,
};

export const CircularZero: StoryFn<ProgressBarProps> = (args) => (
  <ProgressStory {...args} />
);

CircularZero.args = {
  type: "circular",
  label: "",
  progressValue: 0,
  itemsCurrent: 0,
  itemsTotal: 7,
  size: ProgressBarSize.DEFAULT,
};

export const CircularCompleted: StoryFn<ProgressBarProps> = (args) => (
  <ProgressStory {...args} />
);

CircularCompleted.args = {
  type: "circular",
  label: "",
  progressValue: 100,
  itemsCurrent: 7,
  itemsTotal: 7,
  size: ProgressBarSize.DEFAULT,
};

export const Controlled: StoryFn = () => {
  const { t } = useTranslation();
  const [progress, setProgress] = React.useState(66);

  return (
    <StoryContainer>
      <ProgressBar
        type="linear"
        label={t("components.progressBar.uploadProgress")}
        progressValue={progress}
        itemsCurrent={progress}
        itemsTotal={100}
        className="w-full"
      />

      <Slider
        value={[progress]}
        onValueChange={(next) => setProgress(next[0] ?? 0)}
        max={100}
        step={1}
        className="w-full"
        aria-label={t("components.progressBar.sliderAriaLabel")}
      />
    </StoryContainer>
  );
};
