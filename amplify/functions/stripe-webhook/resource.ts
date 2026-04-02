import { defineFunction } from "@aws-amplify/backend"

export const stripeWebhook = defineFunction({
  name: "stripe-webhook",
  entry: "./handler.ts",
  environment: {
    STRIPE_SECRET_KEY: "STRIPE_SECRET_KEY",
    STRIPE_WEBHOOK_SECRET: "STRIPE_WEBHOOK_SECRET",
  },
})
