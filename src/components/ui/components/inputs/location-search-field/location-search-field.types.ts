import * as React from "react";

export type LocationSearchFieldStatus = "success" | "error" | "default";

export type LocationSearchFieldHandle = {
  highlight(scroll?: boolean): void;
};

export type LocationSuggestion = {
  description: string;
  placeId: string;
  id?: string;
};

export interface LocationSearchFieldProps {
  handleAddressSelect?: (address: string, placeId: string) => void;
  handleAddressChange: (value: string) => void;
  autocompleteAddress?: string;
  name?: string;
  autoComplete?: string;
  ariaLabel?: string;
  placeholder?: string;
  inputRootClass?: string;
  inputClass?: string;
  validate?: (value: string) => boolean;
  required?: boolean;
  autoFocus?: boolean;
  info?: boolean;
  infoContent?: React.ReactNode;
  infoTitle?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  id?: string;
  showRequiredSymbol?: boolean;
  nodeBefore?: React.ReactNode;
  nodeAfter?: React.ReactNode;
  suggestions?: LocationSuggestion[];
  loading?: boolean;
  loadingText?: string;
  emptyText?: string;
  className?: string;
}
