import { NextRequest, NextResponse } from "next/server";
import { getBudget, setBudget } from "@/lib/budgetConfig";
import type { BudgetConfig } from "@/lib/budgetConfig";
import { isAdminAuthed } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getBudget();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body: BudgetConfig = await request.json();
  await setBudget(body);
  return NextResponse.json({ success: true });
}
