import * as React from "react";

import { cn } from "@/utils/style/index";

function Input({
  className,
  error,
  type,
  ...props
}: React.ComponentProps<"input"> & { error?: boolean }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        /* -------------------------------------------------
         * Base layout
         * ------------------------------------------------- */
        "h-9 w-full min-w-0 rounded-md px-3 py-1 text-base md:text-sm",
        "shadow-xs outline-none transition-[color,box-shadow]",

        /* -------------------------------------------------
         * Colors & text
         * ------------------------------------------------- */
        "placeholder:text-muted-foreground",
        "selection:bg-primary selection:text-primary-foreground",
        "file:text-foreground",

        /* -------------------------------------------------
         * Background
         * ------------------------------------------------- */
        "bg-input/10 hover:bg-input/30",
        "dark:bg-input/30",

        /* -------------------------------------------------
         * Border
         * ------------------------------------------------- */
        "border border-input/70 hover:border-input",

        /* -------------------------------------------------
         * File input styling
         * ------------------------------------------------- */
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent",
        "file:text-sm file:font-medium",

        /* -------------------------------------------------
         * Disabled state
         * ------------------------------------------------- */
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        /* -------------------------------------------------
         * Focus state
         * ------------------------------------------------- */
        "focus-visible:border-input",
        "focus-visible:ring-input/50",
        "focus-visible:ring-[3px]",

        /* -------------------------------------------------
         * ARIA invalid (form validation)
         * ------------------------------------------------- */
        "aria-invalid:border-destructive",
        "aria-invalid:ring-destructive/20",
        "dark:aria-invalid:ring-destructive/40",

        /* -------------------------------------------------
         * Error state
         * ------------------------------------------------- */
        error && [
          "border-destructive/50",
          "bg-destructive/10",
          "hover:bg-destructive/15",
          "hover:border-destructive",
          "focus-visible:border-destructive",
          "focus-visible:ring-destructive/50",
          "focus-visible:ring-[3px]",
        ],

        className,
      )}
      {...props}
    />
  );
}

export { Input };
