import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { increasePercentage } = await req.json();

    if (!increasePercentage || typeof increasePercentage !== "number") {
      return new NextResponse("increasePercentage is required", {
        status: 400,
      });
    }

    // Obtener todas las zonas con precios actuales
    const zones = await db.zone.findMany({
      select: { id: true, price: true }, // Solo obtenemos los ids y los precios
    });

    // Verificar si hay zonas con precios
    if (zones.length === 0) {
      return new NextResponse("No hay zonas con precios para actualizar", {
        status: 400,
      });
    }

    // Actualizar los precios manualmente
    for (const zone of zones) {
      const increment = Math.round(zone.price * (increasePercentage / 100)); // Calcular el incremento y redondearlo
      const newPrice = zone.price + increment; // Sumar el incremento al precio actual

      // Actualizar el precio en la base de datos
      await db.zone.update({
        where: { id: zone.id },
        data: { price: newPrice },
      });
    }

    return NextResponse.json({ message: "Precios actualizados con éxito" });
  } catch (error) {
    console.error("[PATCH_PRICES_CHANGE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
