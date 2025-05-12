import db from "@/lib/db";
import { NextResponse } from "next/server";

interface TreatmentInput {
  name: string;
  description?: string;
  requiresConsult?: boolean;
  modules: number;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TreatmentInput;

    if (!body.name) {
      return NextResponse.json(
        { error: "El nombre del tratamiento es requerido." },
        { status: 400 }
      );
    }

    const treatment = await db.treatment.create({
      data: {
        name: body.name,
        description: body.description ?? null,
        requiresConsult: body.requiresConsult ?? false,
        modules: body.modules ?? null,
      },
    });

    return NextResponse.json(treatment, { status: 201 });
  } catch (error) {
    console.error("❌ Error al crear tratamiento:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
