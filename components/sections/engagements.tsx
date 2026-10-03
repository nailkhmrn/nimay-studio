import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { sectionNumber } from "@/components/ui/section-number";
import type { SiteContent } from "@/content/types";

export function Engagements({ content, position }: { content: SiteContent; position: number }) {
  const offer = content.offer;
  return (
    <Section id="engagements" className="offer" aria-labelledby="engagements-title">
      <Container>
        <div className="label-row"><span>{sectionNumber(position)} {content.labels.engagements}</span><span className="offer-muted">{offer.name}</span></div>
        <div className="offer-head">
          <h2 id="engagements-title" className="offer-title">{content.labels.websiteEngagements}</h2>
          <div className="offer-duration">
            <p className="type-label">{content.labels.typicalTimeline}</p>
            <p className="offer-duration-value">{offer.timelineValue}</p>
            <p className="offer-duration-unit">{offer.timelineUnit}</p>
          </div>
        </div>
        <div className="offer-body">
          <div className="offer-audience">
            <h3 className="type-h2">{offer.name}</h3>
            <p>{offer.audience}</p>
          </div>
          <div className="offer-scope">
            <p className="type-label offer-muted">{offer.scopeLabel}</p>
            <ul className="offer-scope-list">{offer.scope.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="offer-note offer-muted">{offer.note}</p>
          </div>
        </div>
        <details className="offer-terms">
          <summary className="type-label">{content.labels.terms}<span className="offer-terms-icon" aria-hidden="true">+</span></summary>
          <ul>{content.terms.map((term) => <li key={term}>{term}</li>)}</ul>
        </details>
      </Container>
    </Section>
  );
}
