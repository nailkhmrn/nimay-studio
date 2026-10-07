"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/types";
import { PALETTE_EVENT, type Palette } from "@/lib/palette";
import { THEME_COOKIE_KEY, themeColors, type Theme } from "@/lib/theme";

const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/* Görünüm anahtarı: mevcut nimay-theme-v1 çerezini (light, dark) ve işlevsel çerez davranışını korur.
   light kobalt paleti, dark gece paletidir. Seçim canvas ve WebGL'e PALETTE_EVENT ile bildirilir. */
export function ThemeControl({ initial, labels }: { initial: Theme; labels: Pick<SiteContent["chrome"], "themeToDark" | "themeToLight"> }) {
  const [theme, setTheme] = useState<Theme>(initial);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const palette: Palette = next === "dark" ? "gece" : "kobalt";
    document.cookie = `${THEME_COOKIE_KEY}=${next}; Path=/; SameSite=Lax; Max-Age=${THEME_COOKIE_MAX_AGE}`;
    document.documentElement.setAttribute("data-pal", palette);
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      meta.content = themeColors[next];
    });
    setTheme(next);
    window.dispatchEvent(new CustomEvent(PALETTE_EVENT, { detail: palette }));
  }

  return (
    <button type="button" className="themebtn mono" onClick={toggle}>
      {theme === "dark" ? labels.themeToLight : labels.themeToDark}
    </button>
  );
}
