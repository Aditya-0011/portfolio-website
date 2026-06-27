import "server-only";

import { cacheLife } from "next/cache";

import { env } from "@/lib/env";
import { collator } from "@/lib/utils";

import { TechnologyCategory, type TechnologiesResponse } from "@/lib/objects";

export async function GetTechnologies(): Promise<TechnologiesResponse> {
  "use cache";
  cacheLife("default");
  const response = await fetch(`${env.MANAGER_BACKEND_URL}/technology/list`, {
    method: "GET",
    headers: {
      "X-API-KEY": env.API_KEY,
    },
  });

  if (response.status === 429) {
    throw new Error(
      "Rate limit reached. Retaining stale cache for technologies.",
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
      `${env.MANAGER_BACKEND_URL}/technology/list`,
      "API_KEY starts with:",
      env.API_KEY.substring(0, 5),
    );
    throw new Error(
      `Failed to fetch technologies: ${response.status} ${errText}`,
    );
  }

  const { technologies }: TechnologiesResponse = await response.json();

  return {
    technologies: technologies
      .filter(
        (tech) =>
          tech.category !== TechnologyCategory.None &&
          tech.category !== TechnologyCategory.Invalid,
      )
      .sort((a, b) => collator.compare(a.name, b.name)),
  };
}
