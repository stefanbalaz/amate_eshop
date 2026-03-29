import type { SelectionSet } from "aws-amplify/data"
import type { TypeKeysEnum } from "./general.types"
import type { Schema } from "./amplify"

// ------------------------
// SELECTION SET
// ------------------------

export const OrderSelectionSet = [
  "id",
  "orderNumber",
  "status",
  "paymentMethod",
  "paymentStatus",
  "currency",
  "totalCents",
  "email",
  "firstName",
  "lastName",
  "deliveryAddress.*",
  "invoiceAddress.*",
  "isCompany",
  "companyName",
  "orderNotes",

  "items.*",
] as const

// ------------------------
// TYPES
// ------------------------

export type Order = SelectionSet<Schema["Order"], typeof OrderSelectionSet>

export type CreateOrderInput = Schema["Order"]["createType"]
export type UpdateOrderInput = Schema["Order"]["updateType"]

// ------------------------
// TYPE KEYS CONFIG
// ------------------------

export const OrderTypeKeys: TypeKeysEnum<Order> = {
  id: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => d.id,
  },

  orderNumber: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.orderNumber,
  },

  status: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.status ?? "",
  },

  paymentMethod: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.paymentMethod ?? "",
  },

  paymentStatus: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.paymentStatus ?? "",
  },

  currency: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => d.currency,
  },

  totalCents: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => String(d.totalCents),
  },

  email: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.email,
  },

  firstName: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.firstName ?? "",
  },

  lastName: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.lastName ?? "",
  },

  deliveryAddress: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: (d) => JSON.stringify(d.deliveryAddress ?? {}),
  },

  invoiceAddress: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: (d) => JSON.stringify(d.invoiceAddress ?? {}),
  },

  isCompany: {
    type: "boolean",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => String(d.isCompany ?? false),
  },

  companyName: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.companyName ?? "",
  },

  orderNotes: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: (d) => d.orderNotes ?? "",
  },

  // items: {
  //   type: "object",
  //   isArray: true,
  //   isRequired: true,
  //   isSortable: false,
  //   isSearchable: false,
  //   formatter: (d) => JSON.stringify(d.items ?? []),
  // },

  items: {
    type: "object",
    isArray: true, // ✅ now it's an array
    isRequired: false, // relation may be empty
    isSortable: false,
    isSearchable: false,
    formatter: (d) =>
      JSON.stringify(
        d.items?.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          productName: item.productName,
          priceCents: item.priceCents,
        })) ?? []
      ),
  },
}

// ------------------------
// TYPE GUARD
// ------------------------

export const isKeyOfOrder = (key: PropertyKey): key is keyof Order =>
  key in OrderTypeKeys
