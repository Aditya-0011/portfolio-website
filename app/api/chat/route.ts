import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai";

import { GetChatModel, GetFreeChatModels } from "@/data/chat";
import {
  buildChatInstructions,
  parseChatMessages,
  pickChatModels,
} from "@/lib/chat";
import { clientIp } from "@/lib/client-ip";
import { allowChat } from "@/lib/gateway";

export const maxDuration = 60;

const MAX_OUTPUT_TOKENS = 2000;
const UNAVAILABLE =
  "The chat is unavailable right now. Please try again later.";

const reply = (message: string, status: number) =>
  new Response(message, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

async function loadChatSetup() {
  try {
    const [configured, free, instructions] = await Promise.all([
      GetChatModel(),
      GetFreeChatModels(),
      buildChatInstructions(),
    ]);
    const models = pickChatModels(configured, free);
    return models && instructions ? { models, instructions } : null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[chat] setup failed", error);
    return null;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return reply("Forbidden", 403);
  }

  const messages = parseChatMessages(await request.json().catch(() => null));
  if (!messages) {
    return reply("Please send a shorter question.", 400);
  }

  const allowance = await allowChat(clientIp(request));
  if (allowance === "limited") {
    return reply("Too many questions. Please try again later.", 429);
  }
  if (allowance === "unavailable") {
    return reply(UNAVAILABLE, 503);
  }

  const setup = await loadChatSetup();
  if (!setup) {
    return reply(UNAVAILABLE, 503);
  }

  const result = streamText({
    model: setup.models.primary,
    instructions: setup.instructions,
    messages,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    abortSignal: request.signal,
    providerOptions: { gateway: { models: setup.models.fallbacks } },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream, sendReasoning: false }),
  });
}
