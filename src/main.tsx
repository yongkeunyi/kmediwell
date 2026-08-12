import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GencowProvider } from "@gencow/react";
import { apiClient } from "./lib/gencow";
import { LocaleProvider } from "./lib/i18n";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <GencowProvider apiClient={apiClient}>
        <App />
      </GencowProvider>
    </LocaleProvider>
  </StrictMode>,
);
