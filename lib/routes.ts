import type { Locale, PageKey } from "@/content/types";

export const SITE_URL = "https://nimaystudio.com";

/* Sayfa adresleri dile göre yerelleştirilir. Dosya sistemindeki klasör adları TR'dir (app/(inner)/[locale]/isler),
   EN adresler next.config.ts içinde aynı sayfalara yeniden yazılır. */
export const slugs: Record<Locale, Record<PageKey, string>> = {
  tr: { work: "isler", services: "hizmetler", process: "surec", about: "hakkimda", contact: "iletisim", privacy: "privacy" },
  en: { work: "work", services: "services", process: "process", about: "about", contact: "contact", privacy: "privacy" },
};

export const pageKeys = Object.keys(slugs.tr) as PageKey[];

export function pagePath(locale: Locale, page: PageKey | "home" = "home"): string {
  return page === "home" ? `/${locale}` : `/${locale}/${slugs[locale][page]}`;
}

/* Dil değiştirici: geçerli adresi diğer dildeki karşılığına çevirir. */
export function switchLocalePath(pathname: string, next: Locale): string {
  const [, current, slug] = pathname.split("/");
  if (current !== "tr" && current !== "en") return `/${next}`;
  if (!slug) return `/${next}`;
  const page = pageKeys.find((key) => slugs[current][key] === slug || slugs.tr[key] === slug);
  return page ? pagePath(next, page) : `/${next}`;
}
