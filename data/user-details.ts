import "server-only";

import { cacheLife } from "next/cache";

import { env } from "@/lib/env";

import { type UserDetailsResponse } from "@/lib/objects";

export async function GetUserDetails(): Promise<UserDetailsResponse> {
  "use cache";
  cacheLife("default");
  const response = await fetch(`${env.MANAGER_BACKEND_URL}/user/details`, {
    method: "GET",
    headers: {
      "X-API-KEY": env.API_KEY,
    },
  });

  if (response.status === 429) {
    throw new Error(
      "Rate limit reached. Retaining stale cache for user details.",
    );
  }

  if (!response.ok) {
    const errText = await response.text();
    // eslint-disable-next-line no-console
    console.error(
      "Fetch failed:",
      response.status,
      errText,
      "URL:",
      `${env.MANAGER_BACKEND_URL}/user/details`,
      "API_KEY starts with:",
      env.API_KEY.substring(0, 5),
    );
    throw new Error(
      `Failed to fetch user details: ${response.status} ${errText}`,
    );
  }

  return await response.json();
}
