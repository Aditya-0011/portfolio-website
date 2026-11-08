"use server";

import { after } from "next/server";
import { headers } from "next/headers";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form-nextjs";

import { env } from "@/lib/env";
import { mail } from "@/lib/mail";
import {
  MessageSchema,
  SimpleResponseSchema,
  messageFormOptions,
  type ActionResult,
} from "@/lib/objects";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const PRODUCTION_HOSTNAMES = new Set([
  "adityapunmiya.com",
  "www.adityapunmiya.com",
]);
const GENERIC_FAILURE = "Something went wrong. Please try again later.";

const validate = createServerValidate({
  ...messageFormOptions,
  onServerValidate: ({ value }) => {
    const result = MessageSchema.safeParse(value);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      return fieldErrors;
    }
  },
});

async function verifyTurnstile(token: string): Promise<boolean> {
  const requestHeaders = await headers();
  const remoteIp =
    requestHeaders.get("x-real-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    body,
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) return false;

  const data: { success?: boolean; hostname?: string } = await res.json();
  if (!data.success) return false;

  if (process.env.VERCEL_ENV === "production") {
    return !!data.hostname && PRODUCTION_HOSTNAMES.has(data.hostname);
  }
  return true;
}

export async function AddMessage(prev: unknown, formData: FormData) {
  try {
    const token = formData.get("cf-turnstile-response");
    if (
      typeof token !== "string" ||
      token.length === 0 ||
      token.length > 2048
    ) {
      return {
        status: 400,
        message: ["Please complete the spam check and try again."],
      } satisfies ActionResult;
    }

    if (!(await verifyTurnstile(token))) {
      return {
        status: 400,
        message: ["Spam check failed. Please try again."],
      } satisfies ActionResult;
    }

    const data = await validate(formData);

    const response = await fetch(`${env.MANAGER_BACKEND_URL}/message/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": env.API_KEY,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error(`[contact] gateway message/add failed: ${response.status}`);
      return {
        status: response.status === 429 ? 429 : 502,
        message: [
          response.status === 429
            ? "Too many messages right now. Please try again later."
            : GENERIC_FAILURE,
        ],
      } satisfies ActionResult;
    }

    after(() => mail.send(data));

    const parsed = SimpleResponseSchema.safeParse(
      await response.json().catch(() => ({})),
    );
    const message =
      parsed.success && parsed.data.message
        ? parsed.data.message
        : "Message sent!";

    return { status: 200, message: [message] } satisfies ActionResult;
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }
    // eslint-disable-next-line no-console
    console.error("[contact] failed to send message", e);
    return { status: 500, message: [GENERIC_FAILURE] } satisfies ActionResult;
  }
}
