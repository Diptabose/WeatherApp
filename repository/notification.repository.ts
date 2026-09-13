import { type NotificationSubscription } from "@/models/notification-subscription.model";
import { Model } from "mongoose";

interface NotifcationCursor {
  batchSize?: number;
}
export class NotificationRepository {
  constructor(private model: Model<NotificationSubscription>) {}

  cursor(options: NotifcationCursor | undefined) {
    const subscriptionsCursor = this.model.find().cursor({
      lean: true,
      batchSize: options?.batchSize ?? 20,
    });
    return subscriptionsCursor;
  }

  async deleteSubscriptions(endpoints: string[]) {
    try {
      const deletedEndpoints = await this.model.deleteMany({
        "subscription.endpoint": {
          $in: endpoints,
        },
      });
      return deletedEndpoints;
    } catch (error) {
      console.log("[MONGO]: Failed to delete endpoints", error);
      return { acknowledged: 0, deletedCount: 0 };
    }
  }
}
