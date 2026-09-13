# Weather App — v2.0

A PWA weather app built on Next.js (App Router), rewritten from a client-fetched SPA into a server-rendered app with real-time-ish push notifications.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/today` once it has your coordinates (browser geolocation, with a manual override via saved locations).

Required environment variables:

| Variable | Purpose |
| --- | --- |
| `OPEN_WEATHER_MAP_BASE_API` | Base URL for the OpenWeatherMap API |
| `OPEN_WEATHER_MAP_API_KEY` | OpenWeatherMap API key |
| `MOCK_WEATHER_API` | Set to `true` to serve mocked weather responses instead of calling OpenWeatherMap (useful while iterating locally) |
| `MONGODB_URI` | Mongo connection string for push subscription storage |
| `PUBLIC_VAPID_KEY` / `PRIVATE_VAPID_KEY` / `NEXT_PUBLIC_VAPID_KEY` | VAPID key pair for Web Push |
| `MAIL_TO` | Contact address required by the Web Push VAPID subject |

## Migration to Next.js — what changed

This app used to be a client-side SPA that fetched weather data in the browser after mount. The rewrite moves data fetching to the server:

- Every weather page (`/today`, `/tomorrow`, `/weekly`, `/saved-locations`) is an **async Server Component** that calls the OpenWeatherMap API directly during render via a shared `axios` instance (`services/weather.server-client.ts`). There is no client-side fetch/loading-state dance for weather data — the HTML that reaches the browser already has the data in it.
- Route segments use the standard `loading.tsx` / `error.tsx` conventions for streaming and error UI per page.
- `/today` additionally streams in two sections independently via `React.Suspense` (hourly forecast, air quality index) so the rest of the page doesn't wait on the slowest request. Each of those two sections is wrapped in its own `catchError()`-based boundary (`components/weather/WeatherSectionError.tsx`) so a failure in one section (e.g. the AQI call) shows an inline retry card instead of taking down the whole page — that's distinct from `tomorrow`/`weekly`, which fetch everything up front in one block and rely on the route's `error.tsx` for the whole page.
- Geolocation (browser-only, can't run on the server) is the one thing that's still resolved client-side, via `LocationProvider` / `useLocationManagement`. It gates rendering of the weather pages behind a loading/error compound component (`components/weather/compound`), independent of the per-route Server Component loading/error states above.

## Pages

| Route | What it shows | Data source |
| --- | --- | --- |
| `/today` | Current conditions, hourly forecast + temperature chart, AQI, sun/moon animation, detail cards (min/max, pressure, humidity, wind, clouds) | OpenWeatherMap current weather + forecast + air pollution endpoints |
| `/tomorrow` | Tomorrow's forecast summary, hourly breakdown and chart, detail cards | OpenWeatherMap current weather + forecast endpoints |
| `/weekly` | 5-day forecast as an accordion, one row per day with expandable sunrise/sunset/wind/humidity detail | OpenWeatherMap forecast endpoint |
| `/saved-locations` | Grid of locations the user has bookmarked, with the ability to add the current location or jump to a saved one | Client-persisted (`useSavedLocations`) + current weather for the active location |

## UI components — shadcn

The design system in `components/ui/` is [shadcn](https://ui.shadcn.com/)-generated and customized (button, card, dialog, select, switch, tabs, accordion, input/input-group, textarea, combobox, skeleton, spinner, toast). Weather-specific UI in `components/weather/` composes these primitives rather than styling from scratch, so loading skeletons, error states, and toasts all look and behave consistently across the app.

Charting was migrated from `chart.js` / `react-chartjs-2` to [Recharts](https://recharts.org/) (`components/weather/hourly/WeatherPlot.tsx`) — the old chart.js dependencies have been dropped in this release.

## Notifications

Push notifications are opt-in per device, toggled from the header configuration (`components/weather/header/configuration/NotificationConfiguration.tsx`):

1. **Subscribe** — the browser's `PushManager` creates a subscription (`lib/notification.ts`), which is registered server-side (`actions/subscribe-notifcation.ts`) against a MongoDB-backed `NotificationSubscription` record keyed by a per-device id, along with the coordinates to notify for. A welcome push confirms the subscription immediately.
2. **Deliver** — a Vercel Cron job (`vercel.json`, daily at 09:00 UTC) hits `app/api/notifications/route.ts`, which batches through every stored subscription (`lib/batch.ts`, `repository/notification.repository.ts`), fetches that device's current weather, and sends a push via `web-push` (`actions/send-notification.ts`). Subscriptions that come back `404`/`410` (expired/gone) are pruned automatically.
3. **Receive** — the service worker (`app/sw.ts`, built with Serwist) shows the notification and routes a click back into the app (focusing an existing tab or opening `/today`).
4. **Unsubscribe** — turning the toggle off unsubscribes the browser's `PushManager` first (so the device stops receiving pushes immediately even if the server call fails) and then deregisters the server-side record; a failed deregistration is surfaced as a non-blocking warning toast rather than leaving the toggle stuck.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Serwist](https://serwist.pages.dev/) — service worker tooling used for the PWA/offline support
- [shadcn](https://ui.shadcn.com/) — UI component generator
- [Recharts](https://recharts.org/) — charting library

## Deploy

Deployed on [Vercel](https://vercel.com); pushes to `main` auto-deploy.
