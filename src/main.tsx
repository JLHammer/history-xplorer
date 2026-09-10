import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider.tsx";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.ts";
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
