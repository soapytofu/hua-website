import { NextRequest, NextResponse } from "next/server";
import { getReceiptsConfig, setReceiptsConfig } from "@/lib/receiptsConfig";
import type { ReceiptsConfig } from "@/lib/receiptsConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  const config = await getReceiptsConfig();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: ReceiptsConfig = await request.json();
  await setReceiptsConfig(body);
  return NextResponse.json({ success: true });
}
