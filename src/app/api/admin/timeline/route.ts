import { NextRequest, NextResponse } from "next/server";
import { getTimeline, setTimeline } from "@/lib/timelineConfig";
import type { TimelineConfig } from "@/lib/timelineConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  const config = await getTimeline();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: TimelineConfig = await request.json();
  await setTimeline(body);
  return NextResponse.json({ success: true });
}
