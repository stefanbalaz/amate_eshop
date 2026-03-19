import type { Meta, StoryObj } from "@storybook/react-vite";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "./loading-spinner";

const meta: Meta<typeof LoadingSpinner> = {
  title: "Components/Feedback/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    overlay: {
      control: { type: "boolean" },
    },
    centered: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
};

export const WithText: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <LoadingSpinner
        text={t("components.loadingSpinner.loadingData")}
        size="lg"
      />
    );
  },
};

export const WithCustomText: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <LoadingSpinner
        text={t("components.loadingSpinner.pleaseWait")}
        size="md"
      />
    );
  },
};

export const CenteredInContainer: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <div className="relative h-[200px] w-[300px] border rounded-lg bg-muted/20">
        <LoadingSpinner centered text={t("common.loading")} />
      </div>
    );
  },
};

export const Overlay: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <div className="relative">
        <div className="p-8 border rounded-lg">
          <h3 className="text-lg font-semibold">
            {t("components.loadingSpinner.contentBehindOverlay")}
          </h3>
          <p className="text-muted-foreground mt-2">
            {t("components.loadingSpinner.contentBlockedByOverlay")}
          </p>
        </div>
        <LoadingSpinner overlay text={t("common.loading")} size="lg" />
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const AllSizes: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <div className="flex items-end gap-8">
        <div className="flex flex-col items-center gap-2">
          <LoadingSpinner size="sm" />
          <span className="text-xs text-muted-foreground">
            {t("components.loadingSpinner.small")}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <LoadingSpinner size="md" />
          <span className="text-xs text-muted-foreground">
            {t("components.loadingSpinner.medium")}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <LoadingSpinner size="lg" />
          <span className="text-xs text-muted-foreground">
            {t("components.loadingSpinner.large")}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <LoadingSpinner size="xl" />
          <span className="text-xs text-muted-foreground">
            {t("components.loadingSpinner.extraLarge")}
          </span>
        </div>
      </div>
    );
  },
};

export const InlineUsage: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <div className="flex items-center gap-2">
        <LoadingSpinner size="sm" />
        <span className="text-sm">
          {t("components.loadingSpinner.savingChanges")}
        </span>
      </div>
    );
  },
};

export const InButton: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md"
        disabled
      >
        <LoadingSpinner size="sm" className="text-primary-foreground" />
        {t("components.loadingSpinner.processing")}
      </button>
    );
  },
};
