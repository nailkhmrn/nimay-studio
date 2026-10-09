import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "@/components/layout/clock";
import { HomeContact } from "@/components/home/home-contact";
import { BrowserFrame } from "@/components/sections/browser-frame";
import { JsonLd } from "@/components/sections/json-ld";
import { BrLines, Lines } from "@/components/sections/lines";
import { VizBrief, VizCode, VizDesign, VizLive } from "@/components/sections/viz";
import { visibleProjects } from "@/content/shared";
import { getSiteContent, isLocale } from "@/lib/i18n";
import { pagePath } from "@/lib/routes";
import { homeMetadata, structuredData } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return homeMetadata(locale);
}

/* Ana sayfa. Eski sitenin bölüm bağlantıları (#selected-work, #contact vb.) çalışmaya devam etsin diye
   ilgili bölümlere eski kimlikler bağlayıcı olarak eklenmiştir. */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  const h = content.home;
  const featured = visibleProjects[0];
  const featuredText = featured ? content.projects[featured.slug] : undefined;
  const [, homeShot] = featured?.gallery ?? [];
  const steps = [VizBrief, VizDesign, VizCode, VizLive];
  return (
    <main id="top" tabIndex={-1}>
      {structuredData(locale).map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="word" aria-hidden="true">NIMAY</div>
        <canvas id="gl" aria-hidden="true"></canvas>
        {/* WebGL yoksa gösterilen durağan görüntü (kobalt paletinin tek karesi) */}
        <Image id="hero-fallback" className="hfb" src="/hero-yedek.webp" alt="" aria-hidden="true" fill sizes="100vw" hidden />
        <div className="hmeta hm-tl mono">
          <span><i className="dot"></i>{h.heroTopLeft[0]}</span>
          <span>{h.heroTopLeft[1]}</span>
        </div>
        <div className="hmeta hm-tr mono">
          <span>{h.heroTopRight[0]}</span>
          <span>{h.heroTopRight[1]}</span>
        </div>
        <div className="hmeta hm-bl">
          <h1 className="disp"><Lines lines={h.heroTitle} /></h1>
          <p className="hsub">{h.heroSub}</p>
          <Link className="cta mono" style={{ alignSelf: "flex-start" }} href={pagePath(locale, "work")}>{h.heroCta}</Link>
        </div>
      </section>

      {/* WORK */}
      <section className="sec ink" id="isler">
        <span id="selected-work" />
        <div className="wrap">
          <div className="sech" data-r>
            <h2 className="disp"><BrLines lines={h.work.title} /></h2>
            <span className="mono idx">{h.work.index}</span>
          </div>
          {featured && featuredText && homeShot && (
            <div className="wgrid">
              <div className="case-meta" data-r>
                <span className="mono idx">{h.work.kicker}</span>
                <h3 className="disp">{featured.title}</h3>
                <p style={{ margin: 0, color: "rgba(242,242,248,.78)", maxWidth: "40ch" }}>{featuredText.description}</p>
                <div className="tags mono">
                  <span className="tag hot">{content.work.conceptWebsite}</span>
                  <span className="tag">{featuredText.industry}</span>
                </div>
                <p className="mono" style={{ margin: 0, color: "rgba(242,242,248,.55)", maxWidth: "44ch" }}>
                  {content.work.framing} {h.work.hint}
                </p>
              </div>
              <BrowserFrame id="stage" url={new URL(featured.demoUrl).host} src={homeShot.src} width={homeShot.width} height={homeShot.height} alt={featuredText.imageAlts[1] ?? featured.title} sizes="(min-width: 860px) 58vw, 100vw" />
            </div>
          )}

          <div className="list" id="worklist" data-r>
            {featured && homeShot && (
              <Link className="row" href={`${pagePath(locale, "work")}#${featured.slug}`} data-peek-src={homeShot.src}>
                <span className="mono c1">01</span>
                <span className="t disp">{featured.title}</span>
                <span className="mono c3">{content.work.conceptWebsite}</span>
                <span className="mono c4">{featured.year}</span>
              </Link>
            )}
            <a className="row empty" href="#iletisim" data-peek-label={h.work.reserved.kind}>
              <span className="mono c1">{featured ? "02" : "01"}</span>
              <span className="t disp">{h.work.reserved.title}</span>
              <span className="mono c3">{h.work.reserved.kind}</span>
              <span className="mono c4">2026</span>
            </a>
          </div>
          <div style={{ marginTop: 36 }} data-r>
            <Link className="cta mono" href={pagePath(locale, "work")}>{h.work.all}</Link>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="sec paper" id="hizmet">
        <span id="engagements" />
        <span id="approach" />
        <span id="capabilities" />
        <div className="wrap">
          <div className="sech" data-r>
            <h2 className="disp"><BrLines lines={h.approach.title} /></h2>
            <span className="mono idx">{h.approach.index}</span>
          </div>
          <div className="tiles">
            <article className="tile" data-r>
              <div className="tvis"><canvas id="c-halftone" aria-hidden="true"></canvas></div>
              <div className="tbody">
                <span className="mono">{h.approach.tiles[0]?.kicker}</span>
                <h3 className="disp">{h.approach.tiles[0]?.title}</h3>
                <p>{h.approach.tiles[0]?.text}</p>
              </div>
            </article>
            <article className="tile" data-r>
              <div className="tvis">
                <div className="codeblk" id="seo" aria-hidden="true">
                  {h.approach.seo.map((label) => (
                    <div key={label}>
                      <span>{label}</span>
                      <b>ok</b>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tbody">
                <span className="mono">{h.approach.tiles[1]?.kicker}</span>
                <h3 className="disp">{h.approach.tiles[1]?.title}</h3>
                <p>{h.approach.tiles[1]?.text}</p>
              </div>
            </article>
            <article className="tile" data-r>
              <div className="tvis">
                <div className="days" id="days" aria-hidden="true">
                  {Array.from({ length: 14 }, (_, i) => (
                    <span key={i} className={i === 6 || i === 13 ? "m" : undefined}>{i + 1}</span>
                  ))}
                </div>
              </div>
              <div className="tbody">
                <span className="mono">{h.approach.tiles[2]?.kicker}</span>
                <h3 className="disp">{h.approach.tiles[2]?.title}</h3>
                <p>{h.approach.tiles[2]?.text}</p>
              </div>
            </article>
          </div>
          <div style={{ marginTop: 36 }} data-r>
            <Link className="cta mono" href={pagePath(locale, "services")}>{h.approach.cta}</Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec blue" id="surec">
        <div className="wrap">
          <div className="sech" data-r>
            <h2 className="disp"><BrLines lines={h.process.title} /></h2>
            <span className="mono idx">{h.process.index}</span>
          </div>
          <div className="steps" data-r>
            {content.steps.map((s, i) => {
              const Viz = steps[i] ?? VizBrief;
              return (
                <div className="step" key={s.title}>
                  <span className="mono idx">{String(i + 1).padStart(2, "0")}</span>
                  <Viz t={content.viz} />
                  <h3 className="disp">{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 36 }} data-r>
            <Link className="cta mono" href={pagePath(locale, "process")}>{h.process.cta}</Link>
          </div>
        </div>
      </section>

      {/* STUDIO */}
      <section className="sec ink" id="studyo">
        <span id="studio-statement" />
        <div className="wrap sgrid">
          <div className="portrait" data-r>
            <canvas id="c-glass" aria-hidden="true"></canvas>
          </div>
          <div className="sbody">
            <div data-r>
              <span className="mono idx">{h.studio.index}</span>
              <h2 className="disp" style={{ marginTop: 18 }}><BrLines lines={h.studio.title} /></h2>
            </div>
            <p data-r>{h.studio.text}</p>
            <div className="facts mono" data-r>
              <div><span>{content.about.facts.place}</span>Türkiye · <Clock as="b" id="clock2" interval={15000} style={{ fontWeight: 500 }} /></div>
              <div><span>{content.about.facts.tech}</span>Next.js</div>
              <div><span>{content.about.facts.time}</span>{content.about.facts.timeValue}</div>
              <div><span>{content.about.facts.quote}</span>{content.about.facts.quoteValue}</div>
            </div>
            <div data-r>
              <Link className="cta mono" href={pagePath(locale, "about")}>{h.studio.cta}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec blue" id="iletisim">
        <span id="contact" />
        <div className="wrap">
          <span className="mono idx">{h.contact.index}</span>
          <h2 className="disp big" style={{ margin: "18px 0 0" }} data-r><Lines lines={h.contact.title} /></h2>
          <HomeContact locale={locale} form={content.form} hint={h.contact.hint} />
        </div>
      </section>
    </main>
  );
}
