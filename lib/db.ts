import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export async function conn() {
  if (!client) {
    client = await MongoClient.connect(process.env.DB_URL as string);
  }
  return client;
}
