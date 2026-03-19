import type { MockProduct } from "@/fixtures/mockProducts";
import { cn } from "@/utils/style";

export type Product = MockProduct;

type ProductCardProps = {
  product: Product;
  currentAmount: number;
  onDecreaseAmount: (productId: string, decrement: number) => void;
  onIncreaseAmount: (productId: string, increment: number) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => void;
  onInputFocus: (
    e: React.FocusEvent<HTMLInputElement>,
    currentAmount: number,
  ) => void;
  onInputBlur: (
    e: React.FocusEvent<HTMLInputElement>,
    productId: string,
  ) => void;
};

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
      className="group relative overflow-hidden bg-secondary/5 rounded-sm hover:scale-101 duration-150 shadow-lg"
      style={{ height: "100%" }}
    >
      {product.featuring?.label ? (
        <div
          className={cn(
            "absolute top-0 right-0 text-white p-2 rounded-tr-md rounded-bl-md z-10",
            product.featuring.className ?? "bg-red-500",
          )}
        >
          {product.featuring.label}
        </div>
      ) : null}

      {/* Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {product.productFeatures.map((feature) => (
          <div
            key={`${product.id}-${feature.alt}`}
            className={cn(
              "flex items-center justify-center rounded-full p-2",
              feature.className,
            )}
          >
            <img src={feature.icon} alt={feature.alt} className="w-6 h-6" />
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
            className="relative z-10 h-full w-full p-8 object-contain object-center rounded-tl-md rounded-tr-md"
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
              className="whitespace-nowrap text-2xl font-bold opacity-80"
              // style={{ color: globalSecondaryColor }}
            >
              {product.productPrice}
            </div>
          </div>
        </div>

        <div className="flex h-12 items-center justify-center border-t-2 rounded-b-md">
          <div
            className="font-bold w-full grid grid-cols-3 h-full"
            // style={{ color: globalSecondaryColor }}
          >
            <div className="grid grid-cols-2 h-full text-white">
              <button
                className={cn(
                  "flex items-center justify-center h-full rounded-bl-md hover:opacity-80 active:opacity-50 bg-primary",
                  // buttonPrimaryColor,
                )}
                onClick={() => onDecreaseAmount(product.id, 10)}
              >
                - 10
              </button>
              <button
                className={cn(
                  "flex items-center justify-center h-full opacity-50 hover:opacity-70 active:opacity-50 bg-primary",
                  // buttonPrimaryColor,
                )}
                onClick={() => onDecreaseAmount(product.id, 1)}
              >
                - 1
              </button>
            </div>

            <div className="flex items-center justify-center h-full">
              <input
                type="number"
                name="amount"
                id="amount"
                className={cn(
                  "h-full w-full text-center text-base sm:text-lg border border-input/70 bg-input/10 text-foreground shadow-xs outline-none transition-[color,box-shadow] hover:border-input hover:bg-input/30 focus-visible:border-input focus-visible:ring-input/50 focus-visible:ring-[3px] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                )}
                value={currentAmount}
                onChange={(e) => onInputChange(e, product.id)}
                onFocus={(e) => onInputFocus(e, currentAmount)}
                onBlur={(e) => onInputBlur(e, product.id)}
              />
            </div>

            <div className="grid grid-cols-2 h-full text-white">
              <button
                className={cn(
                  "flex items-center justify-center h-full opacity-50 hover:opacity-70 active:opacity-50 bg-primary",
                  // buttonPrimaryColor,
                )}
                onClick={() => onIncreaseAmount(product.id, 1)}
              >
                + 1
              </button>
              <button
                className={cn(
                  "flex items-center justify-center h-full rounded-br-md hover:opacity-80 active:opacity-50 bg-primary",
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
  );
}
