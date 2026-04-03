"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";

import {
  initialFormState,
  mergeForm,
  useForm,
  useTransform,
  useStore,
} from "@tanstack/react-form-nextjs";
import { toast } from "sonner";
import { Mail, Github, Linkedin, Loader2, Send } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

import { messageFormOptions, MessageSchema } from "@/lib/objects";
import { AddMessage } from "@/actions/message";

export default function Form() {
  const [state, action, isPending] = useActionState(
    AddMessage,
    initialFormState,
  );

  const { Field, Subscribe, handleSubmit, reset, store } = useForm({
    ...messageFormOptions,
    transform: useTransform(
      (baseForm) => {
        if (state && typeof state === "object" && !("status" in state)) {
          return mergeForm(baseForm, state as Parameters<typeof mergeForm>[1]);
        }
        return baseForm;
      },
      [state],
    ),
  });

  const formErrors = useStore(store, (formState) => formState.errors);

  useEffect(() => {
    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        let msg: unknown;
        if (typeof error === "string") {
          msg = error;
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error
        ) {
          msg = (error as Record<string, unknown>).message;
        }
        if (typeof msg === "string") toast.error(msg, { duration: 3000 });
      });
    }

    if (state && typeof state === "object" && "status" in state) {
      if (state.status === 400) {
        state.message.forEach((msg: string) =>
          toast.error(msg, { duration: 3000 }),
        );
      } else if (state.status === 200) {
        toast.success(state.message[0], { duration: 3000 });
        reset();
      }
    }
  }, [state, formErrors, reset]);

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-4 sm:gap-8 rounded-2xl bg-neutral-900/40 p-2 sm:p-4 lg:grid-cols-2 backdrop-blur-xl border border-white/5 shadow-2xl">
      <div className="relative rounded-2xl bg-neutral-950/40 p-5 sm:p-12 border border-white/5 flex flex-col justify-center">
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
          <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
            <div className="group/link relative flex items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:scale-[1.02]">
              <Link href="mailto:adityapunmiya@gmail.com" target="_blank" className="absolute inset-0 z-10"><span className="sr-only">Email adityapunmiya@gmail.com</span></Link>
              <dt className="flex-none flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-neutral-900 border border-white/5 group-hover/link:border-emerald-500/50 transition-colors duration-300">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
              </dt>
              <dd className="ml-4 min-w-0">
                <div className="text-white font-medium text-sm sm:text-base truncate group-hover/link:text-emerald-300 transition-colors">
                  adityapunmiya@gmail.com
                </div>
              </dd>
            </div>
            
            <div className="group/link relative flex items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
              <Link href="https://github.com/Aditya-0011" target="_blank" className="absolute inset-0 z-10"><span className="sr-only">Visit Github profile</span></Link>
              <dt className="flex-none flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-neutral-900 border border-white/5 group-hover/link:border-blue-500/50 transition-colors duration-300">
                <span className="sr-only">Github</span>
                <Github className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              </dt>
              <dd className="ml-4 min-w-0">
                <div className="text-white font-medium text-sm sm:text-base truncate group-hover/link:text-blue-300 transition-colors">
                  Aditya-0011
                </div>
              </dd>
            </div>
            
            <div className="group/link relative flex items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-sky-500/30 transition-all duration-300 hover:scale-[1.02]">
              <Link href="https://www.linkedin.com/in/aditya-punmiya/" target="_blank" className="absolute inset-0 z-10"><span className="sr-only">Visit Linkedin profile</span></Link>
              <dt className="flex-none flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-neutral-900 border border-white/5 group-hover/link:border-sky-500/50 transition-colors duration-300">
                <span className="sr-only">Linkedin</span>
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-sky-400" />
              </dt>
              <dd className="ml-4 min-w-0">
                <div className="text-white font-medium text-sm sm:text-base truncate group-hover/link:text-sky-300 transition-colors">
                  aditya-punmiya
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <form
        action={action as never}
        onSubmit={() => handleSubmit()}
        className="flex flex-col justify-center p-5 sm:p-10 lg:p-12"
      >
        <div className="mx-auto w-full max-w-xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:gap-y-6 sm:grid-cols-2">
            <Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  const res = MessageSchema.shape.name.safeParse(value);
                  return !res.success ? res.error.issues[0].message : undefined;
                },
              }}
            >
              {(field) => {
                const hasError = field.state.meta.errors.length > 0;
                return (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={field.name}
                      className="block text-sm leading-6 font-semibold text-white/75"
                    >
                      Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="text"
                        autoComplete="name"
                        className={`block w-full rounded-xl border-0 bg-neutral-950/50 px-4 py-3 text-white shadow-xs outline-hidden sm:text-sm sm:leading-6 transition-all duration-300 ${
                          hasError
                            ? "ring-2 ring-red-500 focus:ring-red-500 bg-red-950/20"
                            : "ring-1 ring-white/10 ring-inset focus:ring-2 focus:ring-emerald-500/50 focus:bg-white/5"
                        }`}
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error as string}
                          className="mt-2 text-sm text-red-400"
                        >
                          {error as string}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }}
            </Field>

            <Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const res = MessageSchema.shape.email.safeParse(value);
                  return !res.success ? res.error.issues[0].message : undefined;
                },
              }}
            >
              {(field) => {
                const hasError = field.state.meta.errors.length > 0;
                return (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={field.name}
                      className="block text-sm leading-6 font-semibold text-white/75"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="email"
                        autoComplete="email"
                        className={`block w-full rounded-xl border-0 bg-neutral-950/50 px-4 py-3 text-white shadow-xs outline-hidden sm:text-sm sm:leading-6 transition-all duration-300 ${
                          hasError
                            ? "ring-2 ring-red-500 focus:ring-red-500 bg-red-950/20"
                            : "ring-1 ring-white/10 ring-inset focus:ring-2 focus:ring-emerald-500/50 focus:bg-white/5"
                        }`}
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error as string}
                          className="mt-2 text-sm text-red-400"
                        >
                          {error as string}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }}
            </Field>

            <Field
              name="message"
              validators={{
                onChange: ({ value }) => {
                  const res = MessageSchema.shape.message.safeParse(value);
                  return !res.success ? res.error.issues[0].message : undefined;
                },
              }}
            >
              {(field) => {
                const hasError = field.state.meta.errors.length > 0;
                return (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={field.name}
                      className="block text-sm leading-6 font-semibold text-white/75"
                    >
                      Message
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        rows={4}
                        className={`block w-full rounded-xl border-0 bg-neutral-950/50 px-4 py-3 text-white shadow-xs outline-hidden sm:text-sm sm:leading-6 transition-all duration-300 resize-none ${
                          hasError
                            ? "ring-2 ring-red-500 focus:ring-red-500 bg-red-950/20"
                            : "ring-1 ring-white/10 ring-inset focus:ring-2 focus:ring-emerald-500/50 focus:bg-white/5"
                        }`}
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          key={error as string}
                          className="mt-2 text-sm text-red-400"
                        >
                          {error as string}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }}
            </Field>
          </div>
          <div className="mt-8 flex flex-col items-end gap-6">
            <div className="w-full max-w-full overflow-x-auto overflow-y-hidden sm:overflow-hidden">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ size: "flexible", theme: "dark" }}
              />
            </div>
            <div className="group relative">
              <Subscribe
                selector={(formState) => [
                  formState.canSubmit,
                  formState.isSubmitting,
                ]}
              >
                {([canSubmit, isSubmitting]) => {
                  const loading = isSubmitting || isPending;
                  return (
                    <>
                      <button
                        type="submit"
                        disabled={!canSubmit || loading}
                        className={`relative w-full sm:w-auto overflow-hidden rounded-xl px-6 py-3 text-lg font-bold transition-all duration-300 ${
                          loading || !canSubmit
                            ? "bg-neutral-900 text-white/40 cursor-not-allowed border border-white/5"
                            : "bg-neutral-900 text-white border border-white/10 hover:border-emerald-500/50 hover:bg-white/5 shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:-translate-y-0.5"
                        }`}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-x-2">
                            <Loader2 className="size-5 animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-x-2">
                            <Send className="size-5" />
                            Send Message
                          </div>
                        )}
                      </button>
                    </>
                  );
                }}
              </Subscribe>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
