import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, SaveIcon } from "lucide-react";
import { Button, Kbd } from "@/components/ui/primitives";
import { useTranslation } from "react-i18next";
import { Tooltip } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex min-h-30 items-center justify-center p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    disabled: { control: { type: "boolean" } },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => {
    const { t } = useTranslation();

    return (
      <Tooltip
        {...args}
        title={args.title ?? t("components.tooltip.defaultTitle")}
      >
        <Button variant="outline">
          {t("components.tooltip.defaultTrigger")}
        </Button>
      </Tooltip>
    );
  },
};

export const LongText: Story = {
  args: { contentProps: { side: "bottom" } },
  render: (args) => {
    const { t } = useTranslation();

    return (
      <Tooltip
        {...args}
        title={args.title ?? t("components.tooltip.longTextTitle")}
      >
        <Button variant="secondary">
          {t("components.tooltip.longTextTrigger")}
        </Button>
      </Tooltip>
    );
  },
};

export const RichContent: Story = {
  render: (args) => {
    const { t } = useTranslation();

    return (
      <Tooltip
        {...args}
        title={
          args.title ?? (
            <div className="flex max-w-[220px] items-start gap-2">
              <Info
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>{t("components.tooltip.richContentTitle")}</span>
            </div>
          )
        }
      >
        <Button>{t("components.tooltip.richContentTrigger")}</Button>
      </Tooltip>
    );
  },
};

export const Placements: Story = {
  render: () => {
    const { t } = useTranslation();

    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Tooltip
          title={t("components.tooltip.placements.leftTitle")}
          contentProps={{ side: "left" }}
        >
          <Button variant="outline">
            {t("components.tooltip.placements.leftTrigger")}
          </Button>
        </Tooltip>

        <Tooltip
          title={t("components.tooltip.placements.topTitle")}
          contentProps={{ side: "top" }}
        >
          <Button variant="outline">
            {t("components.tooltip.placements.topTrigger")}
          </Button>
        </Tooltip>

        <Tooltip
          title={t("components.tooltip.placements.bottomTitle")}
          contentProps={{ side: "bottom" }}
        >
          <Button variant="outline">
            {t("components.tooltip.placements.bottomTrigger")}
          </Button>
        </Tooltip>

        <Tooltip
          title={t("components.tooltip.placements.rightTitle")}
          contentProps={{ side: "right" }}
        >
          <Button variant="outline">
            {t("components.tooltip.placements.rightTrigger")}
          </Button>
        </Tooltip>
      </div>
    );
  },
};

export const WithShortcut: Story = {
  render: (args) => {
    const { t } = useTranslation();

    return (
      <Tooltip
        {...args}
        title={
          args.title ?? (
            <div className="flex items-center gap-1.5">
              <span>{t("components.tooltip.shortcut.title")}</span>
              <Kbd>{t("components.tooltip.shortcut.modifier")}</Kbd>
              <Kbd>{t("components.tooltip.shortcut.key")}</Kbd>
            </div>
          )
        }
      >
        <Button
          variant="outline"
          size="icon-sm"
          aria-label={t("components.tooltip.shortcut.triggerAriaLabel")}
        >
          <SaveIcon />
        </Button>
      </Tooltip>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const { t } = useTranslation();

    return (
      <Tooltip
        {...args}
        title={args.title ?? t("components.tooltip.disabled.title")}
      >
        <Button
          variant="outline"
          aria-disabled="true"
          onClick={(event) => event.preventDefault()}
          className="cursor-not-allowed opacity-50"
        >
          {t("components.tooltip.disabled.trigger")}
        </Button>
      </Tooltip>
    );
  },
};
