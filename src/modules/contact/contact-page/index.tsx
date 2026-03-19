import { ContactForm, ContactSummary } from "../components";

export default function ContactPage() {
  return (
    <div className="bg-muted/40 min-h-svh px-6 py-12 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[7fr_3fr]">
        <ContactForm />
        <div className="lg:sticky lg:top-24 h-fit">
          <ContactSummary type="formular" />
        </div>
      </div>
    </div>
  );
}
