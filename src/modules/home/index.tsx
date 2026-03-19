import useProductsList from "@/hooks/core/Product/useProductList"
import { useEffect } from "react"
import { Hero, ProductGrid } from "./components"

export default function Home() {
  const {
    productsList,
    isLoading,
    isFetching,
    status,
    fetchStatus,
    dataUpdatedAt,
    error,
    isError,
  } = useProductsList()

  useEffect(() => {
    const updatedAt =
      dataUpdatedAt > 0 ? new Date(dataUpdatedAt).toISOString() : null

    console.groupCollapsed("[Home] products query")
    console.log("status", status)
    console.log("fetchStatus", fetchStatus)
    console.log("isLoading", isLoading)
    console.log("isFetching", isFetching)
    console.log("productsCount", productsList.length)
    console.log("updatedAt", updatedAt)
    console.log("productsList", productsList)
    // console.log(
    //   "productIds",
    //   productsList.map((product) => product.id)
    // )
    // console.table(
    //   productsList.map((product) => ({
    //     id: product.id,
    //     brand: product.productBrand,
    //     name: product.productName,
    //     volume: product.productVolume,
    //     price: product.productPrice,
    //   }))
    // )
    console.groupEnd()
  }, [productsList, isLoading, isFetching, status, fetchStatus, dataUpdatedAt])

  useEffect(() => {
    if (isError) {
      console.error("Products query failed", error)
    }
  }, [isError, error])

  return (
    <>
      <Hero />
      <ProductGrid />
    </>
  )
}
