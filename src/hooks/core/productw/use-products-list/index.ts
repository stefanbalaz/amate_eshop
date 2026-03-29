import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { QueryKeys } from "@/types"
import { getProductsList } from "@/modules/api/product"

const useProductsList = () => {
  const queryKey = [QueryKeys.Products]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const queryResult = await getProductsList(null, [])
      return queryResult
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })

  const productsList = useMemo(() => (data ? data : []), [data])

  return {
    productsList,
    isLoading,
  }
}

export default useProductsList
