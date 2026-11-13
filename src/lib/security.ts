import "server-only";
import { NextRequest, NextResponse } from "next/server";
export function validWriteOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expected = new URL(request.url).origin;
  if (!origin || origin !== expected) return false;
  const type = request.headers.get("content-type") ?? "";
  return type.startsWith("application/json");
}
export const forbidden = () => NextResponse.json({ message: "Forbidden request origin or content type" }, { status: 403 });
export const unauthorized = () => NextResponse.json({ message: "Authentication required" }, { status: 401 });
