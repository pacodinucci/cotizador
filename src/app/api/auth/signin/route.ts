import type { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (!result || result.error) {
    return res
      .status(401)
      .json({ error: result?.error || "Error de autenticación" });
  }

  return res.status(200).json({ success: "Inicio de sesión exitoso" });
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
