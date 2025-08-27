import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMercadoPago } from "@mercadopago/sdk-react";

// TODO: Replace with your actual public key
initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
