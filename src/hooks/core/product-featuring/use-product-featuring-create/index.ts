// import { useMutation } from "@tanstack/react-query"
// // import { queryClient, QueryKeys } from "queryClient"

// import { queryClient, QueryKeys, type ProductFeaturing } from "@/types"
// import { createProductFeaturing } from "@/modules/api"

// const useProductFeaturingCreate = () => {
//   const queryKey = [QueryKeys.ProductFeaturings]

//   const createMutation = useMutation({
//     mutationFn: createProductFeaturing,
//     // When mutate is called:
//     onMutate: async (newProductFeaturing) => {
//       // console.log('WIP15 INSIDE onMutate newProductFeaturing:', newProductFeaturing);

//       // Cancel any outgoing refetches
//       await queryClient.cancelQueries({ queryKey })

//       // Snapshot the previous value
//       const previousProductFeaturing = queryClient.getQueryData<ProductFeaturing[]>(queryKey)

//       // Optimistically update to the new value
//       if (previousProductFeaturing) {
//         queryClient.setQueryData(queryKey, [newProductFeaturing, ...previousProductFeaturing])
//       }

//       // Return a context object with the snapshotted value
//       return { previousProductFeaturing }
//     },
//     // If the mutation fails,
//     // use the context returned from onMutate to rollback
//     onError: (_err, _newProductFeaturing, context) => {
//       // console.error('Error saving record:', err, newProductFeaturing);
//       if (context?.previousProductFeaturing) {
//         queryClient.setQueryData(queryKey, context.previousProductFeaturing)
//       }
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey })
//     },
//   })

//   return createMutation
// }

// export default useProductFeaturingCreate
