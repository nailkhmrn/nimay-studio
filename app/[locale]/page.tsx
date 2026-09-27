import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Approach } from "@/components/sections/approach";
import { Engagements } from "@/components/sections/engagements";
import { Hero } from "@/components/sections/hero";
import { Capabilities, StudioStatement } from "@/components/sections/studio-story";
import { FeaturedProject } from "@/components/projects/featured-project";
import { getSiteContent, isLocale } from "@/lib/i18n";
import { engagements, projects } from "@/content/shared";
import type { Locale } from "@/content/types";
import "../homepage.css";

export function generateStaticParams() { return [{ locale: "en" }, { locale: "tr" }]; }
const websiteJsonLd = (locale: Locale) => ({ "@context": "https://schema.org", "@type": "WebSite", name: "NIMAY", url: `https://nimaystudio.com/${locale}`, inLanguage: locale });

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getSiteContent(locale);
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd(locale)).replace(/</g, "\\u003c") }} />
    <Hero content={content} />
    <Section id="selected-work" className="selected-work" aria-labelledby="selected-work-title"><Container><Grid className="section-heading"><div><p className="type-label">{content.labels.selectedWork}</p><p id="selected-work-title" className="type-body text-muted">{content.selectedWork.framing}</p></div><p className="type-label text-muted section-count">{content.labels.projectCount}</p></Grid><div className="project-list">{projects.map((project) => <FeaturedProject key={project.slug} project={project} content={content} />)}</div></Container></Section>
    <Engagements content={content} facts={engagements} />
    <Approach content={content} />
    <StudioStatement content={content} />
    <Capabilities content={content} />
  </>;
}
