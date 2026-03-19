import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // ------------------------
  // PRODUCT
  // ------------------------
  Product: a
    .model({
      sku: a.string().required(),
      name: a.string().required(),
      slug: a.string().required(),
      description: a.string(),
      imageUrl: a.url(),

      priceCents: a.integer().required(),
      currency: a.string().required(),

      stock: a.integer().required(),
      isActive: a.boolean().required(),

      category: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

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
    .authorization((allow) => [allow.publicApiKey()]),

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
    .authorization((allow) => [allow.publicApiKey()]),

  // ------------------------
  // NEWSLETTER
  // ------------------------
  NewsletterSubscriber: a
    .model({
      email: a.email().required(),
      isActive: a.boolean().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
  },
});
