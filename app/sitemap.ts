import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { pageKeys, pagePath, SITE_URL } from "@/lib/routes";

/* Her sayfa iki dilde listelenir ve birbirinin karşılığı olarak işaretlenir (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  return (["home", ...pageKeys] as const).flatMap((page) => {
    const languages = Object.fromEntries(locales.map((l) => [l, SITE_URL + pagePath(l, page)]));
    return locales.map((locale) => ({ url: SITE_URL + pagePath(locale, page), alternates: { languages } }));
  });
}
