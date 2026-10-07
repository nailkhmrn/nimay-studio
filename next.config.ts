import type { NextConfig } from "next";
import { slugs } from "./lib/routes";

/* Güvenlik başlıkları. CSP istek başına nonce gerektirdiği için proxy.ts içinde eklenir. */
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), interest-cohort=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/* Sayfa klasörleri TR adlarıyla durur (app/(inner)/[locale]/isler). EN adresler aynı sayfalara yeniden yazılır. */
const fsName = slugs.tr;
const pages = ["work", "services", "process", "about", "contact"] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { globalNotFound: true },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/", destination: "/tr", permanent: false },
      /* Eski tek sayfalı sitenin adresleri, yeni sayfalara kalıcı yönlendirme (arama sonuçları ve dış bağlantılar korunur). */
      { source: "/work", destination: `/tr/${slugs.tr.work}`, permanent: true },
      { source: "/services", destination: `/tr/${slugs.tr.services}`, permanent: true },
      { source: "/studio", destination: `/tr/${slugs.tr.about}`, permanent: true },
      { source: "/contact", destination: `/tr/${slugs.tr.contact}`, permanent: true },
      { source: "/privacy", destination: "/tr/privacy", permanent: true },
      /* Aynı sayfa için tek adres: yanlış dildeki slug doğru dildekine gider (yinelenen içerik olmasın). */
      ...pages.flatMap((p) => [
        { source: `/en/${fsName[p]}`, destination: `/en/${slugs.en[p]}`, permanent: true },
        { source: `/tr/${slugs.en[p]}`, destination: `/tr/${fsName[p]}`, permanent: true },
      ]),
    ];
  },
  async rewrites() {
    return [{ source: "/:locale(tr|en)/opengraph-image", destination: "/og/:locale" }, ...pages.map((p) => ({ source: `/en/${slugs.en[p]}`, destination: `/en/${fsName[p]}` }))];
  },
};

export default nextConfig;
