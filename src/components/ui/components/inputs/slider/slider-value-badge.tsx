import * as React from "react";
import { cn } from "@/utils/style";
import { BADGE_SUCCESS } from "./constants";

export interface SliderValueBadgeProps {
  valueLabels: React.ReactNode[];
  currentValues: number[];
  isVisible: boolean;
  disabled?: boolean;
  hasError?: boolean;
  isSuccess?: boolean;
}

export function SliderValueBadge({
  valueLabels,
  currentValues,
  isVisible,
  disabled,
  hasError,
  isSuccess,
}: SliderValueBadgeProps): React.JSX.Element {
  return (
    <span
      aria-hidden={!isVisible}
      className={cn(
        "bg-muted text-foreground inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs tabular-nums font-medium",
        !isVisible && "invisible",
        disabled && "opacity-60",
        hasError && "border-destructive/40 text-destructive",
        isSuccess && BADGE_SUCCESS,
      )}
    >
      {valueLabels.map((item, index) => (
        <React.Fragment key={`${currentValues[index]}-${index}`}>
          {index > 0 ? (
            <span className="text-muted-foreground">-</span>
          ) : null}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </span>
  );
}
