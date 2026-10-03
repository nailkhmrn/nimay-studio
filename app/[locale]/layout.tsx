import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { AnalyticsConsent } from "@/components/analytics/analytics-consent";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteContent, isLocale, locales } from "@/lib/i18n";
import { THEME_COOKIE_KEY, parseTheme, themeColors } from "@/lib/theme";
import "../globals.css";

// Variable fonts: Bricolage covers 400–800 with optical sizing; JetBrains Mono ships 400 and 500.
const bricolage = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], axes: ["opsz"], variable: "--font-bricolage", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

async function getThemePreference() {
  return parseTheme((await cookies()).get(THEME_COOKIE_KEY)?.value);
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateViewport(): Promise<Viewport> {
  const theme = await getThemePreference();
  if (theme) return { themeColor: themeColors[theme], colorScheme: theme };
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: themeColors.light },
      { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
    ],
    colorScheme: "light dark",
  };
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
      languages: { en: "/en", tr: "/tr", "x-default": "/tr" },
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
  const theme = await getThemePreference();
  return (
    <html lang={locale} data-theme={theme} className={`${bricolage.variable} ${jetbrains.variable}`}>
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
