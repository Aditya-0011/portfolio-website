import "server-only";

import { mongo } from "@/lib/mongo";
import { type UserDetails } from "@/lib/objects";

export async function GetUserDetails(): Promise<UserDetails> {
  const collection = mongo.user();
  return (await collection.findOne(
    {},
    {
      projection: { _id: 0, about: 1, coverImage: 1 },
    },
  ))!;
}
