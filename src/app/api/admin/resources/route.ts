import { NextRequest, NextResponse } from "next/server";
import { getResourcesConfig, setResourcesConfig } from "@/lib/resourcesConfig";
import type { ResourcesConfig } from "@/lib/resourcesConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  const config = await getResourcesConfig();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: ResourcesConfig = await request.json();
  await setResourcesConfig(body);
  return NextResponse.json({ success: true });
}
