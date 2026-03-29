import { LEGAL_TITLES } from "./footer-legal-titles"
import {
  LegalImpressumBody,
  LegalPrivacyBody,
  LegalTermsBody,
  LegalWithdrawalBody,
} from "./mockLegal"

export const legalDocuments = {
  terms: {
    title: LEGAL_TITLES.terms,
    Body: LegalTermsBody,
  },
  privacy: {
    title: LEGAL_TITLES.privacy,
    Body: LegalPrivacyBody,
  },
  withdrawal: {
    title: LEGAL_TITLES.withdrawal,
    Body: LegalWithdrawalBody,
  },
  impressum: {
    title: LEGAL_TITLES.impressum,
    Body: LegalImpressumBody,
  },
} as const
