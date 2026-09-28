import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { AnalyticsConsent } from "@/components/analytics/analytics-consent";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeInitScript } from "@/components/theme/theme-init-script";
import { getSiteContent, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
const instrument = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin", "latin-ext"], variable: "--font-instrument", display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const content = getSiteContent(locale);
  const base = "https://nimaystudio.com";
  return {
    metadataBase: new URL(base),
    title: { absolute: content.metadata.title },
    description: content.metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", tr: "/tr", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "NIMAY Studio",
      url: `${base}/${locale}`,
      locale: content.metadata.ogLocale,
      alternateLocale: [content.metadata.alternateLocale],
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: content.metadata.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: content.metadata.ogTitle, description: content.metadata.ogDescription, images: [`/${locale}/opengraph-image`] },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  return (
    <html lang={locale} suppressHydrationWarning className={`${geist.variable} ${instrument.variable}`}>
      <head><ThemeInitScript /></head>
      <body className="site-shell">
        <a className="skip-link" href="#main-content">{content.labels.skipToContent}</a>
        <SiteHeader locale={locale} content={content} />
        <main id="main-content" className="site-main" tabIndex={-1}>{children}</main>
        <SiteFooter locale={locale} content={content} />
        <Suspense fallback={null}><AnalyticsConsent content={content} /></Suspense>
      </body>
    </html>
  );
}

