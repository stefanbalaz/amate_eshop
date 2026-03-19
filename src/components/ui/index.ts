/**
 * Main public entry point for the UI design system.
 * See README in this folder for layer details and guidelines.
 */

/**
 * UI Layer - Design System Boundary
 *
 * This is the main entry point for the UI design system.
 *
 * Architecture:
 * - primitives: Thin re-exports of shadcn components
 * - components: Enhanced components with behavior
 * - patterns: Composed multi-component flows
 * - hooks: UI-specific React hooks
 *
 * Note: Import from specific layers to avoid naming conflicts.
 * Example:
 *   import { Button } from "@/components/ui/primitives" // shadcn Button
 *   import { Button } from "@/ui" // Enhanced Button with loading
 */

// Re-export components (preferred layer for consumers)
export * from "./components";
export * from "./form-components";
export * from "../../hooks";

// Primitives should be imported directly from @/ui/primitives
// to avoid naming conflicts with enhanced components
// export * from "./primitives";

// Patterns will be exported when created
// export * from "./patterns";
