import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
let isConnecting = false;

export async function conn(): Promise<MongoClient> {
  if (isConnecting) {
    while (isConnecting) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (client) {
      return client;
    }
  }

  if (client) {
    try {
      await client.db().admin().ping();
      return client;
    } catch (error) {
      console.log("Reconnecting to MongoDB");
      client = null;
    }
  }

  isConnecting = true;

  try {
    const uri = process.env.DB_URL;
    if (!uri) {
      throw new Error("DB_URL environment variable is not set");
    }

    client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    await client.connect();

    await client.db().admin().ping();

    return client;
  } catch (error) {
    client = null;
    throw new Error(`Failed to connect to MongoDB: ${error}`);
  } finally {
    isConnecting = false;
  }
}
