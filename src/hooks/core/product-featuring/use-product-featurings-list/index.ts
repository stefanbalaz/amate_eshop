import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { QueryKeys } from "@/types"
import { getProductFeaturingList } from "@/modules/api"

const useProductFeaturingsList = () => {
  const queryKey = [QueryKeys.ProductFeaturings]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const queryResult = await getProductFeaturingList(null, [])
      return queryResult
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })

  const productFeaturingsList = useMemo(() => (data ? data : []), [data])

  return {
    productFeaturingsList,
    isLoading,
  }
}

export default useProductFeaturingsList
