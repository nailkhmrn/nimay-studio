import { Container } from "./container";
import { Grid } from "./grid";
import { CurrentLink } from "@/components/navigation/current-link";
import { AnalyticsPreferencesButton } from "@/components/analytics/analytics-consent";
import { studioContact } from "@/content/studio";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer contact-footer" id="contact">
      <Container>
        <Grid className="contact-grid">
          <h2 className="type-h2">Planning a new identity or website?</h2>
          <div className="contact-details">
            <a href={`mailto:${studioContact.email}?subject=New%20project%20enquiry`} className="contact-email type-project">{studioContact.email}</a>
            {studioContact.socials.length > 0 && <ul className="contact-socials">{studioContact.socials.map((social) => <li key={social.label}><a className="text-link" href={social.href}>{social.label}</a></li>)}</ul>}
            <p className="type-label contact-location">Based in Türkiye · Working worldwide</p>
          </div>
        </Grid>
        <div className="contact-bottom">
          <CurrentLink href="/" className="wordmark brand-link" aria-label="NIMAY — Home">NIMAY</CurrentLink>
          <div className="footer-privacy-controls">
            <Link className="footer-privacy-link type-label" href="/privacy">Privacy</Link>
            <AnalyticsPreferencesButton />
          </div>
          <p className="type-label">© 2026</p>
        </div>
      </Container>
    </footer>
  );
}
