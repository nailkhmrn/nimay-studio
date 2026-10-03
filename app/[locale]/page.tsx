import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Approach } from "@/components/sections/approach";
import { Engagements } from "@/components/sections/engagements";
import { Hero } from "@/components/sections/hero";
import { Capabilities, StudioStatement } from "@/components/sections/studio-story";
import { FeaturedProject } from "@/components/projects/featured-project";
import { getSiteContent, isLocale } from "@/lib/i18n";
import { projects } from "@/content/shared";
import type { Locale } from "@/content/types";
import "../homepage.css";

export function generateStaticParams() { return [{ locale: "en" }, { locale: "tr" }]; }
const websiteJsonLd = (locale: Locale) => ({ "@context": "https://schema.org", "@type": "WebSite", name: "NIMAY", url: `https://nimaystudio.com/${locale}`, inLanguage: locale });

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  const visibleProjects = projects.filter((project) => project.visible);
  const projectCount = visibleProjects.length > 1 ? `01—${String(visibleProjects.length).padStart(2, "0")}` : "01";
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd(locale)).replace(/</g, "\\u003c") }} />
    <Hero content={content} />
    <Section id="selected-work" className="selected-work" aria-labelledby="selected-work-title"><Container><div className="work-index"><h2 id="selected-work-title" className="type-label">{content.labels.selectedWork}</h2><span className="type-label">{projectCount}</span></div><p className="work-framing type-small text-muted">{content.selectedWork.framing}</p><div className="project-list">{visibleProjects.map((project, index) => <FeaturedProject key={project.slug} project={project} content={content} locale={locale} number={String(index + 1).padStart(2, "0")} />)}</div></Container></Section>
    <Engagements content={content} />
    <Approach content={content} />
    <StudioStatement content={content} />
    <Capabilities content={content} />
  </>;
}
