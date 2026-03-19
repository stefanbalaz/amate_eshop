import { useDrawer } from "@/features/drawer/use-drawer"
import { Drawer, DrawerContent } from "@/components/ui/primitives"
import { cn } from "@/utils/style"

// Using ! prefix for !important to override default drawer.tsx styles
const sizeClasses = {
  sm: "sm:!max-w-sm", // 384px
  md: "sm:!max-w-md", // 448px
  lg: "sm:!max-w-lg", // 512px
  xl: "sm:!max-w-xl", // 576px
  "2xl": "sm:!max-w-2xl", // 672px
  "3xl": "sm:!max-w-3xl", // 768px
  "4xl": "sm:!max-w-4xl", // 896px
  full: "sm:!max-w-full", // 100%
} as const

type DrawerSize = keyof typeof sizeClasses

type AppDrawerProps = {
  drawerID: string
  size?: DrawerSize
  className?: string
}

export function AppDrawer({
  drawerID,
  size = "lg",
  className,
}: AppDrawerProps) {
  const { isDrawerOpen, closeDrawer, getDrawerContent } = useDrawer()

  return (
    <Drawer
      open={isDrawerOpen({ drawerID })}
      onOpenChange={(open) => !open && closeDrawer({ drawerID })}
      direction="right"
    >
      <DrawerContent className={cn(sizeClasses[size], className)}>
        {getDrawerContent({ drawerID })}
      </DrawerContent>
    </Drawer>
  )
}
