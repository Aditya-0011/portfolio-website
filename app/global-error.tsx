"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/Error";

import "./globals.css";

export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
        <ErrorState content="the site">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-xl border border-white/10 bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white hover:border-emerald-500/50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
          >
            Try again
          </button>
        </ErrorState>
      </body>
    </html>
  );
}
