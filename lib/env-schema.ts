import * as v from "valibot";

const required = (name: string) =>
  v.pipe(v.string(), v.minLength(1, `${name} is required`));

const httpUrl = v.pipe(v.string(), v.url(), v.regex(/^https?:\/\//i));

const optionalId = (pattern: RegExp) =>
  v.pipe(
    v.optional(v.string()),
    v.transform((value) => (value === "" ? undefined : value)),
    v.optional(v.pipe(v.string(), v.regex(pattern))),
  );

export const envSchema = v.object({
  MAIL_HOST: required("MAIL_HOST"),
  MAIL_USER: required("MAIL_USER"),
  MAIL_PASS: required("MAIL_PASS"),
  MAIL_FROM: required("MAIL_FROM"),
  MAIL_TO: required("MAIL_TO"),
  MANAGER_BACKEND_URL: httpUrl,
  ARCHITECTURE_URL: httpUrl,
  API_KEY: required("API_KEY"),
  TURNSTILE_SECRET_KEY: required("TURNSTILE_SECRET_KEY"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: required("NEXT_PUBLIC_TURNSTILE_SITE_KEY"),
  CLARITY_KEY: required("CLARITY_KEY"),
  G_TAG: optionalId(/^G-[A-Z0-9]+$/),
});

export type Env = v.InferOutput<typeof envSchema>;

export function parseEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const parsed = v.safeParse(envSchema, source);

  if (!parsed.success) {
    const keys = [
      ...new Set(parsed.issues.map((issue) => String(issue.path?.[0]?.key))),
    ];
    throw new Error(`Invalid environment variables: ${keys.join(", ")}`);
  }

  return parsed.output;
}
