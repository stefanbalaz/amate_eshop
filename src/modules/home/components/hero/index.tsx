import { heroImage } from "@/assets"
import { Button } from "@/components"
import { mockContent } from "@/fixtures/mockContent"
import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Hero() {
  const location = useLocation()
  const navigate = useNavigate()

  // Smooth scroll to section or navigate if not on homepage
  const handleSmoothScroll = useCallback(
    (hash: string) => {
      if (location.pathname === "/") {
        const el = document.getElementById(hash.replace("#", ""))
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        } else {
          // fallback: update hash, Home useEffect will handle scroll
          window.location.hash = hash
        }
      } else {
        navigate(`/${hash}`)
      }
    },
    [location, navigate]
  )

  return (
    <section className="relative min-h-[78vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-primary-background">
        <div className="absolute inset-0 bg-linear-to-r from-primary-background via-primary-background/95 to-primary-background/70" />
      </div>
      <div className="absolute top-0 right-0 hidden h-full w-[52%] overflow-hidden md:block">
        <img
          src={heroImage}
          alt="AMATE sparkling mate"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary-background via-primary-background/55 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-xl font-semibold tracking-[0.2em] text-secondary uppercase">
              {mockContent.hero.claim}
            </p>
            <h1 className="mb-6 text-5xl leading-[1.15] text-accent-foreground uppercase md:-ml-1 md:text-7xl lg:-ml-2 lg:text-8xl">
              {mockContent.hero.headline}
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-accent-foreground/85 sm:text-xl">
              {mockContent.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {/* <button
                type="button"
                className="inline-flex h-12 items-center rounded-md bg-primary px-6 text-sm font-semibold text-secondary-foreground transition hover:opacity-90"
                onClick={() =>
                  handleSmoothScroll(mockContent.hero.buttonPrimary.href)
                }
              >
                {mockContent.hero.buttonPrimary.label}
              </button> */}
              <Button
                variant="primary"
                size="xl"
                onClick={() =>
                  handleSmoothScroll(mockContent.hero.buttonPrimary.href)
                }
                label={mockContent.hero.buttonPrimary.label}
              ></Button>
              <Button
                variant="secondary"
                size="xl"
                onClick={() =>
                  handleSmoothScroll(mockContent.hero.buttonSecondary.href)
                }
                label={mockContent.hero.buttonSecondary.label}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
