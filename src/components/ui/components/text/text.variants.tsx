import { cva } from "class-variance-authority";

export const textVariants = cva("text-base", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      subtle: "text-gray-500",
      danger: "text-red-600",
      success: "text-green-600",
      warning: "text-yellow-600",
      info: "text-blue-600",
      hint: "text-gray-400",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
  },
});
