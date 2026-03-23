import { mateLeavesImage } from "@/assets"

export default function WhatIsMate() {
  return (
    <section className="bg-muted py-20">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div
          id="mate-image"
          className="scroll-mt-24 overflow-hidden rounded-2xl bg-muted/50"
        >
          <div className="flex aspect-4/3 items-center justify-center text-sm text-muted-foreground">
            <img src={mateLeavesImage} alt="Zástupný obrázok listov maté" />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-secondary uppercase">
            Starodávny list
          </p>
          <h2 className="mb-6 text-4xl md:text-5xl">ČO JE YERBA MATÉ?</h2>
          <p className="mb-4 leading-relaxed text-foreground">
            Yerba maté je tradičný juhoamerický čaj pripravený z listov rastliny
            Ilex paraguariensis. Po stáročia domorodé komunity v Argentíne,
            Brazílii a Paraguaji zdieľajú maté ako symbol priateľstva a
            spolupatričnosti.
          </p>
          <p className="mb-6 leading-relaxed text-foreground">
            Maté je bohaté na prirodzený kofeín, antioxidanty a vitamíny, vďaka
            čomu poskytuje plynulú a dlhodobú energiu bez nervozity či náhleho
            poklesu ako pri káve. Je to dokonalý prírodný zdroj energie.
          </p>
          {/* <Link
            to="/what-is-mate"
            className="inline-flex h-12 items-center rounded-md border border-border px-6 text-sm font-semibold text-foreground transition hover:bg-accent"
          >
            Zistiť viac
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link> */}
        </div>
      </div>
    </section>
  )
}
