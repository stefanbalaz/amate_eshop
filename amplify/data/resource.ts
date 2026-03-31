import { type ClientSchema, a, defineData } from "@aws-amplify/backend"

const schema = a.schema({
  // ------------------------
  // FEATURING (shared badge)
  // ------------------------
  ProductFeaturing: a
    .model({
      productFeaturingLabel: a.string().required(),
      productFeaturingClassName: a.string().required(),
      productFeaturingDescription: a.string(),
      productFeaturingIsActive: a.boolean().required(),

      // 1 Featuring -> many Products
      products: a.hasMany("Product", "productFeaturingID"),
    })
    .authorization((allow) => [allow.guest()]),

  // ------------------------
  // PRODUCT FEATURE (list items)
  // ------------------------
  ProductFeature: a
    .model({
      productFeatureIcon: a.string().required(),
      productFeatureLabel: a.string().required(),
      productFeatureClassName: a.string().required(),
      productFeatureDescription: a.string(),
      productFeatureIsActive: a.boolean().required(),

      // belongs to Product
      // productID: a.id().required(),
      // product: a.belongsTo("Product", "productID"),
      products: a.hasMany("ProductFeatureAssignment", "featureID"),
    })
    .authorization((allow) => [allow.guest()]),

  // ------------------------
  // PRODUCT FEATURE ASSIGNMENT (join model for many-to-many relation between Product and ProductFeature)
  // ------------------------
  ProductFeatureAssignment: a
    .model({
      productID: a.id().required(),
      featureID: a.id().required(),

      product: a.belongsTo("Product", "productID"),
      feature: a.belongsTo("ProductFeature", "featureID"),
    })
    .authorization((allow) => [allow.guest()]),

  // ------------------------
  // PRODUCT
  // ------------------------
  Product: a
    .model({
      productBrand: a.string().required(),
      productName: a.string().required(),
      productVolumeMilliliter: a.integer().required(),
      productPriceCents: a.integer().required(),
      productPicture: a.string().required(),
      productColorClassName: a.string().required(),
      productShortDescription: a.string(),
      productDescription: a.json(),
      productLegalDisclaimer: a.json(),
      productSorting: a.integer().required(),
      productNutritionalInfo: a.json(),
      productIngredients: a.json(),
      productIsActive: a.boolean().required(),
      // color: a.string().required(),

      // ------------------------
      // Featuring (optional 1:many)
      // ------------------------
      productFeaturingID: a.id(), // optional FK
      productFeaturing: a.belongsTo("ProductFeaturing", "productFeaturingID"),

      // ------------------------
      // ProductFeatures (1:n)
      // ------------------------
      // productFeatures: a.hasMany("ProductFeature", "productID"),
      productFeatures: a.hasMany("ProductFeatureAssignment", "productID"),

      // ✅ ADD THIS
      orderItems: a.hasMany("OrderItem", "productId"),
    })
    .authorization((allow) => [allow.guest()]),

  Address: a.customType({
    streetName: a.string(),
    houseNumber: a.string(),
    zip: a.string(),
    city: a.string(),
    country: a.string(),
  }),

  // ------------------------
  // ORDER ITEM
  // ------------------------
  OrderItem: a
    .model({
      orderID: a.id().required(),

      order: a.belongsTo("Order", "orderID"),

      productId: a.id().required(),
      product: a.belongsTo("Product", "productId"),

      quantity: a.integer().required(),

      productName: a.string().required(),
      priceCents: a.integer().required(),
    })
    .authorization((allow) => [allow.guest()]),

  // ------------------------
  // ORDER
  // ------------------------
  Order: a
    .model({
      orderNumber: a.string().required(),

      // ------------------------
      // STATUS
      // ------------------------
      status: a.string(),
      paymentMethod: a.string(),
      paymentStatus: a.string(),

      // ------------------------
      // PRICING
      // ------------------------
      currency: a.string().required(),
      totalCents: a.integer().required(),

      // ------------------------
      // CUSTOMER
      // ------------------------
      email: a.email().required(),
      phone: a.string(),

      firstName: a.string(),
      lastName: a.string(),

      // ------------------------
      // ADDRESSES
      // ------------------------
      deliveryAddress: a.ref("Address"),
      invoiceAddress: a.ref("Address"),

      isDifferentInvoice: a.boolean(),

      // ------------------------
      // COMPANY INFO
      // ------------------------
      isCompany: a.boolean(),
      companyName: a.string(),
      companyRegistrationNumber: a.string(),
      taxIdentificationNumber: a.string(),
      vatNumber: a.string(),

      // ------------------------
      // OTHER
      // ------------------------
      orderNotes: a.string(),

      // ------------------------
      // RELATION → OrderItems
      // ------------------------
      items: a.hasMany("OrderItem", "orderID"),
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
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
  },
})
