import * as v from "valibot";

import { type Message } from "@/lib/message";

export { MESSAGE_LIMITS, MessageSchema, type Message } from "@/lib/message";

const textOrEmpty = v.optional(v.string(), "");
const trimmedTextOrEmpty = v.optional(v.pipe(v.string(), v.trim()), "");

export const SimpleResponseSchema = v.object({
  message: trimmedTextOrEmpty,
});
export type SimpleResponse = v.InferOutput<typeof SimpleResponseSchema>;

export type ActionResult = {
  status: number;
  message: string[];
  fieldErrors?: Partial<Record<keyof Message, [string, ...string[]]>>;
};

const httpUrl = v.pipe(v.string(), v.url(), v.regex(/^https?:\/\//i));
const optionalLink = v.fallback(v.optional(httpUrl), undefined);

export const ChatConfigSchema = v.object({
  chat_model: v.optional(v.string(), ""),
});

export const UserDetailsResponseSchema = v.object({
  about: trimmedTextOrEmpty,
  cover_image: httpUrl,
});
export type UserDetailsResponse = v.InferOutput<
  typeof UserDetailsResponseSchema
>;

export const TechnologyCategory = {
  Invalid: 0,
  Frontend: 1,
  Backend: 2,
  Db: 3,
  Language: 4,
  Tool: 5,
  Academics: 6,
  None: 7,
} as const;

export type TechnologyCategory =
  (typeof TechnologyCategory)[keyof typeof TechnologyCategory];

export const TechnologyCategorySchema = v.optional(
  v.picklist(
    [
      TechnologyCategory.Invalid,
      TechnologyCategory.Frontend,
      TechnologyCategory.Backend,
      TechnologyCategory.Db,
      TechnologyCategory.Language,
      TechnologyCategory.Tool,
      TechnologyCategory.Academics,
      TechnologyCategory.None,
    ],
    "Invalid technology category",
  ),
  TechnologyCategory.Invalid,
);

const TechnologySummarySchema = v.object({
  id: v.number(),
  name: textOrEmpty,
  image_url: httpUrl,
  fallback_image_url: httpUrl,
});
export type TechnologySummary = v.InferOutput<typeof TechnologySummarySchema>;

export const TechnologySchema = v.object({
  ...TechnologySummarySchema.entries,
  category: TechnologyCategorySchema,
});
export type Technology = v.InferOutput<typeof TechnologySchema>;

export const TechnologiesResponseSchema = v.object({
  technologies: v.optional(v.array(TechnologySchema), []),
});
export type TechnologiesResponse = v.InferOutput<
  typeof TechnologiesResponseSchema
>;

const technologySummaries = v.optional(v.array(TechnologySummarySchema), []);

export const ProjectSchema = v.object({
  id: v.number(),
  name: textOrEmpty,
  description: textOrEmpty,
  image_url: httpUrl,
  project_url: optionalLink,
  github_url: optionalLink,
  technologies: technologySummaries,
  featured: v.optional(v.boolean(), false),
});
export type Project = v.InferOutput<typeof ProjectSchema>;

const ProjectSummarySchema = v.object({
  id: v.number(),
  name: textOrEmpty,
});

export const ProjectsResponseSchema = v.object({
  projects: v.optional(v.array(ProjectSchema), []),
});
export type ProjectsResponse = v.InferOutput<typeof ProjectsResponseSchema>;

const PositionSchema = v.object({
  role: textOrEmpty,
  start: textOrEmpty,
  end: v.optional(v.string()),
  work_done: textOrEmpty,
  projects: v.optional(v.array(ProjectSummarySchema), []),
});

export const ExperienceSchema = v.object({
  id: v.number(),
  company: textOrEmpty,
  start: textOrEmpty,
  end: v.optional(v.string()),
  tenure: textOrEmpty,
  positions: v.optional(v.array(PositionSchema), []),
  technologies: technologySummaries,
});
export type Experience = v.InferOutput<typeof ExperienceSchema>;

export const ExperiencesResponseSchema = v.object({
  experiences: v.optional(v.array(ExperienceSchema), []),
});
export type ExperiencesResponse = v.InferOutput<
  typeof ExperiencesResponseSchema
>;

export class GatewayError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "GatewayError";
    this.status = status;
  }
}
