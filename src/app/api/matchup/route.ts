import { NextResponse } from "next/server";
import { getMundoMatchup } from "@/lib/matchups";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const enemy = searchParams.get("enemy") ?? "Gwen";

  const data = getMundoMatchup(enemy);

  return NextResponse.json(data);
}
