import "server-only";

import { cacheLife } from "next/cache";

import { env } from "@/lib/env";
import { collator } from "@/lib/utils";

import { type ProjectsResponse } from "@/lib/objects";

type Props = {
  Featured?: boolean;
};

export async function GetProjects({
  Featured = false,
}: Props): Promise<ProjectsResponse> {
  "use cache";
  cacheLife("default");
  const response = await fetch(`${env.MANAGER_BACKEND_URL}/project/list`, {
    method: "GET",
    headers: {
      "X-API-KEY": env.API_KEY,
    },
  });

  if (response.status === 429) {
    throw new Error("Rate limit reached. Retaining stale cache for projects.");
  }

  if (!response.ok) {
    const errText = await response.text();
    // eslint-disable-next-line no-console
    console.error(
      "Fetch failed:",
      response.status,
      errText,
      "URL:",
      `${env.MANAGER_BACKEND_URL}/project/list`,
      "API_KEY starts with:",
      env.API_KEY.substring(0, 5),
    );
    throw new Error(`Failed to fetch projects: ${response.status} ${errText}`);
  }

  const { projects }: ProjectsResponse = await response.json();

  if (Featured) {
    return {
      projects: projects
        .filter((p) => p.featured)
        .map((project) => ({
          ...project,
          technologies: project.technologies?.sort((a, b) =>
            collator.compare(a.name, b.name),
          ),
        })),
    };
  }

  const githubIndex = projects.findIndex((p) => p.name === "My GitHub");

  if (githubIndex !== -1) {
    const [githubProject] = projects.splice(githubIndex, 1);
    projects.push(githubProject);
  }

  return {
    projects: projects.map((project) => ({
      ...project,
      technologies: project.technologies?.sort((a, b) =>
        collator.compare(a.name, b.name),
      ),
    })),
  };
}
