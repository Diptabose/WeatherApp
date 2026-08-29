import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: () => {
    return [
      // Auto navigate to the today
      { source: "/", destination: "/today", permanent: true },
    ];
  },
};

export default nextConfig;
