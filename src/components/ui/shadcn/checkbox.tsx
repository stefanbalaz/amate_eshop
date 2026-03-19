"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/utils/style/index";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        /* -------------------------------------------------
         * Base layout
         * ------------------------------------------------- */
        "peer size-4 shrink-0 rounded border shadow-xs outline-none",
        "transition-[box-shadow,border-color,background-color]",
        "cursor-pointer",

        /* -------------------------------------------------
         * Colors & text
         * ------------------------------------------------- */
        "data-[state=checked]:text-white",

        /* -------------------------------------------------
         * Background
         * ------------------------------------------------- */
        "bg-input/10 hover:bg-input/30",
        "dark:bg-input/30",

        /* -------------------------------------------------
         * Border
         * ------------------------------------------------- */
        "border-input/70 hover:border-input",

        /* -------------------------------------------------
         * Checked state
         * ------------------------------------------------- */
        "data-[state=checked]:border-input",
        "data-[state=checked]:bg-input/80",
        "dark:data-[state=checked]:bg-input/80",
        "data-[state=checked]:hover:bg-input",

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
         * Disabled state
         * ------------------------------------------------- */
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-white transition-none"
      >
        <CheckIcon className="size-3.5 text-white" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
