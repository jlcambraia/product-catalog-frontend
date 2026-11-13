import { NextResponse } from "next/server";
export async function DELETE() {
  return NextResponse.json({ message: "Demo writes are browser-local only" }, { status: 403 });
}
