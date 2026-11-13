import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { COOKIE_NAME, cookieOptions, createSession, verifyAdmin } from "@/lib/auth";
import { forbidden, validWriteOrigin } from "@/lib/security";

export async function POST(req: NextRequest) {
  if (!validWriteOrigin(req)) return forbidden();
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ message: "Login temporarily unavailable" }, { status: 503 });
  }
  const limiter = new Ratelimit({
    redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(5, "15 m"), prefix: "catalog-admin-login",
  });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  try {
    const { success } = await limiter.limit(ip);
    if (!success) return NextResponse.json({ message: "Too many attempts" }, { status: 429 });
    const data = await req.json();
    if (typeof data.username !== "string" || typeof data.password !== "string" ||
        data.username.length > 128 || data.password.length > 256) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    if (!await verifyAdmin(data.username, data.password)) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    const res = NextResponse.json({ authenticated: true });
    res.cookies.set(COOKIE_NAME, await createSession(), cookieOptions);
    return res;
  } catch (err) {
    console.error("Admin login failed", err);
    return NextResponse.json({ message: "Login temporarily unavailable" }, { status: 503 });
  }
}
