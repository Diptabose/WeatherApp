import { urlB64ToUint8Array } from "./utils";

export function notificationSupported() {
  return (
    "serviceWorker" in navigator &&
    "Notification" in globalThis &&
    "PushManager" in globalThis
  );
}

export function userGrantedNotification() {
  return notificationSupported() && Notification.permission === "granted";
}

export function userTurnedAppNotification() {
  return userGrantedNotification() && !!localStorage.getItem("notification-id");
}

//Function where public key is already defined and return application server key.
export function getPublicKeyAndReturnURL() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_KEY as string;
  const applicationServerKey = urlB64ToUint8Array(publicKey);
  return applicationServerKey;
}

export async function subscribe() {
  const serviceWorker = await navigator.serviceWorker.ready;
  const applicationServerKey = getPublicKeyAndReturnURL();
  const pushSubscription = await serviceWorker.pushManager.subscribe({
    applicationServerKey: applicationServerKey,
    userVisibleOnly: true,
  });
  return pushSubscription.toJSON();
}

export async function unsubscribe() {
  const serviceWorker = await navigator.serviceWorker.ready;
  const subscription = await serviceWorker.pushManager.getSubscription();
  if (subscription) {
    await subscription.unsubscribe();
  }
}
