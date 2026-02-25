import "server-only";

import { mongo } from "@/lib/mongo";
import { type Project } from "@/lib/objects";

type Props = {
  Featured?: boolean;
};

export async function GetProjects({
  Featured = false,
}: Props): Promise<Project[]> {
  const collection = mongo.project();

  const query = Featured ? { featured: true } : {};

  const data = await collection
    .find(query, { projection: { updatedAt: 0 } })
    .toArray();

  const projects = data.map((project) => ({
    ...project,
    _id: project._id.toString(),
    technologies: project.technologies?.map((technology) => ({
      ...technology,
      _id: technology._id.toString(),
    })),
  }));

  const githubIndex = projects.findIndex((p) => p.name === "My GitHub");

  if (githubIndex !== -1) {
    const [githubProject] = projects.splice(githubIndex, 1);
    projects.push(githubProject);
  }

  return projects;
}
