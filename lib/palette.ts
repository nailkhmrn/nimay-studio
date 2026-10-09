/* Palet durumu. Görünüm anahtarı (components/theme/theme-control.tsx) bunu kullanır; canvas ve WebGL
   palet değişimini PALETTE_EVENT ile öğrenir. */
export const PALETTES = ["kobalt", "gece"] as const;
export type Palette = (typeof PALETTES)[number];

export const PALETTE_EVENT = "nimay:palette";

export function currentPalette(): Palette {
  return document.documentElement.getAttribute("data-pal") === "gece" ? "gece" : "kobalt";
}
