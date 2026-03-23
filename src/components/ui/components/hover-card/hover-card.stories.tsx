import type { Meta, StoryObj } from "@storybook/react-vite"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/primitives"
import { HoverCard } from "./hover-card"

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex min-h-40 items-center justify-center p-6">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    disabled: { control: { type: "boolean" } },
  },
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: (args) => (
    <HoverCard
      {...args}
      content={
        args.content ?? (
          <div className="space-y-1">
            <p className="text-sm font-semibold">Hover card</p>
            <p className="text-sm text-muted-foreground">
              Extra context appears when you hover the trigger.
            </p>
          </div>
        )
      }
    >
      {args.children ?? <Button variant="outline">Hover me</Button>}
    </HoverCard>
  ),
}

export const RichContent: Story = {
  render: (args) => (
    <HoverCard
      {...args}
      content={
        args.content ?? (
          <div className="flex max-w-[240px] items-start gap-2">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="space-y-1">
              <p className="text-sm font-medium">Rich content</p>
              <p className="text-sm text-muted-foreground">
                Icons, layout, and longer copy work well in a hover card.
              </p>
            </div>
          </div>
        )
      }
    >
      {args.children ?? <Button variant="secondary">Learn more</Button>}
    </HoverCard>
  ),
}

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <HoverCard
        contentProps={{ side: "left" }}
        content={<p className="text-sm">Opens to the left.</p>}
      >
        <Button variant="outline" size="sm">
          Left
        </Button>
      </HoverCard>
      <HoverCard
        contentProps={{ side: "top" }}
        content={<p className="text-sm">Opens above.</p>}
      >
        <Button variant="outline" size="sm">
          Top
        </Button>
      </HoverCard>
      <HoverCard
        contentProps={{ side: "bottom" }}
        content={<p className="text-sm">Opens below.</p>}
      >
        <Button variant="outline" size="sm">
          Bottom
        </Button>
      </HoverCard>
      <HoverCard
        contentProps={{ side: "right" }}
        content={<p className="text-sm">Opens to the right.</p>}
      >
        <Button variant="outline" size="sm">
          Right
        </Button>
      </HoverCard>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <HoverCard
      {...args}
      content={
        args.content ?? <p className="text-sm">This panel is disabled.</p>
      }
    >
      {args.children ?? (
        <Button variant="outline" aria-disabled="true">
          No hover card
        </Button>
      )}
    </HoverCard>
  ),
}
