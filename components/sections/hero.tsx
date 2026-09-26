import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";

export function Hero() {
  return (
    <section id="hero" className="editorial-hero" aria-labelledby="home-title">
      <Container>
        <Grid>
          <div className="hero-statement">
            <p className="type-label hero-kicker">NIMAY / Independent Digital Studio</p>
            <h1 id="home-title" className="type-hero">Brand identities and websites, from strategy through development.</h1>
          </div>
          <p className="hero-location type-label">Based in Türkiye<br />Working worldwide</p>
        </Grid>
      </Container>
    </section>
  );
}
