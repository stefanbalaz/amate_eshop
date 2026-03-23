import * as React from "react"
import {
  HoverCard as HoverCardRoot,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/shadcn/hover-card"
import { cn } from "@/utils/style"

import type { HoverCardProps } from "./hover-card.types"

export type { HoverCardProps } from "./hover-card.types"

export const HoverCard = ({
  content,
  children,
  contentProps,
  contentClassName,
  disabled = false,
  ref,
  ...rootProps
}: HoverCardProps): React.JSX.Element => {
  const trigger = React.Children.only(children)
  const {
    className: contentPropsClassName,
    sideOffset = 4,
    ...contentRestProps
  } = contentProps ?? {}

  if (disabled) {
    return trigger
  }

  return (
    <HoverCardRoot data-slot="hover-card" {...rootProps}>
      <HoverCardTrigger data-slot="hover-card-trigger" asChild>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent
        ref={ref}
        data-slot="hover-card-content"
        sideOffset={sideOffset}
        className={cn(contentPropsClassName, contentClassName)}
        {...contentRestProps}
      >
        {content}
      </HoverCardContent>
    </HoverCardRoot>
  )
}
