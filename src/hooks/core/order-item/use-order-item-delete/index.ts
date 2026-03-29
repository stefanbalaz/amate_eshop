import { deleteOrderItem } from "@/modules/api/order-item"
import type { OrderItem } from "@/types"
import { queryClient, QueryKeys } from "@/types"
import { useMutation } from "@tanstack/react-query"

const useOrderItemDelete = () => {
  const queryKey = [QueryKeys.OrderItems]
  const deleteMutation = useMutation({
    mutationFn: deleteOrderItem,
    onMutate: async (orderItemToDelete) => {
      await queryClient.cancelQueries({ queryKey })
      const previousOrderItems = queryClient.getQueryData<OrderItem[]>(queryKey)
      if (previousOrderItems) {
        queryClient.setQueryData(
          queryKey,
          previousOrderItems.filter((u) => u.id !== orderItemToDelete.id)
        )
      }
      return { previousOrderItems }
    },
    // Add onError, onSuccess, etc. as needed
  })
  return deleteMutation
}

export default useOrderItemDelete
