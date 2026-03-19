import { type ClientSchema, a, defineData } from "@aws-amplify/backend"

const schema = a.schema({
  // ------------------------
  // PRODUCT
  // ------------------------
  Product: a
    .model({
      productBrand: a.string().required(),
      productName: a.string().required(),
      productVolume: a.string().required(),
      productPrice: a.string().required(),
      productPicture: a.string().required(),
      color: a.string().required(),
      featuring: a.json(),
      productFeatures: a.json().required(),
    })
    .authorization((allow) => [allow.guest()]),

  // ------------------------
  // ORDER
  // ------------------------
  Order: a
    .model({
      orderNumber: a.string().required(),

      status: a.string(),
      paymentMethod: a.string(),
      paymentStatus: a.string(),

      currency: a.string().required(),
      totalCents: a.integer().required(),

      email: a.email().required(),
      firstName: a.string(),
      lastName: a.string(),

      deliveryAddress: a.string(),
      invoiceAddress: a.string(),

      isCompany: a.boolean(),
      companyName: a.string(),

      orderNotes: a.string(),

      items: a.json().required(),
    })
    .authorization((allow) => [allow.guest()]),

  // ------------------------
  // CONTACT
  // ------------------------
  ContactMessage: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      message: a.string().required(),
      isResolved: a.boolean().required(),
    })
    .authorization((allow) => [allow.guest()]),

  // ------------------------
  // NEWSLETTER
  // ------------------------
  NewsletterSubscriber: a
    .model({
      email: a.email().required(),
      isActive: a.boolean().required(),
    })
    .authorization((allow) => [allow.guest()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
})
