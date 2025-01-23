import { conn } from "@/lib/db";
import { Technology } from "@/types/project";

export default async function getTechnologies(): Promise<Technology[]> {
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
