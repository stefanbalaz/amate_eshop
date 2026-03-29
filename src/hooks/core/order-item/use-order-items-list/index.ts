import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { QueryKeys } from "@/types"
import { getOrderItemsList } from "@/modules/api/order-item"

const useOrderItemsList = () => {
  const queryKey = [QueryKeys.OrderItems]
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const queryResult = await getOrderItemsList(null, [])
      return queryResult
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })
  const orderItemsList = useMemo(() => (data ? data : []), [data])
  return {
    orderItemsList,
    isLoading,
  }
}

export default useOrderItemsList
