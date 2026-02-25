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
import { Mail, Github, Linkedin, Loader2 } from "lucide-react";

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
          return mergeForm(baseForm, state as any);
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
        const msg = typeof error === "string" ? error : (error as any)?.message;
        if (msg) toast.error(msg, { duration: 3000 });
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
                <Mail className="h-7 w-6 text-white" />
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
                <Github className="h-7 w-6 text-white" />
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
                <span className="sr-only">Linkedin</span>
                <Linkedin className="h-7 w-6 text-white" />
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
        action={action as never}
        onSubmit={() => handleSubmit()}
        className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
      >
        <div className="mx-auto max-w-xl lg:max-w-lg">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
                        className={`block w-full rounded-md border-0 bg-neutral-900/25 px-3.5 py-2 text-white shadow-xs outline-hidden sm:text-sm sm:leading-6 ${
                          hasError
                            ? "ring-2 ring-red-500 focus:ring-red-500"
                            : "ring-1 ring-white/50 ring-inset focus:ring-2 focus:ring-blue-600 focus:ring-inset"
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
                        className={`block w-full rounded-md border-0 bg-neutral-900/25 px-3.5 py-2 text-white shadow-xs outline-hidden sm:text-sm sm:leading-6 ${
                          hasError
                            ? "ring-2 ring-red-500 focus:ring-red-500"
                            : "ring-1 ring-white/50 ring-inset focus:ring-2 focus:ring-blue-600 focus:ring-inset"
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
                        className={`block w-full rounded-md border-0 bg-neutral-900/25 px-3.5 py-2 text-white shadow-xs outline-hidden sm:text-sm sm:leading-6 ${
                          hasError
                            ? "ring-2 ring-red-500 focus:ring-red-500"
                            : "ring-1 ring-white/50 ring-inset focus:ring-2 focus:ring-blue-600 focus:ring-inset"
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
          <div className="mt-8 flex justify-end">
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
                      <div
                        className={
                          loading
                            ? "hidden"
                            : "absolute -inset-1 rounded-lg bg-blue-500 py-2 opacity-45 blur-md group-hover:translate-x-1 group-hover:bg-green-500"
                        }
                      />
                      <button
                        type="submit"
                        disabled={!canSubmit || loading}
                        className={`relative rounded-lg border-2 px-3 py-2 text-xl font-bold ${
                          loading || !canSubmit
                            ? "border-neutral-950 bg-white/75 text-neutral-950 hover:bg-white/50"
                            : "border-blue-500 bg-neutral-950 text-blue-100 group-hover:translate-x-1 group-hover:border-green-500 group-hover:text-green-100"
                        }`}
                      >
                        {loading ? (
                          <div className="flex items-center gap-x-2">
                            <Loader2 className="size-6 animate-spin" />
                            Loading
                          </div>
                        ) : (
                          "Send message"
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
