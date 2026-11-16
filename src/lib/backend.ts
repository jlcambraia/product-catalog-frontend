import "server-only";

const API_TIMEOUT_MS = 55_000;

export class BackendUnavailableError extends Error {
  constructor(message = "O catálogo está temporariamente indisponível.") {
    super(message);
    this.name = "BackendUnavailableError";
  }
}

const baseUrl = () => {
  const url = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_MAINAPI_BASE_URL;
  if (!url) throw new BackendUnavailableError("A origem da API não está configurada.");
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new BackendUnavailableError("A origem da API é inválida.");
  }
  if (!["https:", "http:"].includes(parsed.protocol)) {
    throw new BackendUnavailableError("A origem da API deve usar HTTP ou HTTPS.");
  }
  return parsed.toString().replace(/\/$/, "");
};

export async function forwardProducts(
  path: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: unknown
) {
  const secret = process.env.INTERNAL_API_KEY;
  if (method !== "GET" && !secret) throw new Error("INTERNAL_API_KEY is required");

  let response: Response;
  try {
    response = await fetch(`${baseUrl()}${path}`, {
      method,
      cache: "no-store",
      headers: method !== "GET"
        ? { "X-Internal-API-Key": secret!, "Content-Type": "application/json" }
        : {},
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof BackendUnavailableError) throw error;
    // Keep the underlying failure for server logs, but never leak hosting details to visitors.
    console.error("[Product Catalog] API request failed:", error);
    throw new BackendUnavailableError();
  }

  const text = await response.text();
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new BackendUnavailableError("A API retornou uma resposta inválida.");
  }
  return { status: response.status, payload };
}
