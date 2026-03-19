import { Link } from "react-router-dom";
import { Phone, ShoppingBasket } from "lucide-react";
import { mockCompanyData } from "@/fixtures/mockCompany";
import { useCart } from "@/context/use-cart";
import { useDrawer } from "@/features/drawer";

export function Header() {
  const { header } = mockCompanyData;
  const { totalSelectedBottles } = useCart();
  const { openDrawer, closeDrawer } = useDrawer();

  const openCompanyInfoDrawer = () => {
    openDrawer({
      drawerID: "company-info",
      content: (
        <div className="flex h-full flex-col p-6">
          <h2 className="text-lg font-semibold">{header.infoLink.label}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {header.phone.display}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => closeDrawer({ drawerID: "company-info" })}
              className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              Zavrieť
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-auto w-full max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to={header.homeTo} className="flex items-center">
          <img
            src={header.logoSrc}
            alt={header.logoAlt}
            className="h-20 w-auto"
          />
        </Link>

        {/* Right side nav */}
        <nav className="flex items-center gap-6">
          {/* Hash link => use <a> */}
          <button
            type="button"
            onClick={openCompanyInfoDrawer}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {header.infoLink.label}
          </button>

          {/* tel => use <a> */}
          <a
            href={header.phone.href}
            className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{header.phone.display}</span>
          </a>

          <Link
            to="/checkout"
            className="relative inline-flex items-center text-foreground transition-colors hover:text-muted-foreground"
            aria-label="Go to checkout"
          >
            <ShoppingBasket className="h-10 w-10" />
            <span className="absolute -right-2 -top-2 inline-flex min-h-7 min-w-7 items-center justify-center rounded-full bg-emerald-600 px-1 text-[14px] font-semibold leading-none text-white">
              {totalSelectedBottles}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
