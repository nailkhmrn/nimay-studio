import { Container } from "./container";
import { CurrentLink } from "@/components/navigation/current-link";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { headerNavigation } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="site-header-inner">
        <CurrentLink id="site-home-link" href="/" className="wordmark brand-link" aria-label="NIMAY — Home">NIMAY</CurrentLink>
        <nav aria-label="Main navigation" className="desktop-navigation">
          <ul>
            {headerNavigation.map((item) => <li key={item.href}><CurrentLink href={item.href} className="nav-link type-label">{item.label}</CurrentLink></li>)}
          </ul>
        </nav>
        <MobileNavigation />
      </Container>
    </header>
  );
}
