import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePickerField } from "./date-picker-field";

const meta: Meta<typeof DatePickerField> = {
  title: "Components/Inputs/DatePickerField",
  component: DatePickerField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["date", "month", "year"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    clearable: {
      control: { type: "boolean" },
    },
    success: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.label")}
          placeholder={t("components.datePicker.placeholder")}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.birthDate")}
          placeholder={t("components.datePicker.placeholder")}
          description={t("components.datePicker.birthDateDescription")}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.startDate")}
          placeholder={t("components.datePicker.placeholder")}
          required
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.startDate")}
          placeholder={t("components.datePicker.placeholder")}
          error={t("components.datePicker.startDateError")}
        />
      </div>
    );
  },
};

export const WithSuccess: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.deadline")}
          placeholder={t("components.datePicker.placeholder")}
          value={new Date()}
          success
        />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.label")}
          placeholder={t("components.datePicker.placeholder")}
          value={new Date()}
          loading
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.label")}
          placeholder={t("components.datePicker.placeholder")}
          value={new Date()}
          disabled
        />
      </div>
    );
  },
};

export const Clearable: Story = {
  render: () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<Date | null>(new Date());
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.eventDate")}
          placeholder={t("components.datePicker.placeholder")}
          value={value}
          onChange={setValue}
          clearable
        />
      </div>
    );
  },
};

export const WithMinMaxDate: Story = {
  render: () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.eventDate")}
          placeholder={t("components.datePicker.placeholder")}
          description="Select a date within this month"
          minDate={minDate}
          maxDate={maxDate}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const MonthMode: Story = {
  render: () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.eventMonth")}
          placeholder={t("components.datePicker.placeholder")}
          mode="month"
          value={value}
          onChange={setValue}
          clearable
        />
        {value && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected month:{" "}
            {value.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    );
  },
};

export const YearMode: Story = {
  render: () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div className="w-72">
        <DatePickerField
          label={t("components.datePicker.eventYear")}
          placeholder={t("components.datePicker.placeholder")}
          mode="year"
          value={value}
          onChange={setValue}
          clearable
        />
        {value && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected year: {value.getFullYear()}
          </p>
        )}
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div className="w-72 space-y-4">
        <DatePickerField
          label={t("components.datePicker.label")}
          placeholder={t("components.datePicker.placeholder")}
          value={value}
          onChange={setValue}
          clearable
        />
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          {value
            ? new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(value)
            : t("components.datePicker.noDateSelected")}
        </p>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const { t } = useTranslation();
    return (
      <div className="space-y-4 w-72">
        <DatePickerField
          label={t("components.datePicker.label")}
          placeholder={t("components.datePicker.placeholder")}
        />
        <DatePickerField
          label={t("components.datePicker.label")}
          placeholder={t("components.datePicker.placeholder")}
          value={new Date()}
        />
        <DatePickerField
          label={t("components.datePicker.startDate")}
          placeholder={t("components.datePicker.placeholder")}
          required
        />
        <DatePickerField
          label={t("components.datePicker.startDate")}
          placeholder={t("components.datePicker.placeholder")}
          error={t("components.datePicker.startDateError")}
        />
        <DatePickerField
          label={t("components.datePicker.deadline")}
          placeholder={t("components.datePicker.placeholder")}
          value={new Date()}
          success
        />
        <DatePickerField
          label={t("components.datePicker.label")}
          placeholder={t("common.loading")}
          loading
          value={new Date()}
        />
        <DatePickerField
          label={t("components.datePicker.label")}
          placeholder={t("components.datePicker.placeholder")}
          disabled
          value={new Date()}
        />
        <DatePickerField
          label={t("components.datePicker.eventDate")}
          placeholder={t("components.datePicker.placeholder")}
          value={new Date()}
          clearable
        />
      </div>
    );
  },
};

export const KeyboardAccessible: Story = {
  render: () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<Date | null>(null);
    return (
      <div className="w-72 space-y-4">
        <DatePickerField
          label={t("components.datePicker.label")}
          placeholder={t("components.datePicker.placeholder")}
          value={value}
          onChange={setValue}
          clearable
        />
        <p className="text-sm text-muted-foreground">
          Try using keyboard navigation:
          <br />
          • Tab to focus the input
          <br />
          • Press Enter or Space to open calendar
          <br />
          • Use arrow keys to navigate dates
          <br />• Press Enter to select
        </p>
      </div>
    );
  },
};

export const YearMonthSelection: Story = {
  render: () => {
    const { t } = useTranslation();
    const [yearValue, setYearValue] = useState<Date | null>(null);
    const [monthValue, setMonthValue] = useState<Date | null>(null);
    return (
      <div className="w-72 space-y-6">
        <div>
          <DatePickerField
            label={t("components.datePicker.eventYear")}
            placeholder="Select year"
            mode="year"
            value={yearValue}
            onChange={setYearValue}
            clearable
          />
          {yearValue && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {yearValue.getFullYear()}
            </p>
          )}
        </div>
        <div>
          <DatePickerField
            label={t("components.datePicker.eventMonth")}
            placeholder="Select month"
            mode="month"
            value={monthValue}
            onChange={setMonthValue}
            clearable
          />
          {monthValue && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected:{" "}
              {monthValue.toLocaleDateString("default", {
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Note: Year and month modes use dropdown selectors for easier
          selection. Click the year/month dropdowns in the calendar to see the
          picker grids.
        </p>
      </div>
    );
  },
};
