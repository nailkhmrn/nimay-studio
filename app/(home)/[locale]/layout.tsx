import { Suspense } from "react";
import type { Viewport } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { AnalyticsConsent } from "@/components/analytics/analytics-consent";
import { HomeEffects } from "@/components/home/home-effects";
import { HomeShell } from "@/components/home/home-shell";
import { Footer } from "@/components/layout/footer";
import { SiteChrome } from "@/components/layout/site-chrome";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { fontVariables } from "@/lib/fonts";
import { getSiteContent, isLocale, locales } from "@/lib/i18n";
import { paletteFor, parseTheme, THEME_COOKIE_KEY, themeColors } from "@/lib/theme";
import "@/styles/home.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateViewport(): Promise<Viewport> {
  const theme = parseTheme((await cookies()).get(THEME_COOKIE_KEY)?.value) ?? "light";
  return { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: themeColors[theme] };
}

/* Ana sayfanın kök layout'u (taslaktaki index.html CSS'i ayrı kalır, iç sayfalarla karışmaz). */
export default async function HomeLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  const theme = parseTheme((await cookies()).get(THEME_COOKIE_KEY)?.value) ?? "light";
  return (
    <html lang={locale} data-pal={paletteFor(theme)} data-scroll-behavior="smooth" className={fontVariables}>
      <body>
        <a className="skip-link" href="#top">{content.chrome.skipToContent}</a>
        <HomeShell loading={content.home.loading} />
        <SiteChrome locale={locale} content={content} theme={theme} home />
        <WhatsAppButton content={content} />
        {children}
        <Footer locale={locale} content={content} />
        <HomeEffects />
        <Suspense fallback={null}><AnalyticsConsent content={content} /></Suspense>
      </body>
    </html>
  );
}
