import "server-only";

import { cacheLife } from "next/cache";

import { gatewayGet } from "@/lib/gateway";
import { collator } from "@/lib/utils";
import {
  ProjectsResponseSchema,
  type Project,
  type ProjectsResponse,
} from "@/lib/objects";

type Props = {
  Featured?: boolean;
};

const GITHUB_PROJECT_NAME = "My GitHub";

const withSortedTechnologies = (project: Project): Project => ({
  ...project,
  technologies: project.technologies.toSorted((a, b) =>
    collator.compare(a.name, b.name),
  ),
});

async function getAllProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("default");

  const { projects } = await gatewayGet(
    "/project/list",
    ProjectsResponseSchema,
  );
  return projects.toSorted((a, b) => a.id - b.id).map(withSortedTechnologies);
}

export async function GetProjects({
  Featured = false,
}: Props): Promise<ProjectsResponse> {
  const projects = await getAllProjects();

  if (Featured) {
    return { projects: projects.filter((p) => p.featured) };
  }

  return {
    projects: [
      ...projects.filter((p) => p.name !== GITHUB_PROJECT_NAME),
      ...projects.filter((p) => p.name === GITHUB_PROJECT_NAME),
    ],
  };
}
