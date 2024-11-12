import { signOut } from "../../../../../auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const response = await signOut();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error en signOut:", error);
    return NextResponse.json(
      {
        error: "Error al cerrar sesión",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
