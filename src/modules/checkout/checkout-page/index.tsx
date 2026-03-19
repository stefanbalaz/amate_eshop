import { CheckoutForm, OrderSummary } from "../components";
import { useCartForm } from "@/hooks/use-cart-form";

export default function CheckoutPage() {
  const form = useCartForm();

  return (
    <div className="min-h-svh bg-muted/40 py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <form.AppForm>
          <div className="grid gap-8 lg:grid-cols-[7fr_3fr]">
            <CheckoutForm form={form} />
            <div className="h-fit lg:sticky lg:top-24">
              <OrderSummary form={form} />
            </div>
          </div>
        </form.AppForm>
      </div>
    </div>
  );
}
