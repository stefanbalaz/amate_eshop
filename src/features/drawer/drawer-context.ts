import { createContext } from "react";
import type { DrawerContextValue } from "./drawer.types";

export const DrawerContext = createContext<DrawerContextValue | null>(null);
