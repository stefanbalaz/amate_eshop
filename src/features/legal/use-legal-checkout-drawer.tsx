import { useDrawer } from "@/features/drawer"
import { legalDocuments } from "@/fixtures/legal-documents"
import { type LegalDocumentId } from "@/fixtures/mockLegal"

export const LEGAL_CHECKOUT_DRAWER_ID = "legal-checkout"

export function useLegalCheckoutDrawer() {
  const { openDrawer, closeDrawer } = useDrawer()

  const openLegalDocument = (id: LegalDocumentId) => {
    const doc = legalDocuments[id]
    const Body = doc.Body

    openDrawer({
      drawerID: LEGAL_CHECKOUT_DRAWER_ID,
      content: (
        <div className="flex h-full max-h-[min(90vh,56rem)] flex-col">
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-6 py-4">
            <h2 className="pr-4 text-lg leading-tight font-semibold text-foreground">
              {doc.title}
            </h2>
            <button
              type="button"
              onClick={() =>
                closeDrawer({ drawerID: LEGAL_CHECKOUT_DRAWER_ID })
              }
              className="shrink-0 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              Zavrieť
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            <div className="text-sm leading-relaxed text-foreground/90 md:text-base">
              <Body />
            </div>
          </div>
        </div>
      ),
    })
  }

  return { openLegalDocument }
}
