import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrLines } from "@/components/sections/lines";
import { CtaStrip } from "@/components/sections/cta-strip";
import { PageHead } from "@/components/sections/page-head";
import { getSiteContent, isLocale } from "@/lib/i18n";
import { pagePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = getSiteContent(locale).servicesPage;
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHead kicker={s.kicker} title={s.title} lead={s.lead} />

      <section className="sec ink">
        <div className="wrap">
          <div className="sech" data-r>
            <h2 className="disp"><BrLines lines={s.scopeTitle} /></h2>
            <span className="mono idx">{s.scopeIndex}</span>
          </div>
          {s.items.map((item, i) => (
            <div className="svc" data-r key={item.title}>
              <span className="mono idx">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="disp">{item.title}</h2>
              <div>
                <p>{item.text}</p>
                <ul className="scope mono">{item.scope.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec paper">
        <div className="wrap wgrid">
          <div className="case-meta" data-r>
            <span className="mono idx">{s.whoIndex}</span>
            <h2 className="disp"><BrLines lines={s.whoTitle} /></h2>
          </div>
          <div className="case-meta" data-r>
            {s.whoText.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="sec blue">
        <div className="wrap wgrid">
          <div className="case-meta" data-r>
            <span className="mono idx">{s.deliveryIndex}</span>
            <h2 className="disp">{s.deliveryTitle}</h2>
            <p>{s.deliveryText}</p>
          </div>
          <div className="facts mono" data-r>
            <div><span>{s.facts.time}</span>{s.facts.timeValue}</div>
            <div><span>{s.facts.quote}</span>{s.facts.quoteValue}</div>
            <div><span>{s.facts.tech}</span>{s.facts.techValue}</div>
            <div><span>{s.facts.place}</span>{s.facts.placeValue}</div>
          </div>
        </div>
      </section>

      <section className="sec paper">
        <div className="wrap">
          <div className="sech" data-r>
            <h2 className="disp"><BrLines lines={s.faqTitle} /></h2>
            <span className="mono idx">{s.faqIndex}</span>
          </div>
          <div className="faq" data-r>
            {s.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip lines={s.cta.title} cta={s.cta.link} note={s.cta.note} href={pagePath(locale, "contact")} />
    </main>
  );
}
