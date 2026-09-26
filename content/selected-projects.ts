import type { HomepageProject } from "./models";

// Independent concept websites, not commissioned client projects.
// Interface assets remain in public/projects for the later case-study phase.
export const selectedProjects = [
  {
    slug: "zera-moda", title: "Zera Moda", industry: "Fashion", year: 2026, status: "concept",
    projectType: "Bridal website", demoUrl: "https://zera-moda-demo.vercel.app",
    description: "A bridal website concept pairing collection browsing with a guided private-fitting request.",
    services: ["Website design / Development / Art direction"],
  },
  {
    slug: "erbay-ekinci", title: "Erbay Ekinci", industry: "Haute Couture", year: 2026, status: "concept",
    projectType: "Couture atelier website", demoUrl: "https://erbay-ekinci-haute-couture.vercel.app",
    description: "An Istanbul haute couture website concept with collection stories, atelier details and a clear appointment enquiry path.",
    services: ["Website design / Art direction / Development"],
  },
] as const satisfies readonly HomepageProject[];
