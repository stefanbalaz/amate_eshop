import { mockCompanyData } from "@/fixtures/mockCompany"

const gaIdRaw = import.meta.env.VITE_GA_MEASUREMENT_ID
const gaId =
  typeof gaIdRaw === "string" && gaIdRaw.trim() !== ""
    ? gaIdRaw.trim()
    : ""

/**
 * Site-wide copy and IDs for cookie consent (vanilla-cookieconsent) and related UI.
 */
export const pageData = {
  general: {
    legal: {
      eMail: mockCompanyData.contact.email,
      googleAnalytics: {
        id: gaId,
      },
      /** Stored consent cookie / localStorage name (alphanumeric + underscore). */
      projectName: "amate_cookie_consent",
    },
  },
} as const
