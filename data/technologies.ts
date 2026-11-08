import "server-only";

import { cacheLife } from "next/cache";

import { gatewayGet } from "@/lib/gateway";
import { collator } from "@/lib/utils";
import {
  TechnologiesResponseSchema,
  TechnologyCategory,
  type TechnologiesResponse,
} from "@/lib/objects";

export async function GetTechnologies(): Promise<TechnologiesResponse> {
  "use cache";
  cacheLife("default");

  const { technologies } = await gatewayGet(
    "/technology/list",
    TechnologiesResponseSchema,
  );

  return {
    technologies: technologies
      .filter(
        (tech) =>
          tech.category !== TechnologyCategory.None &&
          tech.category !== TechnologyCategory.Invalid,
      )
      .toSorted((a, b) => collator.compare(a.name, b.name)),
  };
}
