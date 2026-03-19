import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui/primitives";

export function ContactForm() {
  return (
    <Card className="rounded-2xl bg-card shadow-sm border-0">
      <CardHeader className="mb-6">
        <CardTitle className="text-xl">Kontaktformular</CardTitle>
        <CardDescription>
          Bitte geben Sie Ihre Daten ein, damit wir Sie kontaktieren können.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        {/* Firmenname */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">Firmenname (optional)</Label>
          <Input
            id="company"
            placeholder="Musterfirma GmbH"
            className="bg-blue-50/50"
          />
        </div>

        {/* Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="firstName">Vorname</Label>{" "}
              <span className="text-red-500 font-bold">*</span>
            </div>
            <Input id="firstName" placeholder="Max" className="bg-blue-50/50" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="lastName">Nachname</Label>
              <span className="text-red-500 font-bold">*</span>
            </div>
            <Input
              id="lastName"
              placeholder="Mustermann"
              className="bg-blue-50/50"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="email">E-Mail-Adresse</Label>
            <span className="text-red-500 font-bold">*</span>
          </div>
          <Input
            id="email"
            type="email"
            placeholder="max@beispiel.de"
            className="bg-blue-50/50"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="phone">Telefonnummer</Label>
            <span className="text-red-500 font-bold">*</span>
          </div>
          <Input
            id="phone"
            type="tel"
            placeholder="+49 30 1234567"
            className="bg-blue-50/50"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="message">Nachricht (optional)</Label>
          <textarea
            id="message"
            rows={3}
            placeholder="Beschreiben Sie kurz Ihr Anliegen oder Ihre Anforderungen."
            className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-blue-50/50 px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
