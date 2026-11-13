"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";

import {
  Field,
  Form as FormischForm,
  reset,
  setErrors,
  useForm,
  type SubmitHandler,
} from "@formisch/react";
import { toast } from "sonner";
import { Mail, Loader2, Send } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

import { MESSAGE_LIMITS, MessageSchema } from "@/lib/message";
import { AddMessage } from "@/actions/message";
import { Github, Linkedin } from "@/lib/brand-icons";

const FIELD_NAMES = ["name", "email", "message"] as const;

type FieldName = (typeof FIELD_NAMES)[number];

export default function Form() {
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const messageForm = useForm({ schema: MessageSchema, validate: "input" });
  const [visited, setVisited] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );

  const markVisited = (name: FieldName) =>
    setVisited((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  const showErrors = (name: FieldName, errors: unknown) =>
    Boolean(errors) && Boolean(visited[name] || messageForm.isSubmitted);

  const sendMessage: SubmitHandler<typeof MessageSchema> = async (output) => {
    try {
      const result = await AddMessage(output, turnstileToken);
      const { fieldErrors } = result;

      if (fieldErrors) {
        for (const name of FIELD_NAMES) {
          const errors = fieldErrors[name];
          if (errors) setErrors(messageForm, { path: [name], errors });
        }
      } else if (result.status === 200) {
        toast.success(result.message[0], { duration: 3000 });
        reset(messageForm);
        setVisited({});
      } else {
        result.message.forEach((msg) => toast.error(msg, { duration: 3000 }));
      }
    } catch {
      toast.error("Something went wrong. Please try again later.", {
        duration: 3000,
      });
    } finally {
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    }
  };

  const emptySubscribe = () => () => {};
  const isIframe = useSyncExternalStore(
    emptySubscribe,
    () => window.self !== window.top,
    () => false,
  );
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const [userInteracted, setUserInteracted] = useState(false);
  const loading = messageForm.isSubmitting;
  const canSubmit = messageForm.isValid;

  useEffect(() => {
    if (!isMounted || userInteracted || isIframe) return;
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => setUserInteracted(true), {
        timeout: 3000,
      });
      return () => window.cancelIdleCallback(idleId);
    } else {
      const timer = setTimeout(() => setUserInteracted(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [isMounted, userInteracted, isIframe]);

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-4 rounded-2xl border border-white/5 bg-neutral-900/40 p-2 shadow-2xl backdrop-blur-xl sm:gap-8 sm:p-4 lg:grid-cols-2">
      <div className="relative flex flex-col justify-center rounded-2xl border border-white/5 bg-neutral-950/40 p-5 sm:p-12">
        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Get in touch
          </h1>
          <p className="mt-6 text-lg leading-8 text-balance text-white">
            I&apos;d love to hear from you! Whether you have a question,
            feedback, or just want to connect, feel free to reach out. You can
            contact me through the options below or fill out the form to send a
            message directly.
          </p>
          <ul
            role="list"
            className="mt-10 space-y-4 text-base leading-7 text-gray-600"
          >
            <li className="group/link relative flex items-center rounded-xl border border-white/5 bg-white/5 p-3 transition-[transform,border-color] duration-300 hover:scale-[1.02] hover:border-emerald-500/30">
              <Link
                href="mailto:adityapunmiya@gmail.com"
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">Email adityapunmiya@gmail.com</span>
              </Link>
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/5 bg-neutral-900 transition-colors duration-200 group-hover/link:border-emerald-500/50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none sm:h-12 sm:w-12">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-4 min-w-0">
                <div className="truncate text-sm font-medium text-white transition-colors group-hover/link:text-emerald-300 sm:text-base">
                  adityapunmiya@gmail.com
                </div>
              </div>
            </li>

            <li className="group/link relative flex items-center rounded-xl border border-white/5 bg-white/5 p-3 transition-[transform,border-color] duration-300 hover:scale-[1.02] hover:border-blue-500/30">
              <Link
                href="https://github.com/Aditya-0011"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">Visit Github profile</span>
              </Link>
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/5 bg-neutral-900 transition-colors duration-200 group-hover/link:border-blue-500/50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none sm:h-12 sm:w-12">
                <span className="sr-only">Github</span>
                <Github className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-4 min-w-0">
                <div className="truncate text-sm font-medium text-white transition-colors group-hover/link:text-blue-300 sm:text-base">
                  Aditya-0011
                </div>
              </div>
            </li>

            <li className="group/link relative flex items-center rounded-xl border border-white/5 bg-white/5 p-3 transition-[transform,border-color] duration-300 hover:scale-[1.02] hover:border-sky-500/30">
              <Link
                href="https://www.linkedin.com/in/aditya-punmiya/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">Visit Linkedin profile</span>
              </Link>
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-white/5 bg-neutral-900 transition-colors duration-200 group-hover/link:border-sky-500/50 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none sm:h-12 sm:w-12">
                <span className="sr-only">Linkedin</span>
                <Linkedin className="h-5 w-5 text-sky-400 sm:h-6 sm:w-6" />
              </div>
              <div className="ml-4 min-w-0">
                <div className="truncate text-sm font-medium text-white transition-colors group-hover/link:text-sky-300 sm:text-base">
                  aditya-punmiya
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <FormischForm
        of={messageForm}
        onSubmit={sendMessage}
        onFocusCapture={() => setUserInteracted(true)}
        onPointerEnter={() => setUserInteracted(true)}
        className="flex flex-col justify-center px-3 py-5 sm:p-10 lg:p-12"
      >
        <div className="mx-auto w-full max-w-xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 sm:gap-y-6">
            <Field of={messageForm} path={["name"]}>
              {(field) => {
                const hasError = showErrors("name", field.errors);
                return (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm leading-6 font-semibold text-white/75"
                    >
                      Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="name"
                        {...field.props}
                        onBlur={() => {
                          field.props.onBlur();
                          markVisited("name");
                        }}
                        value={field.input ?? ""}
                        maxLength={MESSAGE_LIMITS.name}
                        required
                        aria-invalid={hasError}
                        aria-describedby={hasError ? "name-error" : undefined}
                        type="text"
                        autoComplete="name"
                        placeholder="Your name…"
                        className={`block w-full rounded-xl border-0 bg-neutral-950/50 px-4 py-3 text-white shadow-xs outline-hidden transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-none sm:text-sm sm:leading-6 ${
                          hasError
                            ? "bg-red-950/20 ring-2 ring-red-500 focus-visible:ring-2 focus-visible:ring-red-500"
                            : "ring-1 ring-white/10 ring-inset focus:bg-white/5 focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                        }`}
                      />
                      {hasError ? (
                        <p
                          id="name-error"
                          className="mt-2 text-sm text-red-400"
                        >
                          {field.errors?.join(" ")}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              }}
            </Field>

            <Field of={messageForm} path={["email"]}>
              {(field) => {
                const hasError = showErrors("email", field.errors);
                return (
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
                        {...field.props}
                        onBlur={() => {
                          field.props.onBlur();
                          markVisited("email");
                        }}
                        value={field.input ?? ""}
                        maxLength={MESSAGE_LIMITS.email}
                        required
                        aria-invalid={hasError}
                        aria-describedby={hasError ? "email-error" : undefined}
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="you@example.com…"
                        className={`block w-full rounded-xl border-0 bg-neutral-950/50 px-4 py-3 text-white shadow-xs outline-hidden transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-none sm:text-sm sm:leading-6 ${
                          hasError
                            ? "bg-red-950/20 ring-2 ring-red-500 focus-visible:ring-2 focus-visible:ring-red-500"
                            : "ring-1 ring-white/10 ring-inset focus:bg-white/5 focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                        }`}
                      />
                      {hasError ? (
                        <p
                          id="email-error"
                          className="mt-2 text-sm text-red-400"
                        >
                          {field.errors?.join(" ")}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              }}
            </Field>

            <Field of={messageForm} path={["message"]}>
              {(field) => {
                const hasError = showErrors("message", field.errors);
                return (
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
                        {...field.props}
                        onBlur={() => {
                          field.props.onBlur();
                          markVisited("message");
                        }}
                        value={field.input ?? ""}
                        maxLength={MESSAGE_LIMITS.message}
                        required
                        aria-invalid={hasError}
                        aria-describedby={
                          hasError ? "message-error" : undefined
                        }
                        rows={4}
                        placeholder="Write your message…"
                        autoComplete="off"
                        className={`block w-full resize-none rounded-xl border-0 bg-neutral-950/50 px-4 py-3 text-white shadow-xs outline-hidden transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-none sm:text-sm sm:leading-6 ${
                          hasError
                            ? "bg-red-950/20 ring-2 ring-red-500 focus-visible:ring-2 focus-visible:ring-red-500"
                            : "ring-1 ring-white/10 ring-inset focus:bg-white/5 focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                        }`}
                      />
                      {hasError ? (
                        <p
                          id="message-error"
                          className="mt-2 text-sm text-red-400"
                        >
                          {field.errors?.join(" ")}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              }}
            </Field>
          </div>
          <div className="mt-8 flex flex-col items-end gap-6">
            {isIframe ? (
              <div className="w-full rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200 backdrop-blur-sm">
                <p className="font-semibold text-amber-300">
                  Embedded Preview Mode
                </p>
                <p className="mt-1 text-xs text-amber-200/80">
                  Interactive spam verification is disabled inside iframe
                  previews. Please{" "}
                  <a
                    href="https://adityapunmiya.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline hover:text-white"
                  >
                    open in a new tab ↗
                  </a>{" "}
                  to send a message, or reach out directly at{" "}
                  <a
                    href="mailto:adityapunmiya@gmail.com"
                    className="font-medium underline hover:text-white"
                  >
                    adityapunmiya@gmail.com
                  </a>
                  .
                </p>
              </div>
            ) : (
              <div
                suppressHydrationWarning
                className="flex w-full flex-col gap-3"
              >
                {isMounted && userInteracted ? (
                  <div className="min-h-[65px] max-[374px]:-mx-2">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                      options={{
                        size: "flexible",
                        theme: "dark",
                      }}
                      onSuccess={setTurnstileToken}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => setTurnstileToken(null)}
                    />
                  </div>
                ) : null}
                <p className="flex items-center gap-2 text-xs text-white/55">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      turnstileToken
                        ? "bg-emerald-500"
                        : "animate-pulse bg-emerald-500/50"
                    }`}
                  />
                  {turnstileToken
                    ? "Spam check passed"
                    : userInteracted
                      ? "Checking you're not a bot…"
                      : "Spam protection starts when you use the form"}
                </p>
              </div>
            )}
            <div className="group relative">
              <button
                type="submit"
                disabled={!canSubmit || loading || isIframe || !turnstileToken}
                className={`relative w-full overflow-hidden rounded-xl px-6 py-3 text-lg font-bold transition-[transform,box-shadow,border-color,background-color] duration-200 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none sm:w-auto ${
                  loading || !canSubmit || isIframe || !turnstileToken
                    ? "cursor-not-allowed border border-white/5 bg-neutral-900 text-white/40"
                    : "border border-white/10 bg-neutral-900 text-white shadow-lg hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] active:scale-[0.97]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-x-2">
                    <Loader2
                      className="size-5 animate-spin"
                      aria-hidden="true"
                    />
                    Sending…
                  </div>
                ) : isIframe ? (
                  <div className="flex items-center justify-center gap-x-2">
                    Disabled in Preview
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-x-2">
                    <Send className="size-5" aria-hidden="true" />
                    Send Message
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </FormischForm>
    </div>
  );
}
