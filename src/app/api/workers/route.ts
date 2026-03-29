import { NextRequest, NextResponse } from "next/server";
import { createWorker, getWorkers } from "@/lib/db";

export async function GET() {
  const workers = getWorkers();
  return NextResponse.json(workers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, group_name } = body;

  if (!name || !group_name) {
    return NextResponse.json(
      { error: "name and group_name are required" },
      { status: 400 }
    );
  }

  if (!["runner", "maintenance"].includes(group_name)) {
    return NextResponse.json(
      { error: "group_name must be runner or maintenance" },
      { status: 400 }
    );
  }

  const worker = createWorker(name, group_name);
  return NextResponse.json(worker, { status: 201 });
}
