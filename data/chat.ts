import "server-only";

import { cacheLife } from "next/cache";
import * as v from "valibot";

import { gatewayGet } from "@/lib/gateway";
import { ChatConfigSchema } from "@/lib/objects";

const MODELS_URL = "https://ai-gateway.vercel.sh/v1/models";

const ModelCatalogSchema = v.object({
  data: v.array(
    v.object({
      id: v.string(),
      type: v.optional(v.string()),
      pricing: v.optional(
        v.object({
          input: v.optional(v.string()),
          output: v.optional(v.string()),
          varies_by_provider: v.optional(v.boolean()),
        }),
      ),
    }),
  ),
});

const isZero = (price?: string) => price !== undefined && Number(price) === 0;

export async function GetChatModel(): Promise<string> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 600 });

  const { chat_model } = await gatewayGet("/user/details", ChatConfigSchema);
  return chat_model.trim();
}

export async function GetFreeChatModels(): Promise<string[]> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 300, expire: 3600 });

  const response = await fetch(MODELS_URL, {
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) {
    throw new Error(`Model list failed with ${response.status}`);
  }

  const { data } = v.parse(ModelCatalogSchema, await response.json());
  return data
    .filter(
      ({ type, pricing }) =>
        type === "language" &&
        pricing !== undefined &&
        !pricing.varies_by_provider &&
        isZero(pricing.input) &&
        isZero(pricing.output),
    )
    .map(({ id }) => id);
}
