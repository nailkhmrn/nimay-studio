export const siteFacts = {
  email: "hello@nimaystudio.com",
  // WhatsApp number in international format, digits only (e.g. "905XXXXXXXXX").
  // The WhatsApp link in the footer is hidden while this is empty.
  whatsappNumber: "",
  analyticsMeasurementId: "G-J6Z3RYRXJ7",
  analyticsConsentStorageKey: "nimay-analytics-consent-v1",
  sectionIds: {
    selectedWork: "selected-work",
    engagements: "engagements",
    approach: "approach",
    studioStatement: "studio-statement",
    capabilities: "capabilities",
    contact: "contact",
  },
} as const;

// `visible: false` keeps a project's data in the repo but hides it from the page.
// Erbay Ekinci stays hidden until the business has explicitly agreed to be shown publicly.
export const projects = [
  { slug: "zera-moda", title: "Zera Moda", year: 2026, status: "concept", visible: true, demoUrl: "https://zera-moda-demo.vercel.app", imageSrc: "/projects/zera-moda/zera-01-desktop.webp", imageWidth: 1600, imageHeight: 1100 },
  { slug: "erbay-ekinci", title: "Erbay Ekinci", year: 2026, status: "concept", visible: false, demoUrl: "https://erbay-ekinci-haute-couture.vercel.app", imageSrc: "/projects/erbay-ekinci/erbay-01-desktop.webp", imageWidth: 1600, imageHeight: 1100 },
] as const;
