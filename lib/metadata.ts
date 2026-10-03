import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://nimaystudio.com"),
  applicationName: "NIMAY Studio",
  title: {
    default: "NIMAY — Independent Digital Studio",
    template: "%s — NIMAY Studio",
  },
  description: "NIMAY is an independent digital studio designing and building custom websites for independent professionals and small businesses. Based in Türkiye.",
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/apple-icon" },
};
