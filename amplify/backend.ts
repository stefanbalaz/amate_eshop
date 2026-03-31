import { defineBackend } from "@aws-amplify/backend"
import { FunctionUrlAuthType, HttpMethod } from "aws-cdk-lib/aws-lambda"
import { auth } from "./auth/resource"
import { data } from "./data/resource"
import { createPaymentIntent } from "./functions/create-payment-intent/resource"

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  createPaymentIntent,
})

backend.createPaymentIntent.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowedMethods: [HttpMethod.POST, HttpMethod.OPTIONS],
    allowedOrigins: ["*"],
    allowedHeaders: ["content-type", "authorization"],
  },
})
