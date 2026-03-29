import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import type { LEGAL_TITLES } from "./footer-legal-titles"

export type LegalDocumentId = keyof typeof LEGAL_TITLES

export function LegalPageShell({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-4xl text-foreground uppercase md:text-5xl">
        {title}
      </h2>
      <div className="text-base leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  )
}

export function LegalImpressumBody() {
  return (
    <>
      <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground uppercase">
        AMATE je značka 3-Logy spol. s r. o.
      </h2>

      <div className="mt-10 first:mt-0">
        <h3 className="text-md mb-4 font-normal uppercase">Výrobca</h3>

        <p className="mt-2">3-Logy spol. s r. o.</p>
        <p className="mt-2">951 62 Nevidzany 187</p>
        <p className="mt-2">Slovenská republika</p>
        <p className="mt-2">IČO: 50 776 231, IČ DPH: SK2120460144 podľa §4</p>
        <p className="mt-2">
          Zapísaná na Nitra, odd. Sro, vl.č.42737/N, dátum vzniku: 7. marca 2017
        </p>
      </div>

      <div className="mt-10">
        <h3 className="text-md mb-4 font-normal uppercase">Kontakt</h3>

        <p className="mt-2 first:mt-0">www.amate.sk</p>
        <p className="mt-2">
          <a href="mailto:info@amate.sk" className="hover:underline">
            info@amate.sk
          </a>
        </p>
        <p className="mt-2">Ing. Juraj Baláž</p>
        <p className="mt-2">
          <a href="tel:+421911561885" className="hover:underline">
            +421 (0) 911 561 885
          </a>
        </p>
      </div>
    </>
  )
}

export function LegalTermsBody() {
  return (
    <>
      <div className="mt-10 first:mt-0">
        <h3 className="mb-4 uppercase">Predávajúci</h3>
        <p className="mt-2">3-Logy spol. s r. o.</p>
        <p className="mt-2">951 62 Nevidzany 187</p>
        <p className="mt-2">Slovenská republika</p>
        <p className="mt-2">IČO: 50 776 231</p>
        <p className="mt-2">IČ DPH: SK2120460144</p>
        <p className="mt-2">Email: info@amate.sk</p>
        <p className="mt-2">Telefón: +421 911 561 885</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Pôsobnosť</h3>
        <p className="mt-2">
          Tieto obchodné podmienky upravujú práva a povinnosti medzi
          predávajúcim a kupujúcim pri predaji tovaru prostredníctvom e-shopu.
          Predaj prebieha na území Slovenskej republiky a Českej republiky.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Objednávka a uzavretie zmluvy</h3>
        <p className="mt-2">
          Odoslaním objednávky kupujúci potvrdzuje, že sa oboznámil s týmito
          podmienkami a súhlasí s nimi. Kúpna zmluva vzniká potvrdením
          objednávky zo strany predávajúceho.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Cena a DPH</h3>
        <p className="mt-2">
          Všetky ceny sú uvedené vrátane DPH. Konečná cena vrátane dopravy je
          uvedená pred potvrdením objednávky.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Platba</h3>
        <p className="mt-2">
          Platba prebieha online prostredníctvom platobnej brány Stripe.
          Platobné údaje nie sú ukladané na serveroch predávajúceho.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Doručenie</h3>
        <p className="mt-2">
          Tovar je doručovaný kuriérskou službou na území Slovenskej republiky a
          Českej republiky. Dodacia lehota je spravidla 2–5 pracovných dní.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Charakter tovaru (potraviny)</h3>
        <p className="mt-2">
          Predávaný tovar má charakter potravín (nápojov) a podlieha hygienickým
          a zdravotným požiadavkám. Kupujúci je povinný skontrolovať tovar pri
          prevzatí.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Odstúpenie od zmluvy</h3>
        <p className="mt-2">
          Spotrebiteľ má právo odstúpiť od zmluvy do 14 dní od prevzatia tovaru.
        </p>
        <p className="mt-2">
          Podrobné podmienky odstúpenia od zmluvy, vrátane spôsobu vrátenia
          tovaru a vrátenia platieb, sú uvedené na samostatnej stránke{" "}
          <Link
            to="/return-policy"
            className="underline hover:text-muted-foreground"
          >
            Odstúpenie od zmluvy
          </Link>
          .
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Reklamačný poriadok</h3>
        <p className="mt-2">
          Kupujúci má právo uplatniť reklamáciu v prípade vady tovaru.
        </p>
        <p className="mt-2">
          Reklamácia musí byť podaná bez zbytočného odkladu na email
          info@amate.sk.
        </p>
        <p className="mt-2">Reklamácia bude vybavená najneskôr do 30 dní.</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Zodpovednosť za vady</h3>
        <p className="mt-2">
          Predávajúci zodpovedá za vady tovaru v súlade s právnymi predpismi.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Ochrana osobných údajov</h3>
        <p className="mt-2">
          Osobné údaje sú spracovávané v súlade s GDPR. Podrobnosti sú uvedené v
          samostatnom dokumente ochrany osobných údajov.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Zákazníci z Českej republiky</h3>
        <p className="mt-2">
          Zákazníci z Českej republiky majú rovnaké práva podľa legislatívy
          Európskej únie.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Záverečné ustanovenia</h3>
        <p className="mt-2">
          Právne vzťahy sa riadia právnym poriadkom Slovenskej republiky.
        </p>
      </div>
    </>
  )
}

export function LegalPrivacyBody() {
  return (
    <>
      <div className="mt-10 first:mt-0">
        <h3 className="mb-4 uppercase">Úvod</h3>
        <p className="mt-2">
          Tento dokument popisuje spôsob spracovania osobných údajov pri
          používaní e-shopu AMATE. Ochrana osobných údajov je pre nás dôležitá a
          spracúvame ich v súlade s nariadením GDPR (EÚ) 2016/679.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Prevádzkovateľ</h3>
        <p className="mt-2">3-Logy spol. s r. o.</p>
        <p className="mt-2">951 62 Nevidzany 187</p>
        <p className="mt-2">Slovenská republika</p>
        <p className="mt-2">IČO: 50 776 231</p>
        <p className="mt-2">Email: info@amate.sk</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Rozsah spracovávaných údajov</h3>
        <p className="mt-2">Spracovávame najmä tieto osobné údaje:</p>
        <p className="mt-2">• meno a priezvisko</p>
        <p className="mt-2">• adresa doručenia a fakturačná adresa</p>
        <p className="mt-2">• emailová adresa a telefónne číslo</p>
        <p className="mt-2">• údaje o objednávkach</p>
        <p className="mt-2">• IP adresa a cookies</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Účely spracovania</h3>
        <p className="mt-2">Osobné údaje spracovávame za účelom:</p>
        <p className="mt-2">• spracovania a doručenia objednávky</p>
        <p className="mt-2">• komunikácie so zákazníkom</p>
        <p className="mt-2">• vedenia účtovníctva</p>
        <p className="mt-2">• marketingu (len na základe súhlasu)</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Právny základ</h3>
        <p className="mt-2">Spracovanie osobných údajov je založené na:</p>
        <p className="mt-2">• plnení zmluvy (objednávka)</p>
        <p className="mt-2">• zákonnej povinnosti</p>
        <p className="mt-2">• oprávnenom záujme</p>
        <p className="mt-2">• súhlase (marketing, cookies)</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Platby (Stripe)</h3>
        <p className="mt-2">
          Platby sú spracovávané prostredníctvom služby Stripe. Stripe môže
          spracovávať osobné údaje potrebné na vykonanie platby v súlade so
          svojimi podmienkami ochrany osobných údajov.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Tretie strany</h3>
        <p className="mt-2">Osobné údaje môžu byť sprístupnené:</p>
        <p className="mt-2">• dopravcom (doručenie zásielky)</p>
        <p className="mt-2">• platobným službám (Stripe)</p>
        <p className="mt-2">• účtovným a právnym službám</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Doba uchovávania</h3>
        <p className="mt-2">
          Osobné údaje uchovávame po dobu nevyhnutnú na splnenie účelu alebo
          podľa zákonných požiadaviek (napr. účtovníctvo).
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Cookies a Google Analytics</h3>

        <p className="mt-2">
          Na našej webovej stránke používame súbory cookies na zabezpečenie
          správnej funkčnosti a analýzu návštevnosti.
        </p>

        <p className="mt-2">
          Používame službu Google Analytics, ktorú poskytuje spoločnosť Google
          Ireland Limited (Gordon House, Barrow Street, Dublin 4, Írsko).
        </p>

        <p className="mt-2">
          Google Analytics používa cookies na analýzu používania webovej
          stránky. Informácie o vašom používaní webu môžu byť prenesené na
          servery Google.
        </p>

        <p className="mt-2">
          Aktivovali sme anonymizáciu IP adresy, takže vaša IP adresa bude
          skrátená v rámci členských štátov EÚ.
        </p>

        <p className="mt-2">
          Spracovanie údajov prebieha na základe vášho súhlasu, ktorý môžete
          kedykoľvek odvolať prostredníctvom nastavení cookies.
        </p>

        <p className="mt-2">
          Viac informácií nájdete na stránke spoločnosti Google:
          https://policies.google.com/privacy
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Vaše práva</h3>
        <p className="mt-2">Máte právo na:</p>
        <p className="mt-2">• prístup k údajom</p>
        <p className="mt-2">• opravu údajov</p>
        <p className="mt-2">• vymazanie údajov</p>
        <p className="mt-2">• obmedzenie spracovania</p>
        <p className="mt-2">• prenos údajov</p>
        <p className="mt-2">• podanie sťažnosti na dozorný orgán</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Kontakt</h3>
        <p className="mt-2">V prípade otázok nás kontaktujte na email:</p>
        <p className="mt-2">
          <a href="mailto:info@amate.sk" className="hover:underline">
            info@amate.sk
          </a>
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Záverečné ustanovenia</h3>
        <p className="mt-2">
          Tento dokument môže byť aktualizovaný. Aktuálna verzia je vždy
          dostupná na webovej stránke.
        </p>
      </div>
    </>
  )
}

export function LegalWithdrawalBody() {
  return (
    <>
      <div className="mt-10 first:mt-0">
        <h3 className="mb-4 uppercase">Právo na odstúpenie</h3>
        <p className="mt-2">
          Spotrebiteľ má právo odstúpiť od zmluvy bez udania dôvodu do 14 dní od
          prevzatia tovaru.
        </p>
        <p className="mt-2">
          Na uplatnenie práva na odstúpenie od zmluvy je potrebné informovať
          predávajúceho e-mailom na adrese{" "}
          <a href="mailto:info@amate.sk" className="underline">
            info@amate.sk
          </a>
          .
        </p>
        <p className="mt-2">
          Lehota na odstúpenie od zmluvy je zachovaná, ak kupujúci odošle
          oznámenie pred jej uplynutím.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Výnimky z odstúpenia</h3>
        <p className="mt-2">
          V súlade s právnymi predpismi sa právo na odstúpenie nevzťahuje na
          tovar, ktorý podlieha rýchlemu zníženiu kvality alebo bol po dodaní
          otvorený a z hygienických dôvodov ho nie je možné vrátiť.
        </p>
        <p className="mt-2">
          Ide najmä o potraviny a nápoje, ktoré boli po doručení otvorené alebo
          inak znehodnotené.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Podmienky vrátenia</h3>
        <p className="mt-2">
          Tovar musí byť nepoškodený, neotvorený, nepoužitý a v pôvodnom obale.
        </p>
        <p className="mt-2">
          Kupujúci je povinný zaslať tovar späť najneskôr do 14 dní od
          odstúpenia od zmluvy.
        </p>
        <p className="mt-2">Náklady na vrátenie tovaru znáša kupujúci.</p>
        <p className="mt-2">
          Kupujúci zodpovedá za zníženie hodnoty tovaru v prípade, že s ním
          zaobchádzal inak, než je potrebné na zistenie jeho vlastností.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Adresa na vrátenie</h3>
        <p className="mt-2">3-Logy spol. s r. o.</p>
        <p className="mt-2">951 62 Nevidzany 187</p>
        <p className="mt-2">Slovenská republika</p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Vrátenie peňazí</h3>
        <p className="mt-2">
          Predávajúci vráti kupujúcemu všetky prijaté platby najneskôr do 14 dní
          od doručenia vráteného tovaru alebo preukázania jeho odoslania.
        </p>
        <p className="mt-2">
          Platba bude vrátená rovnakým spôsobom, aký bol použitý pri úhrade,
          pokiaľ sa zmluvné strany nedohodnú inak.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Kontakt</h3>
        <p className="mt-2">V prípade otázok nás kontaktujte na email:</p>
        <p className="mt-2">
          <a href="mailto:info@amate.sk" className="underline">
            info@amate.sk
          </a>
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 uppercase">Záverečné ustanovenia</h3>
        <p className="mt-2">
          Tento dokument je súčasťou obchodných podmienok a nadobúda účinnosť
          dňom jeho zverejnenia na webovej stránke.
        </p>
      </div>
    </>
  )
}


