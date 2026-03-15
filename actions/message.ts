"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form-nextjs";

import { mongo } from "@/lib/mongo";
import { mail } from "@/lib/mail";

import {
  MessageSchema,
  messageFormOptions,
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
        body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileResponse}`,
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return { status: 400, message: ["Invalid captcha response"] };
    }

    const data = await validate(formData);

    const collection = mongo.message();
    const messages = await collection.findOne(
      {
        email: data.email,
      },
      { projection: { count: 1, message: 1 } },
    );

    if (messages) {
      if (messages.count && messages.count >= 3) {
        return {
          status: 400,
          message: ["You have reached the limit of messages"],
        };
      } else {
        await collection.updateOne(
          { email: data.email },
          {
            $inc: { count: 1 },
            $push: { messages: data.message },
          },
        );

        await mail.send(data);

        return { status: 200, message: ["Message added successfully"] };
      }
    } else {
      await collection.insertOne({
        name: data.name,
        email: data.email,
        messages: [data.message],
        count: 1,
      });

      await mail.send(data);

      return { status: 200, message: ["Message sent successfully"] };
    }
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }
    throw e;
  }
}
