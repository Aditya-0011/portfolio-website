import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";

const FALLBACK_QUOTE = [
  "Limit reached. Stop spamming.",
  "Screaming into the abyss won't make this page appear.",
];

export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

  try {
    const res = await fetch(`${env.MANAGER_BACKEND_URL}/random`, {
      cache: "no-store",
      headers: {
        "X-Forwarded-For": ip,
      },
    });

    if (res.status === 429) {
      return NextResponse.json({ quote: FALLBACK_QUOTE });
    }

    if (!res.ok && res.status !== 404) {
      // eslint-disable-next-line no-console
      console.error(
        `[API Route] Fetch failed with status ${res.status} ${res.statusText}`,
      );
      return NextResponse.json({ quote: FALLBACK_QUOTE });
    }

    const text = await res.text();

    return NextResponse.json({ quote: text.split(":") });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[API Route] Fetch threw a network error:", error);
    return NextResponse.json({ quote: FALLBACK_QUOTE });
  }
}
