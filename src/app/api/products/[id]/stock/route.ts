import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { forwardProducts } from "@/lib/backend";
import { forbidden, unauthorized, validWriteOrigin } from "@/lib/security";
export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!validWriteOrigin(req)) return forbidden();
  if (!await isAdmin()) return unauthorized();
  const { id } = await context.params;
  if (!/^[a-f\d]{24}$/i.test(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  try {
    const result = await forwardProducts(`/products/${id}/stock`, "PATCH", await req.json());
    return NextResponse.json(result.payload, { status: result.status });
  } catch { return NextResponse.json({ message: "Unable to consume stock" }, { status: 502 }); }
}
