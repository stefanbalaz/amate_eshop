export const ProgressBarSize = {
  DEFAULT: "default",
  SM: "sm",
  LG: "lg",
} as const;

export type ProgressBarSize =
  (typeof ProgressBarSize)[keyof typeof ProgressBarSize];
