import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { heroProcess, projects } from "@/content/shared";
import type { SiteContent } from "@/content/types";

function BrowserWindow({ url, decorative = false, children }: { url?: string; decorative?: boolean; children: ReactNode }) {
  return (
    <div className="browser-window" aria-hidden={decorative || undefined}>
      <div className="browser-window-bar" aria-hidden="true">
        <span className="browser-window-dot" /><span className="browser-window-dot" /><span className="browser-window-dot" />
        {url && <span className="browser-window-url">{url}</span>}
      </div>
      {children}
    </div>
  );
}

function SketchMock() {
  return (
    <div className="mock-screen mock-sketch">
      <div className="mock-sketch-copy">
        <span className="mock-sketch-bar mock-sketch-bar--kicker" />
        <span className="mock-sketch-block mock-sketch-block--lead" />
        <span className="mock-sketch-block mock-sketch-block--second" />
        <span className="mock-sketch-bar mock-sketch-bar--body" />
        <span className="mock-sketch-button" />
      </div>
      <div className="mock-sketch-image" />
    </div>
  );
}

function FlatMock({ title }: { title: string }) {
  const [first, ...rest] = title.split(" ");
  return (
    <div className="mock-screen mock-flat">
      <div className="mock-flat-copy">
        <span className="mock-flat-kicker">{heroProcess.mockKicker}</span>
        <span className="mock-flat-title">{first}<br />{rest.join(" ")}</span>
        <span className="mock-flat-button" />
      </div>
      <div className="mock-flat-photo"><span className="mock-flat-arch" /></div>
    </div>
  );
}

export function Hero({ content }: { content: SiteContent }) {
  const { hero } = content;
  const project = projects.find((item) => item.slug === heroProcess.projectSlug);
  const [sketch, design, live] = hero.stages;
  return (
    <section id="hero" className="hero" aria-labelledby="home-title">
      <Container>
        <div className="label-row"><span>{hero.kicker}</span><span>{hero.location} <span aria-hidden="true">↘</span></span></div>
        <h1 id="home-title" className="hero-title">{hero.title.before}<span className="hero-emphasis">{hero.title.emphasis}</span>{hero.title.after}</h1>
        <div className="hero-actions">
          <a className="button button--primary" href="#contact">{hero.primaryCta}<span aria-hidden="true">↗</span></a>
          <a className="button button--outline" href="#selected-work">{hero.secondaryCta}<span aria-hidden="true">↓</span></a>
        </div>
        <p className="type-label hero-process-caption">{hero.processCaption}</p>
        <div className="process-windows">
          <figure className="process-window process-window--sketch">
            <BrowserWindow decorative><SketchMock /></BrowserWindow>
            <figcaption className="process-caption"><span>{sketch?.label}</span><span>{sketch?.caption}</span></figcaption>
          </figure>
          <figure className="process-window process-window--design">
            <BrowserWindow decorative><FlatMock title={project?.title ?? ""} /></BrowserWindow>
            <figcaption className="process-caption"><span>{design?.label}</span><span>{design?.caption}</span></figcaption>
          </figure>
          <figure className="process-window process-window--live">
            <BrowserWindow url={project ? new URL(project.demoUrl).host : undefined}>
              <Image className="mock-screen" src={heroProcess.liveImage.src} width={heroProcess.liveImage.width} height={heroProcess.liveImage.height} alt={hero.liveImageAlt} sizes="(min-width: 90rem) 420px, (min-width: 48rem) 45vw, 100vw" preload />
            </BrowserWindow>
            <figcaption className="process-caption"><span>{live?.label}</span><span>{live?.caption}</span></figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
