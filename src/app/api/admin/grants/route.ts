import { NextRequest, NextResponse } from "next/server";
import { getGrantConfig, setGrantConfig, GrantConfig } from "@/lib/grantConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  const config = await getGrantConfig();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: GrantConfig = await request.json();
  await setGrantConfig(body);
  return NextResponse.json({ success: true });
}
