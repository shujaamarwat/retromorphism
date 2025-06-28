import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ComponentShowcase } from "./screens/ComponentShowcase";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ComponentShowcase />
  </StrictMode>,
);