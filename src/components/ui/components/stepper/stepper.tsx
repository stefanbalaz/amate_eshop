"use client";

import { cn } from "@/utils/style";
import { Check, Loader2 } from "lucide-react";
import * as React from "react";
import { Button } from "../../primitives";

export interface StepProps {
  index: number;
  title: string;
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  isClickable?: boolean;
}

export const Step: React.FC<StepProps> = ({
  index,
  title,
  description,
  isCompleted,
  isActive,
  onClick,
  isClickable,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isClickable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <li className="flex flex-col items-center text-center flex-1 min-w-[6rem]">
      <button
        type="button"
        onClick={isClickable ? onClick : undefined}
        onKeyDown={handleKeyDown}
        disabled={!isClickable}
        aria-disabled={!isClickable}
        tabIndex={isClickable ? 0 : -1}
        // className={cn(
        //   'w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors',
        //   isCompleted
        //     ? 'border-primary bg-primary text-primary-foreground'
        //     : isActive
        //       ? 'border-primary text-primary'
        //       : 'border-gray-400 text-muted-foreground',
        //   isClickable ? 'cursor-pointer' : 'cursor-not-allowed',
        // )}
        className={cn(
          "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors",
          isCompleted
            ? "border-primary bg-primary/30"
            : isActive
              ? "border-primary bg-primary text-primary-foreground"
              : "border-gray-400 text-muted-foreground",
          isClickable ? "cursor-pointer" : "cursor-not-allowed",
        )}
        aria-current={isActive ? "step" : undefined}
      >
        {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
      </button>
      <div className="mt-2">
        <div
          className={cn(
            "text-sm font-medium break-words",
            isActive || isCompleted
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >
          {title}
        </div>
        {description && (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
      </div>
    </li>
  );
};

/**
 * Props for the Stepper component.
 *
 * @param steps - An array of steps, each containing a `title` and optional `description`.
 * @param currentStep - The index of the currently active step (0-based).
 * @param onStepChange - Callback when the user selects a new step.
 * @param children - Optional content rendered between the step indicators and navigation buttons.
 */
export interface StepperProps {
  steps: Array<{ title: string; description?: string }>;
  currentStep: number;
  onStepChange: (step: number) => void;
  onNext?: () => void;
  onBack?: () => void;
  children?: React.ReactNode;
  isLoading?: boolean;
  isNextDisabled?: boolean;
}

/**
 * Stepper is a horizontal progress component used for multi-step workflows
 * such as forms or onboarding sequences.
 */
export function Stepper({
  steps,
  currentStep,
  onStepChange,
  onNext,
  onBack,
  isLoading = false,
  isNextDisabled = true,
  children,
}: StepperProps) {
  const isLastStep = currentStep === steps.length - 1;

  const handleBack = onBack ?? (() => {});

  return (
    <div className="pb-10 pt-5">
      {/* Step indicators */}
      <div className="border-b border-stone-200 mb-8">
        <nav className="flex items-start lg:max-w-4xl mx-auto justify-between gap-4 mb-8">
          {steps.map((step, index) => (
            <Step
              key={index}
              index={index}
              title={step.title}
              description={step.description}
              isCompleted={index < currentStep}
              isActive={index === currentStep}
              isClickable={index <= currentStep}
              onClick={() => {
                if (index <= currentStep) {
                  onStepChange(index);
                }
              }}
            />
          ))}
        </nav>
      </div>

      {/* Step content */}
      <div className="flex justify-center max-w-full lg:max-w-4xl mx-auto pb-8 pt-8">
        {children}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between max-w-full lg:max-w-4xl mx-auto">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Zurück
        </Button>

        {isLastStep ? (
          <Button onClick={onNext} disabled={isLoading || isNextDisabled}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Speichern...
              </>
            ) : (
              "Fertig"
            )}
          </Button>
        ) : (
          <Button onClick={onNext} disabled={isNextDisabled}>
            Weiter
          </Button>
        )}
      </div>
    </div>
  );
}
