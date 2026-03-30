# iOS Build Guide

## Prerequisites
- Apple Developer account (team already has one)
- Expo account
- EAS CLI (`npx eas-cli` — v18.4.0 available)

## Steps to Build

### 1. Log in to Expo
```bash
cd mobile
npx eas-cli login
```
Or set `EXPO_TOKEN` environment variable.

### 2. Link the Project
```bash
npx eas-cli init
```
This generates a `projectId` in `app.json` under `extra.eas.projectId`.

### 3. Build for iOS
```bash
npx eas-cli build --profile development --platform ios
```

EAS will:
- Prompt for Apple Developer credentials on first run
- Handle provisioning profiles automatically
- Ask to register test devices if using "internal" distribution
- Build the `.ipa` in Expo's cloud
- Provide a download link when done

### 4. Install on Test Phones
- Both test phones (yours and [[Winston Caraker|Winston's]]) need to be registered as test devices
- EAS can handle device registration during the build process
- Install via the link EAS provides after build completes

## Build Profiles (`eas.json`)

| Profile | Purpose | Distribution |
|---------|---------|-------------|
| `development` | Dev client with hot reload | Internal (test devices) |
| `preview` | Testing builds | Internal |
| `production` | App Store submission | Default |

## Apple Credentials Needed (for App Store only)
These go in `eas.json` → `submit.production.ios`:
- `appleId` — Apple ID email
- `ascAppId` — App Store Connect App ID
- `appleTeamId` — Apple Developer Team ID

**Not needed for development/preview builds.**

## Known Issues
- `expo-constants` was duplicated — fixed by removing explicit dep
- `expo-doctor` flagged network-related schema check failures (environment restriction, not real issues)

## Related
- [[Mobile App — iOS Task Dispatch]]
- [[Push Notifications]]
- [[Team]]
