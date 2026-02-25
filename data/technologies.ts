import "server-only";

import { mongo } from "@/lib/mongo";
import { TechnologyCategory, type Technology } from "@/lib/objects";

export async function GetTechnologies(): Promise<Technology[]> {
  const collection = mongo.technology();
  const data = await collection
    .find(
      { category: { $ne: TechnologyCategory.None } },
      { projection: { updatedAt: 0 } },
    )
    .sort({ name: 1 })
    .toArray();
  return data.map((technology) => ({
    ...technology,
    _id: technology._id.toString(),
  }));
}
