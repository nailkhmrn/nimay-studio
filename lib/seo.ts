import type { Metadata } from "next";
import type { Locale, PageKey } from "@/content/types";
import { siteFacts } from "@/content/shared";
import { getSiteContent } from "@/lib/i18n";
import { pagePath, SITE_URL } from "@/lib/routes";

const SITE_NAME = "NIMAY Studio";

function languages(page: PageKey | "home") {
  return { tr: pagePath("tr", page), en: pagePath("en", page), "x-default": pagePath("tr", page) };
}

function build(locale: Locale, page: PageKey | "home", title: string, description: string, absoluteTitle = true): Metadata {
  const content = getSiteContent(locale);
  const path = pagePath(locale, page);
  const image = `/${locale}/opengraph-image`;
  return {
    metadataBase: new URL(SITE_URL),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: languages(page) },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: `${SITE_URL}${path}`,
      locale: content.metadata.ogLocale,
      alternateLocale: [content.metadata.alternateLocale],
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: content.metadata.imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/* Ana sayfa başlığı ve açıklaması canlı sitedeki (indekslenmiş) metinlerdir, bilerek değiştirilmedi. */
export function homeMetadata(locale: Locale): Metadata {
  const m = getSiteContent(locale).metadata;
  return build(locale, "home", m.title, m.description);
}

export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const content = getSiteContent(locale);
  if (page === "privacy") return build(locale, page, `${content.privacy.title} — ${SITE_NAME}`, content.metadata.description);
  const p = content.pages[page];
  return build(locale, page, p.title, p.description);
}

/* schema.org: WebSite (canlı sitede vardı) ve ProfessionalService. Yalnızca bilinen bilgiler: ad, e-posta, hizmet bölgesi. */
export function structuredData(locale: Locale) {
  const content = getSiteContent(locale);
  return [
    { "@context": "https://schema.org", "@type": "WebSite", name: "NIMAY", url: `${SITE_URL}/${locale}`, inLanguage: locale },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#studio`,
      name: SITE_NAME,
      url: `${SITE_URL}/${locale}`,
      description: content.metadata.description,
      email: siteFacts.email,
      inLanguage: locale,
      areaServed: { "@type": "Country", name: "Türkiye" },
      founder: { "@type": "Person", name: "Nail" },
    },
  ];
}
