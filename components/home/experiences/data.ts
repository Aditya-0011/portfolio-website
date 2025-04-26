import { conn } from "@/lib/mongo";
import { Experience } from "@/lib/objects";

export default async function getExperiences(): Promise<Experience[]> {
  const client = await conn();
  if (!client) {
    throw new Error("Database connection failed");
  }

  return await client
    .db(process.env.DB_NAME as string)
    .collection<Experience>("experiences")
    .find()
    .sort({ start: -1 })
    .toArray();
}
