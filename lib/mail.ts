import nodemailer, { type Transporter } from "nodemailer";

import { env } from "@/lib/env";

import { type Message } from "./objects";

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
    await this.#transporter.sendMail({
      from: env.MAIL_FROM,
      to: env.MAIL_TO,
      subject: `New message from ${data.name} (${data.email})`,
      text: data.message,
    });
  }
}

const globalForMail = globalThis as unknown as { mail: Mail | undefined };
export const mail = globalForMail.mail ?? new Mail();

if (process.env.ENV && process.env.ENV === "development") {
  globalForMail.mail = mail;
}
