import "server-only";

import { cacheLife } from "next/cache";

import { gatewayGet } from "@/lib/gateway";
import {
  UserDetailsResponseSchema,
  type UserDetailsResponse,
} from "@/lib/objects";

export async function GetUserDetails(): Promise<UserDetailsResponse> {
  "use cache";
  cacheLife("default");

  return gatewayGet("/user/details", UserDetailsResponseSchema);
}
