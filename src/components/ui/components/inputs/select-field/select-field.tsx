"use client";

import { useTheme } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { CheckIcon, ChevronDownIcon, Plus, XIcon } from "lucide-react";
import React from "react";
import type {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueProps,
  OptionProps,
  SingleValueProps,
  StylesConfig,
} from "react-select";
import ReactSelect, { components, type Props } from "react-select";

import { Text } from "../../text";

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  /** Optional class for the option label (e.g. text-primary for "add new" options) */
  labelClassName?: string;
  /** When true, option row gets light green background (e.g. "add new" options) */
  isAddOption?: boolean;
  type?: string; // Additional field to differentiate option types if needed
};

export type Option = {
  label: string;
  value: string;
  isAddTask?: boolean;
};

export interface CustomSelectProps extends Omit<
  Props<SelectOption, boolean, GroupBase<SelectOption>>,
  "classNames"
> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
  inputId?: string;
  ariaLabel?: string;
  showErrorMessage?: boolean;
}

const CustomOption = (props: OptionProps<SelectOption, boolean>) => (
  <components.Option {...props}>
    <div className="flex items-center gap-2">
      {props.isSelected && !props.data.isAddOption && (
        <CheckIcon size={16} className="text-input flex-shrink-0" />
      )}
      {props.data.isAddOption && (
        <Plus className="h-4 w-4 flex-shrink-0 text-primary" />
      )}
      {props.data.icon && !props.data.isAddOption && (
        <span className="flex-shrink-0">{props.data.icon}</span>
      )}
      {props.data.labelClassName ? (
        <span className={props.data.labelClassName}>
          <Text size="sm" as="span">
            {props.label}
          </Text>
        </span>
      ) : (
        <Text size="sm">{props.label}</Text>
      )}
    </div>
  </components.Option>
);

const CustomSingleValue = (props: SingleValueProps<SelectOption, boolean>) => (
  <components.SingleValue {...props}>
    <div className="flex items-center gap-2">
      {props.data.icon && (
        <span className="flex-shrink-0">{props.data.icon}</span>
      )}
      {props.data.labelClassName ? (
        <span className={props.data.labelClassName}>
          <Text size="sm" as="span">
            {props.data.label}
          </Text>
        </span>
      ) : (
        <Text size="sm">{props.data.label}</Text>
      )}
    </div>
  </components.SingleValue>
);

const CustomMultiValue = (props: MultiValueProps<SelectOption, boolean>) => (
  <components.MultiValue {...props}>
    <div className="flex items-center gap-1">
      {props.data.icon && (
        <span className="flex-shrink-0">{props.data.icon}</span>
      )}
      <Text size="sm">{props.data.label}</Text>
    </div>
  </components.MultiValue>
);

const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption, boolean>,
) => (
  <components.DropdownIndicator {...props}>
    <ChevronDownIcon
      size={18}
      className={`transition-transform duration-200 ${props.selectProps.menuIsOpen ? "rotate-180" : ""}`}
    />
  </components.DropdownIndicator>
);

const ClearIndicator = (props: ClearIndicatorProps<SelectOption, boolean>) => (
  <components.ClearIndicator {...props}>
    <XIcon size={16} />
  </components.ClearIndicator>
);

const createCustomStyles = (
  theme: Theme,
  error?: string,
  fullWidth?: boolean,
): StylesConfig<SelectOption, boolean> => ({
  control: (base, state) => ({
    /* -------------------------------------------------
     * Base layout
     * ------------------------------------------------- */
    ...base,
    minHeight: "2.5rem",
    width: fullWidth ? "100%" : "auto",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    borderRadius: "var(--radius-md)",
    transition:
      "color 150ms ease, background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",

    /* -------------------------------------------------
     * Colors & text
     * ------------------------------------------------- */
    color: theme.palette.text.primary,

    /* -------------------------------------------------
     * Background
     * ------------------------------------------------- */
    backgroundColor: error
      ? "color-mix(in oklab, var(--destructive) 10%, transparent)"
      : "color-mix(in oklab, var(--input) 10%, transparent)",

    /* -------------------------------------------------
     * Border
     * ------------------------------------------------- */
    borderColor: error
      ? "color-mix(in oklab, var(--destructive) 50%, transparent)"
      : state.isFocused
        ? "var(--input)"
        : "color-mix(in oklab, var(--input) 70%, transparent)",

    /* -------------------------------------------------
     * Focus state
     * ------------------------------------------------- */
    boxShadow: state.isFocused
      ? error
        ? "0 0 0 3px color-mix(in oklab, var(--destructive) 50%, transparent)"
        : "0 0 0 3px color-mix(in oklab, var(--input) 50%, transparent)"
      : "var(--shadow-xs)",

    /* -------------------------------------------------
     * Disabled state
     * ------------------------------------------------- */
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    opacity: state.isDisabled ? 0.5 : 1,

    /* -------------------------------------------------
     * Hover state
     * ------------------------------------------------- */
    "&:hover": {
      backgroundColor: state.isDisabled
        ? error
          ? "color-mix(in oklab, var(--destructive) 10%, transparent)"
          : "color-mix(in oklab, var(--input) 10%, transparent)"
        : error
          ? "color-mix(in oklab, var(--destructive) 15%, transparent)"
          : "color-mix(in oklab, var(--input) 30%, transparent)",
      borderColor: error
        ? "var(--destructive)"
        : state.isDisabled
          ? "color-mix(in oklab, var(--input) 70%, transparent)"
          : "var(--input)",
    },
  }),

  menu: (base) => ({
    ...base,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    zIndex: 10,
  }),

  option: (base, state) => {
    const isAddOption = (state.data as SelectOption)?.isAddOption;
    return {
      ...base,
      backgroundColor: isAddOption
        ? alpha(theme.palette.primary.main, 0.1)
        : state.isSelected
          ? "color-mix(in oklab, var(--input) 25%, transparent)"
          : state.isFocused
            ? "color-mix(in oklab, var(--input) 15%, transparent)"
            : theme.palette.background.paper,
      color: isAddOption
        ? theme.palette.primary.main
        : state.isDisabled
          ? theme.palette.text.disabled
          : theme.palette.text.primary,
      padding: "8px 12px",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      opacity: state.isDisabled ? 0.6 : 1,
      ...(isAddOption
        ? {
            borderTop: `1px solid ${theme.palette.divider}`,
            marginTop: 4,
            paddingTop: 8,
          }
        : {}),
      "&:active": {
        backgroundColor: isAddOption
          ? alpha(theme.palette.primary.main, 0.15)
          : state.isDisabled
            ? theme.palette.background.paper
            : "color-mix(in oklab, var(--input) 35%, transparent)",
      },
    };
  },

  singleValue: (base) => ({
    ...base,
    color: theme.palette.text.primary,
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: "color-mix(in oklab, var(--input) 25%, transparent)",
    borderRadius: "0.25rem",
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: theme.palette.primary.dark,
    fontSize: "0.875rem",
  }),

  multiValueRemove: (base) => ({
    ...base,
    color: theme.palette.primary.dark,
    ":hover": {
      backgroundColor: "color-mix(in oklab, var(--input) 35%, transparent)",
      color: theme.palette.primary.main,
    },
  }),

  indicatorSeparator: () => ({ display: "none" }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "0 8px",
    color: theme.palette.text.secondary,
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),

  clearIndicator: (base) => ({
    ...base,
    padding: "0 8px",
    color: theme.palette.text.secondary,
    ":hover": {
      color: theme.palette.error.main,
    },
  }),

  placeholder: (base) => ({
    ...base,
    color: theme.palette.text.disabled,
    fontStyle: "normal",
    fontSize: "0.875rem",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "2px 8px",
  }),
});

const StopPropagationWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div
    onMouseDown={(e) => e.stopPropagation()}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
);

const CustomSelect = ({
  // label,
  error,
  fullWidth = false,
  wrapperClassName = "",
  inputId,
  ariaLabel,
  // showErrorMessage = true,
  ...props
}: CustomSelectProps) => {
  const theme = useTheme();
  const styles = createCustomStyles(theme, error, fullWidth);

  return (
    <div
      className={`${fullWidth ? "w-full" : "w-auto"} ${wrapperClassName} ${props.isDisabled ? "cursor-not-allowed" : ""}`}
    >
      <StopPropagationWrapper>
        <ReactSelect
          {...props}
          inputId={inputId}
          instanceId={inputId}
          menuPortalTarget={document.body}
          components={{
            Option: CustomOption,
            SingleValue: CustomSingleValue,
            MultiValue: CustomMultiValue,
            DropdownIndicator,
            ClearIndicator,
            ...props.components,
          }}
          noOptionsMessage={() => "No options available"}
          styles={{
            ...styles,
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNamePrefix="react-select"
          aria-label={ariaLabel}
        />
      </StopPropagationWrapper>
    </div>
  );
};

export { CustomSelect };
