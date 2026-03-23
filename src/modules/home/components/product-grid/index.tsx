import { useCart } from "@/context/use-cart"
import { glutenFreeIcon, lactoseFreeIcon, veganIcon } from "@/assets"
import {
  classicBottle,
  cucumberBottle,
  gingerBottle,
  hempBottle,
  melonBottle,
  mintBottle,
  zeroBottle,
} from "@/assets/images/products"
import type { Product as ApiProduct } from "@/types/product.types"
import ProductCard, { type Product } from "../product-card"
import { Button } from "@/components"
import { useNavigate } from "react-router-dom"

type ProductGridProps = {
  fetchedProducts?: ApiProduct[]
}

const productImageByFileName: Record<string, string> = {
  classicBottle,
  gingerBottle,
  hempBottle,
  melonBottle,
  mintBottle,
  zeroBottle,
  cucumberBottle,
  "classic.png": classicBottle,
  "klasik.png": classicBottle,
  "ginger.png": gingerBottle,
  "zazvor.png": gingerBottle,
  "hemp.png": hempBottle,
  "konope.png": hempBottle,
  "melon.png": melonBottle,
  "mint.png": mintBottle,
  "mata.png": mintBottle,
  "zero.png": zeroBottle,
  "cucumber.png": cucumberBottle,
  "uhorka.png": cucumberBottle,
}

const resolveProductPicture = (product: ApiProduct) => {
  const rawPicture = product.productPicture?.trim()
  if (!rawPicture) return classicBottle

  if (
    rawPicture.startsWith("http://") ||
    rawPicture.startsWith("https://") ||
    rawPicture.startsWith("data:") ||
    rawPicture.startsWith("blob:")
  ) {
    return rawPicture
  }

  const normalizedPath = rawPicture.replaceAll("\\", "/").toLowerCase()
  const fileName = normalizedPath.split("/").pop() ?? normalizedPath
  const byFileName =
    productImageByFileName[fileName] ?? productImageByFileName[rawPicture]
  if (byFileName) return byFileName

  return classicBottle
}

const resolveFeatureIcon = (label?: string, className?: string) => {
  const key = `${label ?? ""} ${className ?? ""}`.toLowerCase()

  if (key.includes("vegan")) return veganIcon
  if (key.includes("lactose") || key.includes("mlie") || key.includes("mlec")) {
    return lactoseFreeIcon
  }
  if (key.includes("gluten")) return glutenFreeIcon

  return veganIcon
}

const badgeClassMap: Record<string, string> = {
  "badge-secondary": "bg-secondary",
  "badge-red": "bg-red-500",
  "badge-green": "bg-green-500",
  "badge-blue": "bg-blue-500",
  "badge-yellow": "bg-yellow-500",
  "feature-organic": "bg-green-200",
  "feature-vegan": "bg-green-200",
  "feature-lactosefree": "bg-yellow-200",
  "feature-glutenfree": "bg-blue-200",
}

const normalizeBadgeClassName = (className?: string | null) => {
  if (!className) return undefined
  return badgeClassMap[className] ?? className
}

const iconNameMap: Record<string, string> = {
  veganIcon,
  lactoseFreeIcon,
  glutenFreeIcon,
}

const resolveIconByName = (iconName?: string | null): string | undefined => {
  if (!iconName) return undefined
  return iconNameMap[iconName]
}

const mapFetchedProductToCard = (product: ApiProduct): Product => ({
  id: product.id,
  productBrand: product.productBrand,
  productName: product.productName,
  productVolume: `${(product.productVolumeMilliliter / 1000).toLocaleString(
    "sk-SK",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )} l`,
  productPrice: `${(product.productPriceCents / 100).toLocaleString("sk-SK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`,
  productPicture: resolveProductPicture(product),
  productFeatures: product.productFeatures
    .map((assignment) => assignment.feature)
    .filter((feature): feature is NonNullable<typeof feature> =>
      Boolean(feature)
    )
    .map((feature) => ({
      icon:
        resolveIconByName(feature.productFeatureIcon) ??
        resolveFeatureIcon(
          feature.productFeatureLabel,
          feature.productFeatureClassName
        ),
      label: feature.productFeatureLabel,
      description: feature.productFeatureDescription ?? undefined,
      className:
        normalizeBadgeClassName(feature.productFeatureClassName) ??
        "bg-green-200",
    })),
  featuring: product.productFeaturing
    ? {
        label: product.productFeaturing.productFeaturingLabel,
        className:
          normalizeBadgeClassName(
            product.productFeaturing.productFeaturingClassName
          ) ?? "bg-red-500",
      }
    : undefined,
})

export default function ProductGrid({
  fetchedProducts = [],
}: ProductGridProps) {
  const navigate = useNavigate()

  const {
    getCurrentAmount,
    handleDecreaseAmount,
    handleIncreaseAmount,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
  } = useCart()

  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p
            id="products-heading"
            className="mb-2 scroll-mt-24 text-sm font-semibold tracking-[0.3em] text-secondary uppercase"
          >
            Naše produkty
          </p>
          <h2 className="text-4xl uppercase md:text-5xl">
            OBJAV AMATE PRÍCHUTE
          </h2>
        </div>

        <div
          id="products"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {fetchedProducts.map((product) => {
            const cardProduct = mapFetchedProductToCard(product)

            return (
              <ProductCard
                key={cardProduct.id}
                product={cardProduct}
                onCardClick={(productId) => {
                  navigate(`/products/${productId}#top`)
                }}
                currentAmount={getCurrentAmount(cardProduct.id)}
                onDecreaseAmount={handleDecreaseAmount}
                onIncreaseAmount={handleIncreaseAmount}
                onInputChange={handleInputChange}
                onInputFocus={handleInputFocus}
                onInputBlur={handleInputBlur}
              />
            )
          })}
        </div>
        <Button
          className="mx-auto mt-12 block"
          variant="secondary"
          size="xl"
          label="Prejsť do košíka"
          onClick={() => navigate("/checkout", { replace: true })}
        />
      </div>
    </section>
  )
}
