import { useCart } from "@/context/use-cart"
import useProductsList from "@/hooks/core/Product/useProductList"
import { Separator } from "../../../../components/ui/primitives"

const tailwindColorToHex: Record<string, string> = {
  "slate-50": "#f8fafc",
  "slate-100": "#f1f5f9",
  "slate-200": "#e2e8f0",
  "slate-300": "#cbd5e1",
  "slate-400": "#94a3b8",
  "slate-500": "#64748b",
  "slate-600": "#475569",
  "slate-700": "#334155",
  "slate-800": "#1e293b",
  "slate-900": "#0f172a",
  "gray-50": "#f9fafb",
  "gray-100": "#f3f4f6",
  "gray-200": "#e5e7eb",
  "gray-300": "#d1d5db",
  "gray-400": "#9ca3af",
  "gray-500": "#6b7280",
  "gray-600": "#4b5563",
  "gray-700": "#374151",
  "gray-800": "#1f2937",
  "gray-900": "#111827",
  "red-50": "#fef2f2",
  "red-100": "#fee2e2",
  "red-200": "#fecaca",
  "red-300": "#fca5a5",
  "red-400": "#f87171",
  "red-500": "#ef4444",
  "red-600": "#dc2626",
  "red-700": "#b91c1c",
  "red-800": "#991b1b",
  "red-900": "#7f1d1d",
  "orange-50": "#fff7ed",
  "orange-100": "#ffedd5",
  "orange-200": "#fed7aa",
  "orange-300": "#fdba74",
  "orange-400": "#fb923c",
  "orange-500": "#f97316",
  "orange-600": "#ea580c",
  "orange-700": "#c2410c",
  "orange-800": "#9a3412",
  "orange-900": "#7c2d12",
  "yellow-50": "#fefce8",
  "yellow-100": "#fef9c3",
  "yellow-200": "#fef08a",
  "yellow-300": "#fde047",
  "yellow-400": "#facc15",
  "yellow-500": "#eab308",
  "yellow-600": "#ca8a04",
  "yellow-700": "#a16207",
  "yellow-800": "#854d0e",
  "yellow-900": "#713f12",
  "lime-50": "#f7fee7",
  "lime-100": "#ecfccb",
  "lime-200": "#d9f99d",
  "lime-300": "#bef264",
  "lime-400": "#a3e635",
  "lime-500": "#84cc16",
  "lime-600": "#65a30d",
  "lime-700": "#4d7c0f",
  "lime-800": "#3f6212",
  "lime-900": "#365314",
  "green-50": "#f0fdf4",
  "green-100": "#dcfce7",
  "green-200": "#bbf7d0",
  "green-300": "#86efac",
  "green-400": "#4ade80",
  "green-500": "#22c55e",
  "green-600": "#16a34a",
  "green-700": "#15803d",
  "green-800": "#166534",
  "green-900": "#14532d",
  "teal-50": "#f0fdfa",
  "teal-100": "#ccfbf1",
  "teal-200": "#99f6e4",
  "teal-300": "#5eead4",
  "teal-400": "#2dd4bf",
  "teal-500": "#14b8a6",
  "teal-600": "#0d9488",
  "teal-700": "#0f766e",
  "teal-800": "#115e59",
  "teal-900": "#134e4a",
  "cyan-50": "#ecfeff",
  "cyan-100": "#cffafe",
  "cyan-200": "#a5f3fc",
  "cyan-300": "#67e8f9",
  "cyan-400": "#22d3ee",
  "cyan-500": "#06b6d4",
  "cyan-600": "#0891b2",
  "cyan-700": "#0e7490",
  "cyan-800": "#155e75",
  "cyan-900": "#164e63",
  "blue-50": "#eff6ff",
  "blue-100": "#dbeafe",
  "blue-200": "#bfdbfe",
  "blue-300": "#93c5fd",
  "blue-400": "#60a5fa",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "blue-700": "#1d4ed8",
  "blue-800": "#1e40af",
  "blue-900": "#1e3a8a",
  "indigo-50": "#eef2ff",
  "indigo-100": "#e0e7ff",
  "indigo-200": "#c7d2fe",
  "indigo-300": "#a5b4fc",
  "indigo-400": "#818cf8",
  "indigo-500": "#6366f1",
  "indigo-600": "#4f46e5",
  "indigo-700": "#4338ca",
  "indigo-800": "#3730a3",
  "indigo-900": "#312e81",
  "violet-50": "#f5f3ff",
  "violet-100": "#ede9fe",
  "violet-200": "#ddd6fe",
  "violet-300": "#c4b5fd",
  "violet-400": "#a78bfa",
  "violet-500": "#8b5cf6",
  "violet-600": "#7c3aed",
  "violet-700": "#6d28d9",
  "violet-800": "#5b21b6",
  "violet-900": "#4c1d95",
  "purple-50": "#faf5ff",
  "purple-100": "#f3e8ff",
  "purple-200": "#e9d5ff",
  "purple-300": "#d8b4fe",
  "purple-400": "#c084fc",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "purple-700": "#7e22ce",
  "purple-800": "#6b21a8",
  "purple-900": "#581c87",
  "pink-50": "#fdf2f8",
  "pink-100": "#fce7f3",
  "pink-200": "#fbcfe8",
  "pink-300": "#f9a8d4",
  "pink-400": "#f472b6",
  "pink-500": "#ec4899",
  "pink-600": "#db2777",
  "pink-700": "#be185d",
  "pink-800": "#9d174d",
  "pink-900": "#831843",
  "rose-50": "#fff1f2",
  "rose-100": "#ffe4e6",
  "rose-200": "#fecdd3",
  "rose-300": "#fda4af",
  "rose-400": "#fb7185",
  "rose-500": "#f43f5e",
  "rose-600": "#e11d48",
  "rose-700": "#be123c",
  "rose-800": "#9f1239",
  "rose-900": "#881337",
}

function getHexFromColorClassName(
  className: string | null | undefined
): string {
  if (!className) return "#6b7280"
  const match = className.match(/bg-([a-z]+-\d+)/)
  if (!match) return "#6b7280"
  return tailwindColorToHex[match[1]] ?? "#6b7280"
}
import {
  ShieldCheckIcon,
  LockClosedIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"
import { BottleIcon } from "../icons"
import type { CartFormApi } from "@/hooks/use-cart-form"

const SHIPPING_FEE = 4.9
const TAX_RATE = 0.23

function QuantityStepper({
  value,
  onIncrease,
  onDecrease,
  onChange,
}: {
  value: number
  onIncrease: () => void
  onDecrease: () => void
  onChange: (val: number) => void
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onDecrease}
        disabled={value === 0}
        aria-label="Znížiť množstvo"
        className="flex h-5.5 w-5.5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-primary/50 bg-primary/10 text-sm font-semibold text-primary transition hover:bg-primary/20 active:bg-primary/25 disabled:cursor-not-allowed disabled:border-border disabled:bg-background disabled:text-muted-foreground disabled:opacity-30"
      >
        <span className="-translate-y-px leading-none">−</span>
      </button>
      <input
        type="number"
        min={0}
        max={999}
        value={value}
        aria-label="Množstvo"
        onChange={(e) => {
          const parsed = parseInt(e.target.value, 10)
          if (!isNaN(parsed)) onChange(Math.min(Math.max(parsed, 0), 999))
          else if (e.target.value === "") onChange(0)
        }}
        className="w-10 [appearance:textfield] rounded-md border border-input/70 bg-input/10 text-center text-sm font-semibold text-foreground shadow-xs transition-[color,box-shadow] outline-none hover:border-input hover:bg-input/30 focus-visible:border-input focus-visible:ring-[3px] focus-visible:ring-input/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        onClick={onIncrease}
        aria-label="Zvýšiť množstvo"
        className="flex h-5.5 w-5.5 shrink-0 cursor-pointer items-center justify-center rounded-md border border-primary/50 bg-primary/10 text-sm font-semibold text-primary transition hover:bg-primary/20 active:bg-primary/25"
      >
        <span className="-translate-y-px leading-none">+</span>
      </button>
    </div>
  )
}

type OrderSummaryProps = {
  form: CartFormApi
}

export function OrderSummary({ form }: OrderSummaryProps) {
  const { getCurrentAmount, handleDecreaseAmount, handleIncreaseAmount } =
    useCart()
  const { productsList } = useProductsList()

  const orderSummaryProducts = productsList.map((product) => ({
    id: product.id,
    name: `${product.productBrand} ${product.productName}`,
    volume: `${(product.productVolumeMilliliter / 1000).toLocaleString(
      "sk-SK",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )} l`,
    unitPrice: product.productPriceCents / 100,
    color: getHexFromColorClassName(product.productColorClassName),
  }))

  const increase = (id: string) => handleIncreaseAmount(id, 1)

  const decrease = (id: string) => handleDecreaseAmount(id, 1)

  const changeQty = (id: string, val: number) => {
    const currentAmount = getCurrentAmount(id)
    const nextAmount = Math.min(Math.max(val, 0), 999)

    if (nextAmount > currentAmount) {
      handleIncreaseAmount(id, nextAmount - currentAmount)
      return
    }

    if (nextAmount < currentAmount) {
      handleDecreaseAmount(id, currentAmount - nextAmount)
    }
  }

  const subtotal = orderSummaryProducts.reduce(
    (sum, product) => sum + product.unitPrice * getCurrentAmount(product.id),
    0
  )
  const hasItems = subtotal > 0
  const shippingFee = hasItems ? SHIPPING_FEE : 0
  const total = subtotal + shippingFee
  const taxAmount = total * TAX_RATE
  const netAmount = total - taxAmount

  const fmt = (n: number) =>
    n.toLocaleString("sk-SK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border/60 bg-muted/60 p-6 shadow-sm">
        <h3 className="mb-5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Vaša objednávka
        </h3>

        <ul className="flex flex-col gap-3">
          {orderSummaryProducts.map((bottle) => {
            const quantity = getCurrentAmount(bottle.id)

            return (
              <li key={bottle.id} className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: bottle.color + "1a" }}
                >
                  <BottleIcon color={bottle.color} />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm leading-tight font-medium text-foreground">
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

                <span className="w-16 shrink-0 text-right text-sm font-semibold text-foreground tabular-nums">
                  {quantity > 0 ? fmt(bottle.unitPrice * quantity) : "—"}
                </span>
              </li>
            )
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
          <ShieldCheckIcon className="h-5 w-5 fill-blue-200 stroke-[1.5] text-blue-700" />
          <span className="text-xs text-muted-foreground">
            Bezpečná platba so šifrovaním SSL
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <LockClosedIcon className="h-5 w-5 fill-yellow-200 stroke-[1.5] text-yellow-700" />
          <span className="text-xs text-muted-foreground">
            Vaše údaje spracúvame dôverne
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <TruckIcon className="h-5 w-5 fill-green-200 stroke-[1.5] text-green-700" />
          <span className="text-xs text-muted-foreground">
            Rýchle doručenie tovaru
          </span>
        </div>
      </div>
    </div>
  )
}
