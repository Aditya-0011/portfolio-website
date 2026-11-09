import { isIP } from "node:net";

export function clientIp(request: Request): string | null {
  const candidate =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return candidate && isIP(candidate) ? candidate : null;
}
