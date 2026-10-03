import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Approach } from "@/components/sections/approach";
import { CapabilityTicker } from "@/components/sections/capability-ticker";
import { Engagements } from "@/components/sections/engagements";
import { Hero } from "@/components/sections/hero";
import { StudioStatement } from "@/components/sections/studio-story";
import { FeaturedProject } from "@/components/projects/featured-project";
import { sectionNumber } from "@/components/ui/section-number";
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
  return <div className="home-sections">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd(locale)).replace(/</g, "\\u003c") }} />
    <Hero content={content} />
    <CapabilityTicker content={content} />
    <Section id="selected-work" className="work" aria-labelledby="selected-work-title">
      <Container>
        <div className="label-row"><h2 id="selected-work-title">{sectionNumber(1)} {content.labels.selectedWork}</h2><span className="text-muted">{content.labels.conceptWork}</span></div>
        <p className="section-intro text-muted">{content.selectedWork.framing}</p>
        {visibleProjects.map((project) => <FeaturedProject key={project.slug} project={project} content={content} locale={locale} />)}
      </Container>
    </Section>
    <Approach content={content} position={2} />
    <Engagements content={content} position={3} />
    <StudioStatement content={content} position={4} />
  </div>;
}
