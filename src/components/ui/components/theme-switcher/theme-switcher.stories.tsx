import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Button } from "../button/button";
import { ThemeSwitcher } from "./theme-switcher";

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Components/ThemeSwitcher",
  component: ThemeSwitcher,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that allows users to switch between themes and toggle light/dark mode. Each theme has both light and dark variants.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryFn = () => {
  return <ThemeSwitcher />;
};
Default.parameters = {
  docs: {
    description: {
      story:
        "The default theme switcher with a dropdown for theme selection and a button to toggle light/dark mode.",
    },
  },
};

export const WithPreview: StoryFn = () => {
  return (
    <div className="flex flex-col gap-6 rounded-lg bg-background p-6">
      <ThemeSwitcher />

      <Card className="w-96">
        <CardHeader>
          <CardTitle>Theme Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground">
            Use the dropdown to change themes and the moon/sun icon to toggle
            dark mode.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button label="Primary" />
            <Button variant="secondary" label="Secondary" />
            <Button variant="outline" label="Outline" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="destructive" label="Destructive" />
            <Button variant="ghost" label="Ghost" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
WithPreview.parameters = {
  layout: "padded",
  docs: {
    description: {
      story:
        "Theme switcher with a preview card showing how different button variants look in the selected theme and mode.",
    },
  },
};
