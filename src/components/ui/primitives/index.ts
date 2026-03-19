/**
 * Primitives Layer
 *
 * Thin re-exports of shadcn components.
 * This layer provides a control surface for the design system.
 *
 * Rules:
 * - NO business logic
 * - NO custom behavior
 * - Only re-exports from @/components/ui/shadcn
 */

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/shadcn/accordion";

// Alert
export {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/shadcn/alert";

// Alert Dialog
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/shadcn/alert-dialog";

// Aspect Ratio
export { AspectRatio } from "@/components/ui/shadcn/aspect-ratio";

// Avatar
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/avatar";

// Badge
export { Badge, badgeVariants } from "@/components/ui/shadcn/badge";

// Breadcrumb
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/shadcn/breadcrumb";

// Button
export { Button } from "@/components/ui/shadcn/button";
export { buttonVariants } from "@/components/ui/shadcn/button-variants";

// Button Group
export { ButtonGroup } from "@/components/ui/shadcn/button-group";

// Calendar
export { Calendar } from "@/components/ui/shadcn/calendar";

// Card
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/shadcn/card";

// Carousel
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/shadcn/carousel";

// Chart
// export {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   ChartLegend,
//   ChartLegendContent,
//   ChartStyle,
// } from "@/components/ui/shadcn/chart";

// Checkbox
export { Checkbox } from "@/components/ui/shadcn/checkbox";

// Collapsible
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/shadcn/collapsible";

// Command
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/shadcn/command";

// Context Menu
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "@/components/ui/shadcn/context-menu";

// Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/shadcn/dialog";

// Drawer
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/shadcn/drawer";

// Dropdown Menu
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/shadcn/dropdown-menu";

// Empty
export { Empty } from "@/components/ui/shadcn/empty";

// Field
export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/shadcn/field";

// Form
// export {
//   useFormField,
//   Form,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
//   FormMessage,
//   FormField,
// } from "@/components/ui/shadcn/form";

// Hover Card
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/shadcn/hover-card";

// Input
export { Input } from "@/components/ui/shadcn/input";

// Input Group
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/shadcn/input-group";

// Input OTP
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/shadcn/input-otp";

// Item
export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "@/components/ui/shadcn/item";

// Kbd
export { Kbd } from "@/components/ui/shadcn/kbd";

// Label
export { Label } from "@/components/ui/shadcn/label";

// Menubar
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
} from "@/components/ui/shadcn/menubar";

// Navigation Menu
export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "@/components/ui/shadcn/navigation-menu";

// Pagination
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/shadcn/pagination";

// Popover
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/shadcn/popover";

// Progress
export { Progress } from "@/components/ui/shadcn/progress";

// Radio Group
export { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";

// Resizable
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/shadcn/resizable";

// Scroll Area
export { ScrollArea, ScrollBar } from "@/components/ui/shadcn/scroll-area";

// Select
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/shadcn/select";

// Separator
export { Separator } from "@/components/ui/shadcn/separator";

// Sheet
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/shadcn/sheet";

// Sidebar
// export {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupAction,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarInput,
//   SidebarInset,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuBadge,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSkeleton,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   SidebarProvider,
//   SidebarRail,
//   SidebarSeparator,
//   SidebarTrigger,
//   useSidebar,
// } from "@/components/ui/shadcn/sidebar";

// Skeleton
export { Skeleton } from "@/components/ui/shadcn/skeleton";

// Slider
export { Slider } from "@/components/ui/shadcn/slider";

// Sonner (Toast)
// export { Toaster } from "@/components/ui/shadcn/sonner";

// Spinner
export { Spinner } from "@/components/ui/shadcn/spinner";

// Switch
export { Switch } from "@/components/ui/shadcn/switch";

// Table
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/shadcn/table";

// Tabs
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/shadcn/tabs";

// Textarea
export { Textarea } from "@/components/ui/shadcn/textarea";

// Toggle
export { Toggle, toggleVariants } from "@/components/ui/shadcn/toggle";

// Toggle Group
export {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/shadcn/toggle-group";

// Tooltip
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/shadcn/tooltip";
