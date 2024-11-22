import { StrictMode } from "react"
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import "@fontsource-variable/recursive";
import "@fontsource-variable/open-sans";
import "@fontsource-variable/roboto-flex";
import "@fontsource-variable/material-symbols-outlined";

import "./styles/theme.css";
import "./styles/reset.sass";
import "./styles/lenis.sass";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
