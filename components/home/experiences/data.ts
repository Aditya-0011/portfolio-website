import "server-only";
import { Document } from "mongodb";

import { conn } from "@/lib/mongo";
import { Experience } from "@/lib/objects";

export default async function getExperiences(): Promise<Experience[]> {
  const client = await conn();
  if (!client) {
    throw new Error("Database connection failed");
  }

  const pipeline: Document[] = [
    {
      $lookup: {
        from: "technologies",
        let: { techIds: "$technologies" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$_id", "$$techIds"] },
            },
          },
          {
            $sort: { name: 1 },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              //imageUrl: 1,
            },
          },
        ],
        as: "technologies",
      },
    },
    {
      $lookup: {
        from: "projects",
        let: { projectIds: "$projects" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$_id", "$$projectIds"] },
            },
          },
          {
            $sort: { name: 1 },
          },
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
        as: "projects",
      },
    },
  ];

  const exp = await client
    .db(process.env.DB_NAME as string)
    .collection<Experience>("experiences")
    .aggregate(pipeline)
    .sort({ start: 1 })
    .toArray();

  return exp as Experience[];
}
