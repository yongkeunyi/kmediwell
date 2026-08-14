import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GencowProvider } from "@gencow/react";
import { apiClient } from "./lib/gencow";
import { LocaleProvider } from "./lib/i18n";
import App from "./App";
import "./index.css";
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(LocaleProvider, { children: _jsx(GencowProvider, { apiClient: apiClient, children: _jsx(App, {}) }) }) }));
