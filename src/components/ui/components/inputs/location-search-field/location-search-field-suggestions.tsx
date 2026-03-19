import * as React from "react";
import { cn } from "@/utils/style";
import type { LocationSuggestion } from "./location-search-field.types";

function useScrollActiveOptionIntoView(
  inputId: string,
  activeIndex: number,
  isVisible: boolean,
) {
  React.useEffect(() => {
    if (!isVisible || activeIndex < 0) return;
    const el = document.getElementById(`${inputId}-suggestion-${activeIndex}`);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [inputId, activeIndex, isVisible]);
}

type LocationSearchFieldSuggestionsProps = {
  inputId: string;
  isVisible: boolean;
  isLoading: boolean;
  shouldShowEmptyState: boolean;
  loadingText: string;
  emptyText: string;
  suggestions: LocationSuggestion[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSelectSuggestion: (suggestion: LocationSuggestion) => void;
};

export const LocationSearchFieldSuggestions = ({
  inputId,
  isVisible,
  isLoading,
  shouldShowEmptyState,
  loadingText,
  emptyText,
  suggestions,
  activeIndex,
  onActiveIndexChange,
  onSelectSuggestion,
}: LocationSearchFieldSuggestionsProps): React.JSX.Element | null => {
  useScrollActiveOptionIntoView(inputId, activeIndex, isVisible);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-popover text-popover-foreground absolute top-[calc(100%+2px)] right-0 left-0 z-50 overflow-hidden rounded-md border shadow-md">
      {isLoading ? (
        <p role="presentation" className="px-3 py-2 text-sm text-muted-foreground">
          {loadingText}
        </p>
      ) : null}

      {!isLoading && shouldShowEmptyState ? (
        <p role="presentation" className="px-3 py-2 text-sm text-muted-foreground">
          {emptyText}
        </p>
      ) : null}

      {!isLoading && suggestions.length > 0 ? (
        <ul
          id={`${inputId}-suggestions`}
          role="listbox"
          aria-label="Address suggestions"
          className="max-h-60 overflow-y-auto py-1"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id ?? `${suggestion.placeId}-${index}`}
              id={`${inputId}-suggestion-${index}`}
              role="option"
              aria-selected={activeIndex === index}
              className={cn(
                "w-full min-h-11 cursor-pointer px-3 py-2 text-left text-sm",
                activeIndex === index ? "bg-accent text-accent-foreground" : "hover:bg-accent/70",
              )}
              onMouseEnter={() => onActiveIndexChange(index)}
              onMouseDown={(event) => {
                event.preventDefault();
                onSelectSuggestion(suggestion);
              }}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
