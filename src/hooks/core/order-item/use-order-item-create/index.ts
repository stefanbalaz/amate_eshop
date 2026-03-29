import { useMutation } from "@tanstack/react-query"
import { queryClient, QueryKeys, type OrderItem } from "@/types"
import { createOrderItem } from "@/modules/api/order-item"

const useOrderItemCreate = () => {
  const queryKey = [QueryKeys.OrderItems]

  const createMutation = useMutation({
    mutationFn: createOrderItem,
    onMutate: async (newOrderItem) => {
      await queryClient.cancelQueries({ queryKey })
      const previousOrderItems = queryClient.getQueryData<OrderItem[]>(queryKey)
      if (previousOrderItems) {
        queryClient.setQueryData(queryKey, [
          newOrderItem,
          ...previousOrderItems,
        ])
      }
      return { previousOrderItems }
    },
    // Add onError, onSuccess, etc. as needed
  })

  return createMutation
}

export default useOrderItemCreate
