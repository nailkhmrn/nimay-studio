import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://nimaystudio.com/" },
    { url: "https://nimaystudio.com/privacy" },
  ];
}
