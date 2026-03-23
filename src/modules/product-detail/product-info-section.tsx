import { HoverCard } from "@/components"
import { cn } from "@/utils/style"
import { resolveProductFeatureHoverPanelClassName } from "../home/components/product-card/product-feature-hover-classes"
import { TAX_RATE } from "@/fixtures"

type ProductFeatureBadge = {
  icon: string
  label: string
  description?: string
  className: string
}

type ProductInfoSectionProps = {
  productBrand: string
  productName: string
  productVolume: string
  /** Formatted gross price for display (e.g. sk-SK currency string). */
  productPrice: string
  /** Gross unit price in EUR (incl. VAT) for net-price calculation. */
  productPriceGrossEuros: number
  description?: string
  productFeatures: ProductFeatureBadge[]
  currentAmount: number
  onDecreaseAmount: (decrement: number) => void
  onIncreaseAmount: (increment: number) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onInputFocus: (e: React.FocusEvent<HTMLInputElement>) => void
  onInputBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  onBackToProducts: () => void
}

export default function ProductInfoSection({
  productBrand,
  productName,
  productVolume,
  productPrice,
  productPriceGrossEuros,
  description,
  productFeatures,
  currentAmount,
  onDecreaseAmount,
  onIncreaseAmount,
  onInputChange,
  onInputFocus,
  onInputBlur,
  //   onBackToProducts,
}: ProductInfoSectionProps) {
  const netPriceFormatted = (
    productPriceGrossEuros /
    (1 + TAX_RATE)
  ).toLocaleString("sk-SK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Brand and Name */}
      <div>
        <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-secondary uppercase">
          {productBrand}
        </p>
        <h1 className="text-4xl uppercase md:text-5xl">{productName}</h1>
        <p className="mt-1 text-base text-muted-foreground">{productVolume}</p>
      </div>

      {/* Description */}
      {description && (
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      )}

      {/* Price */}
      <div className="flex flex-col gap-y-1">
        <div className="text-4xl font-bold text-foreground">
          {productPrice}{" "}
          <span className="text-base font-normal text-muted-foreground">
            s DPH
          </span>
        </div>

        <div className="text-sm font-light text-muted-foreground">{`${netPriceFormatted} € bez ${(TAX_RATE * 100).toFixed(0)} % DPH`}</div>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-3">
        {productFeatures.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {productFeatures.map((feature) => (
              <HoverCard
                key={`${feature}-${feature.label}`}
                openDelay={150}
                closeDelay={100}
                content={
                  <div className="space-y-1.5">
                    {feature.description ? (
                      <p className="text-sm leading-snug text-foreground/80">
                        {feature.description}
                      </p>
                    ) : null}
                  </div>
                }
                // contentProps={{ side: "right", align: "start" }}
                contentClassName={cn(
                  "w-auto max-w-[min(18rem,calc(100vw-2rem))] border-black/10 text-foreground shadow-md",
                  resolveProductFeatureHoverPanelClassName(feature.className)
                )}
              >
                <div
                  key={`${feature}-${feature.label}`}
                  className={cn(
                    "flex h-12 cursor-help items-center gap-2 rounded-full px-5",
                    feature.className
                  )}
                >
                  <img
                    src={feature.icon}
                    alt={feature.label}
                    className="h-6 w-6"
                  />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              </HoverCard>
            ))}
          </div>
        ) : null}
      </div>

      {/* Amount Controls */}
      <div className="mt-auto flex flex-col gap-3">
        <label className="text-sm font-medium text-foreground">
          Pridať do košíka
        </label>
        <div className="grid h-12 grid-cols-3 overflow-hidden rounded-sm font-bold">
          {/* Left: -10 and -1 */}
          <div className="grid grid-cols-2">
            <button
              className="flex h-full cursor-pointer items-center justify-center bg-primary text-tertiary-foreground hover:opacity-80 active:opacity-50"
              onClick={() => onDecreaseAmount(10)}
            >
              - 10
            </button>
            <button
              className="flex h-full cursor-pointer items-center justify-center bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 active:opacity-50"
              onClick={() => onDecreaseAmount(1)}
            >
              - 1
            </button>
          </div>

          {/* Input */}
          <input
            type="number"
            name="amount"
            id="amount"
            className={cn(
              "h-full w-full [appearance:textfield] border border-input/70 bg-input/10 text-center text-lg text-foreground shadow-xs transition-[color,box-shadow] outline-none hover:border-input hover:bg-input/30 focus-visible:border-input focus-visible:ring-[3px] focus-visible:ring-input/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            )}
            value={currentAmount}
            onChange={onInputChange}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          />

          {/* Right: +1 and +10 */}
          <div className="grid grid-cols-2">
            <button
              className="flex h-full cursor-pointer items-center justify-center bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 active:opacity-50"
              onClick={() => onIncreaseAmount(1)}
            >
              + 1
            </button>
            <button
              className="flex h-full cursor-pointer items-center justify-center rounded-br-md bg-primary text-primary-foreground hover:opacity-80 active:opacity-50"
              onClick={() => onIncreaseAmount(10)}
            >
              + 10
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
