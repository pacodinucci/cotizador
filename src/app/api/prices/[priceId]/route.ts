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

    console.log("BODY -> ", body);

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
        title: body.prices[0].title || existingPrice.title,
        code: body.prices[0].code || existingPrice.code,
        zone: body.prices[0].zone || existingPrice.zone,
        price:
          body.prices[0].price !== undefined
            ? body.prices[0].price
            : existingPrice.price,
        smallZone:
          body.prices[0].smallZone !== undefined
            ? body.smallZone
            : existingPrice.smallZone,
      },
    });

    console.log(updatedPrice);

    return NextResponse.json(updatedPrice);
  } catch (error) {
    console.error("[PRICE_UPDATE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
