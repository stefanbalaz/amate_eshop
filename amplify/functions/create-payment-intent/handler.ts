// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// export const handler = async (event: any) => {
//   try {
//     const { amount } = JSON.parse(event.body)

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "eur",
//       automatic_payment_methods: { enabled: true },
//     })

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         clientSecret: paymentIntent.client_secret,
//       }),
//     }
//   } catch (err: any) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: err.message }),
//     }
//   }
// }

import type {
  LambdaFunctionURLEvent,
  LambdaFunctionURLResult,
} from "aws-lambda"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const handler = async (
  event: LambdaFunctionURLEvent
): Promise<LambdaFunctionURLResult> => {
  console.log("HANDLER CALLED") // 👈 important test log

  // ✅ Handle CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
    }
  }

  try {
    if (!event.body) {
      return response(400, { error: "Missing request body" })
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(event.body)
    } catch {
      return response(400, { error: "Invalid JSON" })
    }

    if (!isPlainObject(parsed)) {
      return response(400, { error: "Invalid body" })
    }

    // ❗ NEVER trust frontend amount
    // 👉 Replace this later with real cart calculation
    const amount = Number(parsed.amount)

    if (!amount || amount <= 0) {
      return response(400, { error: "Invalid amount" })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },

      // ✅ super useful later
      metadata: {
        source: "vite-shop",
      },
    })

    return response(200, {
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err: unknown) {
    console.error("Stripe error:", err)

    return response(500, {
      error: "Internal server error",
    })
  }
}

// 🔧 helpers

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
}

function response(
  statusCode: number,
  body: Record<string, unknown>
): LambdaFunctionURLResult {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
