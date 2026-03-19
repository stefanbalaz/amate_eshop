import useProductsList from "@/hooks/core/Product/useProductList"
import { Hero, ProductGrid } from "./components"

export default function Home() {
  const { productsList, isLoading } = useProductsList()
  return (
    <>
      <Hero />
      <ProductGrid />
      {console.log("Home productsList", productsList, "isLoading", isLoading)}
    </>
  )
}
