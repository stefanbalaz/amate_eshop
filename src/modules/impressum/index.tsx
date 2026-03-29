import { LEGAL_TITLES } from "@/fixtures/footer-legal-titles"
import { LegalImpressumBody, LegalPageShell } from "@/fixtures/mockLegal"

export default function ImpressumPage() {
  return (
    <LegalPageShell title={LEGAL_TITLES.impressum}>
      <LegalImpressumBody />
    </LegalPageShell>
  )
}
