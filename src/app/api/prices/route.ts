import db from "@/lib/db";
import { NextResponse } from "next/server";

interface Price {
  code: string;
  title: string;
  zone: string;
  price: number;
  smallZone: boolean;
  mainZone: boolean;
  order?: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prices } = body;

    if (!prices || prices.length === 0) {
      return new NextResponse("No prices provided.", { status: 400 });
    }

    // Separar los códigos de los precios
    const codes = prices.map((price: Price) => price.code);

    // Obtener los registros que ya existen en la base de datos basados en los códigos
    const existingPrices = await db.zone.findMany({
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

    // Obtener el valor más alto de "order" existente para las zonas principales
    const maxOrder = await db.zone.findFirst({
      where: {
        mainZone: true,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    let nextOrder =
      maxOrder && maxOrder.order !== null ? maxOrder.order + 1 : 1; // Iniciar el order en 1 si no existe ningún valor previo.

    // Crear nuevos precios con la lógica de orden
    if (newPrices.length > 0) {
      const pricesToCreate = newPrices.map((price: Price) => {
        if (price.mainZone) {
          price.order = nextOrder;
          nextOrder++;
        } else {
          price.order = undefined;
        }
        return price;
      });

      await db.zone.createMany({
        data: pricesToCreate,
      });
    }

    // Actualizar los precios existentes
    for (const price of updatedPrices) {
      // Asignar order solo si es zona principal
      if (price.mainZone && !price.order) {
        price.order = nextOrder;
        nextOrder++;
      }

      await db.zone.update({
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
    const prices = await db.zone.findMany();
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

    await db.zone.delete({
      where: { id },
    });

    return new NextResponse("Registro eliminado exitosamente", { status: 200 });
  } catch (error) {
    console.error("[PRICES_DELETE]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
