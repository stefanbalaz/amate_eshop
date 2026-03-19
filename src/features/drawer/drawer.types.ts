import type { ReactNode } from "react";

export type DrawerState = {
  id: string;
  isOpen: boolean;
  content?: ReactNode;
};

export type DrawerContextValue = {
  drawers: Record<string, DrawerState>;
  openDrawer: (args: { drawerID: string; content?: ReactNode }) => void;
  closeDrawer: (args: { drawerID: string }) => void;
  toggleDrawer: (args: { drawerID: string }) => void;
  isDrawerOpen: (args: { drawerID: string }) => boolean;
  getDrawerContent: (args: { drawerID: string }) => ReactNode | undefined;
};
