import * as React from "react";
import { TabsContent as TabsContentPrimitive } from "@/components/ui/primitives";
import { cn } from "@/utils/style";

export type TabsContentProps = React.ComponentProps<
  typeof TabsContentPrimitive
>;

export const TabsContent = ({ className, ...props }: TabsContentProps) => {
  return (
    <TabsContentPrimitive
      data-slot="tabs-content"
      className={cn(
        "flex-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
};
