import { fetchAuthSession } from "aws-amplify/auth"
import { client } from "@/lib/amplifyClient"
import {
  ProductSelectionSet,
  // type CreateProductInput,
  // type FeaturingItem,
  type Product,
  // type ProductFeatureItem,
  // type RawProduct,
  // type UpdateProductInput,
} from "@/types/product.types"
// import { client } from "@/types/queryClient"

// Product API
export const getProductsList = async (
  nextTokenParam: string | null = null,
  prevProductList: Product[] = []
): Promise<Product[]> => {
  await fetchAuthSession()

  const { data, nextToken, errors } = await client.models.Product.list({
    limit: 200,
    nextToken: nextTokenParam ?? undefined,
    selectionSet: ProductSelectionSet,
  })

  if (errors?.length) {
    console.warn("Product.list GraphQL errors:", errors)
  }

  const productList = [...prevProductList, ...data]

  if (nextToken) {
    return getProductsList(nextToken, productList)
  }

  return [...productList].sort((a, b) => {
    const aSorting = a.productSorting ?? Number.MAX_SAFE_INTEGER
    const bSorting = b.productSorting ?? Number.MAX_SAFE_INTEGER
    return aSorting - bSorting
  })
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

export const deleteProduct = async (product: Product) => {
  const { data } = await client.models.Product.delete({
    id: product.id,
  })

  if (!data) return null

  return product
}

export const isProductUsed = (_product: Product): boolean => {
  console.log("Checking if Product is used:", _product)
  return true
}
