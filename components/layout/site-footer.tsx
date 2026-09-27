import Link from "next/link";
import { AnalyticsPreferencesButton } from "@/components/analytics/analytics-consent";
import { Container } from "./container";
import { CopyEmail } from "@/components/ui/copy-email";
import { siteFacts } from "@/content/shared";
import type { Locale, SiteContent } from "@/content/types";

export function SiteFooter({ locale, content }: { locale: Locale; content: SiteContent }) {
  return (
    <footer id="contact" className="site-footer" aria-labelledby="contact-title">
      <Container>
        <div className="footer-heading">
          <p className="type-label">{content.labels.contact}</p>
          <h2 id="contact-title" className="type-display">{content.contact.heading}</h2>
        </div>
        <div className="footer-contact-grid">
          <div><p className="type-body text-muted footer-guidance">{content.contact.guidance}</p><p className="type-label footer-location">{content.contact.location}</p></div>
          <div className="footer-email"><a className="type-h2" href={`mailto:${siteFacts.email}?subject=${encodeURIComponent("NIMAY enquiry")}`}>{siteFacts.email}</a><CopyEmail email={siteFacts.email} labels={content.labels} /></div>
        </div>
        <div className="footer-bottom"><div><span className="type-label">NIMAY</span><span className="type-label text-muted"> — {content.labels.footerStudioDescriptor}</span></div><div className="footer-legal"><Link className="type-label" href={`/${locale}/privacy`}>{content.labels.privacy}</Link><AnalyticsPreferencesButton label={content.labels.privacyPreferences} /></div></div>
      </Container>
    </footer>
  );
}
