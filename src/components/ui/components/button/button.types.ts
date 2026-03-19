export const ButtonSize = {
  DEFAULT: "default",
  SM: "sm",
  LG: "lg",
} as const;

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];
