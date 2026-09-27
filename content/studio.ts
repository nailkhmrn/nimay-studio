export interface StudioSocial {
  readonly label: "Instagram" | "LinkedIn";
  readonly href: `https://${string}`;
}

export const studioContact = {
  email: "hello@nimaystudio.com",
  socials: [] as readonly StudioSocial[], // Awaiting confirmed profile URLs.
};

export const capabilities = [
  { title: "Strategy", items: ["Positioning / Brand direction"] },
  { title: "Identity", items: ["Visual identity / Art direction"] },
  { title: "Digital", items: ["Website design / Development"] },
] as const;

export const approach = [
  { title: "Direction", description: "Learn the business, audience and constraints. Agree what the site needs to communicate and do." },
  { title: "Design", description: "Define the visual system and page structure, then refine key interactions before development." },
  { title: "Build", description: "Develop the approved design into a responsive website, then test its pages and interactions before handoff." },
] as const;
