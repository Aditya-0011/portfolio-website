import "server-only";
import { Document } from "mongodb";

import { conn } from "@/lib/mongo";
import { Project } from "@/lib/objects";

interface Props {
  featured: boolean;
}

export async function getProjects({ featured }: Props): Promise<Project[]> {
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
        ],
        as: "technologies",
      },
    },
  ];

  if (featured) {
    pipeline.unshift({ $match: { featured: true } });
  }

  const projects = await client
    .db(process.env.DB_NAME as string)
    .collection<Project>("projects")
    .aggregate(pipeline)
    .toArray();

  return projects as Project[];
}
