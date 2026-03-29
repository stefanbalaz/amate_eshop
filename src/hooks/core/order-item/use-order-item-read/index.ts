import { getOrderItem } from "@/modules/api/order-item"
import { QueryKeys } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

type OrderItemReadParamsType = {
  orderItemID: string
}

const useOrderItemRead = (orderItemIDParam?: string) => {
  const { orderItemID } = useParams<OrderItemReadParamsType>()
  const orderItemIDValue = orderItemIDParam ?? orderItemID
  const { data: orderItem, isLoading } = useQuery({
    queryKey: [QueryKeys.OrderItems, orderItemIDValue],
    queryFn: async () => {
      if (!orderItemIDValue) return null
      const orderItemFromAPI = await getOrderItem(orderItemIDValue)
      return orderItemFromAPI
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })
  return { orderItem, isLoading }
}

export default useOrderItemRead
