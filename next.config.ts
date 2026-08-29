import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
  },
  redirects: () => {
    return [{ source: "/", destination: "/today", permanent: true }];
  },
};

export default nextConfig;
