import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
} from "@/components/ui/shadcn/hover-card";

export type HoverCardContentOptions = Omit<
  React.ComponentProps<typeof HoverCardContent>,
  "children"
>;

export interface HoverCardProps
  extends Omit<React.ComponentProps<typeof HoverCard>, "children"> {
  /** Panel content shown on hover */
  content: React.ReactNode;
  /** Single element that opens the hover card */
  children: React.ReactElement;
  /** Props forwarded to the content panel */
  contentProps?: HoverCardContentOptions;
  /** Additional class names for the content panel */
  contentClassName?: string;
  /** When true, render only the trigger with no hover card */
  disabled?: boolean;
  /** Ref forwarded to HoverCardContent */
  ref?: React.Ref<React.ComponentRef<typeof HoverCardContent>>;
}
