// "use client"

// import { getProductFeaturing } from "@/modules/api"
// import { QueryKeys } from "@/types"
// import { useQuery } from "@tanstack/react-query"
// import { useEffect } from "react"
// import { useParams } from "react-router-dom"

// type ProductFeaturingReadParamsType = {
//   productFeaturingsID: string
// }

// const useProductFeaturingRead = (productFeaturingsIDParam?: string) => {
//   const { productFeaturingsID } = useParams<ProductFeaturingReadParamsType>()

//   const productFeaturingsIDValue = productFeaturingsIDParam ?? productFeaturingsID

//   const { data: productFeaturings, isLoading } = useQuery({
//     queryKey: [QueryKeys.ProductFeaturings, productFeaturingsIDValue],
//     queryFn: async () => {
//       if (!productFeaturingsIDValue) return null

//       const productFeaturingsFromAPI = await getProductFeaturing(productFeaturingsIDValue)

//       return productFeaturingsFromAPI
//     },
//     staleTime: 1000 * 60 * 15, // 15 minutes
//     gcTime: 1000 * 60 * 60, // 1 hour
//   })

//   useEffect(() => {
//     if (!productFeaturingsIDValue) {
//       console.warn("No productFeaturings ID provided for useProductFeaturingRead")
//     }
//   }, [productFeaturingsIDValue])

//   return {
//     productFeaturingsID,
//     productFeaturings: productFeaturings ?? null,
//     isLoading,
//   }
// }

// export default useProductFeaturingRead
