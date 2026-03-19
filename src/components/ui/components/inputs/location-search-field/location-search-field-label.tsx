import * as React from "react";
import { CircleHelp } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/primitives";
import { cn } from "@/utils/style";

type LocationSearchFieldLabelProps = {
  inputId: string;
  label?: string;
  required: boolean;
  showRequiredSymbol: boolean;
  hasError: boolean;
  info?: boolean;
  infoContent?: React.ReactNode;
  infoTitle?: string;
  nodeBefore?: React.ReactNode;
  nodeAfter?: React.ReactNode;
};

export const LocationSearchFieldLabel = ({
  inputId,
  label,
  required,
  showRequiredSymbol,
  hasError,
  info,
  infoContent,
  infoTitle,
  nodeBefore,
  nodeAfter,
}: LocationSearchFieldLabelProps): React.JSX.Element | null => {
  const { t } = useTranslation();

  if (!label) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {nodeBefore}
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium",
          hasError && "text-destructive",
        )}
      >
        {label}
        {required && showRequiredSymbol ? (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {info && infoContent ? (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground inline-flex h-5 w-5 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={t("components.locationSearch.infoAria")}
            >
              <CircleHelp className="h-4 w-4" aria-hidden="true" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 space-y-2 p-3">
            {infoTitle ? (
              <p className="text-sm font-semibold">{infoTitle}</p>
            ) : null}
            <div className="text-sm text-muted-foreground">{infoContent}</div>
          </PopoverContent>
        </Popover>
      ) : null}

      {nodeAfter}
    </div>
  );
};
