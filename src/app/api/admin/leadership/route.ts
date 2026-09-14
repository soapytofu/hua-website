import { NextRequest, NextResponse } from "next/server";
import { getLeaders, setLeaders } from "@/lib/leadershipConfig";
import type { Leader } from "@/data/leadership";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  const leaders = await getLeaders();
  return NextResponse.json(leaders);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: Leader[] = await request.json();
  await setLeaders(body);
  return NextResponse.json({ success: true });
}
