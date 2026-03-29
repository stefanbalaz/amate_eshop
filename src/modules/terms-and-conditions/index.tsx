import { LEGAL_TITLES } from "@/fixtures/footer-legal-titles"
import { LegalPageShell, LegalTermsBody } from "@/fixtures/mockLegal"

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell title={LEGAL_TITLES.terms}>
      <LegalTermsBody />
    </LegalPageShell>
  )
}
