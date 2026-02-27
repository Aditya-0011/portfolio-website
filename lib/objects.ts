import { z } from "zod";
import { formOptions } from "@tanstack/react-form-nextjs";

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

type User = {
  name: string;
  email: string;
};

export type DbMessages = User & { messages: string[]; count: number };

export const messageFormOptions = formOptions({
  defaultValues: {
    name: "",
    email: "",
    message: "",
  },
});

export const UserDetailsSchema = z.object({
  about: z.string().trim(),
  coverImage: z.url(),
});
export type UserDetails = z.infer<typeof UserDetailsSchema>;

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

const TechnologyCategorySchema = z.union(
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

const TechnologySchema = z.object({
  _id: z.string(),
  name: z.string(),
  imageUrl: z.url(),
  fallbackImageUrl: z.url(),
  category: TechnologyCategorySchema,
});
export type Technology = z.infer<typeof TechnologySchema>;

const TechnologySummarySchema = z.object({
  _id: z.string(),
  name: z.string(),
  imageUrl: z.url(),
  fallbackImageUrl: z.url(),
});

export const ProjectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.url(),
  projectUrl: z.url().optional(),
  githubUrl: z.url().optional(),
  technologies: z.array(TechnologySummarySchema).optional(),
  featured: z.boolean(),
});
export type Project = z.infer<typeof ProjectSchema>;

const ProjectSummarySchema = z.object({
  _id: z.string(),
  name: z.string(),
});

const PositionSchema = z.object({
  role: z.string(),
  start: z.string(),
  end: z.string().optional(),
  workDone: z.string(),
  projects: z.array(ProjectSummarySchema).optional(),
});

const ExperienceSchema = z.object({
  _id: z.string(),
  company: z.string(),
  start: z.string(),
  end: z.string().optional(),
  tenure: z.string(),
  positions: z.array(PositionSchema),
  technologies: z.array(TechnologySummarySchema),
});
export type Experience = z.infer<typeof ExperienceSchema>;
