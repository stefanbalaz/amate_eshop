import type { Meta, StoryFn } from "@storybook/react-vite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AutocompleteField,
  type AutocompleteOption,
} from "./autocomplete-field";

const meta: Meta<typeof AutocompleteField> = {
  title: "Components/Inputs/AutocompleteField",
  component: AutocompleteField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    error: {
      control: { type: "text" },
    },
    placeholder: {
      control: { type: "text" },
    },
    triggerPlaceholder: {
      control: { type: "text" },
    },
    emptyMessage: {
      control: { type: "text" },
    },
    required: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    success: {
      control: { type: "boolean" },
    },
    sortOptions: {
      control: { type: "boolean" },
    },
    maxDisplayedTags: {
      control: { type: "number" },
    },
  },
};

export default meta;

type StoryArgs = {
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  triggerPlaceholder?: string;
  emptyMessage?: string;
  required?: boolean;
  disabled?: boolean;
  success?: boolean;
  sortOptions?: boolean;
  maxDisplayedTags?: number;
};

const skillOptions = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const frameworkOptions = [
  { value: "nextjs", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "sveltekit", label: "SvelteKit" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
  { value: "br", label: "Brazil" },
  { value: "au", label: "Australia" },
];

const AutocompleteStory = ({
  args,
  initialValue = [],
  options = skillOptions,
  labelKey = "components.autocomplete.skills",
  triggerPlaceholderKey = "components.autocomplete.skillsPlaceholder",
  placeholderKey = "components.autocomplete.skillsSearch",
  overrides = {},
}: {
  args: StoryArgs;
  initialValue?: string[];
  options?: AutocompleteOption[];
  labelKey?: string;
  triggerPlaceholderKey?: string;
  placeholderKey?: string;
  overrides?: Partial<StoryArgs>;
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string[]>(initialValue);

  return (
    <div className="w-80">
      <AutocompleteField
        label={args.label ?? t(labelKey)}
        triggerPlaceholder={args.triggerPlaceholder ?? t(triggerPlaceholderKey)}
        placeholder={args.placeholder ?? t(placeholderKey)}
        description={args.description ?? overrides.description}
        error={args.error ?? overrides.error}
        emptyMessage={args.emptyMessage}
        required={args.required ?? overrides.required}
        disabled={args.disabled ?? overrides.disabled}
        success={args.success ?? overrides.success}
        sortOptions={args.sortOptions ?? overrides.sortOptions}
        maxDisplayedTags={args.maxDisplayedTags ?? overrides.maxDisplayedTags}
        options={options}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export const Default: StoryFn<StoryArgs> = (args) => (
  <AutocompleteStory args={args} />
);
Default.args = {
  sortOptions: true,
  maxDisplayedTags: 3,
};

export const WithDescription: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AutocompleteStory
      args={args}
      overrides={{
        description: t("components.autocomplete.skillsDescription"),
      }}
    />
  );
};
WithDescription.args = {};

export const WithPreselectedValues: StoryFn<StoryArgs> = (args) => (
  <AutocompleteStory
    args={args}
    initialValue={["react", "typescript", "nodejs"]}
  />
);
WithPreselectedValues.args = {};

export const Required: StoryFn<StoryArgs> = (args) => (
  <AutocompleteStory
    args={args}
    labelKey="components.autocomplete.skillsRequired"
    overrides={{ required: true }}
  />
);
Required.args = {
  required: true,
};

export const WithError: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  return (
    <AutocompleteStory
      args={args}
      labelKey="components.autocomplete.skillsRequired"
      overrides={{
        required: true,
        error: t("components.autocomplete.skillsError"),
      }}
    />
  );
};
WithError.args = {
  required: true,
};

export const WithSuccess: StoryFn<StoryArgs> = (args) => (
  <AutocompleteStory
    args={args}
    initialValue={["react", "typescript"]}
    overrides={{ success: true }}
  />
);
WithSuccess.args = {
  success: true,
};

export const Disabled: StoryFn<StoryArgs> = (args) => (
  <AutocompleteStory
    args={args}
    initialValue={["react", "typescript"]}
    overrides={{ disabled: true }}
  />
);
Disabled.args = {
  disabled: true,
};

export const ManySelectedItems: StoryFn<StoryArgs> = (args) => (
  <AutocompleteStory
    args={args}
    initialValue={["react", "typescript", "nodejs", "python", "java", "go"]}
    overrides={{ maxDisplayedTags: 3 }}
  />
);
ManySelectedItems.args = {
  maxDisplayedTags: 3,
};

export const CustomMaxDisplayedTags: StoryFn<StoryArgs> = (args) => (
  <AutocompleteStory
    args={args}
    initialValue={["react", "typescript", "nodejs", "python", "java"]}
    overrides={{ maxDisplayedTags: 5 }}
  />
);
CustomMaxDisplayedTags.args = {
  maxDisplayedTags: 5,
};

export const Frameworks: StoryFn<StoryArgs> = (args) => (
  <AutocompleteStory
    args={args}
    options={frameworkOptions}
    labelKey="components.autocomplete.frameworks"
    triggerPlaceholderKey="components.autocomplete.frameworksPlaceholder"
  />
);
Frameworks.args = {};

export const Countries: StoryFn<StoryArgs> = (args) => (
  <AutocompleteStory
    args={args}
    options={countryOptions}
    labelKey="components.autocomplete.countries"
    triggerPlaceholderKey="components.autocomplete.countriesPlaceholder"
  />
);
Countries.args = {};

export const UnsortedOptions: StoryFn<StoryArgs> = (args) => (
  <AutocompleteStory args={args} overrides={{ sortOptions: false }} />
);
UnsortedOptions.args = {
  sortOptions: false,
};

export const WithoutLabel: StoryFn<StoryArgs> = (args) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="w-80">
      <AutocompleteField
        triggerPlaceholder={
          args.triggerPlaceholder ?? t("components.autocomplete.skillsPlaceholder")
        }
        placeholder={args.placeholder ?? t("components.autocomplete.skillsSearch")}
        description={args.description}
        error={args.error}
        emptyMessage={args.emptyMessage}
        required={args.required}
        disabled={args.disabled}
        success={args.success}
        sortOptions={args.sortOptions}
        maxDisplayedTags={args.maxDisplayedTags}
        options={skillOptions}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};
WithoutLabel.args = {};

export const AllStates: StoryFn<StoryArgs> = () => {
  const { t } = useTranslation();
  const [defaultValue, setDefaultValue] = useState<string[]>([]);
  const [preselectedValue, setPreselectedValue] = useState<string[]>([
    "react",
    "typescript",
  ]);
  const [errorValue, setErrorValue] = useState<string[]>([]);
  const [successValue, setSuccessValue] = useState<string[]>(["nodejs"]);
  const [disabledValue, setDisabledValue] = useState<string[]>([
    "python",
    "java",
  ]);
  const [manyValue, setManyValue] = useState<string[]>([
    "react",
    "typescript",
    "nodejs",
    "python",
    "java",
  ]);

  return (
    <div className="space-y-4 w-80">
      <AutocompleteField
        label={t("components.autocomplete.skills")}
        triggerPlaceholder={t("components.autocomplete.skillsPlaceholder")}
        options={skillOptions}
        value={defaultValue}
        onChange={setDefaultValue}
      />
      <AutocompleteField
        label={t("components.autocomplete.skills")}
        description={t("components.autocomplete.skillsDescription")}
        triggerPlaceholder={t("components.autocomplete.skillsPlaceholder")}
        options={skillOptions}
        value={preselectedValue}
        onChange={setPreselectedValue}
      />
      <AutocompleteField
        label={t("components.autocomplete.skillsRequired")}
        triggerPlaceholder={t("components.autocomplete.skillsPlaceholder")}
        error={t("components.autocomplete.skillsError")}
        options={skillOptions}
        value={errorValue}
        onChange={setErrorValue}
        required
      />
      <AutocompleteField
        label={t("components.autocomplete.skills")}
        triggerPlaceholder={t("components.autocomplete.skillsPlaceholder")}
        options={skillOptions}
        value={successValue}
        onChange={setSuccessValue}
        success
      />
      <AutocompleteField
        label={t("components.autocomplete.skills")}
        triggerPlaceholder={t("components.autocomplete.skillsPlaceholder")}
        options={skillOptions}
        value={disabledValue}
        onChange={setDisabledValue}
        disabled
      />
      <AutocompleteField
        label={t("components.autocomplete.skills")}
        triggerPlaceholder={t("components.autocomplete.skillsPlaceholder")}
        options={skillOptions}
        value={manyValue}
        onChange={setManyValue}
        maxDisplayedTags={2}
      />
    </div>
  );
};
