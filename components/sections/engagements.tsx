import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { SiteContent } from "@/content/types";
import type { engagements as engagementFacts } from "@/content/shared";

export function Engagements({ content, facts }: { content: SiteContent; facts: readonly (typeof engagementFacts)[number][] }) {
  return (
    <Section id="engagements" className="engagements" aria-labelledby="engagements-title">
      <Container>
        <div className="section-heading">
          <p className="type-label">{content.labels.engagements}</p>
          <h2 id="engagements-title" className="type-editorial">{content.labels.websiteEngagements}</h2>
        </div>
        <div className="engagement-list">
          {facts.map((fact) => {
            const item = content.engagements[fact.id]!;
            return (
              <article className="engagement-card" key={fact.id}>
                <div className="engagement-card-heading">
                  <span className="type-label text-muted">{fact.number}</span>
                  <h3 className="type-h2">{fact.name}</h3>
                  <p className="type-label engagement-price">{fact.price}</p>
                </div>
                <p className="type-body text-muted engagement-audience">{item.audience}</p>
                <div className="engagement-meta">
                  <div><span className="type-label text-muted">{content.labels.typicalTimeline}</span><p>{item.timelineLabel}</p></div>
                  {item.scopeIntro && <p className="type-body text-muted">{item.scopeIntro}</p>}
                  <div><span className="type-label text-muted">{item.scopeLabel}</span><ul>{item.scope.map((scope) => <li key={scope}>{scope}</li>)}</ul></div>
                  {item.note && <p className="type-body text-muted">{item.note}</p>}
                </div>
              </article>
            );
          })}
        </div>
        <p className="type-label text-muted engagements-note">{content.labels.terms}</p>
        <ul className="terms-list type-body text-muted">{content.terms.map((term) => <li key={term}>{term}</li>)}</ul>
      </Container>
    </Section>
  );
}
