import type { SelectionSet } from "aws-amplify/data"
import type { TypeKeysEnum } from "./general.types"
import type { Schema } from "./amplify"

// ------------------------
// SELECTION SET
// ------------------------

export const OrderItemSelectionSet = [
  "id",
  "orderID",
  "productId",
  "product.*",
  "quantity",
  "productName",
  "priceCents",
] as const

// ------------------------
// TYPES
// ------------------------

export type OrderItem = SelectionSet<
  Schema["OrderItem"],
  typeof OrderItemSelectionSet
>

export type CreateOrderItemInput = Schema["OrderItem"]["createType"]
export type UpdateOrderItemInput = Schema["OrderItem"]["updateType"]

// ------------------------
// TYPE KEYS CONFIG
// ------------------------

export const OrderItemTypeKeys: TypeKeysEnum<OrderItem> = {
  id: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => d.id,
  },
  orderID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => d.orderID,
  },
  productId: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => d.productId,
  },
  product: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: (d) => JSON.stringify(d.product ?? {}),
  },
  quantity: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => String(d.quantity),
  },
  productName: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.productName,
  },
  priceCents: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => String(d.priceCents),
  },
}
