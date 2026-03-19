import type { SelectionSet } from "aws-amplify/api"
import type { TypeKeysEnum } from "./general.types"
import type { Schema } from "./queryClient"
import { getDateAndTimeInGermanFromAWSDateTimeFormat } from "@/utils/dates"

export const ProductSelectionSet = [
  "id",
  "productBrand",
  "productName",
  "productVolume",
  "productPrice",
  "productPicture",
  "color",
  "featuring",
  "productFeatures",
  "createdAt",
  "updatedAt",
] as const

export type Product = SelectionSet<
  Schema["Product"],
  typeof ProductSelectionSet
>

export type CreateProductInput = Schema["Product"]["createType"]

export type UpdateProductInput = Schema["Product"]["updateType"]

export const ProductTypeKeys: TypeKeysEnum<Product> = {
  id: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => d.id,
  },
  productBrand: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.productBrand,
  },
  productName: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.productName,
  },
  productVolume: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => d.productVolume,
  },
  productPrice: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => d.productPrice,
  },
  productPicture: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: (d) => d.productPicture,
  },
  color: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.color,
  },
  featuring: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: (d) => JSON.stringify(d.featuring),
  },
  productFeatures: {
    type: "object",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: (d) => JSON.stringify(d.productFeatures),
  },
  createdAt: {
    type: "datetime",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) =>
      getDateAndTimeInGermanFromAWSDateTimeFormat(d.createdAt) + " Uhr",
  },
  updatedAt: {
    type: "datetime",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) =>
      getDateAndTimeInGermanFromAWSDateTimeFormat(d.updatedAt) + " Uhr",
  },
}

export const isKeyOfProduct = (key: string): key is keyof Product =>
  key in ProductTypeKeys
