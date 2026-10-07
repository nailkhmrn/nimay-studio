import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "@/components/layout/clock";
import { CtaStrip } from "@/components/sections/cta-strip";
import { BrLines } from "@/components/sections/lines";
import { PageHead } from "@/components/sections/page-head";
import { getSiteContent, isLocale } from "@/lib/i18n";
import { pagePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "about");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  const a = content.about;
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHead kicker={a.kicker} title={a.title} lead={a.lead} />

      <section className="sec ink">
        <div className="wrap sgrid">
          <div className="portrait" data-r>
            <div className="cap mono"><span>{content.home.studio.portraitCaption[0]}</span><span>{content.home.studio.portraitCaption[1]}</span></div>
          </div>
          <div className="sbody">
            <div data-r>
              <span className="mono idx">{a.index}</span>
              <h2 className="disp" style={{ marginTop: 18 }}><BrLines lines={a.whyTitle} /></h2>
            </div>
            <div data-r style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {a.story.map((p) => <p className="lead" key={p}>{p}</p>)}
            </div>
            <div className="facts mono" data-r>
              <div><span>{a.facts.place}</span>Türkiye · <Clock as="b" style={{ fontWeight: 500 }} /></div>
              <div><span>{a.facts.tech}</span>Next.js</div>
              <div><span>{a.facts.time}</span>{a.facts.timeValue}</div>
              <div><span>{a.facts.quote}</span>{a.facts.quoteValue}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec paper">
        <div className="wrap">
          <div className="sech" data-r>
            <h2 className="disp"><BrLines lines={a.trustTitle} /></h2>
            <span className="mono idx">{a.trustIndex}</span>
          </div>
          <ol className="trust" data-r>{a.trust.map((t) => <li key={t}>{t}</li>)}</ol>
        </div>
      </section>

      <CtaStrip lines={a.cta.title} cta={a.cta.link} note={a.cta.note} href={pagePath(locale, "contact")} />
    </main>
  );
}
