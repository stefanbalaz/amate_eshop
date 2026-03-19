import { Star } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/utils/style";

export type RatingProps = {
  reviewAverage: number;
  reviewsCount: number;
  href?: string;
  className?: string;
  max?: number;
  ariaLabel?: string;
  reviewsAriaLabel?: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const Rating = ({
  reviewAverage,
  reviewsCount,
  href,
  className,
  max = 5,
  ariaLabel,
  reviewsAriaLabel,
}: RatingProps) => {
  const { t, i18n } = useTranslation();

  const averageFormatter = React.useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );

  const countFormatter = React.useMemo(
    () => new Intl.NumberFormat(i18n.language),
    [i18n.language],
  );

  const safeMax = Math.max(1, Math.floor(max > 0 ? max : 5));
  const clampedAverage = clamp(reviewAverage, 0, safeMax);
  const safeReviewsCount = Math.max(0, reviewsCount);
  const formattedAverage = averageFormatter.format(clampedAverage);
  const formattedCount = countFormatter.format(safeReviewsCount);

  const resolvedAriaLabel =
    ariaLabel ??
    t("components.rating.ariaLabel", {
      value: formattedAverage,
      max: safeMax,
    });

  const resolvedReviewsAriaLabel =
    reviewsAriaLabel ??
    t("components.rating.reviewsAria", {
      count: safeReviewsCount,
    });

  return (
    <div className={cn("mb-1 ml-1 inline-flex items-start", className)}>
      <span className="mr-1 mt-px text-[13px] leading-none tabular-nums font-medium text-amber-700 dark:text-amber-400">
        {formattedAverage}
      </span>

      <div
        className="mt-px inline-flex items-center gap-0.5"
        role="img"
        aria-label={resolvedAriaLabel}
      >
        {Array.from({ length: safeMax }, (_, index) => {
          const fillPercent = clamp(clampedAverage - index, 0, 1) * 100;

          return (
            <span key={index} className="relative inline-flex h-3.5 w-3.5">
              <Star
                className="h-3.5 w-3.5 text-muted-foreground/45 dark:text-muted-foreground/60"
                aria-hidden="true"
              />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercent}%` }}
                aria-hidden="true"
              >
                <Star
                  className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400"
                  fill="currentColor"
                />
              </span>
            </span>
          );
        })}
      </div>

      {href ? (
        <a
          href={href}
          className="ml-1 rounded-sm text-[13px] leading-none tabular-nums text-foreground underline-offset-2 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:underline"
          aria-label={resolvedReviewsAriaLabel}
        >
          {formattedCount}
        </a>
      ) : (
        <span
          className="ml-1 text-[13px] leading-none tabular-nums text-foreground"
          aria-label={resolvedReviewsAriaLabel}
        >
          {formattedCount}
        </span>
      )}
    </div>
  );
};
