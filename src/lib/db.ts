import Database from "better-sqlite3";
import path from "path";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  const dbPath = path.join(process.cwd(), "data", "tasks.db");

  // Ensure the data directory exists
  const fs = require("fs");
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS workers (
      id         TEXT PRIMARY KEY,
      name       TEXT NOT NULL,
      group_name TEXT NOT NULL CHECK (group_name IN ('runner', 'maintenance')),
      push_token TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id           TEXT PRIMARY KEY,
      title        TEXT NOT NULL,
      description  TEXT,
      group_target TEXT NOT NULL CHECK (group_target IN ('runner', 'maintenance', 'all')),
      status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'completed')),
      accepted_by  TEXT REFERENCES workers(id),
      property     TEXT,
      created_at   TEXT DEFAULT (datetime('now')),
      accepted_at  TEXT,
      completed_at TEXT
    );
  `);

  return db;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

// --- Worker helpers ---

export interface Worker {
  id: string;
  name: string;
  group_name: "runner" | "maintenance";
  push_token: string | null;
  created_at: string;
}

export function createWorker(
  name: string,
  groupName: "runner" | "maintenance"
): Worker {
  const db = getDb();
  const id = generateId();
  db.prepare(
    "INSERT INTO workers (id, name, group_name) VALUES (?, ?, ?)"
  ).run(id, name, groupName);
  return db.prepare("SELECT * FROM workers WHERE id = ?").get(id) as Worker;
}

export function getWorkers(): Worker[] {
  return getDb().prepare("SELECT * FROM workers ORDER BY created_at DESC").all() as Worker[];
}

export function updatePushToken(workerId: string, pushToken: string): void {
  getDb()
    .prepare("UPDATE workers SET push_token = ? WHERE id = ?")
    .run(pushToken, workerId);
}

export function getWorkersByGroup(groupTarget: string): Worker[] {
  const db = getDb();
  if (groupTarget === "all") {
    return db
      .prepare("SELECT * FROM workers WHERE push_token IS NOT NULL")
      .all() as Worker[];
  }
  return db
    .prepare(
      "SELECT * FROM workers WHERE group_name = ? AND push_token IS NOT NULL"
    )
    .all(groupTarget) as Worker[];
}

// --- Task helpers ---

export interface Task {
  id: string;
  title: string;
  description: string | null;
  group_target: "runner" | "maintenance" | "all";
  status: "pending" | "accepted" | "completed";
  accepted_by: string | null;
  property: string | null;
  created_at: string;
  accepted_at: string | null;
  completed_at: string | null;
}

export function createTask(
  title: string,
  description: string | null,
  groupTarget: "runner" | "maintenance" | "all",
  property: string | null
): Task {
  const db = getDb();
  const id = generateId();
  db.prepare(
    "INSERT INTO tasks (id, title, description, group_target, property) VALUES (?, ?, ?, ?, ?)"
  ).run(id, title, description, groupTarget, property);
  return db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task;
}

export function getTasks(filters?: {
  group?: string;
  status?: string;
  acceptedBy?: string;
}): Task[] {
  const db = getDb();
  let query = "SELECT * FROM tasks WHERE 1=1";
  const params: string[] = [];

  if (filters?.group && filters.group !== "all") {
    query += " AND (group_target = ? OR group_target = 'all')";
    params.push(filters.group);
  }
  if (filters?.status) {
    query += " AND status = ?";
    params.push(filters.status);
  }
  if (filters?.acceptedBy) {
    query += " AND accepted_by = ?";
    params.push(filters.acceptedBy);
  }

  query += " ORDER BY created_at DESC";
  return db.prepare(query).all(...params) as Task[];
}

export function getTaskById(id: string): Task | undefined {
  return getDb()
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(id) as Task | undefined;
}

export function acceptTask(taskId: string, workerId: string): Task | undefined {
  const db = getDb();
  db.prepare(
    "UPDATE tasks SET status = 'accepted', accepted_by = ?, accepted_at = datetime('now') WHERE id = ? AND status = 'pending'"
  ).run(workerId, taskId);
  return getTaskById(taskId);
}

export function completeTask(taskId: string): Task | undefined {
  const db = getDb();
  db.prepare(
    "UPDATE tasks SET status = 'completed', completed_at = datetime('now') WHERE id = ? AND status = 'accepted'"
  ).run(taskId);
  return getTaskById(taskId);
}
