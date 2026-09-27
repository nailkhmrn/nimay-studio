import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import type { SiteContent } from "@/content/types";
import type { engagements as engagementFacts } from "@/content/shared";

export function Engagements({ content, facts }: { content: SiteContent; facts: readonly (typeof engagementFacts)[number][] }) {
  return (
    <Section id="engagements" className="engagements" aria-labelledby="engagements-title">
      <Container>
        <Grid className="engagements-heading">
          <p className="type-label engagements-label">{content.labels.engagements}</p>
          <h2 id="engagements-title" className="type-editorial">{content.labels.websiteEngagements}</h2>
        </Grid>
        <ol className="engagement-list">
          {facts.map((fact) => {
            const item = content.engagements[fact.id]!;
            return (
              <li className="engagement" key={fact.id}>
                <Grid className="engagement-grid">
                  <div className="engagement-identity">
                    <span className="type-label text-muted engagement-number">{fact.number}</span>
                    <h3 className="type-h2">{fact.name}</h3>
                  </div>
                  <p className="type-h3 engagement-price">{content.labels.pricePrefix} {fact.price}</p>
                  <p className="type-body text-muted engagement-audience">{item.audience}</p>
                  <div className="engagement-timeline">
                    <p className="type-label">{content.labels.typicalTimeline}</p>
                    <p className="type-small">{item.timelineLabel}</p>
                  </div>
                  <div className="engagement-scope">
                    {item.scopeIntro && <p className="type-body text-muted engagement-scope-intro">{item.scopeIntro}</p>}
                    <p className="type-label">{item.scopeLabel}</p>
                    <ul className="type-small">{item.scope.map((scope) => <li key={scope}>{scope}</li>)}</ul>
                    {item.note && <p className="type-small text-muted engagement-note">{item.note}</p>}
                  </div>
                </Grid>
              </li>
            );
          })}
        </ol>
        <div className="engagement-terms">
          <div className="engagement-terms-label"><p className="type-label">{content.labels.terms}</p></div>
          <ul className="type-small text-muted">{content.terms.map((term) => <li key={term}>{term}</li>)}</ul>
        </div>
      </Container>
    </Section>
  );
}
