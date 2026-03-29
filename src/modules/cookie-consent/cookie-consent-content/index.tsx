import { useEffect } from "react"
import "vanilla-cookieconsent/dist/cookieconsent.css"
import { run } from "vanilla-cookieconsent"
import ReactGA from "react-ga4"
import { pageData } from "@/data/pageData"

let cookieConsentInitStarted = false

const imprintPath = "/impressum"
const privacyPath = "/privacy-policy"

export default function CookieConsentRoot() {
  const {
    eMail,
    googleAnalytics: { id: googleAnalyticsId },
    projectName,
  } = pageData.general.legal

  useEffect(() => {
    if (cookieConsentInitStarted) return
    cookieConsentInitStarted = true

    const hasGa = Boolean(googleAnalyticsId)

    void run({
      disablePageInteraction: true,
      autoClearCookies: true,
      cookie: {
        name: projectName,
        secure: window.location.protocol === "https:",
      },
      guiOptions: {
        consentModal: {
          layout: "box wide",
          position: "middle center",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [{ name: /^_ga/ }],
            reloadPage: true,
          },
          services: {
            ga: {
              label: "Google Analytics",
              onAccept: () => {
                if (hasGa) ReactGA.initialize(googleAnalyticsId)
              },
              onReject: () => {
                if (!hasGa) return
                const gtag = (
                  window as Window & { gtag?: (...args: unknown[]) => void }
                ).gtag
                gtag?.("consent", "update", {
                  analytics_storage: "denied",
                })
              },
            },
          },
        },
      },
      language: {
        default: "sk",
        translations: {
          sk: {
            consentModal: {
              title: "Preferencie ochrany osobných údajov",
              description: `
              Predtým, ako budete môcť pokračovať na našu webovú stránku, potrebujeme váš súhlas.<br/>
              Ak máte menej ako 16 rokov a chcete poskytnúť súhlas s nepovinnými službami, musíte požiadať svojich zákonných zástupcov o povolenie.<br/>
              Na našej webovej stránke používame súbory cookies a iné technológie. Niektoré z nich sú nevyhnutné, zatiaľ čo iné nám pomáhajú zlepšovať túto webovú stránku a vaše používateľské skúsenosti. Osobné údaje môžu byť spracované (napríklad IP adresy) na účely personalizovaných reklám a obsahu alebo merania reklám a obsahu. Ďalšie informácie o používaní vašich údajov nájdete v našich <a href="${privacyPath}">zásadách ochrany osobných údajov</a>. Nie je povinné súhlasiť so spracovaním vašich údajov na použitie tohto ponúkaného produktu. Vašu voľbu môžete kedykoľvek zmeniť alebo upraviť v nastaveniach. Je však možné, že kvôli individuálnym nastaveniam nie sú dostupné všetky funkcie webovej stránky.<br/>
              <hr style="border-top: 1px solid #ccc; margin: 10px 0;"/>
              <span style="font-size: 0.9em;">
                Niektoré služby spracovávajú osobné údaje v USA. S vaším súhlasom s používaním týchto služieb súhlasíte aj so spracovaním vašich údajov v USA podľa čl. 49 (1) písm. a GDPR. Súdny dvor EÚ považuje USA za krajinu s nedostatočnou úrovňou ochrany osobných údajov podľa štandardov EÚ. Existuje napríklad riziko, že americké úrady spracujú osobné údaje v rámci dohľadových programov bez možnosti sťažovať sa pre občanov EÚ.<br/>
              </span>
              `,
              acceptAllBtn: "Súhlasím so všetkými cookies",
              acceptNecessaryBtn: "Prijať iba nevyhnutné cookies",
              showPreferencesBtn:
                "Individuálne nastavenia ochrany osobných údajov",
              closeIconLabel: "Zatvoriť a odmietnuť všetko",
              footer: `
                <a href="${imprintPath}">Impresum</a>
                <a href="${privacyPath}">Zásady ochrany osobných údajov</a>
              `,
            },
            preferencesModal: {
              title: "Preferencie ochrany osobných údajov",
              acceptAllBtn: "Súhlasím so všetkými cookies",
              acceptNecessaryBtn: "Prijať iba nevyhnutné cookies",
              savePreferencesBtn: "Uložiť aktuálne nastavenia",
              closeIconLabel: "Zatvoriť modálne okno",
              serviceCounterLabel: "Služba|Služby",
              sections: [
                {
                  title: "Vaše preferencie ochrany osobných údajov",
                  description: `Tu nájdete prehľad všetkých používaných cookies. Môžete udeliť súhlas alebo zobraziť ďalšie informácie a vybrať konkrétne cookies.`,
                },
                {
                  title: "Nevyhnutné",
                  description:
                    "Tieto cookies sú nevyhnutné pre správne fungovanie webovej stránky a nemôžu byť deaktivované.",
                  linkedCategory: "necessary",
                  cookieTable: {
                    caption: "Tabuľka cookies",
                    headers: {
                      name: "Cookie",
                      domain: "Doména",
                      desc: "Popis",
                    },
                    body: [
                      {
                        name: projectName,
                        domain: location.hostname,
                        desc: "Tento cookie uchováva preferencie súhlasu používateľa s cookies na tejto webovej stránke. Ukladá, či používateľ prijal alebo odmietol určité kategórie cookies.",
                      },
                    ],
                  },
                },
                {
                  title: "Funkčné",
                  description:
                    "Tieto cookies zhromažďujú informácie o tom, ako používate našu webovú stránku. Všetky údaje sú anonymizované a nemožno ich použiť na vašu identifikáciu.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    caption: "Tabuľka cookies",
                    headers: {
                      name: "Cookie",
                      domain: "Doména",
                      desc: "Popis",
                    },
                    body: [
                      {
                        name: "_ga",
                        domain: location.hostname,
                        desc: "Tento cookie používa Google Analytics na rozlíšenie používateľov a obmedzenie počtu požiadaviek. Pomáha sledovať používanie webovej stránky a výkonnostné metriky.",
                      },
                      {
                        name: "_gid",
                        domain: location.hostname,
                        desc: "Tento cookie používa Google Analytics na rozlíšenie používateľov. Ukladá a aktualizuje jedinečnú hodnotu pre každú navštívenú stránku.",
                      },
                    ],
                  },
                },
                {
                  title: "Ďalšie informácie",
                  description: `Ak máte otázky týkajúce sa našej politiky cookies a vašich možností, kontaktujte nás prosím na adrese <a href="mailto:${eMail}">${eMail}</a>.`,
                },
              ],
            },
          },
        },
      },
    })
    // Config is static at build time; guard prevents double init (e.g. React StrictMode).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pageData.general.legal is stable
  }, [])

  return null
}
