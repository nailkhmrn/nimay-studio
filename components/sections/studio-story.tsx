import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import type { SiteContent } from "@/content/types";

export function StudioStatement({ content }: { content: SiteContent }) {
  return (
    <Section id="studio-statement" className="studio-statement" aria-labelledby="studio-title">
      <Container>
        <Grid>
          <p className="type-label studio-label">{content.labels.studio}</p>
          <h2 id="studio-title" className="type-editorial">{content.studioStatement}</h2>
        </Grid>
      </Container>
    </Section>
  );
}

export function Capabilities({ content }: { content: SiteContent }) {
  return (
    <Section id="capabilities" className="capabilities" aria-labelledby="capabilities-title">
      <Container>
        <h2 id="capabilities-title" className="type-label capabilities-label">{content.labels.capabilities}</h2>
        <Grid>
          {content.capabilities.map((item) => (
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
