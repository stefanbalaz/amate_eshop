import { Button } from "@/components/ui/primitives";
import {
  BoltIcon,
  HandThumbUpIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

type InquiryType = "formular" | "erstgespraech";

interface ContactSummaryProps {
  type: InquiryType;
}

export function ContactSummary({ type }: ContactSummaryProps) {
  const title =
    type === "formular" ? "Unverbindliche Anfrage" : "Kostenloses Erstgespräch";

  const description =
    type === "formular"
      ? "Sie interessieren sich für die Erstellung eines interaktiven PDF-Formulars."
      : "Sie möchten ein kostenloses Erstgespräch zu Ihrem Formularprojekt vereinbaren.";

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-muted/80 p-6 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Ihr Interesse <br />
          an unserem Service
        </h3>

        <div className="mt-5 flex items-start gap-4">
          {/* <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted">
            <PdfIcon />
          </div> */}

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">{title}</p>

            <p className="text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {/* <div className="flex items-start gap-3">
          <DocumentTextIcon className="h-15 w-15 text-muted-foreground" />

          <p className="text-sm leading-relaxed text-muted-foreground">
            Nachdem wir Ihre Anfrage erhalten haben, melden wir uns in der Regel{" "}
            <span className="font-medium text-foreground">
              innerhalb des nächsten Werktages
            </span>{" "}
            bei Ihnen.
          </p>
        </div> */}

        {/* Digital Delivery */}
        {/* <div className="flex items-center gap-2.5">
            <DocumentTextIcon className="h-5 w-5 text-green-700 fill-green-200 stroke-[1.5]" />
            <span className="text-xs text-muted-foreground">
              Digitaler Versand nach Fertigstellung
            </span>
          </div> */}
        {/* </div> */}
      </div>

      {/* CTA Button */}
      <Button
        size="default"
        variant="primary"
        className="w-full rounded-xl py-6 text-base font-semibold"
      >
        Anfrage absenden
      </Button>

      {/* Trust signals */}
      <div className="flex flex-col gap-3 px-1">
        {/* SSL */}
        <div className="flex items-center gap-2.5">
          <HandThumbUpIcon className="h-5 w-5 text-green-700 fill-green-200 stroke-[1.5]" />
          <span className="text-xs text-muted-foreground">
            Unverbindliche Anfrage ohne Kosten
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <BoltIcon className="h-5 w-5 text-blue-700 fill-blue-200 stroke-[1.5]" />
          <span className="text-xs text-muted-foreground">
            Rückmeldung innerhalb eines Werktages
          </span>
        </div>

        {/* Data Protection */}
        <div className="flex items-center gap-2.5">
          <LockClosedIcon className="h-5 w-5 text-yellow-700 fill-yellow-200 stroke-[1.5]" />
          <span className="text-xs text-muted-foreground">
            Ihre Daten werden vertraulich behandelt
          </span>
        </div>
      </div>
    </div>
  );
}
