import { type ClientSchema, a, defineData } from "@aws-amplify/backend"

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
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
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
  },
})

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
