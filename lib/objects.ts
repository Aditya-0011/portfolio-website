import { z } from "zod";
import { formOptions } from "@tanstack/react-form-nextjs";

export const SimpleResponseSchema = z.object({
  message: z.string().trim(),
});
export type SimpleResponse = z.infer<typeof SimpleResponseSchema>;

export const MessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { error: "Name must be at least 3 characters." }),
  email: z.email({ error: "Invalid email address" }),
  message: z
    .string()
    .trim()
    .min(3, { error: "Message must be at least 3 characters." }),
});
export type Message = z.infer<typeof MessageSchema>;

export const messageFormOptions = formOptions({
  defaultValues: {
    name: "",
    email: "",
    message: "",
  },
});

export const UserDetailsResponseSchema = z.object({
  about: z.string().trim(),
  cover_image: z.url(),
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

export const TechnologyCategorySchema = z.union(
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
);

export const TechnologySchema = z.object({
  id: z.number(),
  name: z.string(),
  image_url: z.url(),
  fallback_image_url: z.url(),
  category: TechnologyCategorySchema,
});
export type Technology = z.infer<typeof TechnologySchema>;

const TechnologySummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  image_url: z.url(),
  fallback_image_url: z.url(),
});
export type TechnologySummary = z.infer<typeof TechnologySummarySchema>;

export const TechnologiesResponseSchema = z.object({
  technologies: z.array(TechnologySchema),
});
export type TechnologiesResponse = z.infer<typeof TechnologiesResponseSchema>;

export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image_url: z.url(),
  project_url: z.url().optional(),
  github_url: z.url().optional(),
  technologies: z.array(TechnologySummarySchema).optional(),
  featured: z.boolean(),
});
export type Project = z.infer<typeof ProjectSchema>;

const ProjectSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const ProjectsResponseSchema = z.object({
  projects: z.array(ProjectSchema),
});
export type ProjectsResponse = z.infer<typeof ProjectsResponseSchema>;

const PositionSchema = z.object({
  role: z.string(),
  start: z.string(),
  end: z.string().optional(),
  work_done: z.string(),
  projects: z.array(ProjectSummarySchema).optional(),
});

export const ExperienceSchema = z.object({
  id: z.number(),
  company: z.string(),
  start: z.string(),
  end: z.string().optional(),
  tenure: z.string(),
  positions: z.array(PositionSchema),
  technologies: z.array(TechnologySummarySchema),
});
export type Experience = z.infer<typeof ExperienceSchema>;

export const ExperiencesResponseSchema = z.object({
  experiences: z.array(ExperienceSchema),
});
export type ExperiencesResponse = z.infer<typeof ExperiencesResponseSchema>;

export class FetchError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
