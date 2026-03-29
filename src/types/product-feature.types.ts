// import type { SelectionSet } from "aws-amplify/api"
import type { SelectionSet } from "aws-amplify/data"
import type { TypeKeysEnum } from "./general.types"
import type { Schema } from "./amplify"

export const ProductFeatureSelectionSet = [
  "id",
  "productFeatureIcon",
  "productFeatureLabel",
  "productFeatureClassName",
  "productFeatureDescription",
  "productFeatureIsActive",
] as const

export type ProductFeature = SelectionSet<
  Schema["ProductFeature"],
  typeof ProductFeatureSelectionSet
>

export type CreateProductFeatureInput = Schema["ProductFeature"]["createType"]

export type UpdateProductFeatureInput = Schema["ProductFeature"]["updateType"]

export const ProductFeatureTypeKeys: TypeKeysEnum<ProductFeature> = {
  id: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => d.id,
  },
  productFeatureLabel: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.productFeatureLabel,
  },
  productFeatureClassName: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.productFeatureClassName,
  },
  productFeatureDescription: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: (d) => d.productFeatureDescription ?? "",
  },
  productFeatureIcon: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: (d) => d.productFeatureIcon ?? "",
  },
  productFeatureIsActive: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => (d.productFeatureIsActive ? "Yes" : "No"),
  },
}

// export const isKeyOfProductFeatures = (key: string): key is keyof ProductFeatures =>
//   key in ProductFeaturesTypeKeys

export const isKeyOfProductFeature = (
  key: PropertyKey
): key is keyof ProductFeature => key in ProductFeatureTypeKeys
