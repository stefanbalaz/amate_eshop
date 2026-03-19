import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./index";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: "This is a reusable text component.",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Muted: Story = {
  args: {
    variant: "muted",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};
