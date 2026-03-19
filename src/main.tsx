import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./context/cart-provider.tsx";
import { DrawerProvider } from "./features/drawer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DrawerProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </DrawerProvider>
    </BrowserRouter>
  </StrictMode>,
);
