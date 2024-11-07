import db from "@/lib/db";
import { User } from "@prisma/client";

export async function createUser(data: User) {
  try {
    const user = await db.user.create({ data });
    return { user };
  } catch (error) {
    return { error };
  }
}
