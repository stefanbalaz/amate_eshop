import { useMutation } from "@tanstack/react-query"
import { queryClient, QueryKeys, type Order } from "@/types"
import { createOrder } from "@/modules/api/order"

const useOrderCreate = () => {
  const queryKey = [QueryKeys.Orders]

  const createMutation = useMutation({
    mutationFn: createOrder,
    onMutate: async (newOrder) => {
      await queryClient.cancelQueries({ queryKey })
      const previousOrder = queryClient.getQueryData<Order[]>(queryKey)
      if (previousOrder) {
        queryClient.setQueryData(queryKey, [newOrder, ...previousOrder])
      }
      return { previousOrder }
    },
    // Add onError, onSuccess, etc. as needed
  })

  return createMutation
}

export default useOrderCreate
