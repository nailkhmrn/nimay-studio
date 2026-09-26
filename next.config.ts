import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/work", destination: "/#selected-work", permanent: false },
      { source: "/studio", destination: "/#studio-statement", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/services", destination: "/#capabilities", permanent: false },
    ];
  },
};

export default nextConfig;
