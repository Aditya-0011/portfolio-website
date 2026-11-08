import "server-only";

import { parseEnv } from "@/lib/env-schema";

export const env = parseEnv();

export const isProduction = process.env.NODE_ENV === "production";
