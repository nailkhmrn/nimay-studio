import type { Project } from "./models";

// Add only approved projects. Empty until the portfolio sprint.
export const projects: readonly Project[] = [];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectHref(slug: Project["slug"]): `/work/${string}` {
  return `/work/${encodeURIComponent(slug)}`;
}
