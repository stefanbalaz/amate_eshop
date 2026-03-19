"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@/components/ui/primitives";
import { cn } from "@/utils/style";

export type TabsProps = React.ComponentProps<typeof TabsPrimitive>;

/**
 * To sync the active tab with the URL, use the controlled `value` + `onValueChange` props:
 *
 * ```tsx
 * const [searchParams, setSearchParams] = useSearchParams();
 * const tab = searchParams.get("tab") ?? "account";
 *
 * <Tabs value={tab} onValueChange={(v) => setSearchParams({ tab: v })}>
 * ```
 */
export const Tabs = ({
  className,
  orientation = "horizontal",
  ...props
}: TabsProps) => {
  return (
    <TabsPrimitive
      data-slot="tabs"
      orientation={orientation}
      className={cn(
        "group/tabs flex min-w-0 gap-2",
        orientation === "vertical" ? "flex-row" : "flex-col",
        className,
      )}
      {...props}
    />
  );
};
