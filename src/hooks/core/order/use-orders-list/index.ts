import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { QueryKeys } from "@/types"
import { getOrdersList } from "@/modules/api/order"

const useOrdersList = () => {
  const queryKey = [QueryKeys.Orders]
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const queryResult = await getOrdersList(null, [])
      return queryResult
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })
  const ordersList = useMemo(() => (data ? data : []), [data])
  return {
    ordersList,
    isLoading,
  }
}

export default useOrdersList
