import { NextRequest, NextResponse } from "next/server";
import { getInstagram, setInstagram } from "@/lib/instagramConfig";
import type { InstagramConfig } from "@/lib/instagramConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getInstagram();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: InstagramConfig = await request.json();
  await setInstagram(body);
  return NextResponse.json({ success: true });
}
