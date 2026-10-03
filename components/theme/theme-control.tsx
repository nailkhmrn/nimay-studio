"use client";

import type { SiteContent } from "@/content/types";
import { THEME_COOKIE_KEY, themeColors, type Theme } from "@/lib/theme";

const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function getEffectiveTheme(): Theme {
  const explicitTheme = document.documentElement.dataset.theme;
  if (explicitTheme === "light" || explicitTheme === "dark") return explicitTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function persistTheme(theme: Theme) {
  document.cookie = `${THEME_COOKIE_KEY}=${theme}; Path=/; SameSite=Lax; Max-Age=${THEME_COOKIE_MAX_AGE}`;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  // Without a cookie the server renders one media-scoped tag per scheme; both now follow the choice.
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => { meta.content = themeColors[theme]; });
}

export function ThemeControl({ labels }: { labels: SiteContent["labels"] }) {
  function toggleTheme() {
    persistTheme(getEffectiveTheme() === "dark" ? "light" : "dark");
  }

  return (
    <button type="button" className="theme-control pill" onClick={toggleTheme}>
      <span className="theme-action theme-action-dark">{labels.darkAction}</span>
      <span className="theme-action theme-action-light">{labels.lightAction}</span>
    </button>
  );
}
