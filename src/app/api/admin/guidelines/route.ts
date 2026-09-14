import { NextRequest, NextResponse } from "next/server";
import { getGuidelines, setGuidelines } from "@/lib/guidelinesConfig";
import type { GuidelinesConfig } from "@/lib/guidelinesConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  const config = await getGuidelines();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: GuidelinesConfig = await request.json();
  await setGuidelines(body);
  return NextResponse.json({ success: true });
}
