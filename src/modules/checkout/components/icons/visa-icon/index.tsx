import { cn } from "@/utils/style";
import { visaIcon } from "@/assets";

export default function VisaIcon({ className }: { className?: string }) {
  return <img src={visaIcon} alt="Visa" className={cn(className)} />;
}
