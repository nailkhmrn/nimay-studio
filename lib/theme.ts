export type Theme = "light" | "dark";

export const THEME_COOKIE_KEY = "nimay-theme-v1";

// Browser UI colour per theme (matches the header background).
export const themeColors: Readonly<Record<Theme, string>> = { light: "#f4f1ea", dark: "#111110" };

export function parseTheme(value: string | undefined): Theme | undefined {
  return value === "light" || value === "dark" ? value : undefined;
}
