import "server-only";

import { cacheLife } from "next/cache";

import { env } from "@/lib/env";
import { collator } from "@/lib/utils";

import { type ExperiencesResponse } from "@/lib/objects";

export async function GetExperiences(): Promise<ExperiencesResponse> {
  "use cache";
  cacheLife("default");
  const response = await fetch(`${env.MANAGER_BACKEND_URL}/experience/list`, {
    method: "GET",
    headers: {
      "X-API-KEY": env.API_KEY,
    },
  });

  if (response.status === 429) {
    throw new Error(
      "Rate limit reached. Retaining stale cache for experiences.",
    );
  }

  if (!response.ok) {
    const errText = await response.text();
    // eslint-disable-next-line no-console
    console.error(
      "Fetch failed:",
      response.status,
      errText,
      "URL:",
      `${env.MANAGER_BACKEND_URL}/experience/list`,
      "API_KEY starts with:",
      env.API_KEY.substring(0, 5),
    );
    throw new Error(
      `Failed to fetch experiences: ${response.status} ${errText}`,
    );
  }

  const { experiences }: ExperiencesResponse = await response.json();

  return {
    experiences: experiences.map((experience) => ({
      ...experience,
      positions: experience.positions.map((position) => ({
        ...position,
        projects: position.projects?.sort((a, b) =>
          collator.compare(a.name, b.name),
        ),
      })),
      technologies: experience.technologies?.sort((a, b) =>
        collator.compare(a.name, b.name),
      ),
    })),
  };
}
