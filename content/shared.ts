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
// Gallery order drives the showcase layout: two desktop captures, then one mobile capture.
const desktop = { kind: "desktop", width: 1440, height: 1000 } as const;
const mobile = { kind: "mobile", width: 390, height: 844 } as const;

// `visible: false` keeps a project's data in the repo but hides it from the page.
// Erbay Ekinci stays hidden until the business has explicitly agreed to be shown publicly.
export const projects = [
  {
    slug: "zera-moda", title: "Zera Moda", year: 2026, status: "concept", visible: true, demoUrl: "https://zera-moda-demo.vercel.app",
    gallery: [{ src: "/projects/zera-moda/zera-03-desktop.webp", ...desktop }, { src: "/projects/zera-moda/zera-01-desktop.webp", ...desktop }, { src: "/projects/zera-moda/zera-02-mobile.webp", ...mobile }],
  },
  {
    slug: "erbay-ekinci", title: "Erbay Ekinci", year: 2026, status: "concept", visible: false, demoUrl: "https://erbay-ekinci-haute-couture.vercel.app",
    gallery: [{ src: "/projects/erbay-ekinci/erbay-02-desktop.webp", ...desktop }, { src: "/projects/erbay-ekinci/erbay-01-desktop.webp", ...desktop }, { src: "/projects/erbay-ekinci/erbay-03-mobile.webp", ...mobile }],
  },
] as const;

// The hero walks one page from sketch to launch. The first two windows are drawn
// in CSS; the third shows the live capture of this project.
export const heroProcess = {
  projectSlug: "zera-moda",
  liveImage: { src: "/projects/zera-moda/zera-01-desktop.webp", width: 1440, height: 1000 },
  mockKicker: "HAUTE COUTURE · BRIDAL",
} as const;
