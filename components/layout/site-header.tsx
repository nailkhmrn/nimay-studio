import { Container } from "./container";
import { CurrentLink } from "@/components/navigation/current-link";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { ThemeControl } from "@/components/theme/theme-control";
import { getNavigation } from "@/content/navigation";
import type { Locale, SiteContent } from "@/content/types";

export function SiteHeader({ locale, content }: { locale: Locale; content: SiteContent }) {
  const navigation = getNavigation(locale, content.labels);
  return (
    <header className="site-header">
      <Container className="site-header-inner">
        <CurrentLink id="site-home-link" href={`/${locale}`} className="wordmark" aria-label={`${content.labels.home} — NIMAY`}>NIMAY<span className="wordmark-mark" aria-hidden="true">®</span></CurrentLink>
        <div className="site-header-tools">
          <nav aria-label={content.labels.navigation} className="primary-nav">
            <ul>
              {navigation.map((item) => (
                <li key={item.href} className={item.primary ? undefined : "primary-nav-secondary"}>
                  <CurrentLink href={item.href} className={item.primary ? "pill pill--solid" : "pill"}>
                    {item.label}{item.primary && <span aria-hidden="true">↗</span>}
                  </CurrentLink>
                </li>
              ))}
            </ul>
          </nav>
          <LocaleSwitcher locale={locale} ariaLabel={content.labels.language} />
          <ThemeControl labels={content.labels} />
          <MobileNavigation locale={locale} content={content} navigation={navigation} />
        </div>
      </Container>
    </header>
  );
}
