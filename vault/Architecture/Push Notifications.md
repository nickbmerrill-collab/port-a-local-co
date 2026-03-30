# Push Notifications

## Architecture

```
Admin Dashboard → POST /api/tasks → sendPushToGroup() → Expo Push Service → APNs → iPhone
```

## How It Works

1. **Worker registers** via mobile Settings screen → saves Expo push token
2. **Admin dispatches task** from `/admin` dashboard
3. **API creates task** in SQLite, then calls `sendPushToGroup()`
4. **Push sender** (`src/lib/push.ts`) queries all workers in target group
5. **Expo Server SDK** batches messages and sends to Expo Push Service
6. **Expo** routes to APNs → notification appears on worker's iPhone

## Push Token Flow
1. Mobile app calls `registerForPushNotificationsAsync()` on launch
2. Gets Expo push token (format: `ExponentPushToken[xxxx]`)
3. Posts to `POST /api/push/register` with worker ID + token
4. Token stored in `workers.push_token` column

## Notification Payload
```json
{
  "to": "ExponentPushToken[xxxx]",
  "title": "New Task: Fix AC in Unit 3",
  "body": "Maintenance — Unit 3, Beach House Row",
  "sound": "default",
  "data": { "taskId": 42 }
}
```

## Key Files
- `src/lib/push.ts` — `sendPushToGroup()` function
- `mobile/src/lib/notifications.ts` — permission + token retrieval
- `mobile/App.tsx` — notification listeners + auto re-registration

## Requirements
- Expo push notifications are **free** (no APNs certificates needed)
- Physical device required (no simulator push)
- iOS permission prompt on first launch
- `expo-notifications` plugin in `app.json`

## Related
- [[API Routes]]
- [[Mobile App — iOS Task Dispatch]]
- [[iOS Build Guide]]
