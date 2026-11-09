"use client";

import "@/lib/zod-jitless";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useChat } from "@ai-sdk/react";
import { APICallError, DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import { ArrowUp, RotateCcw, Square } from "lucide-react";

import { CHAT_LIMITS } from "@/lib/chat-limits";
import { defaultMarkdownComponents } from "@/lib/markdown-components";

const transport = new DefaultChatTransport({
  api: "/api/chat",
  prepareSendMessagesRequest: ({ messages }) => ({
    body: { messages: messages.slice(-CHAT_LIMITS.maxHistory) },
  }),
});

const SUGGESTIONS = [
  "What does Aditya work on?",
  "What is Aditya's tech stack?",
  "Tell me about Aditya's projects",
  "How is this platform built?",
];

const NO_IMAGES = ["img"];
const COUNTER_THRESHOLD = 400;
const PIN_DISTANCE = 120;

const messageText = (message: UIMessage) =>
  message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");

export default function Chat() {
  const {
    messages,
    sendMessage,
    status,
    error,
    stop,
    regenerate,
    setMessages,
  } = useChat({
    transport,
    onFinish: ({ finishReason, isAbort, isError }) =>
      setWasCut(!isAbort && !isError && finishReason !== "stop"),
  });
  const [input, setInput] = useState("");
  const [wasCut, setWasCut] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);

  const isBusy = status === "submitted" || status === "streaming";
  const question = input.trim();
  const canSend =
    !isBusy && question !== "" && input.length <= CHAT_LIMITS.maxQuestion;
  const isOverLimit = input.length > CHAT_LIMITS.maxQuestion;

  useEffect(() => {
    const updatePinned = () => {
      const end = endRef.current;
      if (end) {
        pinnedRef.current =
          end.getBoundingClientRect().bottom - window.innerHeight <
          PIN_DISTANCE;
      }
    };
    window.addEventListener("scroll", updatePinned, { passive: true });
    return () => window.removeEventListener("scroll", updatePinned);
  }, []);

  useEffect(() => {
    if (messages.length > 0 && pinnedRef.current) {
      endRef.current?.scrollIntoView({ block: "end" });
    }
  }, [messages, status]);

  const send = (text: string) => {
    pinnedRef.current = true;
    setWasCut(false);
    void sendMessage({ text });
    setInput("");
  };

  return (
    <div className="flex min-h-[calc(100dvh-5rem)] w-full flex-col">
      <div
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="flex flex-1 flex-col"
      >
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
          {messages.length === 0 ? (
            <div className="my-auto flex flex-col gap-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ask about <span className="text-emerald-400">Aditya</span>
                </h1>
                <p className="mt-3 text-sm text-white/60 sm:text-base">
                  Experience, projects, and how this platform was built.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-left text-sm text-white/80 transition-[border-color,color,transform] duration-200 hover:border-white/15 hover:text-white active:scale-[0.98]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) =>
              message.role === "user" ? (
                <div
                  key={message.id}
                  className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-white/10 px-4 py-2.5 text-[15px] leading-relaxed wrap-anywhere whitespace-pre-wrap text-white"
                >
                  {messageText(message)}
                </div>
              ) : (
                <div
                  key={message.id}
                  className="prose prose-invert prose-sm prose-code:before:content-none prose-code:after:content-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-strong:text-white max-w-none text-[15px] leading-relaxed wrap-anywhere text-white/85"
                >
                  <ReactMarkdown
                    components={defaultMarkdownComponents}
                    disallowedElements={NO_IMAGES}
                    unwrapDisallowed
                  >
                    {messageText(message)}
                  </ReactMarkdown>
                </div>
              ),
            )
          )}

          {status === "submitted" && (
            <div
              role="status"
              aria-label="Thinking"
              className="flex items-center gap-1.5 py-1"
            >
              <span className="size-1.5 rounded-full bg-white/40 motion-safe:animate-pulse" />
              <span className="size-1.5 rounded-full bg-white/40 [animation-delay:150ms] motion-safe:animate-pulse" />
              <span className="size-1.5 rounded-full bg-white/40 [animation-delay:300ms] motion-safe:animate-pulse" />
            </div>
          )}

          {wasCut && !isBusy && (
            <p className="text-xs text-amber-300/80">
              This answer was cut short. Ask a follow-up to get the rest.
            </p>
          )}

          {error && (
            <div
              role="alert"
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300"
            >
              <span>
                {APICallError.isInstance(error)
                  ? error.message
                  : "Something went wrong. Please try again."}
              </span>
              <button
                type="button"
                onClick={() => void regenerate()}
                className="flex items-center gap-1 underline underline-offset-2"
              >
                <RotateCcw aria-hidden="true" size={14} />
                Retry
              </button>
            </div>
          )}
        </div>
      </div>

      <form
        className="sticky bottom-0 z-10 mx-auto w-full max-w-2xl shrink-0 bg-linear-to-t from-neutral-950 from-75% to-transparent px-4 pt-6 pb-4 sm:px-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSend) send(question);
        }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Your question
        </label>
        <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-neutral-900/60 p-2 shadow-2xl backdrop-blur-xl transition-colors duration-200 focus-within:border-white/25">
          <textarea
            id="chat-input"
            rows={1}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                if (canSend) send(question);
              }
            }}
            placeholder="Ask a question..."
            aria-invalid={isOverLimit || undefined}
            className="field-sizing-content max-h-40 min-w-0 flex-1 resize-none border-0 bg-transparent px-2.5 py-1.5 text-base leading-6 text-white outline-hidden placeholder:text-white/40 focus:ring-0"
          />
          {isBusy ? (
            <button
              type="button"
              aria-label="Stop"
              onClick={() => void stop()}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-colors duration-200 hover:bg-white/15"
            >
              <Square aria-hidden="true" size={14} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              aria-label="Send"
              disabled={!canSend}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-neutral-950 transition-colors duration-200 hover:bg-emerald-400 disabled:bg-white/10 disabled:text-white/30"
            >
              <ArrowUp aria-hidden="true" size={18} />
            </button>
          )}
        </div>
        <div className="mt-2 flex items-start justify-between gap-3 text-xs text-white/40">
          <p>
            Answers can be wrong. Messages go to AI providers, so don&apos;t
            share personal details.{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-white/70"
            >
              Privacy
            </Link>
          </p>
          <div className="flex shrink-0 items-center gap-3">
            {input.length > COUNTER_THRESHOLD && (
              <span className={isOverLimit ? "text-red-400" : undefined}>
                {input.length}/{CHAT_LIMITS.maxQuestion}
              </span>
            )}
            {messages.length > 0 && !isBusy && (
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setWasCut(false);
                }}
                className="underline underline-offset-2 hover:text-white/70"
              >
                New chat
              </button>
            )}
          </div>
        </div>
      </form>
      <div ref={endRef} />
    </div>
  );
}
