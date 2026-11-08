import { z } from "zod";

const required = (name: string) => z.string().min(1, `${name} is required`);

const optionalId = (pattern: RegExp) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().regex(pattern).optional(),
  );

export const envSchema = z.object({
  MAIL_HOST: required("MAIL_HOST"),
  MAIL_USER: required("MAIL_USER"),
  MAIL_PASS: required("MAIL_PASS"),
  MAIL_FROM: required("MAIL_FROM"),
  MAIL_TO: required("MAIL_TO"),
  MANAGER_BACKEND_URL: z.url({ protocol: /^https?$/ }),
  ARCHITECTURE_URL: z.url({ protocol: /^https?$/ }),
  API_KEY: required("API_KEY"),
  TURNSTILE_SECRET_KEY: required("TURNSTILE_SECRET_KEY"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: required("NEXT_PUBLIC_TURNSTILE_SITE_KEY"),
  CLARITY_KEY: required("CLARITY_KEY"),
  G_TAG: optionalId(/^G-[A-Z0-9]+$/),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const parsed = envSchema.safeParse(source);

  if (!parsed.success) {
    const keys = [
      ...new Set(parsed.error.issues.map((issue) => String(issue.path[0]))),
    ];
    throw new Error(`Invalid environment variables: ${keys.join(", ")}`);
  }

  return parsed.data;
}
