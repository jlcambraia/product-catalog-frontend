import { NextResponse } from "next/server";
export async function PATCH() {
  return NextResponse.json({ message: "Demo writes are browser-local only" }, { status: 403 });
}
