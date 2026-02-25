import dns from "node:dns";

import { Collection, Document, MongoClient } from "mongodb";

import { env } from "@/lib/env";
import {
  type DbMessages,
  type UserDetails,
  type Technology,
  type Project,
  type Experience,
} from "@/lib/objects";

dns.setServers(["1.1.1.1"]);

class MongoDb {
  readonly #client: MongoClient;

  constructor() {
    this.#client = new MongoClient(env.MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
  }

  #collection<T extends Document = Document>(name: string): Collection<T> {
    return this.#client.db(env.MONGODB_DB).collection<T>(name);
  }

  message() {
    return this.#collection<DbMessages>("message");
  }

  user() {
    return this.#collection<UserDetails>("user");
  }

  technology() {
    return this.#collection<Technology>("technology");
  }

  project() {
    return this.#collection<Project>("project");
  }

  experience() {
    return this.#collection<Experience>("experience");
  }
}

const globalForMongo = globalThis as unknown as { mongo: MongoDb | undefined };
export const mongo = globalForMongo.mongo ?? new MongoDb();

if (process.env.ENV && process.env.ENV === "development") {
  globalForMongo.mongo = mongo;
}
