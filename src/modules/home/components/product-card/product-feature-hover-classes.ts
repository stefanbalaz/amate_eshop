// /**
//  * Maps chip `className` (icon button bg) → hover panel bg. Values are full Tailwind
//  * utilities written as string literals so the compiler emits the `/90` rules.
//  */
// export const PRODUCT_FEATURE_HOVER_PANEL_BY_CHIP_CLASS: Record<string, string> =
//   {
//     "bg-green-200": "bg-green-100",
//     "bg-yellow-200": "bg-yellow-100",
//     "bg-blue-200": "bg-blue-100",
//   }

// export function resolveProductFeatureHoverPanelClassName(
//   chipClassName: string
// ): string {
//   return (
//     PRODUCT_FEATURE_HOVER_PANEL_BY_CHIP_CLASS[chipClassName] ?? chipClassName
//   )
// }

export function resolveProductFeatureHoverPanelClassName(
  chipClassName: string
): string {
  const match = chipClassName.match(/^(bg-[a-z]+-)(\d{2,3})$/)

  if (!match) return chipClassName

  const prefix = match[1] // e.g. "bg-green-"
  const value = parseInt(match[2], 10)

  let newValue: number

  if (value === 50) {
    newValue = 50
  } else if (value === 100) {
    newValue = 50
  } else {
    newValue = value - 100
  }

  return `${prefix}${newValue}`
}
