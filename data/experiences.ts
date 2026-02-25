import "server-only";

import { mongo } from "@/lib/mongo";
import { type Experience } from "@/lib/objects";

export async function GetExperiences(): Promise<Experience[]> {
  const collection = mongo.experience();

  const data = await collection
    .find({}, { projection: { updatedAt: 0 } })
    .sort({ start: -1 })
    .toArray();

  return data.map((experience) => ({
    ...experience,
    _id: experience._id.toString(),
    positions: experience.positions.map((position) => ({
      ...position,
      projects: position.projects?.map((project) => ({
        ...project,
        _id: project._id.toString(),
      })),
    })),
    technologies: experience.technologies.map((technology) => ({
      ...technology,
      _id: technology._id.toString(),
    })),
  }));
}
