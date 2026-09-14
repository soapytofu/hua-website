import { NextResponse } from "next/server";
import { getProcedures } from "@/lib/proceduresConfig";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getProcedures();

  if (!config.pdfBase64) {
    return NextResponse.redirect(new URL("/internal-finance-procedures", process.env.NEXT_PUBLIC_BASE_URL || "https://hua-finance-website-4c65.vercel.app"));
  }

  const base64 = config.pdfBase64.split(",")[1] ?? config.pdfBase64;
  const bytes = Buffer.from(base64, "base64");

  return new NextResponse(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="HUA_Internal_Finance_Procedures.pdf"',
      "Content-Length": bytes.length.toString(),
    },
  });
}
