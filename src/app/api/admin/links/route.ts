import { NextRequest, NextResponse } from "next/server";
import { getLinks, setLinks } from "@/lib/linksConfig";
import type { LinksConfig } from "@/lib/linksConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  const config = await getLinks();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: LinksConfig = await request.json();
  await setLinks(body);
  return NextResponse.json({ success: true });
}
