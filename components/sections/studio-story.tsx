import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { capabilities } from "@/content/studio";

export function StudioStatement() {
  return (
    <Section id="studio-statement" className="studio-statement" aria-labelledby="studio-title">
      <Container>
        <Grid>
          <p className="type-label studio-label">Studio</p>
          <h2 id="studio-title" className="type-editorial">A website should make the brand clear and the next step obvious.</h2>
        </Grid>
      </Container>
    </Section>
  );
}

export function Capabilities() {
  return (
    <Section id="capabilities" className="capabilities" aria-labelledby="capabilities-title">
      <Container>
        <h2 id="capabilities-title" className="type-label capabilities-label">Capabilities</h2>
        <Grid>
          {capabilities.map((item) => (
            <div className="capability" key={item.title}>
              <h3 className="type-h2">{item.title}</h3>
              <ul>{item.items.map((service) => <li key={service}>{service}</li>)}</ul>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
