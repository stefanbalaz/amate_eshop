import { mockProducts, SHIPPING_FEE, TAX_RATE } from "@/fixtures/mockProducts";
import { useCart } from "@/context/use-cart";
import { Separator } from "../../../../components/ui/primitives";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { BottleIcon } from "../icons";
import type { CartFormApi } from "@/hooks/use-cart-form";

const parseEuroPrice = (price: string) =>
  Number(price.replace("€", "").replace(" ", "").replace(",", "."));

const ORDER_SUMMARY_PRODUCTS = mockProducts.map((product) => ({
  id: product.id,
  name: `${product.productBrand} ${product.productName}`,
  volume: product.productVolume,
  unitPrice: parseEuroPrice(product.productPrice),
  color: product.color,
}));

function QuantityStepper({
  value,
  onIncrease,
  onDecrease,
  onChange,
}: {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onDecrease}
        disabled={value === 0}
        aria-label="Znížiť množstvo"
        className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md border border-primary/50 bg-primary/10 text-primary text-sm font-semibold transition hover:bg-primary/20 active:bg-primary/25 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:border-border disabled:bg-background disabled:text-muted-foreground"
      >
        <span className="leading-none -translate-y-px">−</span>
      </button>
      <input
        type="number"
        min={0}
        max={999}
        value={value}
        aria-label="Množstvo"
        onChange={(e) => {
          const parsed = parseInt(e.target.value, 10);
          if (!isNaN(parsed)) onChange(Math.min(Math.max(parsed, 0), 999));
          else if (e.target.value === "") onChange(0);
        }}
        className="w-10 rounded-md border border-input/70 bg-input/10 text-center text-sm font-semibold text-foreground shadow-xs outline-none transition-[color,box-shadow] hover:border-input hover:bg-input/30 focus-visible:border-input focus-visible:ring-input/50 focus-visible:ring-[3px] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        onClick={onIncrease}
        aria-label="Zvýšiť množstvo"
        className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md border border-primary/50 bg-primary/10 text-primary text-sm font-semibold transition hover:bg-primary/20 active:bg-primary/25 cursor-pointer"
      >
        <span className="leading-none -translate-y-px">+</span>
      </button>
    </div>
  );
}

type OrderSummaryProps = {
  form: CartFormApi;
};

export function OrderSummary({ form }: OrderSummaryProps) {
  const { getCurrentAmount, handleDecreaseAmount, handleIncreaseAmount } =
    useCart();

  const increase = (id: string) => handleIncreaseAmount(id, 1);

  const decrease = (id: string) => handleDecreaseAmount(id, 1);

  const changeQty = (id: string, val: number) => {
    const currentAmount = getCurrentAmount(id);
    const nextAmount = Math.min(Math.max(val, 0), 999);

    if (nextAmount > currentAmount) {
      handleIncreaseAmount(id, nextAmount - currentAmount);
      return;
    }

    if (nextAmount < currentAmount) {
      handleDecreaseAmount(id, currentAmount - nextAmount);
    }
  };

  const subtotal = ORDER_SUMMARY_PRODUCTS.reduce(
    (sum, product) => sum + product.unitPrice * getCurrentAmount(product.id),
    0,
  );
  const hasItems = subtotal > 0;
  const shippingFee = hasItems ? SHIPPING_FEE : 0;
  const total = subtotal + shippingFee;
  const taxAmount = total * TAX_RATE;
  const netAmount = total - taxAmount;

  const fmt = (n: number) =>
    n.toLocaleString("sk-SK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €";

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl p-6 shadow-sm bg-muted/60 border border-border/60">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
          Vaša objednávka
        </h3>

        <ul className="flex flex-col gap-3">
          {ORDER_SUMMARY_PRODUCTS.map((bottle) => {
            const quantity = getCurrentAmount(bottle.id);

            return (
              <li key={bottle.id} className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: bottle.color + "1a" }}
                >
                  <BottleIcon color={bottle.color} />
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-medium text-foreground leading-tight truncate">
                    {bottle.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {bottle.volume}
                  </span>
                </div>

                <QuantityStepper
                  value={quantity}
                  onIncrease={() => increase(bottle.id)}
                  onDecrease={() => decrease(bottle.id)}
                  onChange={(val) => changeQty(bottle.id, val)}
                />

                <span className="w-16 text-right text-sm font-semibold text-foreground tabular-nums shrink-0">
                  {quantity > 0 ? fmt(bottle.unitPrice * quantity) : "—"}
                </span>
              </li>
            );
          })}
        </ul>

        <Separator className="my-5" />

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Medzisúčet</span>
            <span className="text-sm font-medium text-foreground tabular-nums">
              {fmt(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Doručenie</span>
            <span className="text-sm font-medium text-foreground tabular-nums">
              {hasItems ? fmt(shippingFee) : "—"}
            </span>
          </div>

          <Separator className="my-1" />

          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-foreground">
              Celková suma (s DPH)
            </span>
            <span className="text-base font-bold text-foreground tabular-nums">
              {fmt(total)}
            </span>
          </div>

          <Separator className="my-1" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Suma bez DPH</span>
            <span className="text-sm font-medium text-foreground tabular-nums">
              {fmt(netAmount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              DPH ({(TAX_RATE * 100).toFixed(0)} %)
            </span>
            <span className="text-sm font-medium text-foreground tabular-nums">
              {fmt(taxAmount)}
            </span>
          </div>
        </div>
      </div>

      <form.SubscribeButton
        label="Objednať s povinnosťou platby"
        variant="primary"
        className="w-full rounded-xl py-6 text-base font-semibold"
      />

      <div className="flex flex-col gap-3 px-1">
        <div className="flex items-center gap-2.5">
          <ShieldCheckIcon className="h-5 w-5 text-blue-700 fill-blue-200 stroke-[1.5]" />
          <span className="text-xs text-muted-foreground">
            Bezpečná platba so šifrovaním SSL
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <LockClosedIcon className="h-5 w-5 text-yellow-700 fill-yellow-200 stroke-[1.5]" />
          <span className="text-xs text-muted-foreground">
            Vaše údaje spracúvame dôverne
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <TruckIcon className="h-5 w-5 text-green-700 fill-green-200 stroke-[1.5]" />
          <span className="text-xs text-muted-foreground">
            Rýchle doručenie tovaru
          </span>
        </div>
      </div>
    </div>
  );
}
