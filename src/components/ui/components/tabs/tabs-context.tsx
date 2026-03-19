"use client";

import * as React from "react";
import { TabsContext, type TabsVariant } from "./use-tabs-context";

export type { TabsVariant } from "./use-tabs-context";

export const TabsVariantProvider = ({
  variant,
  scrollable = false,
  children,
}: {
  variant: TabsVariant;
  scrollable?: boolean;
  children: React.ReactNode;
}) => (
  <TabsContext.Provider value={{ variant, scrollable }}>
    {children}
  </TabsContext.Provider>
);
