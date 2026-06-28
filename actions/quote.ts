"use server";

import { env } from "@/lib/env";

export async function getQuote(): Promise<string[] | null> {
  try {
    const res = await fetch(`${env.MANAGER_BACKEND_URL}/random`, {
      cache: "no-store",
    });

    if (!res.ok && res.status !== 404) {
      return null;
    }

    const text = await res.text();

    if (!text.includes(":")) {
      return null;
    }

    return text.split(":");
  } catch {
    return null;
  }
}
