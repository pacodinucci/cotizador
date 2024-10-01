import db from "@/lib/db";
import { NextResponse } from "next/server";

interface Price {
  code: string;
  title: string;
  zone: string;
  price: number;
  smallZone: boolean;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const { prices } = body;
    console.log("prices --> ", prices);

    if (!prices || prices.length === 0) {
      return new NextResponse("No prices provided.", { status: 400 });
    }

    console.log("PRICES -> ", prices);

    // Separar los códigos de los precios
    const codes = prices.map((price: Price) => price.code);

    // Obtener los registros que ya existen en la base de datos basados en los códigos
    const existingPrices = await db.prices.findMany({
      where: {
        code: {
          in: codes,
        },
      },
    });

    const existingCodes = existingPrices.map((price) => price.code);

    // Arrays para almacenar las operaciones
    const newPrices = prices.filter(
      (price: Price) => !existingCodes.includes(price.code)
    );
    const updatedPrices = prices.filter((price: Price) =>
      existingCodes.includes(price.code)
    );

    // Crear nuevos precios
    if (newPrices.length > 0) {
      await db.prices.createMany({
        data: newPrices,
      });
    }

    // Actualizar los precios existentes
    for (const price of updatedPrices) {
      await db.prices.update({
        where: { code: price.code },
        data: price,
      });
    }

    return NextResponse.json(
      {
        message: "Prices processed successfully.",
        created: newPrices.length,
        updated: updatedPrices.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[PRICES_BATCH_CREATE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const prices = await db.prices.findMany();
    return NextResponse.json(prices);
  } catch (error) {
    console.error("[PRICES_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("ID es requerido", { status: 400 });
    }

    await db.prices.delete({
      where: { id },
    });

    return new NextResponse("Registro eliminado exitosamente", { status: 200 });
  } catch (error) {
    console.error("[PRICES_DELETE]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
