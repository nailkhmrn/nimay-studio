import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrowserFrame } from "@/components/sections/browser-frame";
import { CtaStrip } from "@/components/sections/cta-strip";
import { PageHead } from "@/components/sections/page-head";
import { visibleProjects } from "@/content/shared";
import { getSiteContent, isLocale } from "@/lib/i18n";
import { pagePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "work");
}

/* İşler: yalnızca görünür projeler. Şu an tek proje (Zera Moda); sayfa tek projeyle dengeli kurulur:
   önce proje tanıtımı ve ana ekran, sonra masaüstü ve mobil ekranlar ile proje bilgileri. */
export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  const w = content.work;
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHead kicker={w.kicker} title={w.title} lead={w.lead} />

      {visibleProjects.map((project, index) => {
        const local = content.projects[project.slug];
        if (!local) return null;
        const [formShot, homeShot, mobileShot] = project.gallery;
        const host = new URL(project.demoUrl).host;
        const scope = (local.services[0] ?? "").split(" / ");
        const no = String(index + 1).padStart(2, "0");
        return (
          <div key={project.slug} id={project.slug}>
            <section className="sec ink">
              <div className="wrap wgrid">
                <div className="case-meta" data-r>
                  <span className="mono idx">{no} · {w.conceptWebsite} · {project.year}</span>
                  <h2 className="disp">{project.title}</h2>
                  <p>{local.description}</p>
                  <ul className="scope mono">{scope.map((item) => <li key={item}>{item}</li>)}</ul>
                  <div className="tags mono"><span className="tag hot">{w.conceptStudy}</span><span className="tag">{local.industry}</span></div>
                  <p className="mono note">{w.framing}</p>
                  <div><a className="cta mono" href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${w.viewProjectAria} — ${project.title}`}>{w.viewProject}</a></div>
                </div>
                <BrowserFrame url={host} src={homeShot.src} width={homeShot.width} height={homeShot.height} alt={local.imageAlts[1] ?? project.title} sizes="(min-width: 860px) 56vw, 100vw" priority />
              </div>
            </section>

            <section className="sec paper">
              <div className="wrap">
                <div className="sech" data-r>
                  <h2 className="disp">{project.title}</h2>
                  <span className="mono idx">({no}) {w.galleryIndex}</span>
                </div>
                <div className="gal">
                  <BrowserFrame url={host} src={formShot.src} width={formShot.width} height={formShot.height} alt={local.imageAlts[0] ?? project.title} sizes="(min-width: 860px) 62vw, 100vw" />
                  <BrowserFrame url={host} src={mobileShot.src} width={mobileShot.width} height={mobileShot.height} alt={local.imageAlts[2] ?? project.title} sizes="300px" mobile />
                </div>
                <div className="facts mono" data-r style={{ marginTop: "clamp(28px,4vw,56px)" }}>
                  <div><span>{w.type}</span>{local.projectType}</div>
                  <div><span>{w.sector}</span>{local.industry}</div>
                  <div><span>{w.year}</span>{project.year}</div>
                  <div><span>{w.status}</span>{w.conceptStudy}</div>
                </div>
              </div>
            </section>
          </div>
        );
      })}

      <CtaStrip lines={w.cta.title} cta={w.cta.link} note={w.cta.note} href={pagePath(locale, "contact")} />
    </main>
  );
}
