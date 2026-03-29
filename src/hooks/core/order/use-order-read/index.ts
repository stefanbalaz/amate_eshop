import { getOrder } from "@/modules/api"
import { QueryKeys } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

type OrderReadParamsType = {
  ordersID: string
}

const useOrderRead = (ordersIDParam?: string) => {
  const { ordersID } = useParams<OrderReadParamsType>()
  const ordersIDValue = ordersIDParam ?? ordersID
  const { data: order, isLoading } = useQuery({
    queryKey: [QueryKeys.Orders, ordersIDValue],
    queryFn: async () => {
      if (!ordersIDValue) return null
      const orderFromAPI = await getOrder(ordersIDValue)
      return orderFromAPI
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  })
  return { order, isLoading }
}

export default useOrderRead
