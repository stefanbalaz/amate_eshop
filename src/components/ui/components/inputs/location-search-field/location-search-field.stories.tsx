import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LocationSearchField } from "./location-search-field";
import type {
  LocationSearchFieldHandle,
  LocationSuggestion,
} from "./location-search-field.types";

const meta: Meta<typeof LocationSearchField> = {
  title: "Components/Inputs/LocationSearchField",
  component: LocationSearchField,
  parameters: {
    layout: "centered",
    controls: {
      include: [
        "handleAddressChange",
        "autocompleteAddress",
        "suggestions",
        "handleAddressSelect",
        "label",
        "placeholder",
        "description",
        "errorMessage",
        "required",
        "validate",
        "loading",
      ],
    },
    docs: {
      controls: {
        include: [
          "handleAddressChange",
          "autocompleteAddress",
          "suggestions",
          "handleAddressSelect",
          "label",
          "placeholder",
          "description",
          "errorMessage",
          "required",
          "validate",
          "loading",
        ],
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    handleAddressChange: {
      description: "Callback fired when the input value changes.",
      table: {
        category: "Necessary",
        type: { summary: "(value: string) => void" },
      },
      control: false,
    },
    autocompleteAddress: {
      description: "Controlled input value.",
      table: {
        category: "Necessary",
      },
      control: "text",
    },
    suggestions: {
      description: "Address suggestions shown below the input.",
      table: {
        category: "Necessary",
        type: { summary: "LocationSuggestion[]" },
      },
      control: false,
    },
    handleAddressSelect: {
      description: "Callback fired when a suggestion is selected.",
      table: {
        category: "Necessary",
        type: { summary: "(address: string, placeId: string) => void" },
      },
      control: false,
    },
    label: {
      table: {
        category: "Necessary",
        type: { summary: "string" },
      },
      control: "text",
    },
    placeholder: {
      table: {
        category: "Necessary",
        type: { summary: "string" },
      },
      control: "text",
    },
    description: {
      table: {
        category: "Necessary",
        type: { summary: "string" },
      },
      control: "text",
    },
    errorMessage: {
      description: "Validation error shown instead of description.",
      table: {
        category: "Necessary",
        type: { summary: "string" },
      },
      control: "text",
    },
    required: {
      table: {
        category: "Necessary",
      },
      control: "boolean",
    },
    validate: {
      description: "Optional validation function for success/error state.",
      table: {
        category: "Necessary",
        type: { summary: "(value: string) => boolean" },
      },
      control: false,
    },
    loading: {
      table: {
        category: "Necessary",
      },
      control: "boolean",
    },
    name: { table: { disable: true } },
    autoComplete: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    inputRootClass: { table: { disable: true } },
    inputClass: { table: { disable: true } },
    autoFocus: { table: { disable: true } },
    info: { table: { disable: true } },
    infoContent: { table: { disable: true } },
    infoTitle: { table: { disable: true } },
    id: { table: { disable: true } },
    showRequiredSymbol: { table: { disable: true } },
    nodeBefore: { table: { disable: true } },
    nodeAfter: { table: { disable: true } },
    loadingText: { table: { disable: true } },
    emptyText: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof LocationSearchField>;

const ADDRESS_SUGGESTIONS: LocationSuggestion[] = [
  {
    placeId: "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
    description: "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  },
  {
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    description: "1 Apple Park Way, Cupertino, CA, USA",
  },
  {
    placeId: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    description: "111 8th Avenue, New York, NY, USA",
  },
  {
    placeId: "ChIJW-T2Wt7Gt4kRKl2I1CJFUsI",
    description: "221B Baker Street, London, UK",
  },
  {
    placeId: "ChIJd8BlQ2BZwokRAFUEcm_qrcA",
    description: "350 5th Avenue, New York, NY, USA",
  },
  {
    placeId: "ChIJN1t_tDeuEmsRUsoyG82frY5",
    description: "Unter den Linden 77, Berlin, Germany",
  },
];

const LocationSearchFieldCanvas = ({
  args,
  shouldForceValidationError = false,
}: {
  args?: Story["args"];
  shouldForceValidationError?: boolean;
}) => {
  const resolvedArgs = args ?? {};
  const fieldRef = useRef<LocationSearchFieldHandle>(null);
  const { t } = useTranslation();
  const [address, setAddress] = useState(resolvedArgs.autocompleteAddress ?? "");

  useEffect(() => {
    if (shouldForceValidationError) {
      fieldRef.current?.highlight(false);
    }
  }, [shouldForceValidationError]);

  const filteredSuggestions = useMemo(() => {
    if (resolvedArgs.loading || !address.trim()) {
      return [];
    }

    const normalizedQuery = address.toLowerCase();
    return ADDRESS_SUGGESTIONS.filter((item) =>
      item.description.toLowerCase().includes(normalizedQuery),
    ).slice(0, 6);
  }, [address, resolvedArgs.loading]);

  const resolvedErrorMessage =
    resolvedArgs.errorMessage ??
    (shouldForceValidationError
      ? t("components.locationSearch.validationError")
      : undefined);

  return (
    <div className="w-96">
      <LocationSearchField
        ref={fieldRef}
        {...resolvedArgs}
        label={resolvedArgs.label ?? t("components.locationSearch.label")}
        placeholder={resolvedArgs.placeholder ?? t("components.locationSearch.placeholder")}
        description={resolvedArgs.description ?? t("components.locationSearch.description")}
        errorMessage={resolvedErrorMessage}
        infoTitle={resolvedArgs.infoTitle ?? t("components.locationSearch.infoTitle")}
        infoContent={resolvedArgs.infoContent ?? t("components.locationSearch.infoContent")}
        loadingText={resolvedArgs.loadingText ?? t("components.locationSearch.loading")}
        emptyText={resolvedArgs.emptyText ?? t("components.locationSearch.noResults")}
        suggestions={resolvedArgs.suggestions ?? filteredSuggestions}
        autocompleteAddress={address}
        handleAddressChange={(value) => {
          setAddress(value);
          resolvedArgs.handleAddressChange?.(value);
        }}
        handleAddressSelect={(nextAddress, placeId) => {
          setAddress(nextAddress);
          resolvedArgs.handleAddressSelect?.(nextAddress, placeId);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <LocationSearchFieldCanvas args={args} />,
  args: {
    handleAddressChange: () => undefined,
  },
};

export const Required: Story = {
  render: (args) => <LocationSearchFieldCanvas args={args} />,
  args: {
    handleAddressChange: () => undefined,
    required: true,
  },
};

export const WithValidation: Story = {
  render: (args) => <LocationSearchFieldCanvas args={args} shouldForceValidationError />,
  args: {
    handleAddressChange: () => undefined,
    required: true,
    validate: (value: string) => value.trim().length > 6,
    description: "",
  },
};

export const LoadingState: Story = {
  render: (args) => <LocationSearchFieldCanvas args={args} />,
  args: {
    handleAddressChange: () => undefined,
    loading: true,
  },
};
