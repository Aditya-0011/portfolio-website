import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function conn(): Promise<Db> {
  if (db && client) {
    return db;
  }

  if (!client) {
    client = new MongoClient(process.env.DB_URL as string);
    await client.connect();
  }

  db = client.db(process.env.DB_NAME as string);

  return db;
}

export async function closeClient() {
  await client?.close();
  client = null;
}
