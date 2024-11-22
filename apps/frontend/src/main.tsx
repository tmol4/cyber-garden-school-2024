import { StrictMode } from "react"
import { createRoot } from "react-dom/client";

import "@fontsource-variable/open-sans";
import "@fontsource-variable/roboto-flex";

import "./styles/theme.css";
import "./styles/reset.css";
import './sass/main.sass'

import { App } from "./app";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
