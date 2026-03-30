# Tech Stack

## Web Application

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.1 |
| UI Library | React | 19 |
| Language | TypeScript | 6 |
| Styling | Tailwind CSS | 4 |
| Database | SQLite (better-sqlite3) | — |
| Push Service | Expo Server SDK | — |

### Key Config
- `next.config.ts` — `serverExternalPackages: ["better-sqlite3"]`
- `tsconfig.json` — includes only `src/**/*.ts` and `src/**/*.tsx` (excludes mobile/)
- `.claude/launch.json` — `TURBOPACK=0` env var (workaround for nested lockfile issue)

## Mobile Application

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Expo | SDK 54 |
| UI Library | React Native | 0.81.5 |
| Navigation | React Navigation (Bottom Tabs) | 7.x |
| Notifications | expo-notifications | 55.x |
| Secure Storage | expo-secure-store | 55.x |
| Build Service | EAS Build | — |

### Bundle ID
`co.portalocal.tasks`

## Known Issues / Workarounds
- **Turbopack + nested lockfile**: Next.js detects `mobile/package-lock.json` and tries to use `mobile/` as root. Fix: `TURBOPACK=0`
- **expo-constants duplicate**: Removed explicit dep — bundled with expo SDK 54
- **thepalmrepublic.com 403**: Can't fetch directly (Shopify bot protection)

## Related
- [[API Routes]]
- [[Database Schema]]
- [[Environment Setup]]
