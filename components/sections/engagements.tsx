import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { engagementTerms, engagements } from "@/content/engagements";

export function Engagements() {
  return (
    <Section id="engagements" className="engagements" aria-labelledby="engagements-title">
      <Container>
        <Grid className="engagements-heading">
          <p className="type-label engagements-label">Engagements</p>
          <h2 id="engagements-title" className="type-editorial">Website engagements.</h2>
        </Grid>
        <ol className="engagement-list">
          {engagements.map((engagement) => (
            <li className="engagement" key={engagement.name}>
              <Grid className="engagement-grid">
                <div className="engagement-identity">
                  <span className="type-label text-muted engagement-number">{engagement.number}</span>
                  <h3 className="type-h2">{engagement.name}</h3>
                </div>
                <p className="type-h3 engagement-price">{engagement.price}</p>
                <p className="type-body text-muted engagement-audience">{engagement.audience}</p>
                <div className="engagement-timeline">
                  <p className="type-label">Typical timeline</p>
                  <p className="type-small">{engagement.timeline}</p>
                </div>
                <div className="engagement-scope">
                  {"scopeIntro" in engagement && <p className="type-body text-muted engagement-scope-intro">{engagement.scopeIntro}</p>}
                  <p className="type-label">{engagement.scopeLabel}</p>
                  <ul className="type-small">
                    {engagement.scope.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  {"note" in engagement && <p className="type-small text-muted engagement-note">{engagement.note}</p>}
                </div>
              </Grid>
            </li>
          ))}
        </ol>
        <div className="engagement-terms">
          <div className="engagement-terms-label">
            <p className="type-label">Terms</p>
          </div>
          <ul className="type-small text-muted">
            {engagementTerms.map((term) => <li key={term}>{term}</li>)}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
