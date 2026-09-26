import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { FeaturedProject } from "@/components/projects/featured-project";
import { StudioStatement, Capabilities } from "@/components/sections/studio-story";
import { selectedProjects } from "@/content/selected-projects";
import "./homepage.css";

export const metadata: Metadata = {
  title: { absolute: "NIMAY — Independent Digital Studio" },
  description: "NIMAY is an independent digital studio designing brand identities and websites from strategy through development. Based in Türkiye, working worldwide.",
  alternates: { canonical: "https://nimaystudio.com/" },
  openGraph: {
    type: "website",
    siteName: "NIMAY Studio",
    url: "https://nimaystudio.com/",
    title: "NIMAY — Independent Digital Studio",
    description: "NIMAY is an independent digital studio designing brand identities and websites from strategy through development. Based in Türkiye, working worldwide.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "NIMAY — Independent Digital Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIMAY — Independent Digital Studio",
    description: "NIMAY is an independent digital studio designing brand identities and websites from strategy through development. Based in Türkiye, working worldwide.",
    images: ["/opengraph-image"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NIMAY",
  url: "https://nimaystudio.com/",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <Section id="selected-work" className="selected-work" aria-labelledby="work-title">
        <Container>
          <div className="work-index"><h2 id="work-title" className="type-label">Selected Work</h2><span className="type-label">01—02</span></div>
          {selectedProjects.map((project, index) => <FeaturedProject key={project.slug} project={project} number={index === 0 ? "01" : "02"} />)}
        </Container>
      </Section>
      <Approach />
      <StudioStatement />
      <Capabilities />
    </>
  );
}
