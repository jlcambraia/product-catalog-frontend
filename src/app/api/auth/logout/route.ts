import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, cookieOptions } from "@/lib/auth";
import { forbidden, validWriteOrigin } from "@/lib/security";
export async function POST(req: NextRequest) {
  if (!validWriteOrigin(req)) return forbidden();
  const res = NextResponse.json({ authenticated: false });
  res.cookies.set(COOKIE_NAME, "", { ...cookieOptions, maxAge: 0 });
  return res;
}
