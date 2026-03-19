import * as React from "react";
import {
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { CircleHelp } from "lucide-react";
import { LABEL_SIZE_CLASSNAMES } from "./phone-field.utils";
import type { PhoneFieldLabelSize } from "./phone-field.types";

type PhoneFieldLabelProps = {
  label?: React.ReactNode;
  required: boolean;
  inputId: string;
  labelSize: PhoneFieldLabelSize;
  hasLabelError: boolean;
  nodeBefore?: React.ReactNode;
  nodeAfter?: React.ReactNode;
  hasInfo: boolean;
  infoAriaLabel: string;
  infoTitle: string;
  infoContent: React.ReactNode;
};

export const PhoneFieldLabel = ({
  label,
  required,
  inputId,
  labelSize,
  hasLabelError,
  nodeBefore,
  nodeAfter,
  hasInfo,
  infoAriaLabel,
  infoTitle,
  infoContent,
}: PhoneFieldLabelProps): React.JSX.Element | null => {
  if (!label) return null;

  return (
    <div className="flex items-center gap-1.5">
      <Label
        htmlFor={inputId}
        className={cn(
          "text-foreground inline-flex items-center gap-1 font-medium",
          LABEL_SIZE_CLASSNAMES[labelSize],
          hasLabelError && "text-destructive",
        )}
      >
        {nodeBefore}
        {label}
        {required ? (
          <span className="text-destructive ml-0.5" aria-hidden="true">
            *
          </span>
        ) : null}
        {nodeAfter}
      </Label>

      {hasInfo ? (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground inline-flex h-5 w-5 items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={infoAriaLabel}
            >
              <CircleHelp className="h-4 w-4" aria-hidden="true" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="max-w-80 space-y-2">
            <p className="text-sm font-semibold">{infoTitle}</p>
            <div className="text-sm text-muted-foreground">{infoContent}</div>
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
};
