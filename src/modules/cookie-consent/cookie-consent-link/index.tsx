import { openCookiePreferences } from "../open-cookie-preferences"
import { mockCompanyData } from "@/fixtures/mockCompany"
import { cn } from "@/utils/style"

type CookieConsentLinkProps = {
  className?: string
}

/**
 * Opens the cookie preferences modal (same action as footer “Nastavenie cookies”).
 */
export default function CookieConsentLink({ className }: CookieConsentLinkProps) {
  return (
    <button
      type="button"
      className={cn(className)}
      onClick={() => openCookiePreferences()}
    >
      {mockCompanyData.cookieSettingsLabel}
    </button>
  )
}
