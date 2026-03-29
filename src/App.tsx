import { Route, Routes } from "react-router-dom"
import "./index.css"
import {
  CheckoutPage,
  ContactPage,
  Home,
  ImpressumPage,
  PrivacyPolicyPage,
  ProductDetailPage,
  ReturnPolicyPage,
  TermsAndConditionsPage,
} from "@/modules"
import { Footer, Header } from "./components"
import { AppDrawer } from "@/features/drawer"
import { LEGAL_CHECKOUT_DRAWER_ID } from "@/features/legal"
import { CookieConsentRoot } from "@/modules/cookie-consent"
import { ScrollToTop } from "./utils/layout"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <CookieConsentRoot />
      <Header />
      <AppDrawer drawerID="company-info" size="md" />
      <AppDrawer drawerID={LEGAL_CHECKOUT_DRAWER_ID} size="3xl" />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<div>Not found</div>} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditionsPage />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
