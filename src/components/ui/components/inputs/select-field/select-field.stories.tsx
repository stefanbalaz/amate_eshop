import {
  Briefcase,
  Coffee,
  Gift,
  Globe,
  GraduationCap,
  Languages,
} from "lucide-react";
import React, { useState } from "react";

import { CustomSelect, type SelectOption } from "./select-field";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CustomSelect> = {
  title: "Components/CustomSelect",
  component: CustomSelect,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    isMulti: { control: "boolean" },
    isClearable: { control: "boolean" },
    isSearchable: { control: "boolean" },
    isDisabled: { control: "boolean" },
    error: { control: "text" },
    fullWidth: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A reusable, accessible, and fully styled wrapper around `react-select`, supporting single/multi select, icons, validation, and Tailwind styling.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomSelect>;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-xl mx-auto space-y-4 p-4 bg-white rounded-md border border-gray-200 shadow-sm">
    {children}
  </div>
);

const countryOptions: SelectOption[] = [
  { value: "us", label: "United States", icon: <Globe size={16} /> },
  { value: "de", label: "Germany", icon: <Globe size={16} /> },
  { value: "fr", label: "France", icon: <Globe size={16} /> },
];

const languageOptions: SelectOption[] = [
  { value: "en", label: "English", icon: <Languages size={16} /> },
  { value: "de", label: "German", icon: <Languages size={16} /> },
];

const hobbyOptions: SelectOption[] = [
  { value: "reading", label: "Reading", icon: <Coffee size={16} /> },
  { value: "traveling", label: "Traveling", icon: <Gift size={16} /> },
];

const professionOptions: SelectOption[] = [
  {
    value: "developer",
    label: "Software Developer",
    icon: <Briefcase size={16} />,
  },
  { value: "teacher", label: "Teacher", icon: <GraduationCap size={16} /> },
];

const SingleSelectComponent = (
  args: React.ComponentProps<typeof CustomSelect>,
) => {
  const [value, setValue] = useState<SelectOption | null>(null);
  return (
    <Wrapper>
      <CustomSelect
        {...args}
        options={countryOptions}
        value={value}
        onChange={(val) => setValue(val as SelectOption)}
      />
    </Wrapper>
  );
};

const MultiSelectComponent = (
  args: React.ComponentProps<typeof CustomSelect>,
) => {
  const [value, setValue] = useState<SelectOption[]>([]);
  return (
    <Wrapper>
      <CustomSelect
        {...args}
        options={languageOptions}
        value={value}
        onChange={(val) => setValue(val as SelectOption[])}
        isMulti
      />
    </Wrapper>
  );
};

export const SingleSelect: Story = {
  render: (args) => <SingleSelectComponent {...args} />,
  args: {
    label: "Country",
    placeholder: "Select a country...",
    isClearable: true,
    isSearchable: true,
  },
};

export const MultiSelect: Story = {
  render: (args) => <MultiSelectComponent {...args} />,
  args: {
    label: "Languages",
    placeholder: "Select languages...",
    isClearable: true,
    isSearchable: true,
  },
};

export const WithError: Story = {
  render: (args) => (
    <Wrapper>
      <CustomSelect
        {...args}
        options={hobbyOptions}
        error="This field is required"
      />
    </Wrapper>
  ),
  args: {
    label: "Hobbies",
    placeholder: "Select hobbies...",
    isMulti: true,
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <Wrapper>
      <CustomSelect {...args} options={professionOptions} fullWidth />
    </Wrapper>
  ),
  args: {
    label: "Profession",
    placeholder: "Select profession...",
    isClearable: true,
  },
};
