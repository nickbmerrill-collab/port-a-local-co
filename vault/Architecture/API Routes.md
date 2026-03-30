# API Routes

All API routes live under `src/app/api/`.

## Endpoints

### `POST /api/tasks`
Create a new task and send push notifications to the target labor group.

**Body:**
```json
{
  "title": "Fix AC in Unit 3",
  "description": "Thermostat not responding",
  "group_target": "maintenance",
  "property": "Unit 3, Beach House Row"
}
```

**Flow:**
1. Insert task into SQLite `tasks` table
2. Query all workers in the target group
3. Send push notifications via [[Push Notifications|Expo Push Service]]
4. Return created task

### `GET /api/tasks`
List tasks with optional filters.

**Query params:**
- `group` — filter by group_target (runner/maintenance/all)
- `status` — filter by status (pending/accepted/completed)
- `accepted_by` — filter by worker ID

### `PATCH /api/tasks/[id]`
Accept or complete a task.

**Body (accept):**
```json
{ "action": "accept", "worker_id": 1 }
```

**Body (complete):**
```json
{ "action": "complete" }
```

### `POST /api/workers`
Register a new worker.

**Body:**
```json
{
  "name": "Winston",
  "group_name": "maintenance"
}
```

### `GET /api/workers`
List all registered workers.

### `POST /api/push/register`
Update a worker's push token.

**Body:**
```json
{
  "worker_id": 1,
  "push_token": "ExponentPushToken[xxxx]"
}
```

## Source Files
- `src/app/api/tasks/route.ts` — GET, POST
- `src/app/api/tasks/[id]/route.ts` — PATCH
- `src/app/api/workers/route.ts` — GET, POST
- `src/app/api/push/register/route.ts` — POST

## Related
- [[Database Schema]]
- [[Push Notifications]]
- [[Mobile App — iOS Task Dispatch]]
