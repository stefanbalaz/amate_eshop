export const ButtonSize = {
  DEFAULT: "default",
  SM: "sm",
  LG: "lg",
  XL: "xl",
} as const

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize]
