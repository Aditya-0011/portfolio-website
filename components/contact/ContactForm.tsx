"use client";

import Link from "next/link";

import { toast } from "sonner";

import { MessageSchema, UserMessage } from "@/types/project";
import { addMessage } from "@/actions/db";

export default function ContactForm() {
  const handleSubmit = async (messageData: FormData) => {
    toast("Sending message...", {
      duration: 855,
      onAutoClose: (t) => {
        t.className = "hidden";
      },
      icon: (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ),
    });

    const message: UserMessage = {
      name: messageData.get("fullName") as string,
      email: messageData.get("email") as string,
      message: messageData.get("message") as string,
    };
    const result = await MessageSchema.safeParseAsync(message);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message, { duration: 3000 });
      });
      return;
    }

    const response = await addMessage(message);
    if (response.status === 200) {
      toast(response.message[0], { duration: 3000 });
    } else {
      response.message.map((msg) => {
        toast.error(msg, { duration: 3000 });
      });
    }
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 border-2 rounded-lg border-neutral-900/25">
      <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48 rounded-lg bg-neutral-900/25">
        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Get in touch
          </h2>
          <p className="mt-6 text-lg leading-8 text-white text-balance">
            I’d love to hear from you! Whether you have a question, feedback, or
            just want to connect, feel free to reach out. You can contact me
            through the options below or fill out the form to send a message
            directly.
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
                  className="hover:opacity-50 text-white"
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
                  href="https://github.com/Aditya-0011"
                  className="hover:opacity-50 text-white"
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
                <a
                  href="https://www.linkedin.com/in/aditya-punmiya/"
                  className="hover:opacity-50 text-white"
                >
                  aditya-punmiya
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <form
        action={handleSubmit}
        className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
      >
        <div className="mx-auto max-w-xl lg:max-w-lg">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 space-y-2 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold leading-6 text-white/75"
              >
                Name
              </label>
              <div className="mt-2.5">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/50 placeholder:text-white bg-neutral-900/25 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-white/75"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/50 placeholder:text-white bg-neutral-900/25 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-white/75"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/50 placeholder:text-white bg-neutral-900/25 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-blue-500 group-hover:bg-green-500 rounded-lg blur-md group-hover:translate-x-1 opacity-45 py-2" />
              <button
                type="submit"
                className="relative rounded-lg px-3 text-xl font-bold text-blue-100 bg-neutral-950 border-2 border-blue-500 py-2 group-hover:translate-x-1 group-hover:border-green-500 group-hover:text-green-100"
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const loadingIcon = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};