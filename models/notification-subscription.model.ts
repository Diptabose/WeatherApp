import "server-only";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface NotificationSubscription extends Document {
  deviceId: string;
  subscription: {
    endpoint: string;
    expirationTime: number | null;
    keys: {
      p256dh: string;
      auth: string;
    };
  };
  coords: {
    lat: number;
    lon: number;
  };
}

const NotificationSubscriptionSchema = new Schema<NotificationSubscription>(
  {
    deviceId: { type: String, required: true, unqiue: true },
    subscription: {
      endpoint: { type: String, required: true, unique: true },
      expirationTime: { type: Number, required: false },
      keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true },
      },
    },
    coords: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
  },
  { collection: "notification-subscriptions", timestamps: true },
);

// Prevent compilation error if the model already exists
export const NotificationSubscriptionModel: Model<NotificationSubscription> =
  mongoose.models.NotificationSubscription ||
  mongoose.model<NotificationSubscription>(
    "NotificationSubscription",
    NotificationSubscriptionSchema,
  );
