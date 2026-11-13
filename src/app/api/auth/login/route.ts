import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, cookieOptions } from "@/lib/auth";
import { forbidden, validWriteOrigin } from "@/lib/security";

export async function POST(req: NextRequest) {
  if (!validWriteOrigin(req)) return forbidden();
  let data: unknown;
  try { data = await req.json(); } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  if (!data || typeof data !== "object" || !("username" in data) || !("password" in data) ||
      data.username !== "demo" || data.password !== "catalogo-demo") {
    return NextResponse.json({ message: "Invalid demo credentials" }, { status: 401 });
  }
  const response = NextResponse.json({ authenticated: true, demo: true });
  response.cookies.set(COOKIE_NAME, "demo", cookieOptions);
  return response;
}
