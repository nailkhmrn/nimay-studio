import { Grid } from "@/components/layout/grid";
import type { HomepageProject } from "@/content/models";

export function FeaturedProject({ project, number }: { project: HomepageProject; number: "01" | "02" }) {
  return (
    <article className="project-index-entry" aria-labelledby={`${project.slug}-title`}>
      <Grid className="project-index-grid">
        <span className="project-index-number type-label text-muted">{number}</span>
        <div className="project-index-primary">
          <div className="project-index-identity">
            <h3 id={`${project.slug}-title`} className="type-project" lang="tr">{project.title}</h3>
            <p className="type-body">{project.projectType}</p>
            <p className="project-index-description type-body text-muted">{project.description}</p>
          </div>
          <a className="project-index-link type-small" href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            aria-label={`View ${project.title} concept website (opens in a new tab)`}>
            <span>View Project</span><span className="project-index-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="project-index-meta type-small text-muted">
          <dl className="project-index-facts">
            <div><dt className="type-label">Services</dt><dd><ul>{project.services.map(service => <li key={service}>{service}</li>)}</ul></dd></div>
            <div><dt className="type-label">Sector</dt><dd>{project.industry}</dd></div>
            <div><dt className="type-label">Year</dt><dd>{project.year}</dd></div>
          </dl>
          <p className="concept-disclosure">Concept Website</p>
        </div>
      </Grid>
    </article>
  );
}
