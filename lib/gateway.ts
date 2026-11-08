import "server-only";

import type { z } from "zod";

import { env } from "@/lib/env";
import { GatewayError } from "@/lib/objects";

const TIMEOUT_MS = 10_000;

export async function gatewayGet<S extends z.ZodType>(
  path: string,
  schema: S,
): Promise<z.output<S>> {
  const response = await fetch(`${env.MANAGER_BACKEND_URL}${path}`, {
    method: "GET",
    headers: { "X-API-KEY": env.API_KEY, Accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error(`[gateway] GET ${path} failed with ${response.status}`);
    throw new GatewayError(
      `Gateway request ${path} failed with ${response.status}`,
      response.status,
    );
  }

  const parsed = schema.safeParse(await response.json());
  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error(
      `[gateway] GET ${path} returned an unexpected shape`,
      parsed.error.issues.slice(0, 5),
    );
    throw new GatewayError(`Gateway response for ${path} was invalid`, 502);
  }

  return parsed.data;
}
