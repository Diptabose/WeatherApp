"use server";

import type { PushSubscription } from "web-push";
import { NotificationSubscriptionModel } from "@/models/notification-subscription.model";
import { sendNotification } from "./send-notification";
import dbConnect from "@/lib/db";

export interface RegisterPushSubscriptionInput {
  deviceId: string;
  subscription: PushSubscription;
  coords: {
    lat: number;
    lon: number;
  };
}

export async function registerPushSubscription(
  data: RegisterPushSubscriptionInput,
) {
  await dbConnect();
  const response = await NotificationSubscriptionModel.findOneAndUpdate(
    {
      deviceId: data.deviceId,
    },
    data,
    { lean: true, upsert: true, returnDocument: "after" },
  );
  console.log(
    "[MONGO]: Record Inserted",
    data.deviceId,
    response?._id.toHexString(),
  );
  try {
    const notificationResponse = await sendNotification(data.subscription, {
      title: "Welcome to WeatherApp",
      body: "You are now subscribed to receive notifications.",
    });
    console.log(
      "[Notification]: Subscribing Notification",
      "Success: ",
      notificationResponse.success,
    );
  } catch (error) {
    console.log("[Notification]: Subscribing Notification", "Error: ", error);
  }

  return { id: response!._id.toString(), deviceId: response!.deviceId };
}

export async function deregisterPushSubscription(deviceId: string) {
  await dbConnect();
  const response = await NotificationSubscriptionModel.deleteOne({ deviceId });
  console.log("[MONGO]: ", deviceId, response);
  return response.acknowledged;
}
