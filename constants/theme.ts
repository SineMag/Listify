export const Colors = {
  light: {
    primary: "#72ddf7",
    secondary: "#9a52ff",
    accent: "#e382f9",
    lightAccent: "#ffb2e6",
    background: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    border: "#e0e0e0",
    card: "#ffffff",
    purchased: "#e8f5e8",
    error: "#ff6b6b",
    success: "#51cf66",
    warning: "#ffd43b",
    tint: "#72ddf7",
  },
  dark: {
    primary: "#72ddf7",
    secondary: "#9a52ff",
    accent: "#e382f9",
    lightAccent: "#ffb2e6",
    background: "#121212",
    text: "#ffffff",
    textSecondary: "#b0b0b0",
    border: "#333333",
    card: "#1e1e1e",
    purchased: "#2d5a2d",
    error: "#ff6b6b",
    success: "#51cf66",
    warning: "#ffd43b",
    tint: "#72ddf7",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Typography = {
  title: {
    fontSize: 32,
    fontWeight: "bold" as const,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "normal" as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: "normal" as const,
  },
  small: {
    fontSize: 12,
    fontWeight: "normal" as const,
  },
};

export const Shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
