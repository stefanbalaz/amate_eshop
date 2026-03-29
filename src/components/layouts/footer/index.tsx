import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { mockCompanyData } from "@/fixtures/mockCompany";
import { CookieConsentLink } from "@/modules/cookie-consent";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function Footer() {
  const {
    logoSrc,
    logoAlt,
    description,
    sectionTitles,
    socialLinks,
    contact,
    legalLinks,
    bottomBar,
  } = mockCompanyData;

  return (
    <footer className="bg-primary-background text-footer-foreground">
      {/* Main footer content */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            {/* <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-footer-foreground">
                Formilo
              </span>
            </Link> */}

            {/* Logo */}
            <Link to="/" className="inline-block">
              <img src={logoSrc} alt={logoAlt} className="block h-10 w-auto" />
            </Link>

            <div className="mt-4 max-w-sm text-sm leading-relaxed text-footer-muted">
              <p>{description.primaryText}</p>
              {description.secondaryText ? (
                <p className="mt-1 flex items-center gap-2">
                  {description.showHeartIcon ? (
                    <Heart className="h-4 w-4 fill-red-600 stroke-red-600" />
                  ) : null}
                  <span>{description.secondaryText}</span>
                </p>
              ) : null}
            </div>

            {/* Social icons (external => <a>) */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((socialLink) => {
                const Icon =
                  socialLink.platform === "instagram"
                    ? InstagramIcon
                    : FacebookIcon;

                return (
                  <a
                    key={socialLink.id}
                    href={socialLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-footer-muted transition-colors hover:text-footer-foreground"
                    aria-label={socialLink.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact column */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-footer-foreground">
              {sectionTitles.contact}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-3 text-sm text-footer-muted transition-colors hover:text-footer-foreground"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="group flex items-center gap-3 text-sm text-footer-muted transition-colors hover:text-footer-foreground"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-footer-muted">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {contact.addressLines.map((line, index) => (
                      <span key={`${line}-${index}`}>
                        {line}
                        {index < contact.addressLines.length - 1 ? (
                          <br />
                        ) : null}
                      </span>
                    ))}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-footer-foreground">
              {sectionTitles.legal}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {legalLinks.map((legalLink) => (
                <li key={legalLink.id}>
                  <Link
                    to={legalLink.to}
                    className="text-sm text-footer-muted transition-colors hover:text-footer-foreground"
                  >
                    {legalLink.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieConsentLink className="text-left text-sm text-footer-muted transition-colors hover:text-footer-foreground" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-footer-muted/20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-footer-muted">{bottomBar.copyright}</p>
          <p className="text-xs text-footer-muted">
            {bottomBar.creditsLabel}{" "}
            <a
              href={bottomBar.creditsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-footer-foreground transition-colors hover:text-footer-muted"
            >
              {bottomBar.creditsText}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
