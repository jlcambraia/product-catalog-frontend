import "server-only";

const baseUrl = () => {
  // Legacy deployment compatibility: previous Vercel projects used this variable.
  const url = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_MAINAPI_BASE_URL;
  if (!url) throw new Error("Configure BACKEND_API_URL in Vercel (backend Render URL)");
  const parsed = new URL(url);
  if (!["https:", "http:"].includes(parsed.protocol)) throw new Error("Invalid backend URL protocol");
  return parsed.toString().replace(/\/$/, "");
};

export async function forwardProducts(path: string, method: "GET" | "POST" | "PATCH" | "DELETE", body?: unknown) {
  const secret = process.env.INTERNAL_API_KEY;
  if (method !== "GET" && !secret) throw new Error("INTERNAL_API_KEY is required");
  const response = await fetch(`${baseUrl()}${path}`, {
    method,
    cache: "no-store",
    headers: method !== "GET" ? { "X-Internal-API-Key": secret!, "Content-Type": "application/json" } : {},
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(25000),
  });
  const text = await response.text();
  let payload: unknown;
  try { payload = JSON.parse(text); } catch { payload = { message: "Invalid upstream response" }; }
  return { status: response.status, payload };
}
