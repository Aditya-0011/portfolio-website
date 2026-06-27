"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form-nextjs";

import { env } from "@/lib/env";

import { mail } from "@/lib/mail";

import {
  MessageSchema,
  messageFormOptions,
  type SimpleResponse,
} from "@/lib/objects";

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

export async function AddMessage(prev: unknown, formData: FormData) {
  try {
    const turnstileResponse = formData.get("cf-turnstile-response");
    if (!turnstileResponse) {
      return { status: 400, message: ["Captcha verification failed"] };
    }

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${env.TURNSTILE_SECRET_KEY}&response=${turnstileResponse}`,
      },
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return { status: 400, message: ["Invalid captcha response"] };
    }

    const data = await validate(formData);

    const response = await fetch(`${env.MANAGER_BACKEND_URL}/message/add`, {
      method: "POST",
      headers: {
        "X-API-KEY": env.API_KEY,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      return { status: response.status, message: [error] };
    }

    await mail.send(data);

    const { message }: SimpleResponse = await response.json();

    return { status: 200, message: [message] };
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }
    throw e;
  }
}
