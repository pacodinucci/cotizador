import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { directionId: string } }
) {
  try {
    const { directionId } = params;
    const body = await req.json();

    if (!directionId) {
      return new NextResponse("Invalid direction ID", { status: 400 });
    }

    const direction = await db.directions.findFirst({
      where: {
        id: directionId,
      },
    });

    if (!direction) {
      return new NextResponse("Direction not found", { status: 404 });
    }

    const updatedDirection = await db.directions.update({
      where: {
        id: directionId,
      },
      data: {
        name: body.name || direction.name,
        content: body.content || direction.content,
      },
    });

    return NextResponse.json(updatedDirection);
  } catch (error) {
    console.error("[DIRECTION_UPDATE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { directionId: string } }
) {
  try {
    const { directionId } = params;

    if (!directionId) {
      return new NextResponse("Invalid direction ID", { status: 400 });
    }

    const direction = await db.directions.findFirst({
      where: { id: directionId },
    });

    if (!direction) {
      return new NextResponse("Direction not found", { status: 404 });
    }

    await db.directions.delete({
      where: { id: directionId },
    });

    return new NextResponse("Direction deleted successfully", { status: 200 });
  } catch (error) {
    console.error("[DIRECTION_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
