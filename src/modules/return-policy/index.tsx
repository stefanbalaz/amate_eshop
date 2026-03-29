import { LEGAL_TITLES } from "@/fixtures/footer-legal-titles"
import { LegalPageShell, LegalWithdrawalBody } from "@/fixtures/mockLegal"

export default function ReturnPolicyPage() {
  return (
    <LegalPageShell title={LEGAL_TITLES.withdrawal}>
      <LegalWithdrawalBody />
    </LegalPageShell>
  )
}
