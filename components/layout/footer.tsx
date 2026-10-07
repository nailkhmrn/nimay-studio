import Link from "next/link";
import { AnalyticsPreferencesButton } from "@/components/analytics/analytics-consent";
import type { Locale, PageKey, SiteContent } from "@/content/types";
import { pagePath } from "@/lib/routes";

const links: PageKey[] = ["work", "services", "process", "about", "contact"];

/* Alt bilgi: taslaktaki bağlantılar + canlı sitedeki gizlilik sayfası ve gizlilik tercihleri. */
export function Footer({ locale, content }: { locale: Locale; content: SiteContent }) {
  return (
    <footer>
      <div className="wrap mono">
        <span>{content.chrome.footerCopy}</span>
        {links.map((key) => (
          <Link key={key} href={pagePath(locale, key)}>
            {content.chrome.nav[key as Exclude<PageKey, "privacy">]}
          </Link>
        ))}
        <Link href={pagePath(locale, "privacy")}>{content.chrome.privacy}</Link>
        <AnalyticsPreferencesButton label={content.chrome.privacyPreferences} />
      </div>
    </footer>
  );
}
