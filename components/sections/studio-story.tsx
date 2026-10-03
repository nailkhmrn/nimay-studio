import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { sectionNumber } from "@/components/ui/section-number";
import type { SiteContent } from "@/content/types";

export function StudioStatement({ content, position }: { content: SiteContent; position: number }) {
  const statement = content.studioStatement;
  return (
    <Section id="studio-statement" className="studio" aria-labelledby="studio-title">
      <Container>
        <div className="label-row"><span>{sectionNumber(position)} {content.labels.studio}</span><span className="text-muted">{content.labels.capabilities}</span></div>
        <h2 id="studio-title" className="studio-title">{statement.before}<span className="studio-highlight">{statement.emphasis}</span>{statement.after}</h2>
        <div id="capabilities" className="capability-columns">
          {content.capabilities.map((item) => (
            <div className="capability" key={item.title}>
              <h3 className="capability-title">{item.title}</h3>
              <ul>{item.items.map((service) => <li key={service}>{service}</li>)}</ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
