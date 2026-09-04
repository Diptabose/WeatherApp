import { NextResponse } from "next/server";

// Kill switch for the old CRA service worker, which registered itself at this
// exact URL ("/service-worker.js", scope "/"). Browsers periodically re-fetch
// a registered SW's script to check for byte-level changes, bypassing that
// worker's own fetch handler — so replacing the content here reaches clients
// stuck on the old worker even if it's still serving stale cached pages.
// Once this activates, it wipes old caches, unregisters itself, and forces a
// fresh navigation so the page picks up the current Next.js app, which then
// registers the real Serwist worker at /serwist/sw.js.
const KILL_SWITCH_SCRIPT = `
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      await self.registration.unregister();

      const clientsList = await self.clients.matchAll({ type: "window" });
      for (const client of clientsList) {
        client.navigate(client.url);
      }
    })(),
  );
});
`;

export function GET() {
  return new NextResponse(KILL_SWITCH_SCRIPT, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-cache",
      "Service-Worker-Allowed": "/",
    },
  });
}
