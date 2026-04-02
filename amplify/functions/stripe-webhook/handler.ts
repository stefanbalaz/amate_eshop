import { APIGatewayProxyEventV2 } from "aws-lambda"
import Stripe from "stripe"
import { Amplify } from "aws-amplify"
import outputs from "../../../amplify_outputs.json"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "../../data/resource"

Amplify.configure(outputs)

const client = generateClient<Schema>()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const handler = async (event: APIGatewayProxyEventV2) => {
  const sig = event.headers["stripe-signature"]

  if (!sig) {
    return { statusCode: 400, body: "Missing signature" }
  }

  let stripeEvent: Stripe.Event

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature failed:", err)
    return { statusCode: 400, body: "Invalid signature" }
  }

  // 🎯 handle event
  if (stripeEvent.type === "payment_intent.succeeded") {
    const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent

    const orderId = paymentIntent.metadata.orderId

    if (!orderId) {
      console.error("Missing orderId in metadata")
      return { statusCode: 400, body: "Missing orderId" }
    }

    // ✅ update order
    await client.models.Order.update({
      id: orderId,
      status: "PAID",
      paymentStatus: "SUCCEEDED",
    })

    console.log("Order marked as PAID:", orderId)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  }
}
