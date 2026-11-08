import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

import { env, isProduction } from "@/lib/env";

import { type Message } from "./objects";

const singleLine = (value: string) =>
  value.replace(/[\r\n\t\u0000-\u001f\u007f]+/g, " ").trim();

class Mail {
  readonly #transporter: Transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
    });
  }

  async send(data: Message) {
    const name = singleLine(data.name);
    const email = singleLine(data.email);

    try {
      await this.#transporter.sendMail({
        from: env.MAIL_FROM,
        to: env.MAIL_TO,
        replyTo: { name, address: email },
        subject: `New message from ${name} (${email})`,
        text: data.message,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("[mail] failed to send contact notification", error);
    }
  }
}

const globalForMail = globalThis as unknown as { mail: Mail | undefined };
export const mail = globalForMail.mail ?? new Mail();

if (!isProduction) {
  globalForMail.mail = mail;
}
