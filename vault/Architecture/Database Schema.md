# Database Schema

SQLite database via `better-sqlite3`. File location: `data/*.db` (gitignored).

Source: `src/lib/db.ts`

## Tables

### `workers`
| Column | Type | Notes |
|--------|------|-------|
| `id` | INTEGER | PRIMARY KEY, auto-increment |
| `name` | TEXT | NOT NULL |
| `group_name` | TEXT | NOT NULL — `runner`, `maintenance` |
| `push_token` | TEXT | Expo push token (nullable) |

### `tasks`
| Column | Type | Notes |
|--------|------|-------|
| `id` | INTEGER | PRIMARY KEY, auto-increment |
| `title` | TEXT | NOT NULL |
| `description` | TEXT | |
| `group_target` | TEXT | NOT NULL — `runner`, `maintenance`, `all` |
| `status` | TEXT | DEFAULT `pending` — `pending`, `accepted`, `completed` |
| `accepted_by` | INTEGER | FK → workers.id (nullable) |
| `property` | TEXT | Property/location reference |
| `created_at` | TEXT | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TEXT | DEFAULT CURRENT_TIMESTAMP |

## Helper Functions
- `getWorkers(groupName?)` — list workers, optionally filtered
- `createWorker(name, group)` — insert worker
- `updatePushToken(workerId, token)` — set push token
- `getTasks(filters)` — list tasks with optional filters
- `createTask(data)` — insert task
- `acceptTask(id, workerId)` — set status=accepted
- `completeTask(id)` — set status=completed

## Config
`next.config.ts` requires:
```ts
serverExternalPackages: ["better-sqlite3"]
```

## Related
- [[API Routes]]
- [[Tech Stack]]
