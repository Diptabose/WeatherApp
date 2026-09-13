import {
  deregisterPushSubscription,
  registerPushSubscription,
} from "@/actions/subscribe-notifcation";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";
import {
  notificationSupported,
  subscribe,
  unsubscribe,
  userTurnedAppNotification,
} from "@/lib/notification";
import { isValid } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { PushSubscription as WebPushSubscription } from "web-push";

export function NotificationConfiguration() {
  const [enabled, setNotificationEnabled] = useState<boolean>(() =>
    userTurnedAppNotification(),
  );
  const [isPending, setIsPending] = useState(false);
  const searchParams = useSearchParams();

  const coords = {
    lat: Number(searchParams.get("lat")),
    lon: Number(searchParams.get("lon")),
  };

  async function handleNotificationToggle(checked: boolean) {
    if (isPending) return;
    setIsPending(true);
    try {
      if (checked) {
        if (!isValid(coords.lat) || !isValid(coords.lon)) {
          throw new Error("Select a location before enabling notifications.");
        }
        const subscription =
          (await subscribe()) as unknown as WebPushSubscription;
        const deviceId = crypto.randomUUID();
        await registerPushSubscription({ subscription, deviceId, coords });
        localStorage.setItem("notification-id", deviceId);
        setNotificationEnabled(true);
      } else {
        await unsubscribe();
        const deviceId = localStorage.getItem("notification-id");
        localStorage.removeItem("notification-id");
        setNotificationEnabled(false);
        if (deviceId) {
          try {
            await deregisterPushSubscription(deviceId);
          } catch (error) {
            console.error(
              "[Notification]: Failed to deregister subscription on server",
              error,
            );
            toast.add({
              title: "Notifications turned off",
              description:
                "Notifications were disabled on this device, but we couldn't clean up on our server. This won't affect you.",
              type: "warning",
            });
          }
        }
      }
    } catch (error) {
      console.error("[Notification]: Failed to toggle notifications", error);
      toast.add({
        title: "Couldn't update notifications",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <span className="font-semibold">Notifications</span>
      <span>
        <Switch
          disabled={!notificationSupported() || isPending}
          checked={enabled}
          onCheckedChange={handleNotificationToggle}
        />
      </span>
    </>
  );
}
