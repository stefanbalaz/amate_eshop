import { Label } from "@/components/ui/primitives";
import { cn } from "@/utils/style";

export type InputContainerProps = {
  children?: React.ReactNode;
  label?: string;
  required?: boolean;
  className?: string;
  id?: string;
};

export const InputContainer: React.FC<InputContainerProps> = ({
  children,
  label,
  required = false,
  id,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      {children}
    </div>
  );
};
