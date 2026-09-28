"use client";

import type { SiteContent } from "@/content/types";

const THEME_STORAGE_KEY = "nimay-theme-v1";

type Theme = "light" | "dark";

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The current-page preference remains active when storage is unavailable.
  }
}

export function ThemeControl({ labels }: { labels: SiteContent["labels"] }) {
  function toggleTheme() {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }

  return (
    <button type="button" className="theme-control type-small" onClick={toggleTheme}>
      <span className="theme-action theme-action-dark">{labels.darkAction}</span>
      <span className="theme-action theme-action-light">{labels.lightAction}</span>
    </button>
  );
}
