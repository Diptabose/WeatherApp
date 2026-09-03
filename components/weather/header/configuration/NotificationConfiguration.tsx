import { deregisterPushSubscription, registerPushSubscription } from "@/actions/subscribe-notifcation";
import { Switch } from "@/components/ui/switch";
import { notificationSupported, subscribe, unsubscribe, userGrantedNotification, userTurnedAppNotification } from "@/lib/notification";
import { SwitchRoot } from "@base-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function NotificationConfiguration() {

    const [enabled, setNotificationEnabled] = useState<boolean>(() => userTurnedAppNotification());
    const searchParams = useSearchParams();

    const coords = {
        lat: Number(searchParams.get("lat")),
        lon: Number(searchParams.get("lon"))
    }
    async function handleNotificationToggle(checked: boolean, event: SwitchRoot.ChangeEventDetails) {
        const didUserGrantNotification = userGrantedNotification();
        setNotificationEnabled(checked);
        if (!didUserGrantNotification) {
            // User didnt subscribe and now turned on the button.
            if (checked) {
                const subscription = await subscribe() as any;
                const deviceId = crypto.randomUUID();
                await registerPushSubscription({ subscription, deviceId, coords });
                localStorage.setItem("notification-id", deviceId);
            }
        } else {
            // Notification was granted earlier., but user might have retoggled
            if (checked) {
                const subscription = await subscribe() as any;
                const deviceId = crypto.randomUUID();
                registerPushSubscription({ subscription, deviceId, coords });
                localStorage.setItem("notification-id", deviceId);
            } else {
                // Notification was granted earlier. Now the use  is turing off. so unsubscribe.
                const deviceId = localStorage.getItem("notification-id");
                if (deviceId) {
                    await deregisterPushSubscription(deviceId);
                    localStorage.removeItem("notification-id");
                }
                await unsubscribe();
            }
        }
    }

    return (
        <>
            <span className="font-semibold">
                Notifications
            </span>
            <span>
                <Switch disabled={!notificationSupported()} checked={enabled} onCheckedChange={handleNotificationToggle} />
            </span>
        </>
    )
}