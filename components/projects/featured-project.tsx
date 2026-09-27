import Image from "next/image";
import { Grid } from "@/components/layout/grid";
import { CtaLink } from "@/components/ui/cta-link";
import type { SiteContent } from "@/content/types";
import type { projects } from "@/content/shared";

type SharedProject = (typeof projects)[number];

export function FeaturedProject({ project, content }: { project: SharedProject; content: SiteContent }) {
  const localized = content.projects[project.slug]!;
  return <article className="featured-project">
    <div className="project-image-wrap"><Image className="project-image" src={`/projects/${project.slug}.webp`} alt={`${project.title} — ${localized.projectType}`} width={1600} height={1100} sizes="(min-width: 64rem) 58vw, 100vw" /><span className="project-status type-label">{content.labels.conceptWebsite}</span></div>
    <Grid className="project-details">
      <div><p className="type-label">{localized.projectType}</p><h2 className="type-h2">{project.title}</h2><p className="type-body text-muted project-description">{localized.description}</p><CtaLink href={project.demoUrl} target="_blank" rel="noreferrer" aria-label={`${content.labels.viewProjectAria} — ${project.title}`}>{content.labels.viewProject}</CtaLink></div>
      <dl className="project-meta type-label"><div><dt>{content.labels.services}</dt><dd>{localized.services.join(" / ")}</dd></div><div><dt>{content.labels.sector}</dt><dd>{localized.industry}</dd></div><div><dt>{content.labels.year}</dt><dd>{project.year}</dd></div></dl>
    </Grid>
  </article>;
}
