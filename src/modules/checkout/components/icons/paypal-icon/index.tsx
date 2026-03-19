import { paypalIcon } from "@/assets";
import { cn } from "@/utils/style";

export default function PayPalIcon({ className }: { className?: string }) {
  return <img src={paypalIcon} alt="PayPal" className={cn(className)} />;
}
