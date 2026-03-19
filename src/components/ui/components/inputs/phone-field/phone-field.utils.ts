import type * as React from "react";
import type { InputStatus, PhoneFieldLabelSize } from "./phone-field.types";

const PHONE_INPUT_PATTERN = /^[ 0-9x#]+$/i;

export const LABEL_SIZE_CLASSNAMES: Record<PhoneFieldLabelSize, string> = {
  xsmall: "text-[11px] leading-5",
  small: "text-[13px] leading-6",
  medium: "text-[15px] leading-7",
  large: "text-[17px] leading-8",
};

export const canAcceptPhoneInput = (value: string): boolean => {
  return (value === "" || PHONE_INPUT_PATTERN.test(value)) && !value.includes("  ");
};

export const getInputStatus = (
  value: string,
  validate?: (value: string) => boolean,
): InputStatus => {
  if (!validate) return "default";
  if (value.trim() === "") return "default";
  return validate(value) ? "success" : "error";
};

export const resolveScrollBehavior = () => {
  if (typeof window === "undefined") return "smooth";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
};

export const normalizeMaxWidth = (
  value?: string,
): React.CSSProperties["maxWidth"] => {
  if (!value) return undefined;

  const trimmedValue = value.trim();
  if (trimmedValue.length === 0) return undefined;

  if (/^\d+(\.\d+)?$/.test(trimmedValue)) {
    return `${trimmedValue}px`;
  }

  return trimmedValue;
};
