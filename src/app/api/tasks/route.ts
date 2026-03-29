import { NextRequest, NextResponse } from "next/server";
import { createTask, getTasks } from "@/lib/db";
import { sendPushToGroup } from "@/lib/push";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const group = searchParams.get("group") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const acceptedBy = searchParams.get("accepted_by") ?? undefined;

  const tasks = getTasks({ group, status, acceptedBy });
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, group_target, property } = body;

  if (!title || !group_target) {
    return NextResponse.json(
      { error: "title and group_target are required" },
      { status: 400 }
    );
  }

  if (!["runner", "maintenance", "all"].includes(group_target)) {
    return NextResponse.json(
      { error: "group_target must be runner, maintenance, or all" },
      { status: 400 }
    );
  }

  const task = createTask(title, description ?? null, group_target, property ?? null);

  // Send push notifications to the target group
  const groupLabel =
    group_target === "all" ? "All Teams" : group_target.charAt(0).toUpperCase() + group_target.slice(1);

  await sendPushToGroup(
    group_target,
    `New Task: ${title}`,
    `Assigned to ${groupLabel}${property ? ` at ${property}` : ""}`,
    { taskId: task.id }
  );

  return NextResponse.json(task, { status: 201 });
}
