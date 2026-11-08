import "server-only";

import { cacheLife } from "next/cache";

import { env } from "@/lib/env";
import { GatewayError } from "@/lib/objects";

export async function GetArchitectureDoc(): Promise<string> {
  "use cache";
  cacheLife("days");

  const res = await fetch(env.ARCHITECTURE_URL, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new GatewayError(
      `Architecture document request failed with ${res.status}`,
      res.status,
    );
  }

  return res.text();
}
