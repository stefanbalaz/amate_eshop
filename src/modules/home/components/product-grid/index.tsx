import { mockProducts } from "@/fixtures/mockProducts"
import { useCart } from "@/context/use-cart"
import ProductCard from "../product-card"

export default function ProductGrid() {
  const {
    getCurrentAmount,
    handleDecreaseAmount,
    handleIncreaseAmount,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
  } = useCart()

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div
        id="products"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currentAmount={getCurrentAmount(product.id)}
            onDecreaseAmount={handleDecreaseAmount}
            onIncreaseAmount={handleIncreaseAmount}
            onInputChange={handleInputChange}
            onInputFocus={handleInputFocus}
            onInputBlur={handleInputBlur}
          />
        ))}
      </div>
    </section>
  )
}
