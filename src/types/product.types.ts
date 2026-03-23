import type { SelectionSet } from "aws-amplify/data"
import type { TypeKeysEnum } from "./general.types"
import type { Schema } from "./amplify"

export const ProductSelectionSet = [
  "id",
  "productBrand",
  "productName",
  "productVolumeMilliliter",
  "productPriceCents",
  "productPicture",
  "productColorClassName",
  "productShortDescription",
  "productDescription",
  "productLegalDisclaimer",
  "productSorting",
  "productNutritionalInfo",
  "productIngredients",
  "productFeaturing.*",
  "productFeatures.*",
  "productFeatures.feature.*",
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
  productVolumeMilliliter: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => String(d.productVolumeMilliliter),
  },
  productPriceCents: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => String(d.productPriceCents),
  },
  productPicture: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: (d) => d.productPicture,
  },
  productColorClassName: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: true,
    formatter: (d) => d.productColorClassName,
  },
  productShortDescription: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: (d) => d.productShortDescription ?? "",
  },
  productDescription: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: (d) => JSON.stringify(d.productDescription ?? {}),
  },
  productLegalDisclaimer: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: (d) => JSON.stringify(d.productLegalDisclaimer ?? {}),
  },
  productSorting: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => String(d.productSorting),
  },
  productNutritionalInfo: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: (d) => JSON.stringify(d.productNutritionalInfo ?? {}),
  },
  productIngredients: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: (d) => JSON.stringify(d.productIngredients ?? {}),
  },
  productFeaturing: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    // formatter: (d) => String(d.productFeaturing),
    formatter: () => "",
  },
  productFeatures: {
    type: "object",
    isArray: true,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
}

// export const isKeyOfProduct = (key: string): key is keyof Product =>
//   key in ProductTypeKeys

export const isKeyOfProduct = (key: PropertyKey): key is keyof Product =>
  key in ProductTypeKeys
