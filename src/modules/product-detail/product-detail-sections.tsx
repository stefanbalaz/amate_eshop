type ProductDetailSectionsProps = {
  nutrition: unknown
  ingredients: string
  legalInfo: string[]
  productDescription?: { headline?: string; paragraphs: string[] }[]
}

export function ProductDetailSections({
  nutrition,
  ingredients,
  legalInfo,
  productDescription,
}: ProductDetailSectionsProps) {
  console.log("ProductDetailSections productDescription:", productDescription)
  console.log("productDescription:", productDescription)

  type NutritionMap = Record<string, string>

  const nutritionMap: NutritionMap =
    typeof nutrition === "object" && nutrition !== null
      ? (nutrition as NutritionMap)
      : {}

  const nutritionConfig = [
    { key: "energy", label: "Energia" },
    { key: "fat", label: "Tuky" },
    { key: "saturatedFat", label: "z toho nasýtené mastné kyseliny" },
    { key: "carbohydrates", label: "Sacharidy" },
    { key: "sugars", label: "z toho cukry" },
    { key: "protein", label: "Bielkoviny" },
    { key: "salt", label: "Soľ" },
  ]

  const nutritionItems = nutritionConfig
    .map(({ key, label }) => {
      const value = nutritionMap[key]
      if (!value) return null

      return {
        label,
        value,
      }
    })
    .filter(Boolean) as { label: string; value: string }[]

  // Helper to clean up ingredients string (remove quotes if present)
  function cleanIngredients(ingredients: string) {
    try {
      const parsed = JSON.parse(ingredients)
      if (typeof parsed === "string") return parsed
      return ingredients
    } catch {
      return ingredients.replace(/^"(.*)"$/, "$1")
    }
  }

  // Helper to parse legal info (array or string)
  function parseLegalInfo(info: unknown): string[] {
    if (!info) return []
    if (Array.isArray(info)) return info
    if (typeof info === "string") {
      try {
        const parsed = JSON.parse(info)
        if (Array.isArray(parsed)) return parsed
        if (typeof parsed === "string") return [parsed]
      } catch {
        // If JSON parsing fails, try splitting by newlines
        const lines = info
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
        if (lines.length > 1) return lines
      }
      // fallback: split by ". "
      return info.split(". ").filter(Boolean)
    }
    // fallback: coerce to string
    return [String(info)]
  }

  // const nutritionItems = Object.entries(nutritionMap).map(([label, value]) => ({
  //   label,
  //   value: String(value),
  // }))

  // // English to Slovak nutrition label map
  // const nutritionLabelMap: Record<string, string> = {
  //   energy: "Energia",
  //   fat: "Tuky",
  //   saturatedFat: "z toho nasýtené mastné kyseliny",
  //   carbohydrates: "Sacharidy",
  //   sugars: "z toho cukry",
  //   protein: "Bielkoviny",
  //   salt: "Soľ",
  // }

  return (
    <section className="max-w-full md:max-w-4/5">
      {/* Characteristics Section */}
      <div className="mb-16 border-b border-border pb-8">
        <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
          Charakteristika
        </h2>
        <div className="text-base leading-relaxed text-foreground/80">
          {productDescription?.map((block, i) => (
            <div key={i} className="mt-10 first:mt-0">
              {block.headline && (
                <h3 className="text-md mb-4 font-normal uppercase">
                  {block.headline}
                </h3>
              )}
              {block.paragraphs &&
                block.paragraphs.map((p: string, idx: number) => (
                  <p key={idx} className="mt-2 first:mt-0">
                    {p}
                  </p>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="mb-16 border-b border-border pb-8">
        <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
          Zloženie
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          {cleanIngredients(ingredients)}
        </p>
      </div>

      {/* Nutrition Section */}
      <div className="mb-16 border-b border-border pb-8">
        <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
          Nutričné hodnoty
        </h2>
        <p className="text-base leading-relaxed text-foreground/80">
          Na 100 ml
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 border-border pt-6 sm:grid-cols-3 lg:grid-cols-4">
          {/* {nutritionItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-2 rounded-md border border-gray-100 bg-gray-100/50 p-2.5 text-center shadow-sm"
            >
              <span className="text-xl leading-none font-bold text-foreground">
                {item.value}
              </span>
              <span className="text-xs tracking-wide text-muted-foreground uppercase">
                {nutritionLabelMap[item.label] || item.label}
              </span>
            </div>
          ))} */}

          {nutritionItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-2 rounded-md border border-gray-100 bg-gray-100/50 p-2.5 text-center shadow-sm"
            >
              <span className="text-xl leading-none font-bold text-foreground">
                {item.value}
              </span>
              <span className="text-xs tracking-wide text-muted-foreground uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Section */}
      <div className="border-b border-border pb-8">
        <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
          Dodatočné informácie
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {parseLegalInfo(legalInfo).map((sentence, i) => (
            <div key={i} className="flex gap-3">
              <span className="mt-1 shrink-0 text-xs font-bold text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-foreground/75">
                {sentence.trim()}
                {sentence.trim().endsWith(".") ? "" : "."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
