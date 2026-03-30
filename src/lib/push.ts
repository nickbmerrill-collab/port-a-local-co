import { Expo, ExpoPushMessage } from "expo-server-sdk";
import { getWorkersByGroup } from "./db";

const expo = new Expo();

export async function sendPushToGroup(
  groupTarget: string,
  title: string,
  body: string,
  data?: Record<string, unknown>
): Promise<void> {
  const workers = getWorkersByGroup(groupTarget);
  const pushTokens = workers
    .map((w) => w.push_token)
    .filter((token): token is string => !!token && Expo.isExpoPushToken(token));

  if (pushTokens.length === 0) return;

  const messages: ExpoPushMessage[] = pushTokens.map((token) => ({
    to: token,
    sound: "default" as const,
    title,
    body,
    data: data ?? {},
  }));

  const chunks = expo.chunkPushNotifications(messages);

  for (const chunk of chunks) {
    try {
      await expo.sendPushNotificationsAsync(chunk);
    } catch (error) {
      console.error("Error sending push notification chunk:", error);
    }
  }
}
