import { defineFunction } from "@aws-amplify/backend"

export const createPaymentIntent = defineFunction({
  name: "create-payment-intent",
  entry: "./handler.ts", // 👈 ADD THIS
})
