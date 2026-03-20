import useProductsList from "@/hooks/core/Product/useProductList"
import { Hero, ProductGrid } from "./components"
import { amateFoundersImage, mateLeavesImage } from "@/assets"

export default function Home() {
  const { productsList, isLoading } = useProductsList()

  console.log("Products list:", productsList)
  console.log("Is loading:", isLoading)

  return (
    <>
      <Hero />
      <ProductGrid fetchedProducts={isLoading ? [] : productsList} />

      <section className="bg-muted py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-muted/50">
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
              Yerba maté je tradičný juhoamerický čaj pripravený z listov
              rastliny Ilex paraguariensis. Po stáročia domorodé komunity v
              Argentíne, Brazílii a Paraguaji zdieľajú maté ako symbol
              priateľstva a spolupatričnosti.
            </p>
            <p className="mb-6 leading-relaxed text-foreground">
              Maté je bohaté na prirodzený kofeín, antioxidanty a vitamíny,
              vďaka čomu poskytuje plynulú a dlhodobú energiu bez nervozity či
              náhleho poklesu ako pri káve. Je to dokonalý prírodný zdroj
              energie.
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

      <section className="bg-botanical py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="order-2 md:order-1">
            <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-secondary uppercase">
              Náš príbeh
            </p>
            <h2 className="mb-6 text-4xl md:text-5xl">ZRODENÉ Z VÁŠNE</h2>
            <p className="mb-4 leading-relaxed text-foreground">
              AMATE vzniklo, keď dvaja bratia zo Slovenska objavili yerba maté
              počas ciest po Južnej Amerike. Inšpirovaní energiou, kultúrou a
              komunitným duchom maté sa rozhodli priniesť túto tradíciu domov.
            </p>
            <p className="mb-6 leading-relaxed text-foreground">
              Dnes sa AMATE vyrába na Slovensku, kde sa autentické yerba maté
              spája s odvážnymi, inovatívnymi príchuťami. Každá fľaša je mostom
              medzi juhoamerickým dedičstvom a stredoeurópskym remeslom.
            </p>
            {/* <Link
              to="/about"
              className="inline-flex h-12 items-center rounded-md border border-border px-6 text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              Prečítať celý príbeh
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link> */}
          </div>

          <div className="order-1 overflow-hidden rounded-2xl bg-muted/50 md:order-2">
            <div className="flex aspect-4/3 items-center justify-center text-sm text-muted-foreground">
              <img
                src={amateFoundersImage}
                alt="Zástupný obrázok zakladateľov"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
