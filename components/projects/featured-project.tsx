import Image from "next/image";
import { Grid } from "@/components/layout/grid";
import type { SiteContent, Locale } from "@/content/types";
import type { projects } from "@/content/shared";

type SharedProject = (typeof projects)[number];

export function FeaturedProject({ project, content, locale, number }: { project: SharedProject; content: SiteContent; locale: Locale; number: string }) {
  const localized = content.projects[project.slug]!;
  return (
    <article className="project-index-entry" aria-labelledby={`${project.slug}-title`}>
      <Grid className="project-index-grid">
        <span className="project-index-number type-label text-muted">{number}</span>
        <div className="project-index-media">
          <Image className="project-index-image" src={project.imageSrc} alt={`${project.title} — ${localized.projectType}`} width={project.imageWidth} height={project.imageHeight} sizes="(min-width: 64rem) 42vw, 100vw" />
        </div>
        <div className="project-index-primary">
          <div className="project-index-identity">
            <h3 id={`${project.slug}-title`} className="type-project" lang={locale}>{project.title}</h3>
            <p className="type-body">{localized.projectType}</p>
            <p className="project-index-description type-body text-muted">{localized.description}</p>
          </div>
          <a className="project-index-link type-small" href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            aria-label={`${content.labels.viewProjectAria} — ${project.title}`}>
            <span>{content.labels.viewProject}</span><span className="project-index-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="project-index-meta type-small text-muted">
          <dl className="project-index-facts">
            <div><dt className="type-label">{content.labels.services}</dt><dd><ul>{localized.services.map(service => <li key={service}>{service}</li>)}</ul></dd></div>
            <div><dt className="type-label">{content.labels.sector}</dt><dd>{localized.industry}</dd></div>
            <div><dt className="type-label">{content.labels.year}</dt><dd>{project.year}</dd></div>
          </dl>
          <p className="concept-disclosure">{content.labels.conceptWebsite}</p>
        </div>
      </Grid>
    </article>
  );
}
