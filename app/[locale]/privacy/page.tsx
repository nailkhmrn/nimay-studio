import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getSiteContent, isLocale, locales } from "@/lib/i18n";
import { siteFacts } from "@/content/shared";
import "./privacy.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const content = getSiteContent(locale);
  const base = "https://nimaystudio.com";
  return {
    metadataBase: new URL(base),
    title: `${content.privacy.title} — NIMAY Studio`,
    description: content.metadata.description,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: { en: "/en/privacy", tr: "/tr/privacy", "x-default": "/tr/privacy" },
    },
    openGraph: {
      type: "website", siteName: "NIMAY Studio", url: `${base}/${locale}/privacy`, locale: content.metadata.ogLocale, alternateLocale: [content.metadata.alternateLocale], title: `${content.privacy.title} — NIMAY Studio`, description: content.metadata.description, images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: content.metadata.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: `${content.privacy.title} — NIMAY Studio`, description: content.metadata.description, images: [`/${locale}/opengraph-image`] },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  return (
    <Section className="privacy-page" aria-labelledby="privacy-title">
      <Container>
        <header className="privacy-heading">
          <p className="type-label">{content.privacy.kicker}</p>
          <h1 id="privacy-title" className="type-editorial">{content.privacy.title}</h1>
          <p className="type-small text-muted">{content.privacy.updated}</p>
        </header>
        <div className="privacy-sections">
          {content.privacy.sections.map((item) => (
            <section className="privacy-entry" key={item.number} aria-labelledby={`privacy-${item.number}`}>
              <span className="type-label privacy-number">{item.number}</span>
              <h2 id={`privacy-${item.number}`} className="type-h2">{item.title}</h2>
              <div className="privacy-copy">{item.paragraphs.map((paragraph) => <p className="type-body" key={paragraph}>{paragraph}</p>)}</div>
            </section>
          ))}
        </div>
        <section className="privacy-entry" aria-labelledby="privacy-04">
          <span className="type-label privacy-number">04</span>
          <h2 id="privacy-04" className="type-h2">{locale === "tr" ? "Görünüm tercihi" : "Appearance preference"}</h2>
          <div className="privacy-copy">
            <p className="type-body">{locale === "tr" ? "Seçtiğiniz görünüm tercihi, işlevsel depolama kullanılarak tarayıcınızda yerel olarak saklanabilir. Bu tercih, analiz izninden bağımsız olarak çalışır." : "Your selected appearance preference may be stored locally in your browser using functional storage. This preference works independently of analytics consent."}</p>
          </div>
        </section>
        <section className="privacy-contact" aria-labelledby="privacy-contact-title">
          <p className="type-label">{content.privacy.contactLabel}</p>
          <h2 id="privacy-contact-title" className="type-h2">{content.privacy.contactHeading}</h2>
          <a className="text-link type-body" href={`mailto:${siteFacts.email}`}>{siteFacts.email}</a>
        </section>
      </Container>
    </Section>
  );
}
