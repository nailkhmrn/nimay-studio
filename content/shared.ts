export const siteFacts = {
  email: "hello@nimaystudio.com",
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

export const projects = [
  { slug: "zera-moda", title: "Zera Moda", year: 2026, status: "concept", demoUrl: "https://zera-moda-demo.vercel.app" },
  { slug: "erbay-ekinci", title: "Erbay Ekinci", year: 2026, status: "concept", demoUrl: "https://erbay-ekinci-haute-couture.vercel.app" },
] as const;

export const engagements = [
  { id: "essential", number: "01", name: "Essential", price: "Starting at ₺19.900", pageRange: "1–3 primary pages/views", revisionRounds: 2, supportDays: 30 },
  { id: "signature", number: "02", name: "Signature", price: "Starting at ₺34.900", pageRange: "4–8 primary pages/views", revisionRounds: 2, supportDays: 30 },
  { id: "custom-b2b", number: "03", name: "Custom / B2B", price: "Starting at ₺49.900", pageRange: null, revisionRounds: null, supportDays: null },
] as const;
