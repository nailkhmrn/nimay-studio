import type { SiteContent } from "@/content/types";

export const en = {
  languageName: "English",
  metadata: {
    title: "NIMAY — Independent Digital Studio",
    description: "NIMAY is an independent digital studio designing and building custom websites for independent professionals and small businesses. Based in Türkiye.",
    ogTitle: "NIMAY — Independent Digital Studio",
    ogDescription: "NIMAY is an independent digital studio designing and building custom websites for independent professionals and small businesses. Based in Türkiye.",
    ogLocale: "en_US",
    alternateLocale: "tr_TR",
    imageAlt: "NIMAY — Independent Digital Studio",
  },
  labels: {
    home: "Home", work: "Work", contact: "Contact", language: "Language", darkAction: "Dark", lightAction: "Light", menu: "Menu", close: "Close", navigation: "Main navigation", mobileNavigation: "Mobile navigation", skipToContent: "Skip to content", basedIn: "Based in Türkiye", selectedWork: "Selected Work", services: "Services", sector: "Sector", year: "Year", viewProject: "View Project", conceptWebsite: "Concept Website", engagements: "Offer", websiteEngagements: "A tailored quote for every project.", typicalTimeline: "Typical timeline", terms: "Terms", approach: "Approach", studio: "Studio", capabilities: "Capabilities", contactPrompt: "Tell me about your project.", copyEmail: "Copy email", emailCopied: "Email copied", emailSubject: "Website enquiry", whatsapp: "Message on WhatsApp", whatsappMessage: "Hello, I would like to talk to NIMAY Studio about my website project.", privacy: "Privacy", privacyPreferences: "Privacy preferences", analyticsPreferences: "Analytics preferences", allowAnalytics: "Allow analytics", rejectAnalytics: "Reject", analyticsDescription: "Allow analytics to help measure site use, or reject to keep optional analytics off. Your choice is saved on this device and can be changed at any time.", footerStudioDescriptor: "Independent Digital Studio", viewProjectAria: "View concept website",
  },
  hero: { kicker: "NIMAY / Independent Digital Studio", title: "Custom-designed websites, from first sketch to launch.", location: "Based in Türkiye" },
  selectedWork: { framing: "Independent concept studies showing my approach to design and development. These are not client projects." },
  projects: {
    "zera-moda": { projectType: "Bridal website", description: "A bridal website concept pairing collection browsing with a guided private-fitting request.", services: ["Website design / Development / Art direction"], industry: "Fashion" },
    "erbay-ekinci": { projectType: "Couture atelier website", description: "An Istanbul haute couture website concept with collection stories, atelier details and a clear appointment enquiry path.", services: ["Website design / Art direction / Development"], industry: "Haute Couture" },
  },
  offer: {
    name: "Custom website",
    audience: "For independent professionals, small businesses and service brands. Price depends on page count, content readiness and timeline. You receive a written quote after our first conversation.",
    timelineLabel: "7–14 business days, depending on scope",
    scopeLabel: "Included",
    scope: ["Discovery and content planning", "Information architecture", "Custom website design", "Responsive development", "Technical SEO setup", "Contact or enquiry flow", "Responsive QA and launch", "2 revision rounds", "30 days of technical bug support after handoff"],
    note: "Page count, revision allowance and support scope are set out in writing in the quote.",
  },
  approachHeading: "How we work.",
  approach: [
    { title: "Direction", description: "I learn the business, audience and constraints, then we agree what the site needs to communicate and do." },
    { title: "Design", description: "I define the visual system and page structure, then refine key interactions with you before development." },
    { title: "Build", description: "I develop the approved design into a responsive website and test its pages and interactions before handoff." },
  ],
  studioStatement: "A website should make the brand clear and the next step obvious.",
  capabilities: [{ title: "Design", items: ["Custom website design", "Art direction"] }, { title: "Development", items: ["Built with Next.js", "Responsive pages"] }, { title: "Launch", items: ["Technical SEO setup", "Deployment and 30 days of support"] }],
  contact: { heading: "Tell me about your project.", guidance: "Tell me about your business, your current website if you have one, what the new site needs to do and your preferred timeline. I’ll reply with the next steps and any questions needed to define the scope.", location: "Based in Türkiye" },
  privacy: { kicker: "NIMAY / Privacy", title: "Privacy & analytics", updated: "Last updated: September 2026", sections: [{ number: "01", title: "Optional analytics", paragraphs: ["NIMAY uses Google Analytics 4 (GA4) only if you explicitly allow analytics. Before you make that choice, GA4 is not loaded and no analytics request is sent. If you reject analytics, GA4 stays disabled.", "Your choice is stored locally in your browser. You can reopen Privacy preferences in the footer and change your choice at any time."] }, { number: "02", title: "If you allow analytics", paragraphs: ["Google Analytics may set analytics cookies and collect standard usage information, such as pages viewed, device and browser information, approximate location derived from your IP address, and interaction data. NIMAY does not intentionally send names, email addresses or other direct personal identifiers to Google Analytics.", "Advertising signals are disabled in the current implementation. NIMAY does not use Google Ads, remarketing or user IDs."] }, { number: "03", title: "Browser storage", paragraphs: ["The analytics choice is saved in your browser’s local storage so the preference is remembered on later visits. The site may also use technically necessary browser or storage mechanisms for basic operation."] }], contactLabel: "Contact", contactHeading: "Questions about privacy?" },
  notFound: { kicker: "NIMAY STUDIO / 404", title: "Page not found.", home: "Return home" },
  terms: ["50% upfront to begin / 50% before final production handoff.", "Additional scope is quoted separately.", "Domain, paid third-party services and production costs such as professional photography/video are not included unless quoted.", "Ongoing SEO, advertising, ecommerce/payment systems, translation and ongoing maintenance are separate scopes.", "30-day included support covers technical bugs in delivered work, not unlimited design/content changes."],
} as const satisfies SiteContent;
