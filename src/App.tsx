import { Route, Routes } from "react-router-dom"
import "./index.css"
import { CheckoutPage, ContactPage, Home, ProductDetailPage } from "@/modules"
import { Footer, Header } from "./components"
import { AppDrawer } from "@/features/drawer"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AppDrawer drawerID="company-info" size="md" />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
