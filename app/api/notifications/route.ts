import { sendNotification } from "@/actions/send-notification";
import { BatchWorker } from "@/lib/batch";
import dbConnect from "@/lib/db";
import {
  type NotificationSubscription,
  NotificationSubscriptionModel,
} from "@/models/notification-subscription.model";
import { weatherClient } from "@/services/weather.server-client";
import { WeatherData } from "@/types/weather.types";
import { NextRequest, NextResponse } from "next/server";

async function worker(data: NotificationSubscription) {
  const weatherResponse = await weatherClient.get<WeatherData>(
    `/data/2.5/weather?lat=${data.coords.lat}&lon=${data.coords.lon}&units=metric`,
  );
  const {
    name,
    weather,
    main: { feels_like, temp, temp_min, temp_max },
  } = weatherResponse.data;
  const payload = `${name}:Feels like ${feels_like}°C\nTemp:${temp}°C  Min/Max:${temp_min}°C/${temp_max}°C\n${weather[0].description}\n\nWeatherApp`;
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
  try {
    await dbConnect();
    // Get the endpoints and send the notification in batches.
    const subscriptionsCursor = NotificationSubscriptionModel.find().cursor({
      lean: true,
      batchSize: 20,
    });

    const results = await batchWorker.serializedStartIterable(
      subscriptionsCursor,
      worker,
    );

    return NextResponse.json(
      { success: true, message: "Cron ran as expected", results },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Failed to run the cron" },
      { status: 500 },
    );
  }
}
