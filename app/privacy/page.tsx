import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How NIMAY uses optional Google Analytics 4 and stores analytics preferences.",
  alternates: { canonical: "https://nimaystudio.com/privacy" },
};

const privacySections = [
  {
    number: "01",
    title: "Optional analytics",
    paragraphs: [
      "NIMAY uses Google Analytics 4 (GA4) only if you explicitly allow analytics. Before you make that choice, GA4 is not loaded and no analytics request is sent. If you reject analytics, GA4 stays disabled.",
      "Your choice is stored locally in your browser. You can reopen Privacy preferences in the footer and change your choice at any time.",
    ],
  },
  {
    number: "02",
    title: "If you allow analytics",
    paragraphs: [
      "Google Analytics may set analytics cookies and collect standard usage information, such as pages viewed, device and browser information, approximate location derived from your IP address, and interaction data. NIMAY does not intentionally send names, email addresses or other direct personal identifiers to Google Analytics.",
      "Advertising signals are disabled in the current implementation. NIMAY does not use Google Ads, remarketing or user IDs.",
    ],
  },
  {
    number: "03",
    title: "Browser storage",
    paragraphs: [
      "The analytics choice is saved in your browser’s local storage so the preference is remembered on later visits. The site may also use technically necessary browser or storage mechanisms for basic operation.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <Section className="privacy-page" aria-labelledby="privacy-title">
      <Container>
        <header className="privacy-heading">
          <p className="type-label">NIMAY / Privacy</p>
          <h1 id="privacy-title" className="type-editorial">Privacy &amp; analytics</h1>
          <p className="type-small text-muted">Last updated: September 2026</p>
        </header>

        <div className="privacy-sections">
          {privacySections.map((item) => (
            <section className="privacy-entry" key={item.number} aria-labelledby={`privacy-${item.number}`}>
              <span className="type-label privacy-number">{item.number}</span>
              <h2 id={`privacy-${item.number}`} className="type-h2">{item.title}</h2>
              <div className="privacy-copy">
                {item.paragraphs.map((paragraph) => <p className="type-body" key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <section className="privacy-contact" aria-labelledby="privacy-contact-title">
          <p className="type-label">Contact</p>
          <h2 id="privacy-contact-title" className="type-h2">Questions about privacy?</h2>
          <a className="text-link type-body" href="mailto:hello@nimay.studio">hello@nimay.studio</a>
        </section>
      </Container>
    </Section>
  );
}
