import { NextRequest, NextResponse } from "next/server";
import { getTaskById, acceptTask, completeTask } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const task = getTaskById(id);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(task);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { status, worker_id } = body;

  const existing = getTaskById(id);
  if (!existing) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  if (status === "accepted") {
    if (!worker_id) {
      return NextResponse.json(
        { error: "worker_id is required to accept a task" },
        { status: 400 }
      );
    }
    const task = acceptTask(id, worker_id);
    return NextResponse.json(task);
  }

  if (status === "completed") {
    const task = completeTask(id);
    return NextResponse.json(task);
  }

  return NextResponse.json(
    { error: "status must be 'accepted' or 'completed'" },
    { status: 400 }
  );
}
