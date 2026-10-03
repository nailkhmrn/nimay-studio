import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import type { SiteContent } from "@/content/types";

export function Engagements({ content }: { content: SiteContent }) {
  const offer = content.offer;
  return (
    <Section id="engagements" className="engagements" aria-labelledby="engagements-title">
      <Container>
        <Grid className="engagements-heading">
          <p className="type-label engagements-label">{content.labels.engagements}</p>
          <h2 id="engagements-title" className="type-editorial">{content.labels.websiteEngagements}</h2>
        </Grid>
        <div className="engagement-list">
          <div className="engagement">
            <Grid className="engagement-grid">
              <div className="engagement-identity">
                <h3 className="type-h2">{offer.name}</h3>
              </div>
              <p className="type-body text-muted engagement-audience">{offer.audience}</p>
              <div className="engagement-timeline">
                <p className="type-label">{content.labels.typicalTimeline}</p>
                <p className="type-small">{offer.timelineLabel}</p>
              </div>
              <div className="engagement-scope">
                <p className="type-label">{offer.scopeLabel}</p>
                <ul className="type-small">{offer.scope.map((scope) => <li key={scope}>{scope}</li>)}</ul>
                <p className="type-small text-muted engagement-note">{offer.note}</p>
              </div>
            </Grid>
          </div>
        </div>
        <div className="engagement-terms">
          <div className="engagement-terms-label"><p className="type-label">{content.labels.terms}</p></div>
          <ul className="type-small text-muted">{content.terms.map((term) => <li key={term}>{term}</li>)}</ul>
        </div>
      </Container>
    </Section>
  );
}
