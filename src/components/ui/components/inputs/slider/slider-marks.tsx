import type { SliderMark } from "./types";

export interface SliderMarksProps {
  marks: SliderMark[];
  min: number;
  max: number;
  hasMarkLabels: boolean;
}

export function SliderMarks({
  marks,
  min,
  max,
  hasMarkLabels,
}: SliderMarksProps): React.JSX.Element {
  const trackRange = max - min;

  return (
    <div
      className="relative mt-1 w-full"
      aria-hidden={!hasMarkLabels}
    >
      {marks.map((mark, index) => {
        const percentage =
          trackRange === 0 ? 0 : ((mark.value - min) / trackRange) * 100;
        const isFirst = index === 0;
        const isLast = index === marks.length - 1;

        return (
          <div
            key={`${mark.value}-${index}`}
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1"
            style={
              isFirst
                ? { left: "2px" }
                : isLast
                  ? { left: "calc(100% - 2px)" }
                  : { left: `calc(${percentage}% + 2px)` }
            }
          >
            <span className="bg-muted-foreground/60 block h-2 w-px" />
            {mark.label ? (
              <span className="text-foreground/80 bg-background/90 max-w-20 rounded px-1 text-center text-xs leading-tight font-medium break-words">
                {mark.label}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
