import { HoverCard } from "@/components"
import { cn } from "@/utils/style"

import { resolveProductFeatureHoverPanelClassName } from "./product-feature-hover-classes"

export type ProductFeatureBadge = {
  icon: string
  label: string
  description?: string
  className: string
}

export type ProductFeaturingBadge = {
  label?: string
  className?: string
}

export type Product = {
  id: string
  productBrand: string
  productName: string
  productVolume: string
  productPrice: string
  productPicture: string
  featuring?: ProductFeaturingBadge
  productFeatures: ProductFeatureBadge[]
}

type ProductCardProps = {
  product: Product
  onCardClick?: (productId: string) => void
  currentAmount: number
  onDecreaseAmount: (productId: string, decrement: number) => void
  onIncreaseAmount: (productId: string, increment: number) => void
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => void
  onInputFocus: (
    e: React.FocusEvent<HTMLInputElement>,
    currentAmount: number
  ) => void
  onInputBlur: (
    e: React.FocusEvent<HTMLInputElement>,
    productId: string
  ) => void
}

export default function ProductCard({
  product,
  onCardClick,
  currentAmount,
  onDecreaseAmount,
  onIncreaseAmount,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ProductCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-sm bg-secondary/5 shadow-lg duration-150 hover:scale-101"
      style={{ height: "100%" }}
      role={onCardClick ? "button" : undefined}
      tabIndex={onCardClick ? 0 : undefined}
      onClick={() => onCardClick?.(product.id)}
      onKeyDown={(e) => {
        if (!onCardClick) return
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onCardClick(product.id)
        }
      }}
    >
      {product.featuring?.label ? (
        <div
          className={cn(
            "absolute top-0 right-0 z-10 rounded-tr-md rounded-bl-md p-2 text-white",
            product.featuring.className ?? "bg-red-500"
          )}
        >
          {product.featuring.label}
        </div>
      ) : null}

      {/* Icons — z-index above the product image (also z-10, later in DOM) or hover hits the image instead */}
      <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
        {product.productFeatures.map((feature) => (
          <HoverCard
            key={`${product.id}-${feature.label}`}
            openDelay={150}
            closeDelay={100}
            content={
              <div className="space-y-1.5">
                <p className="text-sm font-semibold">{feature.label}</p>
                {feature.description ? (
                  <p className="text-sm leading-snug text-foreground/80">
                    {feature.description}
                  </p>
                ) : null}
              </div>
            }
            contentProps={{ side: "right", align: "start" }}
            contentClassName={cn(
              "w-auto max-w-[min(18rem,calc(100vw-2rem))] border-black/10 text-foreground shadow-md",
              resolveProductFeatureHoverPanelClassName(feature.className)
            )}
          >
            <div
              className={cn(
                "flex cursor-help items-center justify-center rounded-full p-2",
                feature.className
              )}
              aria-label={feature.label}
            >
              <img src={feature.icon} alt="" className="h-6 w-6" />
            </div>
          </HoverCard>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-12 z-20 rounded-t-sm bg-black/5 opacity-0 transition-opacity duration-200 group-hover:opacity-55" />

      <div className="flex h-72 flex-col lg:h-96">
        <div className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute bottom-10 left-1/2 z-0 h-px w-52 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-400/22 to-transparent opacity-65 blur-[2px]" />
          <div className="pointer-events-none absolute bottom-9 left-1/2 z-0 h-px w-44 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-500/28 to-transparent opacity-72 blur-[1px]" />
          <div className="pointer-events-none absolute bottom-8.5 left-1/2 z-0 h-px w-40 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-500/24 to-transparent opacity-70 blur-[1px]" />
          <div className="pointer-events-none absolute bottom-8 left-[44%] z-0 h-px w-52 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-300/22 to-transparent opacity-72 blur-[1px]" />
          <div className="pointer-events-none absolute bottom-7.5 left-[43%] z-0 h-px w-44 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-300/24 to-transparent opacity-74 blur-[1px]" />
          <div className="pointer-events-none absolute bottom-7 left-[42%] z-0 h-px w-36 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-300/20 to-transparent opacity-70 blur-[2px]" />
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-0 h-12 w-72 -translate-x-[105%] rounded-full bg-linear-to-l from-black/35 via-black/18 to-transparent blur-2xl" />
          <div className="pointer-events-none absolute bottom-6 left-1/2 z-0 h-5 w-36 -translate-x-1/2 rounded-full bg-black/12 blur-md" />
          <img
            className="relative z-10 h-full w-full cursor-pointer rounded-tl-md rounded-tr-md object-contain object-center p-8"
            src={product.productPicture}
            alt={product.productName}
          />

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-row items-center justify-between px-4 py-3">
            <div className="flex flex-col">
              <div
                className="font-bold"
                // style={{ color: globalSecondaryColor }}
              >
                <span>{product.productBrand}</span>{" "}
                <span className="whitespace-nowrap">{product.productName}</span>
              </div>
              <div>
                <p>{product.productVolume}</p>
              </div>
            </div>
            <div
              className="flex flex-col text-2xl font-bold whitespace-nowrap opacity-80"
              // style={{ color: globalSecondaryColor }}
            >
              {product.productPrice}
              <span className="self-end text-xs font-normal">s DPH</span>
            </div>
          </div>
        </div>

        <div
          className="flex h-12 items-center justify-center rounded-b-md border-t-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="grid h-full w-full grid-cols-3 font-bold"
            // style={{ color: globalSecondaryColor }}
          >
            <div className="grid h-full grid-cols-2">
              <button
                className="flex h-full cursor-pointer items-center justify-center rounded-bl-md bg-primary text-primary-foreground hover:opacity-80 active:opacity-50"
                onClick={(e) => {
                  e.stopPropagation()
                  onDecreaseAmount(product.id, 10)
                }}
              >
                - 10
              </button>
              <button
                className="flex h-full cursor-pointer items-center justify-center bg-tertiary text-tertiary-foreground hover:opacity-80 active:opacity-50"
                onClick={(e) => {
                  e.stopPropagation()
                  onDecreaseAmount(product.id, 1)
                }}
              >
                - 1
              </button>
            </div>

            <div className="flex h-full items-center justify-center">
              <input
                type="number"
                name="amount"
                id="amount"
                className={cn(
                  "h-full w-full [appearance:textfield] border border-input/70 bg-input/10 text-center text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none hover:border-input hover:bg-input/30 focus-visible:border-input focus-visible:ring-[3px] focus-visible:ring-input/50 sm:text-lg [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                )}
                value={currentAmount}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onInputChange(e, product.id)}
                onFocus={(e) => onInputFocus(e, currentAmount)}
                onBlur={(e) => onInputBlur(e, product.id)}
              />
            </div>

            <div className="grid h-full grid-cols-2">
              <button
                className="flex h-full cursor-pointer items-center justify-center bg-tertiary text-tertiary-foreground hover:opacity-80 active:opacity-50"
                onClick={(e) => {
                  e.stopPropagation()
                  onIncreaseAmount(product.id, 1)
                }}
              >
                + 1
              </button>
              <button
                className="flex h-full cursor-pointer items-center justify-center rounded-br-md bg-primary text-primary-foreground hover:opacity-80 active:opacity-50"
                onClick={(e) => {
                  e.stopPropagation()
                  onIncreaseAmount(product.id, 10)
                }}
              >
                + 10
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
