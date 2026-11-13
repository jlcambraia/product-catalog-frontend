import "server-only";
const baseUrl = () => {
  const url = process.env.BACKEND_API_URL;
  if (!url) throw new Error("BACKEND_API_URL is required");
  return url.replace(/\/$/, "");
};
export async function forwardProducts(path: string, method: "GET" | "POST" | "PATCH" | "DELETE", body?: unknown) {
  const secret = process.env.INTERNAL_API_KEY;
  if (method !== "GET" && !secret) throw new Error("INTERNAL_API_KEY is required");
  const response = await fetch(`${baseUrl()}${path}`, {
    method, cache: "no-store",
    headers: {
      ...(method !== "GET" ? { "X-Internal-API-Key": secret!, "Content-Type": "application/json" } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(25000),
  });
  const text = await response.text();
  let payload: unknown;
  try { payload = JSON.parse(text); } catch { payload = { message: "Invalid upstream response" }; }
  return { status: response.status, payload };
}
