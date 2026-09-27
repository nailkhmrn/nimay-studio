import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import type { SiteContent } from "@/content/types";

export function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="hero" className="editorial-hero" aria-labelledby="home-title">
      <Container>
        <Grid>
          <div className="hero-statement">
            <p className="type-label hero-kicker">{content.hero.kicker}</p>
            <h1 id="home-title" className="type-hero">{content.hero.title}</h1>
          </div>
          <p className="hero-location type-label">{content.hero.location.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</p>
        </Grid>
      </Container>
    </section>
  );
}
