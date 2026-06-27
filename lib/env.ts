import { z } from "zod";

const envSchema = z.object({
  MAIL_HOST: z.string().min(1, "MAIL_HOST is required"),
  MAIL_USER: z.string().min(1, "MAIL_USER is required"),
  MAIL_PASS: z.string().min(1, "MAIL_PASS is required"),
  MAIL_FROM: z.string().min(1, "MAIL_FROM is required"),
  MAIL_TO: z.string().min(1, "MAIL_TO is required"),
  MANAGER_BACKEND_URL: z.string().min(1, "MANAGER_BACKEND_URL is required"),
  ARCHITECTURE_URL: z.string().min(1, "ARCHITECTURE_URL is required"),
  API_KEY: z.string().min(1, "API_KEY is required"),
  TURNSTILE_SECRET_KEY: z.string().min(1, "TURNSTILE_SECRET_KEY is required"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_TURNSTILE_SITE_KEY is required"),
  CLARITY_KEY: z.string().min(1, "CLARITY_KEY is required"),
  G_TAG: z.string().min(1, "G_TAG is required"),
  ENV: z.enum(["development", "production"]).default("development").optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");

  parsedEnv.error.issues.forEach((issue) => {
    console.error(`  - Fix ${String(issue.path[0])}`);
  });

  process.exit(1);
}

export const env = parsedEnv.data;
