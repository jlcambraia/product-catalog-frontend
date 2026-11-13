import "server-only";
import { cookies } from "next/headers";

// Public demo credentials intentionally grant access only to browser-local changes.
// All backend write proxy routes remain disabled in demo mode.
export const COOKIE_NAME = "product_catalog_demo";
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 2,
};
export async function isAdmin() {
  return (await cookies()).get(COOKIE_NAME)?.value === "demo";
}
