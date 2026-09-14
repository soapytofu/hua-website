import { NextRequest, NextResponse } from "next/server";
import { getProcedures, setProcedures } from "@/lib/proceduresConfig";
import type { ProceduresConfig } from "@/lib/proceduresConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  const config = await getProcedures();
  // Don't send the full base64 blob on GET — just a flag indicating whether a PDF is stored
  return NextResponse.json({ hasPdf: !!config.pdfBase64 });
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: ProceduresConfig = await request.json();
  await setProcedures(body);
  return NextResponse.json({ success: true });
}
