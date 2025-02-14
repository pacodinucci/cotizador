import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, content } = body;

    if (!name || !content) {
      return NextResponse.json(
        { error: "El título y contenido de la orden son requeridos." },
        { status: 400 }
      );
    }

    const newDirection = await db.directions.create({
      data: { name, content },
    });

    return NextResponse.json(newDirection, { status: 201 });
  } catch (error) {
    console.error("Error creating new direction.", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const directions = await db.directions.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(directions, { status: 200 });
  } catch (error) {
    console.error("Error retrieving directions.", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
