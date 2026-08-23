import { NextRequest, NextResponse } from "next/server";
import { getMarkdownForPath } from "@/lib/markdown-content";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  let path =
    req.headers.get("x-markdown-path") || searchParams.get("path") || "/";

  if (path.endsWith(".md")) {
    path = path.slice(0, -3);
    if (path === "" || path === "/index") path = "/";
  }

  const { content, status } = await getMarkdownForPath(path);

  const canonicalPath =
    path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `https://adityapunmiya.com${canonicalPath}`;

  const encoder = new TextEncoder();
  const encodedContent = encoder.encode(content);

  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    "Content-Length": encodedContent.byteLength.toString(),
    "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    Vary: "Accept",
    Link: `<${canonicalUrl}>; rel="canonical"`,
  });

  return new NextResponse(encodedContent, {
    status,
    headers,
  });
}
