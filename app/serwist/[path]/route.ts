import { createSerwistRoute } from "@serwist/turbopack";
// If you are using Next.js versions older than 15.0.0, add the
// `nextConfig` option so that Serwist can configure the service
// worker according to your options. Serwist 10 and newer will
// only support Next.js 15.0.0 and above.
// import nextConfig from "$cwd/next.config.mjs";

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    // Bump this whenever the /~offline page's content changes, so Serwist
    // knows to fetch and re-cache the new version instead of serving stale content.
    additionalPrecacheEntries: [{ url: "/~offline", revision: "1" }],
    swSrc: "app/sw.ts",

    useNativeEsbuild: true,
  });
