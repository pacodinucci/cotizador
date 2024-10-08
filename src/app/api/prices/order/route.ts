import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, newOrder } = body;

    if (!id || newOrder === undefined) {
      return new NextResponse("ID and newOrder are required.", { status: 400 });
    }

    // Obtener el registro actual por su id
    const currentZone = await db.zone.findUnique({
      where: { id },
    });

    if (!currentZone) {
      return new NextResponse("Zone not found.", { status: 404 });
    }

    const currentOrder = currentZone.order;

    if (currentOrder === null || currentOrder === undefined) {
      return new NextResponse("Current order is undefined or null.", {
        status: 400,
      });
    }

    // Si el nuevo order es mayor que el actual, movemos hacia arriba los registros intermedios
    if (newOrder > currentOrder) {
      await db.zone.updateMany({
        where: {
          order: {
            gte: currentOrder + 1,
            lte: newOrder,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });
    }
    // Si el nuevo order es menor que el actual, movemos hacia abajo los registros intermedios
    else if (newOrder < currentOrder) {
      await db.zone.updateMany({
        where: {
          order: {
            gte: newOrder,
            lte: currentOrder - 1,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    }

    // Actualizar el registro que está cambiando de orden
    await db.zone.update({
      where: { id },
      data: { order: newOrder },
    });

    return new NextResponse("Order updated successfully.", { status: 200 });
  } catch (error) {
    console.error("[ORDER_UPDATE_ERROR]", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
