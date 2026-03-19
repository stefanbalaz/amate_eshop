import { deleteProduct } from "@/modules/api"
import type { Product } from "@/modules/home/components/product-card"
import { queryClient, QueryKeys } from "@/types/queryClient"
import { useMutation } from "@tanstack/react-query"

const useProductDelete = () => {
  const queryKey = [QueryKeys.Products]

  // const deleteContactMutation = useContactDelete();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    // When mutate is called:
    onMutate: async (productsToDelete) => {
      // console.log('WIP16 Deleting Job Title:', productsToDelete);

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey })

      // Snapshot the previous value
      const previousProduct = queryClient.getQueryData<Product[]>(queryKey)

      // Optimistically update to the new value
      if (previousProduct) {
        queryClient.setQueryData(
          queryKey,
          previousProduct.filter((u) => u.id !== productsToDelete.id)
        )
      }

      // Return a context with the previous and new products
      return {
        previousProduct,
      }
    },
    // If the mutation fails, use the context we returned above
    onError: (err, productsToDelete, context) => {
      // console.error('Error deleting record:', err, productsToDelete);
      if (context?.previousProduct) {
        queryClient.setQueryData(queryKey, context.previousProduct)
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return deleteMutation
}

export default useProductDelete
