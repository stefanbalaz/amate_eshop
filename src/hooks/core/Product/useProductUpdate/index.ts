import { updateProduct } from "@/modules/api"
import { queryClient, QueryKeys, type Product } from "@/types"
import { useMutation } from "@tanstack/react-query"

const useProductUpdate = () => {
  const queryKey = [QueryKeys.Products]

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    // When mutate is called:
    onMutate: async (newProduct) => {
      // console.log('WIP16 INSIDE onMutate newProduct:', newProduct);

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey })

      // Snapshot the previous value
      const previousProduct = queryClient.getQueryData<Product[]>(queryKey)

      // Optimistically update to the new value
      if (previousProduct) {
        queryClient.setQueryData(
          queryKey,
          previousProduct.map((u) =>
            u.id === newProduct.id ? { ...u, ...newProduct } : u
          )
        )
      }

      // Also update the individual products read query
      // const individualQueryKey = [QueryKeys.Product, newProduct.id];
      // queryClient.setQueryData(individualQueryKey, newProduct);

      // Return a context with the previous and new absence
      return {
        previousProduct,
      }
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, _newProduct, context) => {
      // console.error('Error updating record:', err, newProduct);
      if (context?.previousProduct) {
        queryClient.setQueryData(queryKey, context.previousProduct)
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
      // queryClient.invalidateQueries({
      //   queryKey: [QueryKeys.Product, newProduct.id],
      // });
    },
  })

  return updateMutation
}

export default useProductUpdate
