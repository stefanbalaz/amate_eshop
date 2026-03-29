// import { queryClient, QueryKeys, type ProductFeaturing } from "@/types"
// // import { queryClient, QueryKeys } from "@/types/queryClient"
// import { useMutation } from "@tanstack/react-query"

// const useProductFeaturingDelete = () => {
//   const queryKey = [QueryKeys.ProductFeaturings]

//   // const deleteContactMutation = useContactDelete();

//   const deleteMutation = useMutation({
//     mutationFn: deleteProductFeaturing,
//     // When mutate is called:
//     onMutate: async (productFeaturingsToDelete) => {
//       // console.log('WIP16 Deleting Job Title:', productFeaturingsToDelete);

//       // Cancel any outgoing refetches
//       await queryClient.cancelQueries({ queryKey })

//       // Snapshot the previous value
//       const previousProductFeaturing =
//         queryClient.getQueryData<ProductFeaturing[]>(queryKey)

//       // Optimistically update to the new value
//       if (previousProductFeaturing) {
//         queryClient.setQueryData(
//           queryKey,
//           previousProductFeaturing.filter(
//             (u) => u.id !== productFeaturingsToDelete.id
//           )
//         )
//       }

//       // Return a context with the previous and new productFeaturings
//       return {
//         previousProductFeaturing,
//       }
//     },
//     // If the mutation fails, use the context we returned above
//     onError: (_err, _productFeaturingsToDelete, context) => {
//       // console.error('Error deleting record:', err, productFeaturingsToDelete);
//       if (context?.previousProductFeaturing) {
//         queryClient.setQueryData(queryKey, context.previousProductFeaturing)
//       }
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey })
//     },
//   })

//   return deleteMutation
// }

// export default useProductFeaturingDelete
