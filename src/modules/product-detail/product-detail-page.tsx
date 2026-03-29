import { useEffect } from "react"
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
import { useCart } from "@/context/use-cart"
import useProductsList from "@/hooks/core/product/use-products-list"
import { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ProductDetailSections } from "./product-detail-sections.tsx"
import ProductImageCard from "./product-image-card.tsx"
import ProductInfoSection from "./product-info-section.tsx"
import { Button } from "@/components/index.ts"
import { ArrowLeft, ArrowRight } from "lucide-react"

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

const resolveProductPicture = (rawPicture?: string | null) => {
  const picture = rawPicture?.trim()
  if (!picture) return classicBottle

  if (
    picture.startsWith("http://") ||
    picture.startsWith("https://") ||
    picture.startsWith("data:") ||
    picture.startsWith("blob:")
  ) {
    return picture
  }

  const normalizedPath = picture.replaceAll("\\", "/").toLowerCase()
  const fileName = normalizedPath.split("/").pop() ?? normalizedPath

  return (
    productImageByFileName[fileName] ??
    productImageByFileName[picture] ??
    classicBottle
  )
}

const parseJsonText = (value: unknown): string => {
  if (value == null) return ""
  if (typeof value === "string") return value
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item : JSON.stringify(item)))
      .join(", ")
  }
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => `${key}: ${String(item)}`)
      .join(", ")
  }
  return String(value)
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

export default function ProductDetailPage() {
  const navigate = useNavigate()
  const { productId } = useParams<{ productId: string }>()
  const { productsList, isLoading } = useProductsList()
  const {
    getCurrentAmount,
    handleDecreaseAmount,
    handleIncreaseAmount,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
  } = useCart()

  const product = useMemo(
    () => productsList.find((item) => item.id === productId),
    [productsList, productId]
  )

  type DescriptionBlock = {
    headline?: string
    paragraphs: string[]
  }

  const toParagraphStrings = (value: unknown): string[] => {
    if (value == null) return []
    if (Array.isArray(value)) {
      return value.map((entry) =>
        typeof entry === "string" ? entry : JSON.stringify(entry)
      )
    }
    if (typeof value === "string") return [value]
    return [String(value)]
  }

  const productDescription: DescriptionBlock[] = (() => {
    let desc: unknown = product?.productDescription

    // If desc is a string, try to parse as JSON
    if (typeof desc === "string") {
      const rawDescription = desc
      try {
        desc = JSON.parse(rawDescription) as unknown
      } catch {
        return [{ paragraphs: [rawDescription] }]
      }
    }

    // Case 1: already parsed (ARRAY)
    if (Array.isArray(desc)) {
      return desc.map((item: unknown) => {
        const block = item as {
          headline?: unknown
          paragraphs?: unknown
          paragraph?: unknown
        }
        const headline =
          typeof block.headline === "string" ? block.headline : undefined
        const paragraphs = Array.isArray(block.paragraphs)
          ? toParagraphStrings(block.paragraphs)
          : typeof block.paragraph === "string"
            ? [block.paragraph]
            : []
        return { headline, paragraphs }
      })
    }

    if (desc && typeof desc === "object" && "L" in desc) {
      const dynamo = desc as {
        L: { M: Record<string, { S?: string; L?: { S: string }[] }> }[]
      }

      return dynamo.L.map((item) => ({
        headline: item.M.headline?.S,
        paragraphs: Array.isArray(item.M.paragraphs?.L)
          ? item.M.paragraphs.L.map((p) => p.S).filter(
              (s): s is string => typeof s === "string"
            )
          : item.M.paragraph?.S
            ? [item.M.paragraph.S]
            : [],
      }))
    }

    return []
  })()

  console.log("Current product:", product?.productDescription)

  // Scroll to anchor on mount if present
  useEffect(() => {
    if (window.location.hash === "#top") {
      const el = document.getElementById("top")
      if (el) el.scrollIntoView({ behavior: "auto" })
    }
  }, [])

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-muted-foreground">Načítavam detail produktu...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Produkt sa nenašiel</h1>
        <p className="mt-4 text-muted-foreground">
          Tento produkt pravdepodobne neexistuje alebo bol odstránený.
        </p>
        <button
          type="button"
          onClick={() => navigate("/#products-heading")}
          className="mt-6 inline-flex h-12 items-center rounded-md border border-accent-foreground/30 px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent-foreground/10"
        >
          Späť na produkty
        </button>
      </div>
    )
  }

  const productVolume = `${(
    product.productVolumeMilliliter / 1000
  ).toLocaleString("sk-SK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} l`

  const productPrice = `${(product.productPriceCents / 100).toLocaleString(
    "sk-SK",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )} €`

  const shortDescription =
    product.productShortDescription ||
    "Popis produktu čoskoro doplníme. Zatiaľ tu nájdete základné informácie a možnosť pridať produkt do košíka."

  const ingredientsText =
    parseJsonText(product.productIngredients) ||
    "Zloženie bude doplnené čoskoro."

  let legalInfo: string[] = []
  if (typeof product.productLegalDisclaimer === "string") {
    try {
      const parsed = JSON.parse(product.productLegalDisclaimer)
      if (Array.isArray(parsed)) {
        legalInfo = parsed
      } else if (parsed && typeof parsed === "string") {
        legalInfo = [parsed]
      } else {
        legalInfo = [String(product.productLegalDisclaimer)]
      }
    } catch {
      legalInfo = [product.productLegalDisclaimer]
    }
  } else if (Array.isArray(product.productLegalDisclaimer)) {
    legalInfo = product.productLegalDisclaimer
  } else if (product.productLegalDisclaimer) {
    legalInfo = [String(product.productLegalDisclaimer)]
  } else {
    legalInfo = ["Právne informácie budú doplnené čoskoro."]
  }

  const featuring = product.productFeaturing
    ? {
        label: product.productFeaturing.productFeaturingLabel,
        className:
          normalizeBadgeClassName(
            product.productFeaturing.productFeaturingClassName
          ) ?? "bg-red-500",
      }
    : undefined

  const productFeatures = product.productFeatures
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
    }))

  type Nutrition = Record<string, string>

  const nutrition: Nutrition = (() => {
    try {
      const parsed =
        typeof product.productNutritionalInfo === "string"
          ? JSON.parse(product.productNutritionalInfo)
          : product.productNutritionalInfo

      return parsed?.nutrition || {}
    } catch {
      return {}
    }
  })()

  return (
    <>
      <div id="top" />
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductImageCard
            productPicture={resolveProductPicture(product.productPicture)}
            productName={`${product.productBrand} ${product.productName}`}
            featuring={featuring}
          />

          <ProductInfoSection
            productBrand={product.productBrand}
            productName={product.productName}
            productVolume={productVolume}
            productPrice={productPrice}
            productPriceGrossEuros={product.productPriceCents / 100}
            description={shortDescription}
            productFeatures={productFeatures}
            currentAmount={getCurrentAmount(product.id)}
            onDecreaseAmount={(decrement) =>
              handleDecreaseAmount(product.id, decrement)
            }
            onIncreaseAmount={(increment) =>
              handleIncreaseAmount(product.id, increment)
            }
            onInputChange={(e) => handleInputChange(e, product.id)}
            onInputFocus={(e) =>
              handleInputFocus(e, getCurrentAmount(product.id))
            }
            onInputBlur={(e) => handleInputBlur(e, product.id)}
            onBackToProducts={() => navigate("/#products-heading")}
          />
        </div>

        <div className="mb-16 flex items-center justify-between pt-20">
          <Button
            iconLeft={<ArrowLeft />}
            label="Vybrať ďalšie produkty"
            size="xl"
            variant="secondary"
            onClick={() => navigate("/#products-heading")}
          />

          <Button
            iconRight={<ArrowRight />}
            variant="secondary"
            size="xl"
            label="Prejsť do košíka"
            onClick={() => navigate("/checkout")}
          />
        </div>

        <ProductDetailSections
          productDescription={productDescription}
          ingredients={ingredientsText}
          nutrition={nutrition}
          legalInfo={legalInfo}
        />
      </div>
    </>
  )
}
