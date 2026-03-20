import { cn } from "@/utils/style"

export type ProductFeatureBadge = {
  icon: string
  alt: string
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

      {/* Icons */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.productFeatures.map((feature) => (
          <div
            key={`${product.id}-${feature.alt}`}
            className={cn(
              "flex items-center justify-center rounded-full p-2",
              feature.className
            )}
          >
            <img src={feature.icon} alt={feature.alt} className="h-6 w-6" />
          </div>
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
            className="relative z-10 h-full w-full rounded-tl-md rounded-tr-md object-contain object-center p-8"
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
              className="text-2xl font-bold whitespace-nowrap opacity-80"
              // style={{ color: globalSecondaryColor }}
            >
              {product.productPrice}
            </div>
          </div>
        </div>

        <div className="flex h-12 items-center justify-center rounded-b-md border-t-2">
          <div
            className="grid h-full w-full grid-cols-3 font-bold"
            // style={{ color: globalSecondaryColor }}
          >
            <div className="grid h-full grid-cols-2 text-white">
              <button
                className={cn(
                  "flex h-full items-center justify-center rounded-bl-md bg-primary hover:opacity-80 active:opacity-50"
                  // buttonPrimaryColor,
                )}
                onClick={() => onDecreaseAmount(product.id, 10)}
              >
                - 10
              </button>
              <button
                className={cn(
                  "flex h-full items-center justify-center bg-primary opacity-50 hover:opacity-70 active:opacity-50"
                  // buttonPrimaryColor,
                )}
                onClick={() => onDecreaseAmount(product.id, 1)}
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
                onChange={(e) => onInputChange(e, product.id)}
                onFocus={(e) => onInputFocus(e, currentAmount)}
                onBlur={(e) => onInputBlur(e, product.id)}
              />
            </div>

            <div className="grid h-full grid-cols-2 text-white">
              <button
                className={cn(
                  "flex h-full items-center justify-center bg-primary opacity-50 hover:opacity-70 active:opacity-50"
                  // buttonPrimaryColor,
                )}
                onClick={() => onIncreaseAmount(product.id, 1)}
              >
                + 1
              </button>
              <button
                className={cn(
                  "flex h-full items-center justify-center rounded-br-md bg-primary hover:opacity-80 active:opacity-50"
                  // buttonPrimaryColor,
                )}
                onClick={() => onIncreaseAmount(product.id, 10)}
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
