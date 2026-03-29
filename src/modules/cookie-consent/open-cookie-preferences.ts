import { show, showPreferences } from "vanilla-cookieconsent"

/**
 * Opens the cookie preferences panel. If the user has never consented, shows the main consent modal instead.
 */
export function openCookiePreferences(): void {
  try {
    showPreferences()
  } catch {
    show(true)
  }
}
