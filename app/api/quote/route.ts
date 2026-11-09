import { NextResponse, type NextRequest } from "next/server";

import { clientIp } from "@/lib/client-ip";
import { env } from "@/lib/env";

const FALLBACK_QUOTE = [
  "Limit reached. Stop spamming.",
  "Screaming into the abyss won't make this page appear.",
];

const NO_STORE = { "Cache-Control": "no-store" };

const QUOTE_PATH = "/random";

function fallback() {
  return NextResponse.json({ quote: FALLBACK_QUOTE }, { headers: NO_STORE });
}

export async function GET(request: NextRequest) {
  const ip = clientIp(request);

  try {
    const res = await fetch(`${env.MANAGER_BACKEND_URL}${QUOTE_PATH}`, {
      cache: "no-store",
      headers: ip ? { "X-Forwarded-For": ip } : {},
      signal: AbortSignal.timeout(5_000),
    });

    if (!res.ok && res.status !== 404) {
      if (res.status !== 429) {
        // eslint-disable-next-line no-console
        console.error(`[api/quote] unexpected gateway status ${res.status}`);
      }
      return fallback();
    }

    const text = (await res.text()).slice(0, 500);
    const separatorIndex = text.indexOf(":");
    const quote =
      separatorIndex !== -1
        ? [
            text.slice(0, separatorIndex).trim(),
            text.slice(separatorIndex + 1).trim(),
          ]
        : [text.trim()];

    return NextResponse.json({ quote }, { headers: NO_STORE });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[api/quote] gateway request failed:", error);
    return fallback();
  }
}
