import { notFound } from "next/navigation";
import type { Locale, SiteContent } from "@/content/types";
import { en } from "@/content/locales/en";
import { tr } from "@/content/locales/tr";

export const locales = ["en", "tr"] as const satisfies readonly Locale[];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getSiteContent(locale: string): SiteContent {
  if (locale === "en") return en;
  if (locale === "tr") return tr;
  notFound();
}

export function localePath(locale: Locale, path = "") {
  return `/${locale}${path}` || `/${locale}`;
}
