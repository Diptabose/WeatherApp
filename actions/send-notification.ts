import webpush, { type PushSubscription, WebPushError } from "web-push";

webpush.setVapidDetails(
  process.env.MAIL_TO as string,
  process.env.PUBLIC_VAPID_KEY as string,
  process.env.PRIVATE_VAPID_KEY as string,
);

// Mirrors the shape `parsePushPayload` in app/sw.ts expects after JSON-parsing this payload.
export interface PushNotificationPayload {
  title?: string;
  body?: string;
  icon?: string;
  badge?: string;
  url?: string;
}

export async function sendNotification(
  sub: PushSubscription,
  data: PushNotificationPayload,
) {
  try {
    const result = await webpush.sendNotification(sub, JSON.stringify(data));
    console.log("[WEBPUSH", result);
    return { success: true, ...result };
  } catch (error) {
    console.error("[WEBPUSH]: Error sending push notification:", error);
    return { success: false, message: "Failed to send notification", error };
  }
}
