import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/", destination: "/tr", permanent: false },
      { source: "/privacy", destination: "/tr/privacy", permanent: false },
      { source: "/work", destination: "/tr#selected-work", permanent: false },
      { source: "/studio", destination: "/tr#studio-statement", permanent: false },
      { source: "/contact", destination: "/tr#contact", permanent: false },
      { source: "/services", destination: "/tr#capabilities", permanent: false },
    ];
  },
};

export default nextConfig;
