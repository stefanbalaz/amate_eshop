import { useState, type FC, type ReactNode } from "react";
import { DrawerContext } from "./drawer-context";
import type { DrawerState } from "./drawer.types";

export type DrawerProviderProps = {
  children: ReactNode;
};

export const DrawerProvider: FC<DrawerProviderProps> = ({ children }) => {
  const [drawers, setDrawers] = useState<Record<string, DrawerState>>({});

  const openDrawer = ({
    drawerID,
    content,
  }: {
    drawerID: string;
    content?: ReactNode;
  }) => {
    setDrawers((prev) => ({
      ...prev,
      [drawerID]: { id: drawerID, isOpen: true, content },
    }));
  };

  const closeDrawer = ({ drawerID }: { drawerID: string }) => {
    setDrawers((prev) => {
      if (!prev[drawerID]) return prev;
      return {
        ...prev,
        [drawerID]: { ...prev[drawerID], isOpen: false },
      };
    });
  };

  const toggleDrawer = ({ drawerID }: { drawerID: string }) => {
    setDrawers((prev) => {
      const current = prev[drawerID];
      if (!current) return prev;
      return {
        ...prev,
        [drawerID]: { ...current, isOpen: !current.isOpen },
      };
    });
  };

  const isDrawerOpen = ({ drawerID }: { drawerID: string }) =>
    !!drawers[drawerID]?.isOpen;

  const getDrawerContent = ({ drawerID }: { drawerID: string }) =>
    drawers[drawerID]?.content;

  return (
    <DrawerContext.Provider
      value={{
        drawers,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        isDrawerOpen,
        getDrawerContent,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
