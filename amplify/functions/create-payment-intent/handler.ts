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

// import type {
//   LambdaFunctionURLEvent,
//   LambdaFunctionURLResult,
// } from "aws-lambda"
// import Stripe from "stripe"

// export const handler = async (
//   event: LambdaFunctionURLEvent
// ): Promise<LambdaFunctionURLResult> => {
//   console.log("HANDLER CALLED") // 👈 important test log

//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

//   try {
//     if (!event.body) {
//       return response(400, { error: "Missing request body" })
//     }

//     let parsed: unknown
//     try {
//       parsed = JSON.parse(event.body)
//     } catch {
//       return response(400, { error: "Invalid JSON" })
//     }

//     if (!isPlainObject(parsed)) {
//       return response(400, { error: "Invalid body" })
//     }

//     // ❗ NEVER trust frontend amount
//     // 👉 Replace this later with real cart calculation
//     const amount = Number(parsed.amount)

//     if (!amount || amount <= 0) {
//       return response(400, { error: "Invalid amount" })
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "eur",
//       automatic_payment_methods: {
//         enabled: true,
//       },

//       // ✅ super useful later
//       metadata: {
//         source: "vite-shop",
//       },
//     })

//     return response(200, {
//       clientSecret: paymentIntent.client_secret,
//     })
//   } catch (err: unknown) {
//     console.error("Stripe error:", err)

//     return response(500, {
//       error: "Internal server error",
//     })
//   }
// }

// // 🔧 helpers

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "content-type",
//   "Access-Control-Allow-Methods": "POST,OPTIONS",
// }

// function response(
//   statusCode: number,
//   body: Record<string, unknown>
// ): LambdaFunctionURLResult {
//   return {
//     statusCode,
//     headers: {
//       ...corsHeaders,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   }
// }

// function isPlainObject(value: unknown): value is Record<string, unknown> {
//   return typeof value === "object" && value !== null && !Array.isArray(value)
// }

import type {
  LambdaFunctionURLEvent,
  LambdaFunctionURLResult,
} from "aws-lambda"
import Stripe from "stripe"
import { generateClient } from "aws-amplify/data"
import { nanoid } from "nanoid"
import type { Schema } from "../../data/resource"

import { Amplify } from "aws-amplify"
import outputs from "../../../amplify_outputs.json"

Amplify.configure(outputs)

const client = generateClient<Schema>()

// 🔒 fake product DB (replace later with real one)
// const PRODUCTS: Record<string, { priceCents: number; name: string }> = {
//   "product-cucumber": { priceCents: 500, name: "Product 1" },
//   "product-zero": { priceCents: 1000, name: "Product 2" },
// }

export const handler = async (
  event: LambdaFunctionURLEvent
): Promise<LambdaFunctionURLResult> => {
  console.log("HANDLER CALLED")

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  try {
    if (!event.body) {
      return response(400, { error: "Missing body" })
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

    const { items, form } = parsed

    if (!items || typeof items !== "object" || Array.isArray(items)) {
      return response(400, { error: "Invalid items" })
    }

    if (!isPlainObject(form)) {
      return response(400, { error: "Invalid form" })
    }

    const email = String(form.email ?? "")
    const firstName =
      form.firstName != null ? String(form.firstName) : undefined
    const lastName = form.lastName != null ? String(form.lastName) : undefined

    if (!email) {
      return response(400, { error: "Missing email" })
    }

    const productIds = Object.keys(items)
    console.log("Fetched products:", productIds) // 👈 check fetched products

    const productResults = await Promise.all(
      productIds.map((id) => client.models.Product.get({ id }))
    )

    const productMap = new Map(
      productResults
        .map((res) => res.data)
        .filter(Boolean)
        .map((p) => [p?.id, p])
    )

    // 🧠 1. calculate total
    let totalCents = 0

    const orderItems = Object.entries(items as Record<string, unknown>).map(
      ([productId, quantity]) => {
        const product = productMap.get(productId)

        if (!product) {
          throw new Error(`Invalid product: ${productId}`)
        }

        const qty = Math.floor(Number(quantity))
        if (!Number.isFinite(qty) || qty < 1) {
          throw new Error(`Invalid quantity for ${productId}`)
        }

        const lineTotal = product.productPriceCents * qty

        totalCents += lineTotal

        return {
          productId,
          quantity: qty,
          productName: product.productName,
          priceCents: product.productPriceCents,
        }
      }
    )

    if (totalCents <= 0) {
      return response(400, { error: "Invalid total" })
    }

    // 🧾 2. create order
    const order = await client.models.Order.create({
      orderNumber: nanoid(),
      currency: "EUR",
      totalCents,
      email,
      firstName,
      lastName,
      status: "PENDING",
    })

    const orderId = order.data?.id

    if (!orderId) {
      throw new Error("Order creation failed")
    }

    // 📦 3. create order items
    await Promise.all(
      orderItems.map((item) =>
        client.models.OrderItem.create({
          orderID: orderId,
          ...item,
        })
      )
    )

    // 💳 4. create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId,
      },
    })

    // 🔗 5. update order with paymentIntentId
    await client.models.Order.update({
      id: orderId,
      paymentIntentId: paymentIntent.id,
    })

    const clientSecret = paymentIntent.client_secret
    if (!clientSecret) {
      throw new Error("Missing PaymentIntent client secret")
    }

    return response(200, {
      clientSecret,
      orderId,
    })
  } catch (err) {
    console.error("FULL ERROR:", err)

    return response(500, {
      error: String(err), // 👈 THIS LINE IS KEY
    })
  }
}

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "content-type",
//   "Access-Control-Allow-Methods": "POST,OPTIONS",
// }

function response(
  statusCode: number,
  body: Record<string, unknown>
): LambdaFunctionURLResult {
  return {
    statusCode,
    headers: {
      // ...corsHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
