import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { sectionNumber } from "@/components/ui/section-number";
import type { SiteContent } from "@/content/types";

export function Approach({ content, position }: { content: SiteContent; position: number }) {
  return (
    <Section id="approach" className="approach" aria-labelledby="approach-title">
      <Container>
        <div className="label-row"><span>{sectionNumber(position)} {content.labels.approach}</span><span className="text-muted">{content.labels.approachSteps}</span></div>
        <h2 id="approach-title" className="section-title">{content.approachHeading}</h2>
        <ol className="approach-cards">
          {content.approach.map((step, index) => (
            <li className="approach-card" key={step.title}>
              <span className="approach-card-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="type-h2 approach-card-title">{step.title}</h3>
                <p className="approach-card-text">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
