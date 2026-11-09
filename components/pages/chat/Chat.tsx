"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useChat } from "@ai-sdk/react";
import { APICallError, DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import { ArrowUp, RotateCcw, Square, Trash2 } from "lucide-react";

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
  } = useChat({ transport });
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const isBusy = status === "submitted" || status === "streaming";
  const question = input.trim();
  const canSend =
    !isBusy && question !== "" && input.length <= CHAT_LIMITS.maxQuestion;
  const isOverLimit = input.length > CHAT_LIMITS.maxQuestion;

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, status]);

  const send = (text: string) => {
    void sendMessage({ text });
    setInput("");
  };

  return (
    <div className="mx-auto flex h-[calc(100dvh-5rem)] w-full max-w-3xl flex-col px-4 sm:px-6">
      <div
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-6"
      >
        {messages.length === 0 ? (
          <div className="my-auto flex flex-col gap-6 text-center">
            <div>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                Ask about Aditya
              </h1>
              <p className="mt-2 text-sm text-white/60 sm:text-base">
                Experience, projects, and how this platform was built.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="rounded-xl border border-white/10 bg-neutral-900/50 px-4 py-3 text-left text-sm text-white/80 transition-colors hover:border-white/30 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "max-w-[85%] self-end rounded-2xl bg-neutral-800 px-4 py-2 wrap-anywhere whitespace-pre-wrap text-white"
                  : "prose prose-invert prose-sm sm:prose-base max-w-none wrap-anywhere text-white/90"
              }
            >
              {message.role === "user" ? (
                messageText(message)
              ) : (
                <ReactMarkdown
                  components={defaultMarkdownComponents}
                  disallowedElements={NO_IMAGES}
                  unwrapDisallowed
                >
                  {messageText(message)}
                </ReactMarkdown>
              )}
            </div>
          ))
        )}

        {status === "submitted" && (
          <p className="animate-pulse text-sm text-white/50">Thinking...</p>
        )}

        {error && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
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
        <div ref={endRef} />
      </div>

      <form
        className="shrink-0 pb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSend) send(question);
        }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Your question
        </label>
        <div className="flex items-end gap-2 rounded-2xl border border-white/15 bg-neutral-900/70 p-2 focus-within:border-white/40">
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
            placeholder="Ask a question about Aditya..."
            aria-invalid={isOverLimit || undefined}
            className="field-sizing-content max-h-40 min-w-0 flex-1 resize-none bg-transparent px-2 py-1.5 text-base text-white outline-none placeholder:text-white/40 focus-visible:outline-none"
          />
          {messages.length > 0 && !isBusy && (
            <button
              type="button"
              aria-label="Clear conversation"
              onClick={() => setMessages([])}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white"
            >
              <Trash2 aria-hidden="true" size={18} />
            </button>
          )}
          {isBusy ? (
            <button
              type="button"
              aria-label="Stop"
              onClick={() => void stop()}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-neutral-950"
            >
              <Square aria-hidden="true" size={16} />
            </button>
          ) : (
            <button
              type="submit"
              aria-label="Send"
              disabled={!canSend}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-neutral-950 disabled:opacity-30"
            >
              <ArrowUp aria-hidden="true" size={18} />
            </button>
          )}
        </div>
        <p className="mt-2 flex justify-between gap-3 text-xs text-white/45">
          <span>
            AI answers can be wrong. Messages go to third-party AI providers, so
            don&apos;t share personal details.{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy
            </Link>
          </span>
          <span className={isOverLimit ? "text-red-400" : undefined}>
            {input.length}/{CHAT_LIMITS.maxQuestion}
          </span>
        </p>
      </form>
    </div>
  );
}
