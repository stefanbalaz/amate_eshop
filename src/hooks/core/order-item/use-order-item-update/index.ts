import { updateOrderItem } from "@/modules/api/order-item"
import { queryClient, QueryKeys, type OrderItem } from "@/types"
import { useMutation } from "@tanstack/react-query"

const useOrderItemUpdate = () => {
  const queryKey = [QueryKeys.OrderItems]
  const updateMutation = useMutation({
    mutationFn: updateOrderItem,
    onMutate: async (newOrderItem) => {
      await queryClient.cancelQueries({ queryKey })
      const previousOrderItems = queryClient.getQueryData<OrderItem[]>(queryKey)
      if (previousOrderItems) {
        queryClient.setQueryData(
          queryKey,
          previousOrderItems.map((u) =>
            u.id === newOrderItem.id ? { ...u, ...newOrderItem } : u
          )
        )
      }
      // Optionally update the individual order item read query
      return { previousOrderItems }
    },
    // Add onError, onSuccess, etc. as needed
  })
  return updateMutation
}

export default useOrderItemUpdate
