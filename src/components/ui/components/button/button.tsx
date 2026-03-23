import { Button as ButtonPrimitive } from "@/components/ui/primitives"
import { cn } from "@/utils/style"
import { Loader2 } from "lucide-react"
import { ButtonSize } from "./button.types"

export { ButtonSize } from "./button.types"

type BaseButtonProps = Omit<
  React.ComponentProps<typeof ButtonPrimitive>,
  "children" | "asChild" | "size"
> & {
  loading?: boolean
  size?: ButtonSize
}

type ButtonWithLabel = BaseButtonProps & {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  icon?: never
  label: string
  labelLoading?: string
}

type ButtonWithoutLabel = BaseButtonProps & {
  icon?: React.ReactNode
  label?: never
  labelLoading?: never
  iconLeft?: never
  iconRight?: never
}

export type ButtonProps = ButtonWithLabel | ButtonWithoutLabel

const iconSizeMap = {
  default: "icon",
  sm: "icon-sm",
  lg: "icon-lg",
  xl: "icon-lg",
} as const

export const Button = ({
  loading = false,
  iconLeft,
  iconRight,
  icon,
  label,
  labelLoading,
  disabled,
  size = ButtonSize.DEFAULT,
  className,
  ...props
}: ButtonProps) => {
  const sizeShadcn =
    label || (labelLoading && loading) ? size : iconSizeMap[size]

  return (
    <ButtonPrimitive
      disabled={disabled === true || loading === true}
      size={sizeShadcn}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {loading === false && icon}
      {loading === false && iconLeft}
      {loading === true && <Loader2 className="h-4 w-4 animate-spin" />}
      {label}
      {loading === false && iconRight}
    </ButtonPrimitive>
  )
}
