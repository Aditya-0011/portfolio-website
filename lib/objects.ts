import { z } from "zod";

import { MESSAGE_LIMITS } from "@/lib/message";

export { MESSAGE_LIMITS, messageFormOptions } from "@/lib/message";

export const SimpleResponseSchema = z.object({
  message: z.string().trim().default(""),
});
export type SimpleResponse = z.infer<typeof SimpleResponseSchema>;

export const MessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { error: "Name must be at least 3 characters." })
    .max(MESSAGE_LIMITS.name, {
      error: `Name must be at most ${MESSAGE_LIMITS.name} characters.`,
    }),
  email: z.email({ error: "Invalid email address" }).max(MESSAGE_LIMITS.email, {
    error: `Email must be at most ${MESSAGE_LIMITS.email} characters.`,
  }),
  message: z
    .string()
    .trim()
    .min(3, { error: "Message must be at least 3 characters." })
    .max(MESSAGE_LIMITS.message, {
      error: `Message must be at most ${MESSAGE_LIMITS.message} characters.`,
    }),
});
export type Message = z.infer<typeof MessageSchema>;

export type ActionResult = { status: number; message: string[] };

const httpUrl = z.url({ protocol: /^https?$/ });
const optionalLink = httpUrl.optional().catch(undefined);

export const UserDetailsResponseSchema = z.object({
  about: z.string().trim().default(""),
  cover_image: httpUrl,
});
export type UserDetailsResponse = z.infer<typeof UserDetailsResponseSchema>;

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

export const TechnologyCategorySchema = z
  .union(
    [
      z.literal(TechnologyCategory.Invalid),
      z.literal(TechnologyCategory.Frontend),
      z.literal(TechnologyCategory.Backend),
      z.literal(TechnologyCategory.Db),
      z.literal(TechnologyCategory.Language),
      z.literal(TechnologyCategory.Tool),
      z.literal(TechnologyCategory.Academics),
      z.literal(TechnologyCategory.None),
    ],
    { error: "Invalid technology category" },
  )
  .default(TechnologyCategory.Invalid);

const TechnologySummarySchema = z.object({
  id: z.number(),
  name: z.string().default(""),
  image_url: httpUrl,
  fallback_image_url: httpUrl,
});
export type TechnologySummary = z.infer<typeof TechnologySummarySchema>;

export const TechnologySchema = TechnologySummarySchema.extend({
  category: TechnologyCategorySchema,
});
export type Technology = z.infer<typeof TechnologySchema>;

export const TechnologiesResponseSchema = z.object({
  technologies: z.array(TechnologySchema).default([]),
});
export type TechnologiesResponse = z.infer<typeof TechnologiesResponseSchema>;

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string().default(""),
  description: z.string().default(""),
  image_url: httpUrl,
  project_url: optionalLink,
  github_url: optionalLink,
  technologies: z.array(TechnologySummarySchema).default([]),
  featured: z.boolean().default(false),
});
export type Project = z.infer<typeof ProjectSchema>;

const ProjectSummarySchema = z.object({
  id: z.number(),
  name: z.string().default(""),
});

export const ProjectsResponseSchema = z.object({
  projects: z.array(ProjectSchema).default([]),
});
export type ProjectsResponse = z.infer<typeof ProjectsResponseSchema>;

const PositionSchema = z.object({
  role: z.string().default(""),
  start: z.string().default(""),
  end: z.string().optional(),
  work_done: z.string().default(""),
  projects: z.array(ProjectSummarySchema).default([]),
});

export const ExperienceSchema = z.object({
  id: z.number(),
  company: z.string().default(""),
  start: z.string().default(""),
  end: z.string().optional(),
  tenure: z.string().default(""),
  positions: z.array(PositionSchema).default([]),
  technologies: z.array(TechnologySummarySchema).default([]),
});
export type Experience = z.infer<typeof ExperienceSchema>;

export const ExperiencesResponseSchema = z.object({
  experiences: z.array(ExperienceSchema).default([]),
});
export type ExperiencesResponse = z.infer<typeof ExperiencesResponseSchema>;

export class GatewayError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "GatewayError";
    this.status = status;
  }
}
