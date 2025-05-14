import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      nickname,
      dni,
      gender,
      birthDate,
      address,
      province,
      neighborhood,
      city,
      nationality,
      profession,
      approach,
      approachContact,
      otherReason,
      medicalCoverage,
      medicalCoveragePlan,
      medicalCoverageNumber,
    } = body;

    if (!email || !name || !phone) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const newCustomer = await db.customer.create({
      data: {
        name,
        phone,
        email,
        nickname,
        dni,
        gender,
        birthDate: new Date(birthDate),
        address,
        province,
        neighborhood,
        city,
        nationality,
        profession,
        approach: approach.join(", "),
        approachContact,
        medicalCoverage,
        medicalCoveragePlan,
        medicalCoverageNumber,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("[CUSTOMER_POST]", error);
    return NextResponse.json(
      { error: "Error al crear el paciente." },
      { status: 500 }
    );
  }
}
