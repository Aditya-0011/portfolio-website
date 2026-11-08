import { NextRequest, NextResponse } from "next/server";

import {
  getMarkdownForPath,
  normalizeMarkdownPath,
} from "@/lib/markdown-content";
import { SITE_URL } from "@/lib/metadata";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const path = normalizeMarkdownPath(`/${(slug ?? []).join("/")}`);

  const { content, status } = await getMarkdownForPath(path);

  const encodedContent = new TextEncoder().encode(content);

  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Length": encodedContent.byteLength.toString(),
    "X-Content-Type-Options": "nosniff",
    Vary: "Accept",
    "Cache-Control":
      status === 200
        ? "public, s-maxage=86400, stale-while-revalidate=604800"
        : "no-store",
  });

  if (status === 200) {
    headers.set(
      "Link",
      `<${path === "/" ? SITE_URL : `${SITE_URL}${path}`}>; rel="canonical"`,
    );
  }

  return new NextResponse(encodedContent, { status, headers });
}
