import { z } from "zod";

interface User {
  email: string;
  name: string;
}

export interface UserMessage extends User {
  message: string;
}

export interface DbMessage extends User {
  message: string[];
  count: number;
}

export type Category =
  | "frontend"
  | "backend"
  | "db"
  | "lang"
  | "tool"
  | "acad"
  | "no";

export interface TechnologyMetadata {
  _id: string;
  name: string;
  imageUrl: string;
}

export interface Technology extends TechnologyMetadata {
  category: Category;
}

export interface ProjectMetadata {
  _id: string;
  name: string;
}

export interface Project extends ProjectMetadata {
  description: string;
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies?: TechnologyMetadata[];
  featured: boolean;
  status: "completed" | "wip";
}

export interface Experience {
  _id: string;
  position: string;
  company: string;
  start: string;
  end: string;
  projects: ProjectMetadata[];
  technologies: TechnologyMetadata[];
}

export const MessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().trim().email({ message: "Invalid email address." }),
  message: z
    .string()
    .trim()
    .min(3, { message: "Message must be at least 3 characters." }),
});
