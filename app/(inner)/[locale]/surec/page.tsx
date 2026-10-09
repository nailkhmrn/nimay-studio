import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/sections/page-head";
import { VizBrief, VizCode, VizDesign, VizLive } from "@/components/sections/viz";
import { getSiteContent, isLocale } from "@/lib/i18n";
import { pagePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "process");
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  const p = content.processPage;
  const vizzes = [VizBrief, VizDesign, VizCode, VizLive];
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHead kicker={p.kicker} title={p.title} lead={p.lead} />

      {content.steps.map((s, i) => {
        const Viz = vizzes[i] ?? VizBrief;
        const no = String(i + 1).padStart(2, "0");
        return (
          <section className={"sec " + (i % 2 ? "paper" : "ink")} id={`adim-${no}`} key={s.title}>
            <div className={"wrap wgrid" + (i % 2 ? " rev" : "")}>
              <div className="case-meta" data-r>
                <span className="mono idx">{no} · {p.step}</span>
                <h2 className="disp">{s.title}</h2>
                <p>{s.text}</p>
                <div className="twocol">
                  <div><span className="mono">{p.fromLabel}</span><p>{s.from}</p></div>
                  <div><span className="mono">{p.meLabel}</span><p>{s.me}</p></div>
                </div>
              </div>
              <div data-r><Viz step t={content.viz} /></div>
            </div>
          </section>
        );
      })}

      <section className="sec blue">
        <div className="wrap wgrid">
          <div className="case-meta" data-r>
            <span className="mono idx">{p.calendarIndex}</span>
            <h2 className="disp">{p.calendarTitle}</h2>
            <p>{p.calendarText}</p>
          </div>
          <div className="cwrap2" data-r style={{ margin: 0 }}>
            <Link className="cta mono" href={pagePath(locale, "contact")}>{p.cta.link}</Link>
            <p className="mono">{p.cta.note}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
