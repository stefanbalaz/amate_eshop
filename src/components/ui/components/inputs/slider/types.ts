import type { Slider as SliderPrimitive } from "@/components/ui/primitives";

export type SliderMark = {
  value: number;
  label?: React.ReactNode;
};

export type SliderProps = Omit<
  React.ComponentProps<typeof SliderPrimitive>,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "onValueCommit"
  | "onChange"
  | "min"
  | "max"
  | "step"
> & {
  /** Root wrapper class name */
  classNameRoot?: string;
  /** Field label */
  label?: string;
  /** Field description/help text */
  description?: string;
  /** Error message to display */
  error?: string;
  /** Success state */
  success?: boolean;
  /** Show required indicator */
  required?: boolean;
  /** Current slider value. Number for single thumb, array for range */
  value?: number | number[];
  /** Initial slider value. Number for single thumb, array for range */
  defaultValue?: number | number[];
  /** MUI-compatible onChange signature */
  onChange?: (
    event: Event | React.SyntheticEvent | undefined,
    value: number | number[],
    activeThumb: number,
  ) => void;
  /** Value label formatter */
  valueLabelFormat?:
    | string
    | ((value: number, index: number) => React.ReactNode);
  /** Accessible value text formatter */
  getAriaValueText?: (value: number, index: number) => string;
  /** Slider step */
  step?: number | null;
  /** Value label visibility mode */
  valueLabelDisplay?: "on" | "off" | "auto";
  /** Marks mode. true = auto marks from step, array = custom marks */
  marks?: boolean | SliderMark[];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Accessible label when no visible label is provided */
  ariaLabel?: string;
  /** Form field name for native form submission */
  name?: string;
};
