import { sendNotification } from "@/actions/send-notification";
import { BatchWorker } from "@/lib/batch";
import dbConnect from "@/lib/db";
import {
  type NotificationSubscription,
  NotificationSubscriptionModel,
} from "@/models/notification-subscription.model";
import { NotificationRepository } from "@/repository/notification.repository";
import { normalizePlaceName } from "@/lib/weather";
import { weatherClient } from "@/services/weather.server-client";
import { WeatherData } from "@/types/weather.types";
import { NextRequest, NextResponse } from "next/server";

const webPushErrorSet = new Set([404, 410]);

async function worker(data: NotificationSubscription) {
  const weatherResponse = await weatherClient.get<WeatherData>(
    `/data/2.5/weather?lat=${data.coords.lat}&lon=${data.coords.lon}&units=metric`,
  );
  const {
    name,
    weather,
    main: { feels_like, temp, temp_min, temp_max },
  } = weatherResponse.data;
  const payload = `${normalizePlaceName(name)}\nFeels like: ${feels_like}°C\nTemp:${temp}°C\nMin:${temp_min.toFixed(1)}°C Max:${temp_max.toFixed(1)}°C\n${capitalize(weather[0].description)}\nWeatherApp`;
  return await sendNotification(data.subscription, {
    title: "Today's Weather",
    body: payload,
    icon: `/icons/${weather[0].icon}.svg`,
    url: `/today?lat=${data.coords.lat}&lon=${data.coords.lon}`,
  });
}

const batchWorker = new BatchWorker({
  maxConcurrency: 10,
});

export const revalidate = 0;
export async function GET(request: NextRequest) {
  // Vercel signs cron invocations with `Authorization: Bearer $CRON_SECRET`.
  // https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
  // Skipped in dev so the route can be hit locally without provisioning the secret.
  if (process.env.NODE_ENV === "production") {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
  try {
    await dbConnect();
    // Get the endpoints and send the notification in batches.

    const notificationRepository = new NotificationRepository(
      NotificationSubscriptionModel,
    );
    const subscriptionsCursor = notificationRepository.cursor({});

    const results = await batchWorker.serializedStartIterable(
      subscriptionsCursor,
      worker,
    );

    // Use the results to deregister the ids from the database...
    const erroredEndpoints = results
      .map((r) => r.error)
      .flat()
      .filter(
        (error) =>
          error.reason?.name === "WebPushError" &&
          webPushErrorSet.has(error?.reason?.statusCode),
      )
      .map((error) => error?.reason?.endpoint);

    // Remove the endpoints.
    const deletedEndpoints =
      await notificationRepository.deleteSubscriptions(erroredEndpoints);

    console.log(
      "[Mongo]: ",
      "Deleted endpoints",
      deletedEndpoints,
      "MongoDB deleted Count: ",
      deletedEndpoints.deletedCount,
      "Reported errored endpoints Count: ",
      erroredEndpoints.length,
    );

    return NextResponse.json(
      {
        success: true,
        message: `Cron ran as of ${new Date().toISOString()}`,
        results,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
        message: `Failed to run the cron as of ${new Date().toISOString()}`,
      },
      { status: 500 },
    );
  }
}
function capitalize(description: string) {
  return description.charAt(0).toUpperCase().concat(description.slice(1));
}
