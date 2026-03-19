"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TabsList as TabsListPrimitive } from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { TabsVariantProvider, type TabsVariant } from "./tabs-context";
import { tabsListVariants } from "./tabs-list-variants";

const SCROLL_STEP = 120;

export type TabsListProps = React.ComponentProps<typeof TabsListPrimitive> &
  import("./tabs-list-variants").TabsListVariantsProps & {
    scrollable?: boolean;
  };

function useScrollArrows(
  scrollRef: React.RefObject<HTMLDivElement | null>,
  scrollable: boolean,
) {
  const [isLeftArrowVisible, setIsLeftArrowVisible] = React.useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = React.useState(false);

  const updateArrows = React.useCallback(() => {
    const scrollElement = scrollRef.current;
    if (
      !scrollElement ||
      !scrollable ||
      scrollElement.scrollWidth <= scrollElement.clientWidth
    ) {
      setIsLeftArrowVisible(false);
      setIsRightArrowVisible(false);
      return;
    }
    const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
    setIsLeftArrowVisible(scrollElement.scrollLeft > 0);
    setIsRightArrowVisible(scrollElement.scrollLeft < maxScrollLeft - 1);
  }, [scrollRef, scrollable]);

  React.useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollable || !scrollElement) return;

    updateArrows();
    scrollElement.addEventListener("scroll", updateArrows);

    const resizeObserver = new ResizeObserver(updateArrows);
    resizeObserver.observe(scrollElement);

    return () => {
      scrollElement.removeEventListener("scroll", updateArrows);
      resizeObserver.disconnect();
    };
  }, [scrollRef, scrollable, updateArrows]);

  return { isLeftArrowVisible, isRightArrowVisible };
}

export const TabsList = ({
  className,
  variant = "default",
  scrollable = false,
  children,
  ...props
}: TabsListProps) => {
  const { t } = useTranslation();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { isLeftArrowVisible, isRightArrowVisible } = useScrollArrows(
    scrollRef,
    scrollable,
  );

  React.useEffect(() => {
    if (!scrollable || !scrollRef.current) return;
    const scrollElement = scrollRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (scrollElement.scrollWidth <= scrollElement.clientWidth) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      const maxScrollLeft =
        scrollElement.scrollWidth - scrollElement.clientWidth;
      const isAtLeft = scrollElement.scrollLeft <= 0;
      const isAtRight = scrollElement.scrollLeft >= maxScrollLeft;

      const wouldScrollLeft = delta < 0;
      const wouldScrollRight = delta > 0;
      const canScrollLeft = !isAtLeft;
      const canScrollRight = !isAtRight;

      const shouldConsumeScroll =
        (wouldScrollLeft && canScrollLeft) ||
        (wouldScrollRight && canScrollRight);

      if (shouldConsumeScroll && delta !== 0) {
        event.preventDefault();
        scrollElement.scrollLeft += delta;
      }
    };

    scrollElement.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollElement.removeEventListener("wheel", handleWheel);
  }, [scrollable]);

  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const scrollBy = (direction: "left" | "right") => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    const step = direction === "left" ? -SCROLL_STEP : SCROLL_STEP;
    scrollElement.scrollBy({
      left: step,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const listContent = (
    <TabsListPrimitive
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        "group/tabs-list",
        tabsListVariants({ variant }),
        !scrollable && className,
      )}
      {...props}
    >
      {children}
    </TabsListPrimitive>
  );

  if (scrollable) {
    return (
      <TabsVariantProvider
        variant={variant as TabsVariant}
        scrollable={scrollable}
      >
        <div className={cn("relative overflow-hidden", className)}>
          {isLeftArrowVisible ? (
            <button
              type="button"
              aria-label={t("components.tabs.scrollLeft")}
              className="absolute top-0 left-0 z-10 flex h-full w-10 shrink-0 touch-manipulation items-center justify-start pl-1.5 bg-linear-to-r from-background to-transparent text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
              onClick={() => scrollBy("left")}
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
          ) : null}
          <div
            ref={scrollRef}
            role="presentation"
            className={cn(
              "min-w-0 w-full max-w-full overflow-x-auto overflow-y-hidden",
              "[scrollbar-width:none] [-ms-overflow-style:none]",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            {listContent}
          </div>
          {isRightArrowVisible ? (
            <button
              type="button"
              aria-label={t("components.tabs.scrollRight")}
              className="absolute top-0 right-0 z-10 flex h-full w-10 shrink-0 touch-manipulation items-center justify-end pr-1.5 bg-linear-to-l from-background to-transparent text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
              onClick={() => scrollBy("right")}
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          ) : null}
        </div>
      </TabsVariantProvider>
    );
  }

  return (
    <TabsVariantProvider
      variant={variant as TabsVariant}
      scrollable={scrollable}
    >
      {listContent}
    </TabsVariantProvider>
  );
};
