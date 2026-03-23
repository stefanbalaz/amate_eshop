"use client"
import { cn } from "@/utils/style"

type ProductFeaturingBadge = {
  label: string
  className: string
}

type ProductImageCardProps = {
  productPicture: string
  productName: string
  featuring?: ProductFeaturingBadge
}

export default function ProductImageCard({
  productPicture,
  productName,
  featuring,
}: ProductImageCardProps) {
  return (
    <div className="relative overflow-hidden rounded-sm bg-secondary/5 shadow-lg">
      {/* Featuring badge */}
      {featuring?.label ? (
        <div
          className={cn(
            "absolute top-0 right-0 z-20 inline-flex h-12 items-center rounded-tr-sm rounded-bl-md px-5 text-sm font-semibold text-white",
            featuring.className
          )}
        >
          {featuring.label}
        </div>
      ) : null}

      {/* Shadow effects */}
      <div className="pointer-events-none absolute bottom-15 left-[46%] z-0 h-px w-80 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-400/22 to-transparent opacity-65 blur-[2px]" />
      <div className="pointer-events-none absolute bottom-14 left-[46%] z-0 h-px w-72 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-500/28 to-transparent opacity-72 blur-[1px]" />
      <div className="pointer-events-none absolute bottom-13.5 left-[46%] z-0 h-px w-68 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-500/24 to-transparent opacity-70 blur-[1px]" />
      <div className="pointer-events-none absolute bottom-13 left-[42%] z-0 h-px w-80 -translate-x-1/2 bg-linear-to-r from-transparent via-gray-300/22 to-transparent opacity-72 blur-[1px]" />
      <div className="pointer-events-none absolute bottom-11 left-[46%] z-0 h-5 w-64 -translate-x-1/2 rounded-full bg-black/12 blur-md" />

      <img
        className="relative z-10 aspect-square h-full w-full object-contain object-center p-12"
        src={productPicture}
        alt={productName}
      />
    </div>
  )
}
