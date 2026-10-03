import type { SiteContent } from "@/content/types";

export const en = {
  languageName: "English",
  metadata: {
    title: "NIMAY — Independent Digital Studio",
    description: "NIMAY is an independent digital studio designing brand identities and websites from strategy through development. Based in Türkiye, working worldwide.",
    ogTitle: "NIMAY — Independent Digital Studio",
    ogDescription: "NIMAY is an independent digital studio designing brand identities and websites from strategy through development. Based in Türkiye, working worldwide.",
    ogLocale: "en_US",
    alternateLocale: "tr_TR",
    imageAlt: "NIMAY — Independent Digital Studio",
  },
  labels: {
    home: "Home", work: "Work", contact: "Contact", language: "Language", darkAction: "Dark", lightAction: "Light", menu: "Menu", close: "Close", navigation: "Main navigation", mobileNavigation: "Mobile navigation", skipToContent: "Skip to content", basedIn: "Based in Türkiye", workingWorldwide: "Working worldwide", selectedWork: "Selected Work", projectCount: "01—02", services: "Services", sector: "Sector", year: "Year", viewProject: "View Project", conceptWebsite: "Concept Website", engagements: "Engagements", websiteEngagements: "Website engagements.", typicalTimeline: "Typical timeline", terms: "Terms", approach: "Approach", studio: "Studio", capabilities: "Capabilities", contactPrompt: "Planning a new identity or website?", copyEmail: "Copy email", emailCopied: "Email copied", privacy: "Privacy", privacyPreferences: "Privacy preferences", analyticsPreferences: "Analytics preferences", allowAnalytics: "Allow analytics", rejectAnalytics: "Reject", analyticsDescription: "Allow analytics to help measure site use, or reject to keep optional analytics off. Your choice is saved on this device and can be changed at any time.", footerStudioDescriptor: "Independent Digital Studio", viewProjectAria: "View concept website",
    pricePrefix: "Starting at",
  },
  hero: { kicker: "NIMAY / Independent Digital Studio", title: "Brand identities and websites, from strategy through development.", location: "Based in Türkiye\nWorking worldwide" },
  selectedWork: { framing: "Independent concept studies demonstrating our approach to digital direction, design and development." },
  projects: {
    "zera-moda": { projectType: "Bridal website", description: "A bridal website concept pairing collection browsing with a guided private-fitting request.", services: ["Website design / Development / Art direction"], industry: "Fashion" },
    "erbay-ekinci": { projectType: "Couture atelier website", description: "An Istanbul haute couture website concept with collection stories, atelier details and a clear appointment enquiry path.", services: ["Website design / Art direction / Development"], industry: "Haute Couture" },
  },
  engagements: {
    essential: { audience: "For independent professionals, small premium businesses and focused service businesses.", timelineLabel: "7–10 business days", scopeLabel: "Include", scope: ["Strategy and discovery", "Information architecture", "Custom website design", "Responsive development", "1–3 primary pages/views", "Technical SEO setup", "Contact / CTA setup", "Responsive QA and launch deployment", "2 revision rounds included", "30 days of technical bug support"] },
    signature: { audience: "For established brands that need a multi-page website with deeper content structure, stronger art direction, tailored interactions and a more considered enquiry journey.", timelineLabel: "10–15 business days", scopeLabel: "Include", scope: ["Strategy and discovery", "Deeper information architecture", "Custom design across 4–8 primary pages/views", "Stronger art direction", "Tailored interaction details", "Advanced enquiry/contact flow", "Technical SEO setup", "Responsive QA and launch deployment", "2 revision rounds included", "30 days of technical bug support"] },
    "custom-b2b": { audience: "For manufacturers, exporters, larger companies, catalog-heavy businesses, multilingual or international businesses and companies needing qualified lead capture.", timelineLabel: "3–6 weeks depending on scope.", scopeLabel: "Possible scope", scopeIntro: "Digital systems for more complex commercial operations — from product and catalog architecture to multilingual content, qualified enquiries and custom integrations.", scope: ["Custom information architecture", "Product / catalog structure", "Multilingual architecture", "Qualified enquiry forms", "Distributor / wholesale / B2B flows", "Custom integrations", "Larger content structures", "Tailored technical requirements"], note: "Final scope, revision allowance and post-launch support are defined in the proposal." },
  },
  approachHeading: "How we work.",
  approach: [
    { title: "Direction", description: "Learn the business, audience and constraints. Agree what the site needs to communicate and do." },
    { title: "Design", description: "Define the visual system and page structure, then refine key interactions before development." },
    { title: "Build", description: "Develop the approved design into a responsive website, then test its pages and interactions before handoff." },
  ],
  studioStatement: "A website should make the brand clear and the next step obvious.",
  capabilities: [{ title: "Strategy", items: ["Positioning / Brand direction"] }, { title: "Identity", items: ["Visual identity / Art direction"] }, { title: "Digital", items: ["Website design / Development"] }],
  contact: { heading: "Planning a new identity or website?", guidance: "Tell us about your business, your current website if you have one, what the new site needs to achieve and your preferred timeline. We’ll reply with the next steps and any questions needed to define the scope.", location: "Based in Türkiye · Working worldwide" },
  privacy: { kicker: "NIMAY / Privacy", title: "Privacy & analytics", updated: "Last updated: September 2026", sections: [{ number: "01", title: "Optional analytics", paragraphs: ["NIMAY uses Google Analytics 4 (GA4) only if you explicitly allow analytics. Before you make that choice, GA4 is not loaded and no analytics request is sent. If you reject analytics, GA4 stays disabled.", "Your choice is stored locally in your browser. You can reopen Privacy preferences in the footer and change your choice at any time."] }, { number: "02", title: "If you allow analytics", paragraphs: ["Google Analytics may set analytics cookies and collect standard usage information, such as pages viewed, device and browser information, approximate location derived from your IP address, and interaction data. NIMAY does not intentionally send names, email addresses or other direct personal identifiers to Google Analytics.", "Advertising signals are disabled in the current implementation. NIMAY does not use Google Ads, remarketing or user IDs."] }, { number: "03", title: "Browser storage", paragraphs: ["The analytics choice is saved in your browser’s local storage so the preference is remembered on later visits. The selected appearance preference is stored in a first-party cookie named nimay-theme-v1. It contains only the selected light or dark appearance, is functional, and works independently of analytics consent."] }], contactLabel: "Contact", contactHeading: "Questions about privacy?" },
  notFound: { kicker: "NIMAY STUDIO / 404", title: "Page not found.", home: "Return home" },
  terms: ["50% upfront to begin / 50% before final production handoff.", "Additional scope is quoted separately.", "Domain, paid third-party services and production costs such as professional photography/video are not included unless quoted.", "Ongoing SEO, advertising, ecommerce/payment systems, translation and ongoing maintenance are separate scopes.", "30-day included support covers technical bugs in delivered work, not unlimited design/content changes."],
} as const satisfies SiteContent;
