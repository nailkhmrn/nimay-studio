import type { Palette } from "./palette";

/* Mevcut görünüm anahtarı korunur: aynı çerez adı ve aynı değerler (light, dark).
   Yeni tasarımda light kobalt paletine, dark gece paletine karşılık gelir. */
export type Theme = "light" | "dark";

export const THEME_COOKIE_KEY = "nimay-theme-v1";

export const themePalette: Readonly<Record<Theme, Palette>> = { light: "kobalt", dark: "gece" };

// Tarayıcı arayüz rengi (üst çubuk) paletin zemin rengidir.
export const themeColors: Readonly<Record<Theme, string>> = { light: "#2B22FF", dark: "#0B0B0E" };

export function parseTheme(value: string | undefined): Theme | undefined {
  return value === "light" || value === "dark" ? value : undefined;
}

/* Çerez yoksa varsayılan kobalt'tır (sistem tercihi izlenmez). */
export function paletteFor(theme: Theme | undefined): Palette {
  return themePalette[theme ?? "light"];
}
