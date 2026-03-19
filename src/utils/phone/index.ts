export type PhonePrefixOption = {
  label: string;
  value: string;
  prefix: string;
};

export const PHONE_PREFIXES: PhonePrefixOption[] = [
  { value: "Deutschland", prefix: "+49", label: "Deutschland +49" },
  { value: "Belgien", prefix: "+32", label: "Belgien +32" },
  { value: "Bulgarien", prefix: "+359", label: "Bulgarien +359" },
  { value: "Dänemark", prefix: "+45", label: "Dänemark +45" },
  { value: "Estland", prefix: "+372", label: "Estland +372" },
  { value: "Finnland", prefix: "+358", label: "Finnland +358" },
  { value: "Frankreich", prefix: "+33", label: "Frankreich +33" },
  { value: "Griechenland", prefix: "+30", label: "Griechenland +30" },
  { value: "Irland", prefix: "+353", label: "Irland +353" },
  { value: "Italien", prefix: "+39", label: "Italien +39" },
  { value: "Kroatien", prefix: "+385", label: "Kroatien +385" },
  { value: "Lettland", prefix: "+371", label: "Lettland +371" },
  { value: "Litauen", prefix: "+370", label: "Litauen +370" },
  { value: "Luxemburg", prefix: "+352", label: "Luxemburg +352" },
  { value: "Malta", prefix: "+356", label: "Malta +356" },
  { value: "Niederlande", prefix: "+31", label: "Niederlande +31" },
  { value: "Österreich", prefix: "+43", label: "Österreich +43" },
  { value: "Polen", prefix: "+48", label: "Polen +48" },
  { value: "Portugal", prefix: "+351", label: "Portugal +351" },
  { value: "Rumänien", prefix: "+40", label: "Rumänien +40" },
  { value: "Schweden", prefix: "+46", label: "Schweden +46" },
  { value: "Schweiz", prefix: "+41", label: "Schweiz +41" },
  { value: "Slowakei", prefix: "+421", label: "Slowakei +421" },
  { value: "Slowenien", prefix: "+386", label: "Slowenien +386" },
  { value: "Spanien", prefix: "+34", label: "Spanien +34" },
  { value: "Tschechien", prefix: "+420", label: "Tschechien +420" },
  { value: "Ungarn", prefix: "+36", label: "Ungarn +36" },
  { value: "Zypern", prefix: "+357", label: "Zypern +357" },
];

export const DEFAULT_PHONE_PREFIX = PHONE_PREFIXES[0];
