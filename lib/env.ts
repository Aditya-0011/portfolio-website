import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  MONGODB_DB: z.string().min(1, "MONGODB_DB is required"),

  MAIL_HOST: z.string().min(1, "MAIL_HOST is required"),
  MAIL_USER: z.string().min(1, "MAIL_USER is required"),
  MAIL_PASS: z.string().min(1, "MAIL_PASS is required"),
  MAIL_FROM: z.string().min(1, "MAIL_FROM is required"),
  MAIL_TO: z.string().min(1, "MAIL_TO is required"),
  MANAGER_BACKEND_URL: z.string().min(1, "MANAGER_BACKEND_URL is required"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");

  parsedEnv.error.issues.forEach((issue) => {
    console.error(
      `  - Fix ${String(issue.path[0])}`,
    );
  });

  process.exit(1);
}

export const env = parsedEnv.data;
