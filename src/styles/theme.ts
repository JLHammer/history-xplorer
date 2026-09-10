const palette = {
  cream: "#FFE9BF",
  ivory: "#FFF5C2",
  tan: "#D29E62",
  umber: "#695E48",
  walnut: "#6B4B2E",
  khaki: "#C7BD8D",
  charcoal: "#1F1F1F",
  ink: "#151515",
  smoke: "#F5F5F5",
  white: "#FFFFFF",
  silver: "#C9C9C9",
  graphite: "#3A3A3A",
} as const;

type ThemeColors = {
  background: string;
  surface: string;
  heading: string;
  body: string;
  accent: string;
  highlight: string;
  plateBorder: string;
  plateBorderEnd: string;
  plateBackground: string;
  plateScrew: string;
  timeline: string;
  corner: string;
};

export const theme = {
  colors: {
    palette,
    white: palette.white,

    light: {
      background: palette.umber,
      surface: palette.smoke,
      heading: palette.umber,
      body: palette.charcoal,
      accent: palette.umber,
      highlight: palette.cream,
      plateBorder: palette.silver,
      plateBorderEnd: palette.silver,
      plateBackground: palette.white,
      plateScrew: palette.khaki,
      timeline: palette.khaki,
      corner: palette.cream,
    } satisfies ThemeColors,

    dark: {
      background: palette.charcoal,
      surface: palette.ink,
      heading: palette.khaki,
      body: palette.white,
      accent: palette.ivory,
      highlight: palette.graphite,
      plateBorder: palette.umber,
      plateBorderEnd: palette.walnut,
      plateBackground: palette.charcoal,
      plateScrew: palette.khaki,
      timeline: palette.khaki,
      corner: palette.umber,
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
    xxl: "2.5rem",
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
