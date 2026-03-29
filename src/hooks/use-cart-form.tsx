// import { checkoutFormSchema } from "@/modules/checkout/schemas/checkout-form-schema";
// import { checkoutFormSchema } from "@/modules/checkout/schemas/checkout-form-schema";
import { useCart } from "@/context/use-cart"
import { useOrderCreate } from "./core"
import { useAppForm } from "./form"
import { defaultValues } from "@/modules/checkout/components/default-values"
import { nanoid } from "nanoid"
import type { CreateOrderInput } from "@/types"
import { client } from "@/lib/amplifyClient"

type FormType = typeof defaultValues // or your actual form type

function mapFormToOrder(
  form: FormType,
  // amounts: any // ideally type this
): CreateOrderInput {
  return {
    orderNumber: nanoid(),
    currency: "EUR",
    totalCents: 1000, // TODO: calculate properly
    // items: Object.entries(amounts).map(([productId, quantity]) => ({
    //   productId,
    //   quantity,
    // })),
    // items: JSON.parse(JSON.stringify(amounts)),

    // items: JSON.stringify({
    //   items: Object.entries(amounts).map(([productId, quantity]) => ({
    //     productId,
    //     quantity,
    //   })),
    // }),

    email: form.email,
    phone: form.phone,

    firstName: form.firstName,
    lastName: form.lastName,

    deliveryAddress: {
      streetName: form.deliveryStreetName,
      houseNumber: form.deliveryHouseNumber,
      zip: form.deliveryZip,
      city: form.deliveryCity,
      country: form.deliveryCountry,
    },

    invoiceAddress: form.isDifferentInvoice
      ? {
          streetName: form.invoiceStreetName,
          houseNumber: form.invoiceHouseNumber,
          zip: form.invoiceZip,
          city: form.invoiceCity,
          country: form.invoiceCountry,
        }
      : null,

    isDifferentInvoice: form.isDifferentInvoice,

    isCompany: form.isCompany,
    companyName: form.companyName,
    companyRegistrationNumber: form.companyRegistrationNumber,
    taxIdentificationNumber: form.taxIdentificationNumber,
    vatNumber: form.vatNumber,

    orderNotes: form.orderNotes,
  }
}

// export const useCartForm = () => {
//   const { mutate: createOrder } = useOrderCreate()
//   const { amounts } = useCart()

//   return useAppForm({
//     defaultValues: defaultValues,
//     // validators: {
//     //   onSubmit: checkoutFormSchema,
//     //   // or:
//     //   // onBlur: checkoutFormSchema,
//     //   // onSubmit: checkoutFormSchema,
//     //   // onChange: checkoutFormSchema,
//     // },

//     onSubmit: ({ value }) => {
//       const finalOrderData = mapFormToOrder(value)

//       console.log("Mapped order:", finalOrderData)
//       alert(JSON.stringify(value, null, 2))

//       createOrder(finalOrderData)
//     },
//   })
// }

export const useCartForm = () => {
  const { mutateAsync: createOrder } = useOrderCreate()
  const { amounts } = useCart()

  return useAppForm({
    defaultValues,

    onSubmit: async ({ value }) => {
      const orderInput = mapFormToOrder(value)

      console.log("Creating order:", orderInput)

      // 1️⃣ create order
      const order = await createOrder(orderInput)

      if (!order?.id) {
        console.error("Order creation failed")
        return
      }

      const orderId = order.id

      // 2️⃣ create order items
      await Promise.all(
        Object.entries(amounts).map(([productId, quantity]) =>
          client.models.OrderItem.create({
            orderID: orderId,
            productId,
            quantity,

            // 🔥 snapshot (replace with real product lookup!)
            productName: productId, // TEMP
            priceCents: 500, // TEMP
          })
        )
      )

      console.log("Order + items created successfully")
    },
  })
}

export type CartFormApi = ReturnType<typeof useCartForm>
