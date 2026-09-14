import { NextRequest, NextResponse } from "next/server";
import { getEligibilityConfig, setEligibilityConfig } from "@/lib/eligibilityConfig";
import type { EligibilityConfig } from "@/lib/eligibilityConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  const config = await getEligibilityConfig();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: EligibilityConfig = await request.json();
  await setEligibilityConfig(body);
  return NextResponse.json({ success: true });
}
