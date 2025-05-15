import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerId, ...rest } = body;

    if (!customerId) {
      return NextResponse.json(
        { error: "Falta el customerId." },
        { status: 400 }
      );
    }

    const medicalRecord = await db.medicalRecord.create({
      data: {
        customerId,
        ...rest,
      },
    });

    return NextResponse.json(medicalRecord, { status: 201 });
  } catch (error) {
    console.error("[MEDICAL_RECORD_POST]", error);
    return NextResponse.json(
      { error: "Error al crear el registro médico." },
      { status: 500 }
    );
  }
}
