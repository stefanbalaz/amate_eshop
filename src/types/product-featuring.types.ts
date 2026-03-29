// import type { SelectionSet } from "aws-amplify/api"
import type { SelectionSet } from "aws-amplify/data"
import type { TypeKeysEnum } from "./general.types"
import type { Schema } from "./amplify"

export const ProductFeaturingSelectionSet = [
  "id",
  "productFeaturingLabel",
  "productFeaturingClassName",
  "productFeaturingDescription",
  "productFeaturingIsActive",
] as const

export type ProductFeaturing = SelectionSet<
  Schema["ProductFeaturing"],
  typeof ProductFeaturingSelectionSet
>

export type CreateProductFeaturingInput =
  Schema["ProductFeaturing"]["createType"]

export type UpdateProductFeaturingInput =
  Schema["ProductFeaturing"]["updateType"]

export const ProductFeaturingTypeKeys: TypeKeysEnum<ProductFeaturing> = {
  id: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => d.id,
  },
  productFeaturingLabel: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.productFeaturingLabel,
  },
  productFeaturingClassName: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (d) => d.productFeaturingClassName,
  },
  productFeaturingDescription: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: (d) => d.productFeaturingDescription ?? "",
  },
  productFeaturingIsActive: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (d) => (d.productFeaturingIsActive ? "Yes" : "No"),
  },
}

// export const isKeyOfProductFeaturing = (key: string): key is keyof ProductFeaturing =>
//   key in ProductFeaturingTypeKeys

export const isKeyOfProductFeaturing = (
  key: PropertyKey
): key is keyof ProductFeaturing => key in ProductFeaturingTypeKeys
