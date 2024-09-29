import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { priceId: string } }
) {
  try {
    const { priceId } = params;

    if (!priceId) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const price = await db.prices.findFirst({
      where: { id: priceId },
    });

    if (!price) {
      return new NextResponse("Price not found", { status: 404 });
    }

    return NextResponse.json(price);
  } catch (error) {
    console.error("[PRICE_GET_BY_ID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { priceId: string } }
) {
  try {
    const { priceId } = params;
    const body = await req.json();

    if (!priceId) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const existingPrice = await db.prices.findFirst({
      where: { id: priceId },
    });

    if (!existingPrice) {
      return new NextResponse("Price not found", { status: 404 });
    }

    const updatedPrice = await db.prices.update({
      where: { id: priceId },
      data: {
        title: body.title || existingPrice.title,
        code: body.code || existingPrice.code,
        zone: body.zone || existingPrice.zone,
        price: body.price !== undefined ? body.price : existingPrice.price,
        smallZone:
          body.smallZone !== undefined
            ? body.smallZone
            : existingPrice.smallZone,
      },
    });

    return NextResponse.json(updatedPrice);
  } catch (error) {
    console.error("[PRICE_UPDATE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
