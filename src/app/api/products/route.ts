import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { forwardProducts } from "@/lib/backend";
import { forbidden, unauthorized, validWriteOrigin } from "@/lib/security";
export const dynamic = "force-dynamic";
export async function GET() {
  try { const result = await forwardProducts("/products", "GET"); return NextResponse.json(result.payload, { status: result.status }); }
  catch { return NextResponse.json({ message: "Catalog unavailable" }, { status: 502 }); }
}
export async function POST(req: NextRequest) {
  if (!validWriteOrigin(req)) return forbidden();
  if (!await isAdmin()) return unauthorized();
  try {
    const result = await forwardProducts("/products", "POST", await req.json());
    return NextResponse.json(result.payload, { status: result.status });
  } catch { return NextResponse.json({ message: "Unable to create product" }, { status: 502 }); }
}
