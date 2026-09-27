import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import type { SiteContent } from "@/content/types";

export function Approach({ content }: { content: SiteContent }) {
  return (
    <Section id="approach" className="studio-approach" aria-labelledby="approach-title">
      <Container>
        <Grid className="approach-heading">
          <p className="type-label approach-label">{content.labels.approach}</p>
          <h2 id="approach-title" className="type-h2">{content.approachHeading}</h2>
        </Grid>
        <ol className="grid-layout approach-steps">
          {content.approach.map((step, index) => (
            <li className="approach-step" key={step.title}>
              <span className="type-label text-muted approach-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="type-h3">{step.title}</h3>
              <p className="type-body text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
