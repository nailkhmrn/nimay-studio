import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://nimaystudio.com/en", alternates: { languages: { en: "https://nimaystudio.com/en", tr: "https://nimaystudio.com/tr" } } },
    { url: "https://nimaystudio.com/tr", alternates: { languages: { en: "https://nimaystudio.com/en", tr: "https://nimaystudio.com/tr" } } },
    { url: "https://nimaystudio.com/en/privacy", alternates: { languages: { en: "https://nimaystudio.com/en/privacy", tr: "https://nimaystudio.com/tr/privacy" } } },
    { url: "https://nimaystudio.com/tr/privacy", alternates: { languages: { en: "https://nimaystudio.com/en/privacy", tr: "https://nimaystudio.com/tr/privacy" } } },
  ];
}
