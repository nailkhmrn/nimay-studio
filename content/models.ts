export type FoundationPath = "/" | "/work" | "/services" | "/studio" | "/contact";

export interface NavigationItem {
  readonly label: string;
  readonly href: FoundationPath;
}

export interface ProjectImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly caption?: string;
}

export interface ProjectCredit {
  readonly role: string;
  readonly name: string;
  readonly url?: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly industry: string;
  readonly projectType: string;
  readonly year: number;
  readonly cover: ProjectImage;
  readonly summary: string;
  readonly context: readonly string[];
  readonly challenge: readonly string[];
  readonly direction: readonly string[];
  readonly experience: readonly string[];
  readonly gallery: readonly ProjectImage[];
  readonly credits: readonly ProjectCredit[];
  readonly status: "client" | "concept";
}

export type HomepageProject = Pick<Project, "slug" | "title" | "industry" | "year" | "projectType"> & {
  readonly status: "concept";
  readonly demoUrl: `https://${string}`;
  readonly description: string;
  readonly services: readonly string[];
};
