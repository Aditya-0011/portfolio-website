"use server";

import { conn, closeClient } from "@/lib/db";
import { DbMessage, UserMessage, MessageSchema } from "@/types/project";

export async function addMessage(message: UserMessage) {
  const db = await conn();
  try {
    if (!db) {
      return { status: 400, message: ["Database connection failed."] };
    }

    const result = await MessageSchema.safeParseAsync(message);
    if (!result.success) {
      let errorMessage: string[] = [];
      result.error.issues.forEach((issue) => {
        errorMessage.push(`${issue.path[0]}: ${issue.message}.`);
      });

      return { status: 400, message: errorMessage };
    }

    const messageCollection = db.collection<DbMessage>("messages");
    const existingMessage = await messageCollection.findOne(
      {
        email: message.email,
      },
      { projection: { count: 1, message: 1 } },
    );

    if (existingMessage) {
      if (existingMessage.count && existingMessage.count >= 3) {
        return {
          status: 400,
          message: ["You have reached the limit of messages."],
        };
      } else {
        await messageCollection.updateOne(
          { email: message.email },
          {
            $inc: { count: 1 },
            $push: { message: message.message.trim() },
          },
        );
      }
    } else {
      await messageCollection.insertOne({
        name: message.name.trim(),
        email: message.email.trim(),
        message: [message.message.trim()],
        count: 1,
      });
    }
    return { status: 200, message: ["Message added."] };
  } catch (e) {
    return { status: 400, message: ["Some error occurred."] };
  } finally {
    await closeClient();
  }
}
