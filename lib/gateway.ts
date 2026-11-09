import "server-only";

import * as v from "valibot";

import { env } from "@/lib/env";
import { GatewayError } from "@/lib/objects";

const TIMEOUT_MS = 10_000;
const CHAT_ALLOW_TIMEOUT_MS = 3_000;

export async function gatewayGet<S extends v.GenericSchema>(
  path: string,
  schema: S,
): Promise<v.InferOutput<S>> {
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

  const parsed = v.safeParse(schema, await response.json());
  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error(
      `[gateway] GET ${path} returned an unexpected shape`,
      parsed.issues
        .slice(0, 5)
        .map((issue) => `${v.getDotPath(issue)}: ${issue.message}`),
    );
    throw new GatewayError(`Gateway response for ${path} was invalid`, 502);
  }

  return parsed.output;
}

export type ChatAllowance = "allowed" | "limited" | "unavailable";

export async function allowChat(ip: string | null): Promise<ChatAllowance> {
  try {
    const response = await fetch(`${env.MANAGER_BACKEND_URL}/chat/allow`, {
      method: "POST",
      headers: {
        "X-API-KEY": env.API_KEY,
        ...(ip ? { "X-Visitor-IP": ip } : {}),
      },
      signal: AbortSignal.timeout(CHAT_ALLOW_TIMEOUT_MS),
    });
    if (response.ok) return "allowed";
    return response.status === 429 ? "limited" : "unavailable";
  } catch {
    return "unavailable";
  }
}
