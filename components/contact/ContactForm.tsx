"use client";

import Link from "next/link";
import { useState } from "react";

import { toast } from "sonner";

import { MessageSchema, UserMessage } from "@/lib/objects";
import { addMessage } from "@/actions/db";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (messageData: FormData) => {
    setLoading(true);
    const message: UserMessage = {
      name: messageData.get("fullName") as string,
      email: messageData.get("email") as string,
      message: messageData.get("message") as string,
    };
    const result = MessageSchema.safeParse(message);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message, { duration: 3000 });
      });
      setLoading(false);
      return;
    }

    const response = await addMessage(message);
    if (response.status === 200) {
      toast.success(response.message[0], { duration: 3000 });
    } else {
      response.message.map((msg) => {
        toast.error(msg, { duration: 3000 });
      });
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 rounded-lg border-2 border-neutral-900/25 lg:grid-cols-2">
      <div className="relative rounded-lg bg-neutral-900/25 px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Get in touch
          </h2>
          <p className="mt-6 text-lg leading-8 text-balance text-white">
            I&apos;d love to hear from you! Whether you have a question,
            feedback, or just want to connect, feel free to reach out. You can
            contact me through the options below or fill out the form to send a
            message directly.
          </p>
          <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
            <div className="flex gap-x-4">
              <dt className="flex-none">
                <span className="sr-only">Email</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-7 w-6 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
                  ></path>
                </svg>
              </dt>
              <dd>
                <Link
                  href="mailto:adityapunmiya@gmail.com"
                  className="text-white hover:opacity-50"
                  target="_blank"
                >
                  adityapunmiya@gmail.com
                </Link>
              </dd>
            </div>
            <div className="flex gap-x-4">
              <dt className="flex-none">
                <span className="sr-only">Github</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-7 w-6 text-white"
                >
                  <path
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </dt>
              <dd>
                <Link
                  target="_blank"
                  href="https://github.com/Aditya-0011"
                  className="text-white hover:opacity-50"
                >
                  Aditya-0011
                </Link>
              </dd>
            </div>
            <div className="flex gap-x-4">
              <dt className="flex-none">
                <span className="sr-only">Email</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-7 w-6 text-white"
                >
                  <path
                    d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </dt>
              <dd>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/aditya-punmiya/"
                  className="text-white hover:opacity-50"
                >
                  aditya-punmiya
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          await handleSubmit(formData);
        }}
        className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
      >
        <div className="mx-auto max-w-xl lg:max-w-lg">
          <div className="grid grid-cols-1 space-y-2 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="fullName"
                className="block text-sm leading-6 font-semibold text-white/75"
              >
                Name
              </label>
              <div className="mt-2.5">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="block w-full rounded-md border-0 bg-neutral-900/25 px-3.5 py-2 text-white shadow-xs ring-1 ring-white/50 outline-hidden ring-inset placeholder:text-white focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm leading-6 font-semibold text-white/75"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 bg-neutral-900/25 px-3.5 py-2 text-white shadow-xs ring-1 ring-white/50 outline-hidden ring-inset placeholder:text-white focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm leading-6 font-semibold text-white/75"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block min-h-40 w-full resize-y rounded-md border-0 bg-neutral-900/25 px-3.5 py-2 text-white shadow-xs ring-1 ring-white/50 outline-hidden ring-inset placeholder:text-white focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <div className="group relative">
              <div
                className={
                  loading
                    ? "hidden"
                    : "absolute -inset-1 rounded-lg bg-blue-500 py-2 opacity-45 blur-md group-hover:translate-x-1 group-hover:bg-green-500"
                }
              />
              <button
                type="submit"
                disabled={loading}
                className={`relative rounded-lg border-2 px-3 py-2 text-xl font-bold ${
                  loading
                    ? "border-neutral-950 bg-white/75 text-neutral-950 hover:bg-white/50"
                    : "border-blue-500 bg-neutral-950 text-blue-100 group-hover:translate-x-1 group-hover:border-green-500 group-hover:text-green-100"
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 animate-spin"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Loading
                  </div>
                ) : (
                  "Send message"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
