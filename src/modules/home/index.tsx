import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Hero, OurStory, ProductGrid, WhatIsMate } from "./components"
import useProductsList from "@/hooks/core/product/use-products-list"

export default function Home() {
  const { productsList, isLoading } = useProductsList()
  const location = useLocation()

  console.log("Home rendered with products:", productsList)

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""))
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [location])

  return (
    <>
      <Hero />
      <ProductGrid fetchedProducts={isLoading ? [] : productsList} />
      <WhatIsMate />
      <OurStory />
    </>
  )
}
