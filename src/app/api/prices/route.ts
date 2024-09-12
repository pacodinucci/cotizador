import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prices } = body;

    if (!prices || prices.length === 0) {
      return new NextResponse("No prices provided.", { status: 400 });
    }

    const createdPrices = await db.prices.createMany({
      data: prices,
    });

    return NextResponse.json(createdPrices, { status: 201 });
  } catch (error) {
    console.error("[PRICES_BATCH_CREATE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
