import { deleteOrder } from "@/modules/api/order"
import type { Order } from "@/types"
import { queryClient, QueryKeys } from "@/types"
import { useMutation } from "@tanstack/react-query"

const useOrderDelete = () => {
  const queryKey = [QueryKeys.Orders]
  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onMutate: async (orderToDelete) => {
      await queryClient.cancelQueries({ queryKey })
      const previousOrder = queryClient.getQueryData<Order[]>(queryKey)
      if (previousOrder) {
        queryClient.setQueryData(
          queryKey,
          previousOrder.filter((u) => u.id !== orderToDelete.id)
        )
      }
      return { previousOrder }
    },
    // Add onError, onSuccess, etc. as needed
  })
  return deleteMutation
}

export default useOrderDelete
