"use client";

import { cn } from "@/utils/style";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { textVariants } from "./text.variants";

// ---------- Types ----------
type AsProp<T extends React.ElementType> = {
  as?: T;
};

type TextOwnProps = VariantProps<typeof textVariants> & {
  className?: string;
  children?: React.ReactNode;
};

type TextProps<T extends React.ElementType> = React.PropsWithChildren<
  TextOwnProps & AsProp<T>
> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TextOwnProps | "as">;

// ---------- Component ----------
const TextComponent = <T extends React.ElementType = "p">(
  { as, className, variant, size, weight, ...props }: TextProps<T>,
  ref: React.Ref<HTMLParagraphElement>,
) => {
  const Component = as || "p";
  return (
    <Component
      ref={ref}
      className={cn(textVariants({ variant, size, weight }), className)}
      {...props}
    />
  );
};

const TextForwardRefBase = React.forwardRef(TextComponent);
TextForwardRefBase.displayName = "Text";

const TextForwardRef = TextForwardRefBase as <
  T extends React.ElementType = "p",
>(
  props: TextProps<T> & { ref?: React.Ref<unknown> },
) => React.ReactElement | null;

export { TextForwardRef as Text };
export default TextForwardRef;
