type ThemeColors = {
  background: string;
  heading: string;
  body: string;
  highlight: string;
  plateBorder: string;
  plateBackground: string;
  plateScrew: string;
};

export const theme = {
  colors: {
    white: "#ffffff",
    black: "#000000",

    light: {
      background: "#FFFFFF",
      heading: "#695E48",
      body: "#1F1F1F",
      highlight: "#FFF5C2",
      plateBorder: "#C9C9C9",
      plateBackground: "#FFFFFF",
      plateScrew: "#C7BD8D",
    } satisfies ThemeColors,

    dark: {
      background: "#151515",
      heading: "#C7BD8D",
      body: "#FFFFFF",
      highlight: "#3A3A3A",
      plateBorder: "#D29E62",
      plateBackground: "#1F1F1F",
      plateScrew: "#C7BD8D",
    } satisfies ThemeColors,
  },

  fonts: {
    heading: "'Limelight', sans-serif",
    body: "'Linden Hill', serif",
  },

  fontSizes: {
    xs: "0.875rem",
    s: "1rem",
    m: "1.25rem",
    l: "1.5rem",
    xl: "1.875rem",
  },

  spacing: {
    xs: "0.75rem",
    s: "1rem",
    m: "1.5rem",
    l: "2rem",
    xl: "3.5rem",
  },

  sizes: {
    navBarHeight: "30px",
    headerHeight: "108px",
  },

  maxWidths: {
    content: "1262px",
  },

  radii: {
    s: "4px",
    round: "50%",
  },

  shadows: {
    input: "inset 1px 1px 3px rgba(0, 0, 0, 0.25)",
    button: "0 4px 4px rgba(0, 0, 0, 0.15)",
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
  },
} as const;

export type Theme = typeof theme;
