import * as React from "react"
import { Progress } from "@/components/ui/shadcn/progress"
import { Field, FieldLabel } from "@/components/ui/shadcn/field"
import { cn } from "@/utils/style"

import { ProgressBarSize } from "./types"

export { ProgressBarSize } from "./types"

export type ProgressBarType = "linear" | "circular"

export type ProgressBarProps = {
  progressValue: number
  itemsCurrent: number
  itemsTotal: number
  type?: ProgressBarType
  label?: string
  size?: ProgressBarSize
  className?: string
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const SIZE_CONFIG = {
  [ProgressBarSize.SM]: {
    circularPx: 32,
    strokeWidthPx: 3,
    linearBarWidthClassName: "w-32",
  },
  [ProgressBarSize.DEFAULT]: {
    circularPx: 44,
    strokeWidthPx: 4,
    linearBarWidthClassName: "w-40",
  },
  [ProgressBarSize.LG]: {
    circularPx: 64,
    strokeWidthPx: 5,
    linearBarWidthClassName: "w-56",
  },
} as const

const formatItemsCount = (current: number, total: number) =>
  total > 0 ? `${current}/${total}` : "—"

export const ProgressBar = ({
  progressValue,
  itemsCurrent,
  itemsTotal,
  type = "linear",
  label,
  size = ProgressBarSize.DEFAULT,
  className,
}: ProgressBarProps) => {
  const progress = clamp(progressValue, 0, 100)
  const sizeConfig = SIZE_CONFIG[size]
  const labelId = React.useId()
  const hasLabel = typeof label === "string" && label.length > 0
  const itemsCount = formatItemsCount(itemsCurrent, itemsTotal)

  if (type === "linear") {
    if (hasLabel) {
      return (
        <Field className={cn("w-72 max-w-full gap-2", className)}>
          <div className="flex items-center justify-between gap-4">
            <FieldLabel
              id={labelId}
              className="text-sm font-medium text-foreground"
            >
              {label}
              <span className="text-xs text-muted-foreground tabular-nums">
                {itemsCount}
              </span>
            </FieldLabel>
            <div className="text-sm font-medium text-foreground tabular-nums">
              {Math.round(progress)}%
            </div>
          </div>
          <Progress
            value={progress}
            className="w-full"
            aria-labelledby={labelId}
          />
        </Field>
      )
    }

    return (
      <div className={cn("inline-flex items-center gap-5", className)}>
        <div
          className="text-sm text-muted-foreground tabular-nums"
          aria-hidden="true"
        >
          {itemsCount}
        </div>

        <div className="flex items-center gap-3">
          <Progress
            value={progress}
            className={sizeConfig.linearBarWidthClassName}
            aria-label="Progress"
          />
          <span className="text-xs text-muted-foreground tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    )
  }

  const radius = (sizeConfig.circularPx - sizeConfig.strokeWidthPx) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress / 100)

  return (
    <div className={cn("grid gap-2", className)}>
      {hasLabel ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div id={labelId} className="text-sm font-medium text-foreground">
              {label}
            </div>
            <div className="text-xs text-muted-foreground tabular-nums">
              {itemsCount}
            </div>
          </div>
          <div className="text-sm font-medium text-foreground tabular-nums">
            {Math.round(progress)}%
          </div>
        </div>
      ) : null}

      <div
        className="inline-flex items-center justify-center gap-5"
        role="progressbar"
        aria-labelledby={hasLabel ? labelId : undefined}
        aria-label={hasLabel ? undefined : "Progress"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-valuetext={`${Math.round(progress)}%`}
      >
        <div className="text-sm text-muted-foreground tabular-nums">
          {itemsCount}
        </div>

        <div
          className="relative grid place-items-center"
          style={{
            width: sizeConfig.circularPx,
            height: sizeConfig.circularPx,
          }}
        >
          <svg
            width={sizeConfig.circularPx}
            height={sizeConfig.circularPx}
            viewBox={`0 0 ${sizeConfig.circularPx} ${sizeConfig.circularPx}`}
            className="block"
          >
            <circle
              cx={sizeConfig.circularPx / 2}
              cy={sizeConfig.circularPx / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={sizeConfig.strokeWidthPx}
              className="text-muted-foreground/20"
            />
            <circle
              cx={sizeConfig.circularPx / 2}
              cy={sizeConfig.circularPx / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={sizeConfig.strokeWidthPx}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              className="text-primary"
              transform={`rotate(-90 ${sizeConfig.circularPx / 2} ${sizeConfig.circularPx / 2})`}
            />
          </svg>

          <div className="absolute inset-0 grid place-items-center">
            <span className="text-xs text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
