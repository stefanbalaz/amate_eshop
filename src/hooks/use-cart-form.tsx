// import { checkoutFormSchema } from "@/modules/checkout/schemas/checkout-form-schema";
// import { checkoutFormSchema } from "@/modules/checkout/schemas/checkout-form-schema";
import { useAppForm } from "./form";
import { defaultValues } from "@/modules/checkout/components/default-values";

export const useCartForm = () =>
  useAppForm({
    defaultValues: defaultValues,
    // validators: {
    //   onSubmit: checkoutFormSchema,
    //   // or:
    //   // onBlur: checkoutFormSchema,
    //   // onSubmit: checkoutFormSchema,
    //   // onChange: checkoutFormSchema,
    // },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value);
      alert(JSON.stringify(value, null, 2));
    },
  });

export type CartFormApi = ReturnType<typeof useCartForm>;
