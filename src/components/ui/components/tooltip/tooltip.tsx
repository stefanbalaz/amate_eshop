import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils/style";

type TooltipContentOptions = Omit<
  React.ComponentProps<typeof TooltipPrimitive.Content>,
  "children" | "className"
>;

export interface TooltipProps
  extends Omit<React.ComponentProps<typeof TooltipPrimitive.Root>, "children"> {
  /** Tooltip body content */
  title: NonNullable<React.ReactNode>;
  /** Trigger node for the tooltip */
  children: React.ReactElement;
  /** Additional props passed to TooltipContent */
  contentProps?: TooltipContentOptions;
  /** Additional class names for tooltip content */
  contentClassName?: string;
  /** Delay before tooltip opens (overrides Provider default) */
  delayDuration?: number;
  /** Disable tooltip interaction while preserving the trigger node */
  disabled?: boolean;
  /** Ref forwarded to TooltipContent */
  ref?: React.Ref<React.ComponentRef<typeof TooltipPrimitive.Content>>;
}

export const Tooltip = ({
  title,
  children,
  contentProps,
  contentClassName,
  delayDuration,
  disabled = false,
  ref,
  ...rootProps
}: TooltipProps): React.JSX.Element => {
  const trigger = React.Children.only(children);
  const { sideOffset = 0, ...contentRestProps } = contentProps ?? {};

  if (disabled) {
    return trigger;
  }

  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      delayDuration={delayDuration}
      {...rootProps}
    >
      <TooltipPrimitive.Trigger data-slot="tooltip-trigger" asChild>
        {trigger}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          data-slot="tooltip-content"
          sideOffset={sideOffset}
          className={cn(
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-1.5 text-xs bg-foreground text-background z-50 w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) motion-reduce:animate-none motion-reduce:transition-none",
            contentClassName,
          )}
          {...contentRestProps}
        >
          {title}
          <TooltipPrimitive.Arrow className="size-2.5 rotate-45 rounded-[2px] bg-foreground fill-foreground z-50 translate-y-[calc(-50%-2px)]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};
