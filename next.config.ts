import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true },
      { source: "/privacy", destination: "/en/privacy", permanent: true },
      { source: "/work", destination: "/en#selected-work", permanent: false },
      { source: "/studio", destination: "/en#studio-statement", permanent: false },
      { source: "/contact", destination: "/en#contact", permanent: false },
      { source: "/services", destination: "/en#capabilities", permanent: false },
    ];
  },
};

export default nextConfig;
