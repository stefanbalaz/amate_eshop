import { fetchAuthSession } from "aws-amplify/auth"
import { client } from "@/lib/amplifyClient"
import {
  ProductFeaturingSelectionSet,
  type ProductFeaturing,
} from "@/types/product-featuring.types"

// ProductFeaturing API
export const getProductFeaturingList = async (
  nextTokenParam: string | null = null,
  prevProductFeaturingList: ProductFeaturing[] = []
): Promise<ProductFeaturing[]> => {
  await fetchAuthSession()

  const { data, nextToken, errors } = await client.models.ProductFeaturing.list(
    {
      limit: 200,
      nextToken: nextTokenParam ?? undefined,
      selectionSet: ProductFeaturingSelectionSet,
    }
  )

  if (errors?.length) {
    console.warn("ProductFeaturing.list GraphQL errors:", errors)
  }

  const productFeaturingsList = [...prevProductFeaturingList, ...data]

  if (nextToken) {
    return getProductFeaturingList(nextToken, productFeaturingsList)
  }

  return productFeaturingsList
}

// const mapProduct = (p: RawProduct): Product => {
//   return {
//     ...p,
//     featuring: Array.isArray(p.featuring)
//       ? (p.featuring as FeaturingItem[])
//       : undefined,
//     productFeatures: Array.isArray(p.productFeatures)
//       ? (p.productFeatures as ProductFeatureItem[])
//       : [],
//   }
// }

// export const getProductsList = async (
//   nextTokenParam: string | null = null,
//   prevProductList: Product[] = []
// ): Promise<Product[]> => {
//   const { data, nextToken } = await client.models.Product.list({
//     limit: 200,
//     nextToken: nextTokenParam,
//     selectionSet: ProductSelectionSet,
//   })

//   console.log("Fetched products:", data)

//   const mapped = data
//     .filter((product): product is RawProduct => product !== null)
//     .map(mapProduct)

//   const productList = [...prevProductList, ...mapped]

//   return nextToken ? getProductsList(nextToken, productList) : productList
// }

// export const getProduct = async (id: string): Promise<Product | null> => {
//   const { data } = await client.models.Product.get(
//     {
//       id,
//     },
//     {
//       selectionSet: ProductSelectionSet,
//     }
//   )

//   return data
// }

// export const createProduct = async (input: CreateProductInput) => {
//   const { data } = await client.models.Product.create(input)

//   if (!data) return null

//   const product = await getProduct(data.id)

//   return product
// }

// export const updateProduct = async (input: UpdateProductInput) => {
//   const { data } = await client.models.Product.update(input)

//   if (!data) return null

//   const product = await getProduct(data.id)

//   return product
// }

export const deleteProductFeaturing = async (
  productFeaturing: ProductFeaturing
) => {
  const { data } = await client.models.ProductFeaturing.delete({
    id: productFeaturing.id,
  })

  if (!data) return null

  return productFeaturing
}

export const isProductFeaturingUsed = (
  _productFeaturing: ProductFeaturing
): boolean => {
  console.log("Checking if ProductFeaturing is used:", _productFeaturing)
  return true
}
