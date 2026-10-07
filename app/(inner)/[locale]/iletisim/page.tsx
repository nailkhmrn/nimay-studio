import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "@/components/layout/clock";
import { ContactForm } from "@/components/sections/contact-form";
import { Lines } from "@/components/sections/lines";
import { siteFacts } from "@/content/shared";
import { getSiteContent, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  const c = content.contactPage;
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="sec blue head">
        <div className="wrap">
          <div className="hrow"><span className="mono idx">{c.kicker}</span><span className="mono idx">2026</span></div>
          <h1 className="disp big" style={{ marginTop: 18 }} data-r><Lines lines={c.title} /></h1>
          <p data-r>{c.lead}</p>
          <div className="cwrap">
            <ContactForm locale={locale} form={content.form} />
            <div data-r>
              <span className="mono idx">{c.nextIndex}</span>
              <ol className="next" style={{ marginTop: 14 }}>
                {c.next.map((n) => <li key={n.title}><b>{n.title}</b><span>{n.text}</span></li>)}
              </ol>
              <div className="reach mono">
                {siteFacts.whatsappNumber && <div><span>{c.reach.whatsapp}</span><a href={`https://wa.me/${siteFacts.whatsappNumber}`} target="_blank" rel="noopener noreferrer">{content.chrome.whatsapp}</a></div>}
                <div><span>{c.reach.email}</span><a href={`mailto:${siteFacts.email}`}>{siteFacts.email}</a></div>
                <div><span>{c.reach.place}</span><span>{c.reach.placeValue} · <Clock as="b" style={{ fontWeight: 500 }} /></span></div>
                <div><span>{c.reach.quote}</span><span>{c.reach.quoteValue}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
