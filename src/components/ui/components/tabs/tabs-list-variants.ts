import { cva, type VariantProps } from "class-variance-authority";

export const tabsListVariants = cva(
  "inline-flex w-fit items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        default:
          "h-9 rounded-lg bg-muted p-[3px] group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
        line: "h-9 gap-1 rounded-none border-b border-border bg-transparent p-0 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:border-b-0 group-data-[orientation=vertical]/tabs:border-r",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type TabsListVariantsProps = VariantProps<typeof tabsListVariants>;
