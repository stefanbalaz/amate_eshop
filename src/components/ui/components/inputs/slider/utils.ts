import * as React from "react";
import type { SliderMark } from "./types";

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const toNumber = (value: number | undefined, fallback: number): number =>
  Number.isFinite(value) ? (value as number) : fallback;

const roundMarkValue = (value: number): number => {
  if (Number.isInteger(value)) return value;
  return Number(value.toFixed(3));
};

export const getBounds = (min?: number, max?: number): [number, number] => {
  const rawMin = toNumber(min, 0);
  const rawMax = toNumber(max, 100);
  return rawMin <= rawMax ? [rawMin, rawMax] : [rawMax, rawMin];
};

export const normalizeValues = (
  input: number | number[] | undefined,
  targetLength: number,
  min: number,
  max: number,
): number[] => {
  const normalizedInput = Array.isArray(input)
    ? input
    : typeof input === "number"
      ? [input]
      : targetLength > 1
        ? Array.from({ length: targetLength }, (_, index) => {
            const interval = (max - min) / (targetLength - 1);
            return min + interval * index;
          })
        : [min];

  const fallbackValue = normalizedInput[normalizedInput.length - 1] ?? max;
  const paddedInput =
    normalizedInput.length >= targetLength
      ? normalizedInput.slice(0, targetLength)
      : [
          ...normalizedInput,
          ...Array.from(
            { length: targetLength - normalizedInput.length },
            () => fallbackValue,
          ),
        ];

  const clamped = paddedInput.map((item) => clamp(item, min, max));
  if (targetLength === 1) return [clamped[0] ?? min];
  return [...clamped].sort((a, b) => a - b);
};

export const getActiveThumbIndex = (
  previous: number[],
  next: number[],
  fallback: number,
): number => {
  const changedIndex = next.findIndex(
    (value, index) => value !== previous[index],
  );
  return changedIndex === -1 ? fallback : changedIndex;
};

export const getDisplayValue = (
  value: number,
  index: number,
  formatter:
    | string
    | ((value: number, index: number) => React.ReactNode)
    | undefined,
): React.ReactNode => {
  if (typeof formatter === "function") return formatter(value, index);
  if (typeof formatter === "string") {
    return formatter.includes("{value}")
      ? formatter.replace("{value}", String(value))
      : `${value}${formatter}`;
  }
  return value;
};

export const resolveMarks = (
  marks: boolean | SliderMark[] | undefined,
  step: number | null | undefined,
  min: number,
  max: number,
  autoMarksLimit: number,
): SliderMark[] => {
  if (!marks) return [];

  if (Array.isArray(marks)) {
    return marks
      .filter((item) => Number.isFinite(item.value))
      .map((item) => ({
        ...item,
        value: clamp(item.value, min, max),
      }))
      .sort((a, b) => a.value - b.value);
  }

  const safeStep = typeof step === "number" && step > 0 ? step : 1;
  const totalSteps = Math.floor((max - min) / safeStep);

  if (totalSteps + 1 > autoMarksLimit) {
    return [
      { value: min, label: min },
      { value: max, label: max },
    ];
  }

  return Array.from({ length: totalSteps + 1 }, (_, index) => {
    const value = roundMarkValue(min + index * safeStep);
    const isBoundary = index === 0 || index === totalSteps;
    return {
      value,
      label: isBoundary ? value : undefined,
    };
  });
};
