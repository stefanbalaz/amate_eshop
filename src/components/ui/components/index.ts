/**
 * Components Layer
 *
 * Enhanced UI components with behavior.
 * Built on top of primitives.
 *
 * Rules:
 * - Can import from: primitives, utils
 * - Cannot import from: features
 */

// Button
export { Button, ButtonSize } from "./button";
export type { ButtonProps } from "./button";

// Avatar
export { Avatar } from "./avatar";
export type { AvatarProps } from "./avatar";
export { Rating } from "./rating";
export type { RatingProps } from "./rating";
export { Badge } from "./badge";
export type { BadgeProps, BadgeSize } from "./badge";
export { Tooltip } from "./tooltip";
export type { TooltipProps } from "./tooltip";

// Inputs
export { AutocompleteField } from "./inputs/autocomplete-field";
export type {
  AutocompleteFieldProps,
  AutocompleteOption,
} from "./inputs/autocomplete-field";

export { CheckboxField } from "./inputs/checkbox-field";
export type { CheckboxFieldProps } from "./inputs/checkbox-field";

export { CountryField } from "./inputs/country-field";
export type {
  CountryFieldHandle,
  CountryFieldProps,
  CountryOption,
} from "./inputs/country-field";

export { PhoneField } from "./inputs/phone-field";
export type {
  PhoneFieldHandle,
  PhoneFieldLabelSize,
  PhoneFieldProps,
  PhonePrefixActionMeta,
} from "./inputs/phone-field";

export { Slider } from "./inputs/slider";
export type { SliderProps, SliderMark } from "./inputs/slider";

export { DatePickerField } from "./inputs/date-picker-field";
export type {
  DatePickerFieldProps,
  DatePickerFieldHandle,
  DatePickerMode,
} from "./inputs/date-picker-field";

export { InputContainer } from "./inputs/input-container";
export type { InputContainerProps } from "./inputs/input-container";

export { NumberField } from "./inputs/number-field";
export type { NumberFieldProps } from "./inputs/number-field";

export { PasswordField } from "./inputs/password-field";
export type { PasswordFieldProps } from "./inputs/password-field";

export { LocationSearchField } from "./inputs/location-search-field";
export type {
  LocationSearchFieldHandle,
  LocationSearchFieldProps,
  LocationSuggestion,
} from "./inputs/location-search-field";

export { SelectField } from "./inputs/select-field";
export type { SelectFieldProps, SelectOption } from "./inputs/select-field";

export { SwitchField } from "./inputs/switch-field";
export type { SwitchFieldProps } from "./inputs/switch-field";

export { TextField } from "./inputs/text-field";
export type { TextFieldProps } from "./inputs/text-field";

export { AvatarDropZone } from "./inputs/avatar-drop-zone";
export type {
  AvatarDropZoneProps,
  AvatarImage,
} from "./inputs/avatar-drop-zone";

// Upload attachments
export {
  UploadAttachments,
  UploadAttachmentsOverlay,
  DocumentIcon,
  useUploadAttachments,
} from "./upload-attachments";
export type {
  UploadAttachmentsProps,
  UploadAttachmentsOverlayProps,
  UploadAttachment,
  UploadAttachmentsFieldHandles,
  UseUploadAttachmentsOptions,
  DocumentIconProps,
} from "./upload-attachments";

// Feedback
export { AlertMessage } from "./feedback/alert-message";
export type { AlertMessageProps, AlertVariant } from "./feedback/alert-message";

export { DialogModal } from "./feedback/dialog-modal";
export type { DialogModalProps } from "./feedback/dialog-modal";

export { LoadingSpinner } from "./feedback/loading-spinner";
export type { LoadingSpinnerProps } from "./feedback/loading-spinner";

// Progress
export { ProgressBar, ProgressBarSize } from "./progress-bar";
export type { ProgressBarProps, ProgressBarType } from "./progress-bar";

// Tabs
export { Tabs, TabsList, Tab, TabsContent, tabsListVariants } from "./tabs";
export type {
  TabsProps,
  TabsListProps,
  TabProps,
  TabIconPosition,
  TabsContentProps,
} from "./tabs";

// Stepper
export { Stepper } from "./stepper";
export type { StepperProps, Step, StepProps } from "./stepper";
