"use server";

import { env } from "@/lib/env";

export async function getQuote(): Promise<string[] | null> {
  try {
    const res = await fetch(`${env.MANAGER_BACKEND_URL}/random`, {
      cache: "no-store",
    });

    if (!res.ok && res.status !== 404) {
      console.error(`[Server Action] Fetch failed with status ${res.status} ${res.statusText}`);
      return null;
    }

    const text = await res.text();

    if (!text.includes(":")) {
      console.error(`[Server Action] Invalid quote format received. Body:`, text);
      return null;
    }

    return text.split(":");
  } catch (error) {
    console.error("[Server Action] Fetch threw a network error:", error);
    return null;
  }
}
