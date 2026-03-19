import {
  Avatar as AvatarPrimitive,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives";
import { cn } from "@/utils/style";
import { User } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

export type AvatarProps = {
  /** Optional direct image source */
  src?: string;
  /** Custom fallback content when image fails to load (defaults to User icon) */
  fallback?: React.ReactNode;
  showBadge?: boolean;
  className?: string;
  badgeType?: "text" | "dot";
  badgeClassName?: string;
  badgeContent?: React.ReactNode;
  /** For non-text badges, provide a label so assistive tech can announce it */
  badgeAriaLabel?: string;
  size?: string;
  alt?: string;
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      fallback,
      showBadge = false,
      className,
      badgeType = "text",
      badgeClassName,
      badgeContent,
      badgeAriaLabel,
      size = "100px",
      alt,
      ariaLabel,
      onClick,
    },
    ref,
  ) => {
    const { t } = useTranslation();

    const resolvedAlt = alt ?? t("components.avatar.alt");
    const resolvedAriaLabel = ariaLabel ?? resolvedAlt;

    const avatarSize: React.CSSProperties = { width: size, height: size };
    const resolvedBadgeLabel =
      badgeAriaLabel ??
      (typeof badgeContent === "string" ? badgeContent : undefined);

    const isClickable = Boolean(onClick);

    const avatarNode = (
      <div className="relative">
        <AvatarPrimitive
          className={cn(
            "border-2 border-muted",
            onClick && "transition-colors hover:border-border",
          )}
          style={avatarSize}
        >
          <AvatarImage src={src} alt={resolvedAlt} />
          <AvatarFallback>
            {fallback ?? (
              <User
                className="h-1/2 w-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            )}
          </AvatarFallback>
        </AvatarPrimitive>

        {showBadge ? (
          <div
            className={cn(
              "absolute bottom-0 right-0 flex items-center justify-center",
              badgeType === "text"
                ? "h-7 min-w-7 rounded-full border border-sky-400 bg-background px-2 text-sm font-medium text-sky-500"
                : "h-3 w-3 rounded-full bg-sky-400",
              badgeClassName,
            )}
            aria-label={resolvedBadgeLabel}
            aria-hidden={!resolvedBadgeLabel}
          >
            {badgeType === "text" ? badgeContent : null}
          </div>
        ) : null}
      </div>
    );

    return (
      <div ref={ref} className={cn("inline-flex", className)}>
        {isClickable ? (
          <button
            type="button"
            aria-label={resolvedAriaLabel}
            className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={onClick}
          >
            {avatarNode}
          </button>
        ) : (
          avatarNode
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
