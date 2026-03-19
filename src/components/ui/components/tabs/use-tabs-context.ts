import * as React from "react";

export type TabsVariant = "default" | "line";

type TabsContextValue = {
  variant: TabsVariant;
  scrollable?: boolean;
};

export const TabsContext = React.createContext<TabsContextValue>({
  variant: "default",
  scrollable: false,
});

export const useTabsVariant = () => React.useContext(TabsContext).variant;
export const useTabsScrollable = () =>
  React.useContext(TabsContext).scrollable ?? false;
