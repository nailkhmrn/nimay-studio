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
        {/* The section number only shows on the homepage, where (01)–(04) precede it. */}
        <p className="type-label"><span className="footer-number">(05) </span>{content.labels.contact}</p>
        <h2 id="contact-title" className="footer-title">{content.contact.heading}</h2>
        <div className="footer-grid">
          <div className="footer-guidance"><p>{content.contact.guidance}</p><p className="type-label footer-location">{content.contact.location}</p></div>
          <div className="footer-actions">
            <a className="footer-email" href={`mailto:${siteFacts.email}?subject=${encodeURIComponent(content.labels.emailSubject)}`}>{siteFacts.email}</a>
            <CopyEmail email={siteFacts.email} labels={content.labels} />
            {siteFacts.whatsappNumber && <a className="footer-secondary-action" href={`https://wa.me/${siteFacts.whatsappNumber}?text=${encodeURIComponent(content.labels.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">{content.labels.whatsapp}</a>}
          </div>
        </div>
        <div className="footer-bottom type-label">
          <span className="footer-brand">NIMAY® — {content.labels.footerStudioDescriptor}</span>
          <span className="footer-legal"><Link className="footer-privacy-link" href={`/${locale}/privacy`}>{content.labels.privacy}</Link><AnalyticsPreferencesButton label={content.labels.privacyPreferences} /></span>
        </div>
      </Container>
    </footer>
  );
}
