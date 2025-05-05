import "server-only";

import { conn } from "@/lib/mongo";
import { Technology } from "@/lib/objects";

export async function getTechnologies(): Promise<Technology[]> {
  const client = await conn();
  if (!client) {
    throw new Error("Database connection failed");
  }

  return await client
    .db(process.env.DB_NAME as string)
    .collection<Technology>("technologies")
    .find({ category: { $ne: "no" } })
    .sort({ name: 1 })
    .toArray();
}
