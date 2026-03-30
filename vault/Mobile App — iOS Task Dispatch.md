# Mobile App — iOS Task Dispatch

An Expo/React Native app for the Port A Local Co workforce. Workers receive push notifications when tasks are assigned to their labor group.

## Screens

### Tasks Screen (`TasksScreen.tsx`)
- Shows pending tasks for the worker's labor group
- Pull-to-refresh to check for new tasks
- "Accept" button on each task card
- Group badges (Runner, Maintenance, All)

### My Tasks Screen (`MyTasksScreen.tsx`)
- Shows tasks the worker has accepted
- "Mark Complete" button with confirmation dialog
- In-progress status indicator

### Settings Screen (`SettingsScreen.tsx`)
- Worker registration form (name + team selector)
- API URL configuration (points to Next.js server)
- Push notification registration
- Green confirmation card when registered
- Reset registration option

## Tech Details

| Item | Value |
|------|-------|
| Bundle ID | `co.portalocal.tasks` |
| Expo SDK | 54 |
| React Native | 0.81.5 |
| Navigation | Bottom Tabs (React Navigation 7) |
| Storage | expo-secure-store |
| Notifications | expo-notifications |

## File Structure
```
mobile/
├── App.tsx                     # Root — tab navigator + notification listeners
├── app.json                    # Expo config
├── eas.json                    # EAS Build profiles
├── src/
│   ├── screens/
│   │   ├── TasksScreen.tsx     # Available tasks
│   │   ├── MyTasksScreen.tsx   # Accepted tasks
│   │   └── SettingsScreen.tsx  # Registration & config
│   └── lib/
│       ├── api.ts              # API client (configurable base URL)
│       ├── notifications.ts    # Push token retrieval
│       └── storage.ts          # SecureStore wrapper
└── assets/                     # Icons and splash images
```

## Build & Distribution
See: [[iOS Build Guide]]

## Related
- [[API Routes]]
- [[Push Notifications]]
- [[Team]]
