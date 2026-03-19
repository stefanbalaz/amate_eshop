import { z } from "zod";

export const DEFAULT_ORDER_NOTES_MAX_LENGTH = 1500;

// export const createOrderNotesSchema = (
//   maxLength: number = DEFAULT_ORDER_NOTES_MAX_LENGTH,
// ) =>
//   z
//     .string()
//     .max(maxLength, `Poznámky môžu mať najviac ${maxLength} znakov`)
//     .optional();

export const createOrderNotesSchema = (
  maxLength: number = DEFAULT_ORDER_NOTES_MAX_LENGTH,
) =>
  z
    .string()
    .max(maxLength, `Poznámky môžu mať najviac ${maxLength} znakov`)
    .default("");

// Checkout form schema for webshop
export const checkoutFormSchema = z.object({
  // Personal information
  firstName: z
    .string()
    .min(2, "Meno musí mať aspoň 2 znaky")
    .max(50, "Meno môže mať najviac 50 znakov"),
  lastName: z
    .string()
    .min(2, "Priezvisko musí mať aspoň 2 znaky")
    .max(50, "Priezvisko môže mať najviac 50 znakov"),
  email: z.string().email("Neplatná e-mailová adresa"),
  phone: z
    .string()
    .min(8, "Telefónne číslo musí mať aspoň 8 znakov")
    .max(20, "Telefónne číslo môže mať najviac 20 znakov")
    .regex(/^\+?[0-9\s\-()]*$/, "Neplatný formát telefónneho čísla"),

  // Delivery address
  deliveryStreetName: z.string().min(1, "Názov ulice musí mať aspoň 1 znak"),
  deliveryHouseNumber: z.string().min(1, "Číslo domu musí mať aspoň 1 znak"),
  deliveryZip: z.string().min(3, "PSČ musí mať aspoň 3 znaky"),
  deliveryCity: z.string().min(2, "Mesto musí mať aspoň 2 znaky"),
  deliveryCountry: z.string().min(1, "Prosím, vyberte krajinu"),

  // Company information (optional)
  companyName: z.string().min(2, "Názov spoločnosti musí mať aspoň 2 znaky"),
  companyRegistrationNumber: z.string().min(6, "IČO musí mať aspoň 6 znakov"),
  taxIdentificationNumber: z.string().optional().default(""),
  vatNumber: z.string().optional().default(""),

  // Invoice address (optional)
  invoiceStreetName: z.string().min(1, "Názov ulice musí mať aspoň 1 znak"),
  invoiceHouseNumber: z.string().min(1, "Číslo domu musí mať aspoň 1 znak"),
  invoiceZip: z.string().min(3, "PSČ musí mať aspoň 3 znaky"),
  invoiceCity: z.string().min(2, "Mesto musí mať aspoň 2 znaky"),
  invoiceCountry: z.string().min(1, "Prosím, vyberte krajinu"),

  // Toggles
  isCompany: z.boolean().default(false),
  isDifferentInvoice: z.boolean().default(false),

  // Notes
  orderNotes: createOrderNotesSchema(),

  // Terms and conditions
  hasCheckedTerms: z.boolean().refine((val) => val === true, {
    message: "Musíte súhlasiť s obchodnými podmienkami",
  }),
});
