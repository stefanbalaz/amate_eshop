import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import "./index.css"
import App from "./App.tsx"
import { CartProvider } from "./context/cart-provider.tsx"
import { DrawerProvider } from "./features/drawer"
import { queryClient } from "./types"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DrawerProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </DrawerProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
