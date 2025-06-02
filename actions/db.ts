"use server";

import { conn } from "@/lib/mongo";
import transporter from "@/lib/mail";
import { DbMessage, MessageSchema, UserMessage } from "@/lib/objects";

export async function addMessage(message: UserMessage) {
  const client = await conn();
  try {
    if (!client) {
      return { status: 400, message: ["Database connection failed."] };
    }

    const result = MessageSchema.safeParse(message);
    if (!result.success) {
      let errorMessage: string[] = [];
      result.error.issues.forEach((issue) => {
        errorMessage.push(`${issue.path[0]}: ${issue.message}.`);
      });

      return { status: 400, message: errorMessage };
    }

    const messageCollection = client
      .db(process.env.DB_NAME as string)
      .collection<DbMessage>("messages");
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
    await transporter.sendMail({
      from: "no-reply@website.com",
      to: "adityapunmiya+portfolio@gmail.com",
      subject: `New message from ${message.name} (${message.email})`,
      text: message.message,
    });
    return { status: 200, message: ["Message added."] };
  } catch (e) {
    return { status: 400, message: ["Some error occurred."] };
  }
}
