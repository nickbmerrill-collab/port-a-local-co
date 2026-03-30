# Environment Setup

## Web App (Next.js)

### Install & Run
```bash
npm install
TURBOPACK=0 npx next dev --port 3001
```

> **Important**: `TURBOPACK=0` is required because Next.js detects `mobile/package-lock.json` as a second lockfile and fails with Turbopack enabled.

### Launch Config
`.claude/launch.json` is pre-configured with the correct env var and port.

### Database
SQLite files are created automatically in `data/` on first API call. They're gitignored:
```
data/*.db
data/*.db-wal
data/*.db-shm
```

## Mobile App (Expo)

### Install & Run
```bash
cd mobile
npm install
npx expo start
```

### Configure API URL
In the mobile Settings screen, set the API URL to your Next.js server's address (e.g., `http://192.168.x.x:3001`).

### Push Notifications
Require a physical iOS device — simulators can't receive push notifications.

## Git
- Main development branch: `claude/scrape-business-data-wOonK`
- `.gitignore` covers: `.next/`, `node_modules/`, SQLite files, mobile build artifacts

## Related
- [[Tech Stack]]
- [[iOS Build Guide]]
