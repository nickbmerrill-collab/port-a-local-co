import { NextRequest, NextResponse } from "next/server";
import { updatePushToken } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { worker_id, push_token } = body;

  if (!worker_id || !push_token) {
    return NextResponse.json(
      { error: "worker_id and push_token are required" },
      { status: 400 }
    );
  }

  updatePushToken(worker_id, push_token);
  return NextResponse.json({ success: true });
}
