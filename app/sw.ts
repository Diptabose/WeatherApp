/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
// TypeScript's DOM/webworker libs don't yet include the Notifications API's
// `actions` option, even though it's broadly supported.
interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }

  interface NotificationOptions {
    actions?: NotificationAction[];
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  disableDevLogs: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

const DEFAULT_NOTIFICATION_URL = "/today";
const OPEN_ACTION = "open";

function parsePushPayload(data: PushMessageData | null): {
  title?: string;
  body?: string;
  icon?: string;
  badge?: string;
  url?: string;
} {
  if (!data) return {};
  try {
    return data.json();
  } catch {
    // Non-JSON payload (e.g. DevTools' "Push" test button sends plain text).
    return { body: data.text() };
  }
}

self.addEventListener("push", (event: PushEvent) => {
  const payload = parsePushPayload(event.data);
  const title = payload.title ?? "Weather App";
  const url = payload.url ?? DEFAULT_NOTIFICATION_URL;

  const options: NotificationOptions = {
    body: payload.body,
    icon: payload.icon ?? "/icons/android-chrome-192x192.png",
    badge: payload.badge ?? "/icons/android-chrome-192x192.png",
    data: { url },
    actions: [
      {
        action: OPEN_ACTION,
        title: "Open in App",
        icon: "/icons/android-chrome-192x192.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(title, options).catch((error) => {
      // Permission can only be granted from a window context (e.g.
      // Notification.requestPermission()), never from the service worker
      // itself, so a missing/revoked grant is expected here - fail quietly
      // instead of an unhandled rejection.
      console.warn("Failed to show push notification:", error);
    }),
  );
});

self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close();

  if (event.action && event.action !== OPEN_ACTION) {
    return;
  }

  const url =
    (event.notification.data?.url as string) ?? DEFAULT_NOTIFICATION_URL;
  const targetUrl = new URL(url, self.location.origin).href;

  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of windows) {
        if (client.url === targetUrl && "focus" in client) {
          await client.focus();
          return;
        }
      }

      for (const client of windows) {
        if ("focus" in client && "navigate" in client) {
          await client.focus();
          await (client as WindowClient).navigate(targetUrl);
          return;
        }
      }

      await self.clients.openWindow(targetUrl);
    })(),
  );
});

serwist.addEventListeners();
