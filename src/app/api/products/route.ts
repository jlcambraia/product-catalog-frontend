import { NextResponse } from "next/server";
import { forwardProducts } from "@/lib/backend";

export const dynamic = "force-dynamic";
// A free-tier backend can need extra time to wake after inactivity.
export const maxDuration = 60;

export async function GET() {
  try {
    const result = await forwardProducts("/products", "GET");
    if (!result || result.status >= 500) {
      return NextResponse.json(
        { message: "O catálogo está temporariamente indisponível. Tente novamente em instantes." },
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }
    return NextResponse.json(result.payload, { status: result.status });
  } catch (error) {
    console.error("[Product Catalog] Could not load products:", error);
    return NextResponse.json(
      { message: "O catálogo está demorando a responder. Aguarde um pouco e tente novamente." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}

// Demo changes must never reach the real database, even with a forged cookie.
export async function POST() {
  return NextResponse.json({ message: "Demo writes are browser-local only" }, { status: 403 });
}
