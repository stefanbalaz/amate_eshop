import { updateOrder } from "@/modules/api"
import { queryClient, QueryKeys, type Order } from "@/types"
import { useMutation } from "@tanstack/react-query"

const useOrderUpdate = () => {
  const queryKey = [QueryKeys.Orders]
  const updateMutation = useMutation({
    mutationFn: updateOrder,
    onMutate: async (newOrder) => {
      await queryClient.cancelQueries({ queryKey })
      const previousOrder = queryClient.getQueryData<Order[]>(queryKey)
      if (previousOrder) {
        queryClient.setQueryData(
          queryKey,
          previousOrder.map((u) =>
            u.id === newOrder.id ? { ...u, ...newOrder } : u
          )
        )
      }
      // Optionally update the individual order read query
      return { previousOrder }
    },
    // Add onError, onSuccess, etc. as needed
  })
  return updateMutation
}

export default useOrderUpdate
