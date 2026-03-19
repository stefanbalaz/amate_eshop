import { useMutation } from "@tanstack/react-query"
// import { queryClient, QueryKeys } from "queryClient"

import { queryClient, QueryKeys, type Product } from "@/types"
import { createProduct } from "@/modules/api"

const useProductCreate = () => {
  const queryKey = [QueryKeys.Products]

  const createMutation = useMutation({
    mutationFn: createProduct,
    // When mutate is called:
    onMutate: async (newProduct) => {
      // console.log('WIP15 INSIDE onMutate newProduct:', newProduct);

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey })

      // Snapshot the previous value
      const previousProduct = queryClient.getQueryData<Product[]>(queryKey)

      // Optimistically update to the new value
      if (previousProduct) {
        queryClient.setQueryData(queryKey, [newProduct, ...previousProduct])
      }

      // Return a context object with the snapshotted value
      return { previousProduct }
    },
    // If the mutation fails,
    // use the context returned from onMutate to rollback
    onError: (err, newProduct, context) => {
      // console.error('Error saving record:', err, newProduct);
      if (context?.previousProduct) {
        queryClient.setQueryData(queryKey, context.previousProduct)
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return createMutation
}

export default useProductCreate
