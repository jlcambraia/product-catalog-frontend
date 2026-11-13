import { NextResponse } from "next/server";
import { forwardProducts } from "@/lib/backend";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const result = await forwardProducts("/products", "GET");
    return NextResponse.json(result.payload, { status: result.status });
  } catch {
    return NextResponse.json({ message: "Catalog unavailable" }, { status: 502 });
  }
}
// Demo changes must never reach the real database, even with a forged cookie.
export async function POST() {
  return NextResponse.json({ message: "Demo writes are browser-local only" }, { status: 403 });
}
