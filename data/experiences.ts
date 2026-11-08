import "server-only";

import { cacheLife } from "next/cache";

import { gatewayGet } from "@/lib/gateway";
import { collator } from "@/lib/utils";
import {
  ExperiencesResponseSchema,
  type ExperiencesResponse,
} from "@/lib/objects";

const byName = (a: { name: string }, b: { name: string }) =>
  collator.compare(a.name, b.name);

export async function GetExperiences(): Promise<ExperiencesResponse> {
  "use cache";
  cacheLife("default");

  const { experiences } = await gatewayGet(
    "/experience/list",
    ExperiencesResponseSchema,
  );

  return {
    experiences: experiences.map((experience) => ({
      ...experience,
      positions: experience.positions.map((position) => ({
        ...position,
        projects: position.projects.toSorted(byName),
      })),
      technologies: experience.technologies.toSorted(byName),
    })),
  };
}
