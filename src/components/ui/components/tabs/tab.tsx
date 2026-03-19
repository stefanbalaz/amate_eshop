"use client";

import * as React from "react";
import { TabsTrigger } from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { useTabsVariant, useTabsScrollable } from "./use-tabs-context";

/** Aligns with blueprint CustomTab / MUI TabProps: value, disabled, tabIcon (icon), tabLabel (label), iconPosition, wrapped */
export type TabIconPosition = "start" | "end" | "top" | "bottom";

export type TabProps = React.ComponentProps<typeof TabsTrigger> & {
  /** Icon element (MUI: icon) */
  tabIcon?: React.ReactNode;
  /** Label content (MUI: label). Falls back to children. */
  tabLabel?: React.ReactNode;
  /** Icon position relative to label (MUI: iconPosition). Default: start */
  iconPosition?: TabIconPosition;
  /** Allow label to wrap to multiple lines (MUI: wrapped). Default: false */
  wrapped?: boolean;
};

const variantStyles: Record<string, string> = {
  default:
    "inline-flex h-[calc(100%-1px)] flex-1 items-center group-data-[orientation=horizontal]/tabs:justify-center group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start gap-1.5 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium text-foreground transition-[color,box-shadow] data-[state=inactive]:text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  line: "inline-flex h-full items-center group-data-[orientation=horizontal]/tabs:justify-center group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start gap-1.5 rounded-none border-0 border-b-2 border-transparent -mb-px px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
};

export const Tab = ({
  tabIcon,
  tabLabel,
  iconPosition = "start",
  wrapped = false,
  className,
  children,
  ...props
}: TabProps) => {
  const variant = useTabsVariant();
  const scrollable = useTabsScrollable();
  const label = tabLabel ?? children;

  const iconNode = tabIcon ? <span aria-hidden>{tabIcon}</span> : null;

  const content =
    iconPosition === "top" ? (
      <span className="flex flex-col items-center gap-1">
        {iconNode}
        {label}
      </span>
    ) : iconPosition === "bottom" ? (
      <span className="flex flex-col items-center gap-1">
        {label}
        {iconNode}
      </span>
    ) : iconPosition === "end" ? (
      <span className="inline-flex flex-row items-center gap-2.5">
        {label}
        {iconNode}
      </span>
    ) : (
      <span className="inline-flex flex-row items-center gap-2.5">
        {iconNode}
        {label}
      </span>
    );

  return (
    <TabsTrigger
      className={cn(
        variantStyles[variant] ?? variantStyles.default,
        !wrapped && "whitespace-nowrap",
        wrapped && "whitespace-normal",
        scrollable && "shrink-0 flex-none",
        className,
      )}
      {...props}
    >
      {content}
    </TabsTrigger>
  );
};
