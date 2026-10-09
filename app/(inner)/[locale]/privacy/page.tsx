import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteFacts } from "@/content/shared";
import { getSiteContent, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "privacy");
}

/* Gizlilik sayfası: mevcut canlı metin, yeni görünümde. Form bölümü (04) yenidir. */
export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const p = getSiteContent(locale).privacy;
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="sec blue head">
        <div className="wrap">
          <div className="hrow"><span className="mono idx">{p.kicker}</span><span className="mono idx">{p.updated}</span></div>
          <h1 className="disp" style={{ marginTop: 18 }} data-r><span className="ln"><span>{p.title}</span></span></h1>
        </div>
      </section>
      <section className="sec ink">
        <div className="wrap">
          {p.sections.map((s) => (
            <div className="prv" data-r key={s.number}>
              <span className="mono idx">{s.number}</span>
              <div>
                <h2 className="disp">{s.title}</h2>
                {s.paragraphs.map((t) => <p key={t}>{t}</p>)}
              </div>
            </div>
          ))}
          <div className="prv" data-r>
            <span className="mono idx">{p.contactLabel}</span>
            <div>
              <h2 className="disp">{p.contactHeading}</h2>
              <p><a className="prv-mail" href={`mailto:${siteFacts.email}`}>{siteFacts.email}</a></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
