import { NextRequest, NextResponse } from "next/server";
import { getReports, setReports } from "@/lib/reportsConfig";
import type { ReportsConfig } from "@/lib/reportsConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getReports();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: ReportsConfig = await request.json();
  await setReports(body);
  return NextResponse.json({ success: true });
}
