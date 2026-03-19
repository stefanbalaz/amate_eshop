import { Badge as BadgePrimitive } from "@/components/ui/primitives";
import { cn } from "@/utils/style";

export type BadgeSize = "xsmall" | "small" | "medium" | "big";
export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

type BadgeSizeStyle = {
  fontSize: number;
  lineHeight?: string;
  paddingX: number;
  paddingY: number;
};

const BADGE_SIZE_STYLES: Record<BadgeSize, BadgeSizeStyle> = {
  xsmall: { fontSize: 11, lineHeight: "14px", paddingX: 10, paddingY: 2 },
  small: { fontSize: 12, lineHeight: "20px", paddingX: 10, paddingY: 3 },
  medium: { fontSize: 13, lineHeight: "25px", paddingX: 15, paddingY: 5 },
  big: { fontSize: 16, lineHeight: "22px", paddingX: 17, paddingY: 10 },
};

type BadgePrimitiveProps = React.ComponentProps<typeof BadgePrimitive>;

export type BadgeProps = Omit<BadgePrimitiveProps, "variant"> & {
  variant?: BadgeVariant;
  tagSize?: BadgeSize;
  paddingVertical?: string;
  paddingHorizontal?: string;
};

const CUSTOM_VARIANT_CLASSES: Partial<Record<BadgeVariant, string>> = {
  ghost:
    "border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
  link: "cursor-pointer border-transparent bg-transparent text-primary underline-offset-4 hover:underline hover:bg-transparent hover:text-primary [a&]:hover:underline [a&]:hover:bg-transparent [a&]:hover:text-primary",
};

export const Badge = ({
  className,
  style,
  variant,
  tagSize = "medium",
  paddingVertical,
  paddingHorizontal,
  ...props
}: BadgeProps) => {
  const sizeStyle = BADGE_SIZE_STYLES[tagSize];
  const primitiveVariant =
    variant === "ghost" || variant === "link" ? "outline" : variant;

  const badgeStyle: React.CSSProperties = {
    fontSize: `${sizeStyle.fontSize}px`,
    lineHeight: sizeStyle.lineHeight,
    paddingLeft: paddingHorizontal ?? `${sizeStyle.paddingX}px`,
    paddingRight: paddingHorizontal ?? `${sizeStyle.paddingX}px`,
    paddingTop: paddingVertical ?? `${sizeStyle.paddingY}px`,
    paddingBottom: paddingVertical ?? `${sizeStyle.paddingY}px`,
    ...style,
  };

  return (
    <BadgePrimitive
      variant={primitiveVariant}
      className={cn(
        variant ? CUSTOM_VARIANT_CLASSES[variant] : undefined,
        className,
      )}
      style={badgeStyle}
      {...props}
    />
  );
};
