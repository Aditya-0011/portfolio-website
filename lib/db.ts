import { MongoClient } from "mongodb";

export async function conn() {
  return await MongoClient.connect(process.env.DB_URL as string);
}
