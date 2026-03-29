import { LEGAL_TITLES } from "@/fixtures/footer-legal-titles"
import { LegalPageShell, LegalPrivacyBody } from "@/fixtures/mockLegal"

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title={LEGAL_TITLES.privacy}>
      <LegalPrivacyBody />
    </LegalPageShell>
  )
}
