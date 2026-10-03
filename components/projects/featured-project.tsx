import Image from "next/image";
import type { SiteContent, Locale } from "@/content/types";
import type { projects } from "@/content/shared";

type SharedProject = (typeof projects)[number];

const shotSizes = {
  desktop: "(min-width: 94rem) 680px, (min-width: 48rem) 46vw, 100vw",
  mobile: "240px",
} as const;

export function FeaturedProject({ project, content, locale }: { project: SharedProject; content: SiteContent; locale: Locale }) {
  const localized = content.projects[project.slug]!;
  return (
    <article className="project-showcase" aria-labelledby={`${project.slug}-title`}>
      <h3 id={`${project.slug}-title`} className="project-title" lang={locale}>{project.title}</h3>
      <div className="project-shots">
        {project.gallery.map((shot, index) => (
          <figure key={shot.src} className={`project-shot project-shot--${shot.kind}`}>
            <Image src={shot.src} width={shot.width} height={shot.height} alt={localized.imageAlts[index] ?? project.title} sizes={shotSizes[shot.kind]} />
          </figure>
        ))}
      </div>
      <div className="project-details">
        <div className="project-summary">
          <p className="project-type">{localized.projectType}</p>
          <p className="project-description text-muted">{localized.description}</p>
          <div className="project-actions">
            <a className="button button--primary project-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${content.labels.viewProjectAria} — ${project.title}`}>
              {content.labels.viewProject}<span aria-hidden="true">↗</span>
            </a>
            <span className="tag">{content.labels.conceptWebsite}</span>
          </div>
        </div>
        <dl className="project-facts">
          <div><dt>{content.labels.services}</dt><dd>{localized.services.join(" / ")}</dd></div>
          <div><dt>{content.labels.sector}</dt><dd>{localized.industry}</dd></div>
          <div><dt>{content.labels.year}</dt><dd>{project.year}</dd></div>
        </dl>
      </div>
    </article>
  );
}
