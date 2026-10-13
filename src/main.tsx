import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/theme";
import App from "@/App";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/source-sans-3";
import "@fontsource-variable/jetbrains-mono";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
