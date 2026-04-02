import { defineBackend } from "@aws-amplify/backend"
import { FunctionUrlAuthType, HttpMethod } from "aws-cdk-lib/aws-lambda"
import { auth } from "./auth/resource"
import { data } from "./data/resource"
import { createPaymentIntent } from "./functions/create-payment-intent/resource"
import { stripeWebhook } from "./functions/stripe-webhook/resource"

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  createPaymentIntent,
  stripeWebhook,
})

backend.createPaymentIntent.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowedMethods: [HttpMethod.POST],
    allowedOrigins: ["*"],
    allowedHeaders: ["content-type", "authorization"],
  },
})

// backend.stripeWebhook.resources.lambda.addFunctionUrl({
//   authType: FunctionUrlAuthType.NONE,
//   cors: {
//     allowedMethods: [HttpMethod.POST],
//     allowedOrigins: ["*"],
//     allowedHeaders: ["content-type", "authorization"],
//   },
// })

backend.stripeWebhook.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
})
