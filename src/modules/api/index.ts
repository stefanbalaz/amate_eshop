import {
  ProductSelectionSet,
  type CreateProductInput,
  type Product,
  type UpdateProductInput,
} from "@/types/product.types"
import { client } from "@/types/queryClient"

// Product API
export const getProductsList = async (
  nextTokenParam: string | null = null,
  prevProductList: Product[] = []
): Promise<Product[]> => {
  const { data, nextToken } = await client.models.Product.list({
    limit: 200,
    nextToken: nextTokenParam,
    selectionSet: ProductSelectionSet,
  })
  const productList = [...prevProductList, ...data]

  return nextToken ? getProductsList(nextToken, productList) : productList
}

export const getProduct = async (id: string): Promise<Product | null> => {
  const { data } = await client.models.Product.get(
    {
      id,
    },
    {
      selectionSet: ProductSelectionSet,
    }
  )

  return data
}

export const createProduct = async (input: CreateProductInput) => {
  const { data } = await client.models.Product.create(input)

  if (!data) return null

  const product = await getProduct(data.id)

  return product
}

export const updateProduct = async (input: UpdateProductInput) => {
  const { data } = await client.models.Product.update(input)

  if (!data) return null

  const product = await getProduct(data.id)

  return product
}

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
