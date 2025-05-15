import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { price, zones, smallZones, title } = body;

    if (
      !price ||
      !zones ||
      zones.length === 0 ||
      smallZones === undefined ||
      !title
    ) {
      return new NextResponse("All fields are required.", { status: 400 });
    }

    const combo = await db.combo.create({
      data: {
        title,
        price,
        smallZones,
      },
    });

    return NextResponse.json(combo, { status: 201 });
  } catch (error) {
    console.error("Error creating new combo.", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const comboId = searchParams.get("id");

    if (comboId) {
      const combo = await db.combo.findFirst({
        where: { id: comboId },
      });

      if (!combo) {
        return new NextResponse("Combo not found", { status: 404 });
      }

      return NextResponse.json(combo, { status: 200 });
    } else {
      const combos = await db.combo.findMany();

      return NextResponse.json(combos, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching combos.", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Id is required.", { status: 400 });
    }

    await db.combo.delete({
      where: { id },
    });

    return new NextResponse("Combo succesfully deleted", { status: 200 });
  } catch (error) {
    console.error("[COMBO_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
