import { Document } from "mongodb";

import { conn } from "@/lib/db";
import { Project } from "@/types/project";

interface Props {
  featured: boolean;
}

export default async function getProjects({
  featured,
}: Props): Promise<Project[]> {
  const client = await conn();
  if (!client) {
    throw new Error("Database connection failed");
  }

  const pipeline: Document[] = [
    {
      $lookup: {
        from: "technologies",
        localField: "technologies",
        foreignField: "_id",
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
