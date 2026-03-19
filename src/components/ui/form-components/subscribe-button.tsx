// import { Button, type ButtonProps } from "@/components/ui";
import { useFormContext } from "@/hooks/form-context";
import { Button, type ButtonProps } from "../components";

export default function SubscribeButton({
  label,
  variant,
  disabled,
  className,
}: {
  label: string;
  variant: ButtonProps["variant"];
  disabled?: boolean;
  className?: string;
}) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(formState) => [formState.isSubmitting]}>
      {([isSubmitting]) => (
        <Button
          type="button"
          variant={variant}
          label={label}
          labelLoading="Ukladá sa..."
          loading={isSubmitting}
          disabled={isSubmitting || disabled}
          onClick={() => {
            form.handleSubmit();
          }}
          className={className}
        />
      )}
    </form.Subscribe>
  );
}
