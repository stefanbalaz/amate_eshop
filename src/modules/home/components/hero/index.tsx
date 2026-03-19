import { heroImage } from "@/assets";
import { mockContent } from "@/fixtures/mockContent";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative mb-10 min-h-[78vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-primary-background">
        <div className="absolute inset-0 bg-linear-to-r from-primary-background via-primary-background/95 to-primary-background/70" />
      </div>
      <div className="absolute right-0 top-0 hidden h-full w-[52%] overflow-hidden md:block">
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
            <h1 className="md:-ml-1 lg:-ml-2 text-5xl md:text-7xl lg:text-8xl text-accent-foreground leading-[1.15] mb-6 uppercase ">
              {mockContent.hero.headline}
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-accent-foreground/85 sm:text-xl">
              {mockContent.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={mockContent.hero.buttonPrimary.href}
                className="inline-flex h-12 items-center rounded-md bg-primary px-6 text-sm font-semibold text-secondary-foreground transition hover:opacity-90"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {mockContent.hero.buttonPrimary.label}
              </a>
              <Link
                to={mockContent.hero.buttonSecondary.href}
                className="inline-flex h-12 items-center rounded-md border border-accent-foreground/30 px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent-foreground/10"
              >
                {mockContent.hero.buttonSecondary.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
