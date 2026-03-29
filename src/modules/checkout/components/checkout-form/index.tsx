import { FormSubTitle } from "@/components/ui"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui/primitives"
import type { CartFormApi } from "@/hooks/use-cart-form"
import { zodFieldValidator } from "@/utils/form/form-errors"
import {
  checkoutFormSchema,
  createOrderNotesSchema,
  DEFAULT_ORDER_NOTES_MAX_LENGTH,
} from "../../schemas/checkout-form-schema"
import { defaultValues } from "../default-values"
import { useLegalCheckoutDrawer } from "@/features/legal"
import { Landmark } from "lucide-react"
import { PayPalIcon, VisaIcon } from "../icons"
import { useRef, useState } from "react"

const COUNTRY_OPTIONS = [
  { value: "Slovensko", label: "Slovensko" },
  { value: "Ceska Republika", label: "Česká republika" },
]

function ExpiryInput({
  value,
  onChange,
}: {
  value: string // "MMYY" (digits only)
  onChange: (value: string) => void
}) {
  const monthRef = useRef<HTMLInputElement | null>(null)
  const yearRef = useRef<HTMLInputElement | null>(null)

  const mm = value.slice(0, 2)
  const yy = value.slice(2, 4)

  const setDigits = (newMM: string, newYY: string) => {
    onChange((newMM + newYY).slice(0, 4))
  }

  const handleMonth = (raw: string) => {
    let digits = raw.replace(/\D/g, "").slice(0, 2)

    // Optional: clamp month 01..12 when 2 digits entered
    if (digits.length === 2) {
      const n = Number(digits)
      if (n === 0) digits = "01"
      else if (n > 12) digits = "12"
      yearRef.current?.focus()
    }

    setDigits(digits, yy)
  }

  const handleYear = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 2)
    setDigits(mm, digits)
  }

  const handleMonthKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If month is full and user types a digit, move to year and overwrite there
    if (/^\d$/.test(e.key) && mm.length === 2) {
      e.preventDefault()
      yearRef.current?.focus()
      // Let the digit land in year
      setDigits(mm, (e.key + yy).slice(0, 2))
    }
  }

  const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && yy.length === 0) {
      monthRef.current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4)
    setDigits(digits.slice(0, 2), digits.slice(2, 4))
    if (digits.length >= 2) yearRef.current?.focus()
  }

  const base =
    "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-md border bg-blue-50/50 px-2 py-1 text-center text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"

  return (
    <div className="flex items-center gap-2" onPaste={handlePaste}>
      <input
        ref={monthRef}
        type="text"
        inputMode="numeric"
        autoComplete="cc-exp-month"
        maxLength={2}
        value={mm}
        onChange={(e) => handleMonth(e.target.value)}
        onKeyDown={handleMonthKeyDown}
        placeholder="MM"
        className={`${base} w-14 tracking-[0.2em]`}
      />

      <span className="text-muted-foreground select-none">/</span>

      <input
        ref={yearRef}
        type="text"
        inputMode="numeric"
        autoComplete="cc-exp-year"
        maxLength={2}
        value={yy}
        onChange={(e) => handleYear(e.target.value)}
        onKeyDown={handleYearKeyDown}
        placeholder="YY"
        className={`${base} w-14 tracking-[0.2em]`}
      />
    </div>
  )
}

// OTP-style card number input
function CardNumberInput({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const groups = [
    value.slice(0, 4),
    value.slice(4, 8),
    value.slice(8, 12),
    value.slice(12, 16),
  ]

  const handleInput = (groupIndex: number, inputValue: string) => {
    const digits = inputValue.replace(/\D/g, "").slice(0, 4)
    const before = value.slice(0, groupIndex * 4)
    const after = value.slice((groupIndex + 1) * 4)
    const newValue = (before + digits + after).slice(0, 16)
    onChange(newValue)

    // Auto-advance to next group when current is full
    if (digits.length === 4 && groupIndex < 3) {
      inputRefs.current[groupIndex + 1]?.focus()
    }
  }

  const handleKeyDown = (
    groupIndex: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      groups[groupIndex].length === 0 &&
      groupIndex > 0
    ) {
      inputRefs.current[groupIndex - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 16)
    onChange(pasted)
    // Focus the appropriate group
    const targetGroup = Math.min(Math.floor(pasted.length / 4), 3)
    inputRefs.current[targetGroup]?.focus()
  }

  return (
    <div className="flex items-center gap-2">
      {groups.map((group, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            ref={(el) => {
              inputRefs.current[i] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={group}
            onChange={(e) => handleInput(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            placeholder="0000"
            className="h-9 w-full rounded-md border border-input bg-blue-50/50 px-2 py-1 text-center text-base tracking-[0.2em] shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
          />
          {i < 3 && (
            <span className="text-xs text-muted-foreground select-none">-</span>
          )}
        </div>
      ))}
    </div>
  )
}

type PaymentMethod = "creditcard" | "paypal"

function PaymentOptionCard({
  method,
  selected,
  onSelect,
  icon,
  label,
  children,
}: {
  method: PaymentMethod
  selected: boolean
  onSelect: (method: PaymentMethod) => void
  icon: React.ReactNode
  label: string
  children?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      className={`group flex w-full overflow-hidden rounded-xl border text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
        selected
          ? "border-amber-400 shadow-sm"
          : "border-border hover:border-amber-200"
      }`}
    >
      {/* Left stripe with radio */}
      <div
        className={`flex w-12 shrink-0 items-start justify-center pt-4 transition-colors duration-200 ${
          selected
            ? "bg-amber-100/80"
            : "bg-muted/60 group-hover:bg-amber-50/60"
        }`}
      >
        <span
          className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition-all duration-200 ${
            selected
              ? "border-amber-500 bg-amber-500"
              : "border-muted-foreground/30 bg-background group-hover:border-amber-300"
          }`}
        >
          {selected && <span className="block h-2 w-2 rounded-full bg-white" />}
        </span>
      </div>

      {/* Right content area */}
      <div
        className={`flex flex-1 flex-col gap-3 px-5 py-4 transition-colors duration-200 ${
          selected
            ? "bg-amber-50/50"
            : "bg-background group-hover:bg-amber-50/30"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`transition-colors duration-200 ${
              selected ? "text-amber-600" : "text-muted-foreground"
            }`}
          >
            {icon}
          </span>
          <span className="text-sm font-semibold">{label}</span>
        </div>
        {selected && children && (
          <div className="animate-in duration-300 fade-in slide-in-from-top-1">
            {children}
          </div>
        )}
      </div>
    </button>
  )
}

type CheckoutFormProps = {
  form: CartFormApi
}

export function CheckoutForm({ form }: CheckoutFormProps) {
  const { openLegalDocument } = useLegalCheckoutDrawer()
  const orderNotesMaxCharacters = DEFAULT_ORDER_NOTES_MAX_LENGTH
  const orderNotesSchema = createOrderNotesSchema(orderNotesMaxCharacters)

  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")

  return (
    <Card className="rounded-2xl border-0 bg-card shadow-sm">
      <CardHeader className="mb-4">
        <CardTitle className="text-xl">Objednávkový formulár</CardTitle>
        <CardDescription>
          Vyplňte prosím svoje údaje na dokončenie objednávky.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Personal information */}
        <div className="flex flex-col">
          <FormSubTitle text="Osobné údaje" />
          <div className="grid grid-cols-1 gap-4 align-baseline sm:grid-cols-2">
            <form.AppField
              name="firstName"
              validators={{
                onBlur: zodFieldValidator(checkoutFormSchema.shape.firstName),
                onChange: zodFieldValidator(checkoutFormSchema.shape.firstName),
                onSubmit: zodFieldValidator(checkoutFormSchema.shape.firstName),
              }}
            >
              {(field) => (
                <field.FormTextInput
                  label="Meno"
                  required
                  initiallyFilled={Boolean(defaultValues.firstName)}
                />
              )}
            </form.AppField>
            <form.AppField
              name="lastName"
              validators={{
                onBlur: zodFieldValidator(checkoutFormSchema.shape.lastName),
                onChange: zodFieldValidator(checkoutFormSchema.shape.lastName),
                onSubmit: zodFieldValidator(checkoutFormSchema.shape.lastName),
              }}
            >
              {(field) => (
                <field.FormTextInput
                  label="Priezvisko"
                  required
                  initiallyFilled={Boolean(defaultValues.lastName)}
                />
              )}
            </form.AppField>
          </div>
          <form.AppField
            name="email"
            validators={{
              onBlur: zodFieldValidator(checkoutFormSchema.shape.email),
              onChange: zodFieldValidator(checkoutFormSchema.shape.email),
              onSubmit: zodFieldValidator(checkoutFormSchema.shape.email),
            }}
          >
            {(field) => (
              <field.FormTextInput
                label="E-mailová adresa"
                type="email"
                required
                initiallyFilled={Boolean(defaultValues.email)}
              />
            )}
          </form.AppField>
          <form.AppField
            name="phone"
            validators={{
              onBlur: zodFieldValidator(checkoutFormSchema.shape.phone),
              onChange: zodFieldValidator(checkoutFormSchema.shape.phone),
              onSubmit: zodFieldValidator(checkoutFormSchema.shape.phone),
            }}
          >
            {(field) => (
              <field.FormTextInput
                label="Telefónne číslo"
                hint="Telefónne číslo bude použité iba pre účely doručenia a poskytnuté kuriérskej spoločnosti."
                initiallyFilled={Boolean(defaultValues.phone)}
                required
              />
            )}
          </form.AppField>
        </div>

        {/* Delivery address */}
        <div className="flex flex-col">
          <FormSubTitle text="Doručovacia adresa" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[7fr_3fr]">
            <form.AppField
              name="deliveryStreetName"
              validators={{
                onBlur: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryStreetName
                ),
                onChange: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryStreetName
                ),
                onSubmit: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryStreetName
                ),
              }}
            >
              {(field) => (
                <field.FormTextInput
                  label="Názov ulice"
                  required
                  initiallyFilled={Boolean(defaultValues.deliveryStreetName)}
                />
              )}
            </form.AppField>
            <form.AppField
              name="deliveryHouseNumber"
              validators={{
                onBlur: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryHouseNumber
                ),
                onChange: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryHouseNumber
                ),
                onSubmit: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryHouseNumber
                ),
              }}
            >
              {(field) => (
                <field.FormTextInput
                  label="Číslo domu"
                  required
                  initiallyFilled={Boolean(defaultValues.deliveryHouseNumber)}
                />
              )}
            </form.AppField>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.AppField
              name="deliveryZip"
              validators={{
                onBlur: zodFieldValidator(checkoutFormSchema.shape.deliveryZip),
                onChange: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryZip
                ),
                onSubmit: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryZip
                ),
              }}
            >
              {(field) => (
                <field.FormTextInput
                  label="PSČ"
                  required
                  initiallyFilled={Boolean(defaultValues.deliveryZip)}
                />
              )}
            </form.AppField>
            <form.AppField
              name="deliveryCity"
              validators={{
                onBlur: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryCity
                ),
                onChange: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryCity
                ),
                onSubmit: zodFieldValidator(
                  checkoutFormSchema.shape.deliveryCity
                ),
              }}
            >
              {(field) => (
                <field.FormTextInput
                  label="Obec"
                  required
                  initiallyFilled={Boolean(defaultValues.deliveryCity)}
                />
              )}
            </form.AppField>
          </div>
          <form.AppField
            name="deliveryCountry"
            validators={{
              onBlur: zodFieldValidator(
                checkoutFormSchema.shape.deliveryCountry
              ),
              onChange: zodFieldValidator(
                checkoutFormSchema.shape.deliveryCountry
              ),
              onSubmit: zodFieldValidator(
                checkoutFormSchema.shape.deliveryCountry
              ),
            }}
          >
            {(field) => (
              <field.FormSelectField
                label="Krajina"
                options={COUNTRY_OPTIONS}
                required
                initiallyFilled={Boolean(defaultValues.deliveryCountry)}
              />
            )}
          </form.AppField>
        </div>

        {/* Order as company */}
        <div className="flex flex-col pt-2">
          <form.AppField name="isCompany">
            {(field) => (
              <field.FormCheckboxField
                label={
                  <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                    Objednávam ako firma
                  </span>
                }
              />
            )}
          </form.AppField>
          {/* Company fields, show only if isCompany is checked */}
          <form.Subscribe selector={(state) => state.values.isCompany}>
            {(isCompany) =>
              isCompany && (
                <div className="flex animate-in flex-col duration-200 fade-in slide-in-from-top-2">
                  <form.AppField
                    name="companyName"
                    validators={{
                      onBlur: zodFieldValidator(
                        checkoutFormSchema.shape.companyName
                      ),
                      onChange: zodFieldValidator(
                        checkoutFormSchema.shape.companyName
                      ),
                      onSubmit: zodFieldValidator(
                        checkoutFormSchema.shape.companyName
                      ),
                    }}
                  >
                    {(field) => (
                      <field.FormTextInput
                        label="Názov firmy"
                        required
                        initiallyFilled={Boolean(defaultValues.companyName)}
                      />
                    )}
                  </form.AppField>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
                    <form.AppField
                      name="companyRegistrationNumber"
                      validators={{
                        onBlur: zodFieldValidator(
                          checkoutFormSchema.shape.companyRegistrationNumber
                        ),
                        onChange: zodFieldValidator(
                          checkoutFormSchema.shape.companyRegistrationNumber
                        ),
                        onSubmit: zodFieldValidator(
                          checkoutFormSchema.shape.companyRegistrationNumber
                        ),
                      }}
                    >
                      {(field) => (
                        <field.FormTextInput
                          label="IČO"
                          required
                          initiallyFilled={Boolean(
                            defaultValues.companyRegistrationNumber
                          )}
                        />
                      )}
                    </form.AppField>
                    <form.AppField name="taxIdentificationNumber">
                      {(field) => (
                        <field.FormTextInput label="DIČ (nepovinné)" />
                      )}
                    </form.AppField>
                    <form.AppField name="vatNumber">
                      {(field) => (
                        <field.FormTextInput label="IČ DPH (nepovinné)" />
                      )}
                    </form.AppField>
                  </div>
                </div>
              )
            }
          </form.Subscribe>
        </div>

        {/* Different invoice address */}
        <div className="flex flex-col pt-2">
          <form.AppField name="isDifferentInvoice">
            {(field) => (
              <field.FormCheckboxField
                label={
                  <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                    Fakturačná adresa je iná ako doručovacia
                  </span>
                }
                // wrapperClassName="mb-0"
              />
            )}
          </form.AppField>
          {/* Invoice fields, show only if isDifferentInvoice is checked */}
          <form.Subscribe selector={(state) => state.values.isDifferentInvoice}>
            {(isDifferentInvoice) =>
              isDifferentInvoice && (
                <div className="flex animate-in flex-col duration-200 fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-[7fr_3fr]">
                    <form.AppField
                      name="invoiceStreetName"
                      validators={{
                        onBlur: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceStreetName
                        ),
                        onChange: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceStreetName
                        ),
                        onSubmit: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceStreetName
                        ),
                      }}
                    >
                      {(field) => (
                        <field.FormTextInput
                          label="Názov ulice"
                          required
                          initiallyFilled={Boolean(
                            defaultValues.invoiceStreetName
                          )}
                        />
                      )}
                    </form.AppField>
                    <form.AppField
                      name="invoiceHouseNumber"
                      validators={{
                        onBlur: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceHouseNumber
                        ),
                        onChange: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceHouseNumber
                        ),
                        onSubmit: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceHouseNumber
                        ),
                      }}
                    >
                      {(field) => (
                        <field.FormTextInput
                          label="Číslo domu"
                          required
                          initiallyFilled={Boolean(
                            defaultValues.invoiceHouseNumber
                          )}
                        />
                      )}
                    </form.AppField>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <form.AppField
                      name="invoiceZip"
                      validators={{
                        onBlur: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceZip
                        ),
                        onChange: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceZip
                        ),
                        onSubmit: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceZip
                        ),
                      }}
                    >
                      {(field) => (
                        <field.FormTextInput
                          label="PSČ"
                          required
                          initiallyFilled={Boolean(defaultValues.invoiceZip)}
                        />
                      )}
                    </form.AppField>
                    <form.AppField
                      name="invoiceCity"
                      validators={{
                        onBlur: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceCity
                        ),
                        onChange: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceCity
                        ),
                        onSubmit: zodFieldValidator(
                          checkoutFormSchema.shape.invoiceCity
                        ),
                      }}
                    >
                      {(field) => (
                        <field.FormTextInput
                          label="Mesto"
                          required
                          initiallyFilled={Boolean(defaultValues.invoiceCity)}
                        />
                      )}
                    </form.AppField>
                  </div>
                  <form.AppField
                    name="invoiceCountry"
                    validators={{
                      onBlur: zodFieldValidator(
                        checkoutFormSchema.shape.invoiceCountry
                      ),
                      onChange: zodFieldValidator(
                        checkoutFormSchema.shape.invoiceCountry
                      ),
                      onSubmit: zodFieldValidator(
                        checkoutFormSchema.shape.invoiceCountry
                      ),
                    }}
                  >
                    {(field) => (
                      <field.FormSelectField
                        label="Krajina"
                        options={COUNTRY_OPTIONS}
                        required
                        initiallyFilled={Boolean(defaultValues.invoiceCountry)}
                      />
                    )}
                  </form.AppField>
                </div>
              )
            }
          </form.Subscribe>
        </div>

        {/* Payment method */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Spôsob platby
          </h3>

          <div className="flex flex-col gap-3">
            {/* Credit Card option */}
            <PaymentOptionCard
              method="creditcard"
              selected={paymentMethod === "creditcard"}
              onSelect={setPaymentMethod}
              icon={<VisaIcon className="h-3.5" />}
              label="Platobná karta"
            >
              <div className="flex flex-col gap-4 pt-1">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="cardNumber"
                    className="text-xs text-muted-foreground"
                  >
                    Číslo karty
                  </Label>
                  <CardNumberInput
                    value={cardNumber}
                    onChange={setCardNumber}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="cardHolder"
                    className="text-xs text-muted-foreground"
                  >
                    Držiteľ karty
                  </Label>
                  <Input
                    id="cardHolder"
                    placeholder="Ján Novák"
                    className="bg-blue-50/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="expiry"
                      className="text-xs text-muted-foreground"
                    >
                      Dátum expirácie
                    </Label>
                    <ExpiryInput value={expiry} onChange={setExpiry} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="cvc"
                      className="text-xs text-muted-foreground"
                    >
                      CVC
                    </Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      maxLength={4}
                      type="password"
                      className="bg-blue-50/50"
                    />
                  </div>
                </div>
              </div>
            </PaymentOptionCard>

            {/* PayPal option */}
            <PaymentOptionCard
              method="paypal"
              selected={paymentMethod === "paypal"}
              onSelect={setPaymentMethod}
              icon={<PayPalIcon className="h-5 w-5" />}
              label="PayPal"
            >
              <div className="flex items-center gap-3 rounded-lg bg-white/60 px-4 py-3">
                <Landmark className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Po dokončení objednávky budete presmerovaný/-á na PayPal.
                </p>
              </div>
            </PaymentOptionCard>
          </div>
        </div>

        {/* Additional notes */}
        <div className="flex flex-col">
          <FormSubTitle text="Poznámky" />

          <form.AppField
            name="orderNotes"
            validators={{
              onBlur: zodFieldValidator(orderNotesSchema),
              onChange: zodFieldValidator(orderNotesSchema),
              onSubmit: zodFieldValidator(orderNotesSchema),
            }}
          >
            {(field) => (
              <field.FormTextArea
                label="Poznámky (nepovinné)"
                rows={3}
                description="Máte špeciálne požiadavky k objednávke? Napíšte nám o nich!"
                // hint="Skuska hintu"
                maxCharactersLength={orderNotesMaxCharacters}
              />
            )}
          </form.AppField>
        </div>

        {/* Legal notes */}
        <div className="flex flex-col">
          <FormSubTitle text="Právne informácie" />
          <form.AppField
            name="hasCheckedTerms"
            validators={{
              onBlur: zodFieldValidator(
                checkoutFormSchema.shape.hasCheckedTerms
              ),
              onChange: zodFieldValidator(
                checkoutFormSchema.shape.hasCheckedTerms
              ),
              onSubmit: zodFieldValidator(
                checkoutFormSchema.shape.hasCheckedTerms
              ),
            }}
          >
            {(field) => (
              <field.FormCheckboxField
                label={
                  // <span className="leading-relaxed font-normal text-foreground">
                  //   Odoslaním objednávky súhlasíte s našimi{" "}
                  //   <button
                  //     type="button"
                  //     className="inline break-words underline hover:text-muted-foreground"
                  //     onClick={(e) => {
                  //       e.preventDefault()
                  //       e.stopPropagation()
                  //       openLegalDocument("terms")
                  //     }}
                  //   >
                  //     všeobecnými obchodnými podmienkami
                  //   </button>
                  //   ,{" "}
                  //   <button
                  //     type="button"
                  //     className="inline break-words underline hover:text-muted-foreground"
                  //     onClick={(e) => {
                  //       e.preventDefault()
                  //       e.stopPropagation()
                  //       openLegalDocument("withdrawal")
                  //     }}
                  //   >
                  //     podmienkami odstúpenia od zmluvy
                  //   </button>{" "}
                  //   a{" "}
                  //   <button
                  //     type="button"
                  //     className="inline break-words underline hover:text-muted-foreground"
                  //     onClick={(e) => {
                  //       e.preventDefault()
                  //       e.stopPropagation()
                  //       openLegalDocument("privacy")
                  //     }}
                  //   >
                  //     zásadami ochrany osobných údajov
                  //   </button>
                  // </span>
                  <span className="leading-relaxed font-normal text-foreground">
                    Odoslaním objednávky súhlasíte s našimi{" "}
                    <a
                      className="underline hover:text-muted-foreground"
                      onClick={() => {
                        openLegalDocument("terms")
                      }}
                    >
                      všeobecnými obchodnými podmienkami
                    </a>
                    ,{" "}
                    <a
                      className="underline hover:text-muted-foreground"
                      onClick={() => {
                        openLegalDocument("withdrawal")
                      }}
                    >
                      podmienkami odstúpenia od zmluvy
                    </a>{" "}
                    a{" "}
                    <a
                      className="underline hover:text-muted-foreground"
                      onClick={() => {
                        openLegalDocument("privacy")
                      }}
                    >
                      zásadami ochrany osobných údajov
                    </a>
                  </span>
                }
                required
                initiallyFilled={Boolean(defaultValues.hasCheckedTerms)}
              />
            )}
          </form.AppField>
        </div>
      </CardContent>
    </Card>
  )
}
