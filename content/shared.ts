export const siteFacts = {
  email: "hello@nimaystudio.com",
  // WhatsApp number in international format, digits only (e.g. "905XXXXXXXXX").
  // The WhatsApp button and contact row stay hidden while this is empty.
  whatsappNumber: "",
  analyticsMeasurementId: "G-J6Z3RYRXJ7",
  analyticsConsentStorageKey: "nimay-analytics-consent-v1",
} as const;

const desktop = { kind: "desktop", width: 1440, height: 1000 } as const;
const mobile = { kind: "mobile", width: 390, height: 844 } as const;

// `visible: false` keeps a project's data in the repo but hides it from the site.
// Erbay Ekinci stays hidden until the business has explicitly agreed to be shown publicly.
// Gallery order: two desktop captures, then one mobile capture.
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

export const visibleProjects = projects.filter((project) => project.visible);
