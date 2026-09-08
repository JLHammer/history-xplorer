import { createGlobalStyle } from "styled-components";
import { preflight } from "./preflight";

export const GlobalStyle = createGlobalStyle`
  ${preflight}

  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    ::before,
    ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    background-color: ${({ theme }) => theme.colors.light.background};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.light.body};
  }

  body.dark-mode {
  background-color: ${({ theme }) => theme.colors.dark.background};
  color: ${({ theme }) => theme.colors.dark.body};
}

  main:focus {
    outline: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 400;
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  a {
    text-decoration: underline;
  }
`;
