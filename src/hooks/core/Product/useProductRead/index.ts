"use client"

import { getProduct } from "@/modules/api"
import { QueryKeys } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

type ProductReadParamsType = {
  productsID: string
}

const useProductRead = (productsIDParam?: string) => {
  const { productsID } = useParams<ProductReadParamsType>()

  const productsIDValue = productsIDParam ?? productsID

  const { data: products, isLoading } = useQuery({
    queryKey: [QueryKeys.Products, productsIDValue],
    queryFn: async () => {
      if (!productsIDValue) return null

      const productsFromAPI = await getProduct(productsIDValue)

      return productsFromAPI
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })

  useEffect(() => {
    if (!productsIDValue) {
      console.warn("No products ID provided for useProductRead")
    }
  }, [productsIDValue])

  return {
    productsID,
    products: products ?? null,
    isLoading,
  }
}

export default useProductRead
