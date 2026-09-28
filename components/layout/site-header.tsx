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
        <CurrentLink id="site-home-link" href={`/${locale}`} className="wordmark brand-link" aria-label={`${content.labels.home} — NIMAY`}>NIMAY</CurrentLink>
        <div className="site-header-navigation">
          <nav aria-label={content.labels.navigation} className="desktop-navigation">
            <ul>
              {navigation.map((item) => <li key={item.href}><CurrentLink href={item.href} className="nav-link type-label">{item.label}</CurrentLink></li>)}
            </ul>
          </nav>
          <LocaleSwitcher locale={locale} ariaLabel={content.labels.language} />
          <ThemeControl labels={content.labels} />
        </div>
        <MobileNavigation locale={locale} content={content} navigation={navigation} />
      </Container>
    </header>
  );
}
