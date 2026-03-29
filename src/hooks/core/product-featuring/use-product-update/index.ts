// import { updateProductFeaturing } from "@/modules/api"
// import { queryClient, QueryKeys, type ProductFeaturing } from "@/types"
// import { useMutation } from "@tanstack/react-query"

// const useProductFeaturingUpdate = () => {
//   const queryKey = [QueryKeys.ProductFeaturings]

//   const updateMutation = useMutation({
//     mutationFn: updateProductFeaturing,
//     // When mutate is called:
//     onMutate: async (newProductFeaturing) => {
//       // console.log('WIP16 INSIDE onMutate newProductFeaturing:', newProductFeaturing);

//       // Cancel any outgoing refetches
//       await queryClient.cancelQueries({ queryKey })

//       // Snapshot the previous value
//       const previousProductFeaturing = queryClient.getQueryData<ProductFeaturing[]>(queryKey)

//       // Optimistically update to the new value
//       if (previousProductFeaturing) {
//         queryClient.setQueryData(
//           queryKey,
//           previousProductFeaturing.map((u) =>
//             u.id === newProductFeaturing.id ? { ...u, ...newProductFeaturing } : u
//           )
//         )
//       }

//       // Also update the individual productFeaturings read query
//       // const individualQueryKey = [QueryKeys.ProductFeaturing, newProductFeaturing.id];
//       // queryClient.setQueryData(individualQueryKey, newProductFeaturing);

//       // Return a context with the previous and new absence
//       return {
//         previousProductFeaturing,
//       }
//     },
//     // If the mutation fails, use the context we returned above
//     onError: (_err, _newProductFeaturing, context) => {
//       // console.error('Error updating record:', err, newProductFeaturing);
//       if (context?.previousProductFeaturing) {
//         queryClient.setQueryData(queryKey, context.previousProductFeaturing)
//       }
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey })
//       // queryClient.invalidateQueries({
//       //   queryKey: [QueryKeys.ProductFeaturing, newProductFeaturing.id],
//       // });
//     },
//   })

//   return updateMutation
// }

// export default useProductFeaturingUpdate
