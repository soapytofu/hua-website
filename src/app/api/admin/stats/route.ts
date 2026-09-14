import { NextRequest, NextResponse } from "next/server";
import { getStats, setStats } from "@/lib/statsConfig";
import type { StatsConfig } from "@/lib/statsConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  const config = await getStats();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: StatsConfig = await request.json();
  await setStats(body);
  return NextResponse.json({ success: true });
}
