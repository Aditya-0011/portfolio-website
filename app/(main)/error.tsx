"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/Error";

export default function MainError({
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
    <div className="relative flex min-h-[60vh] items-center justify-center px-4 py-16">
      <ErrorState content="this page">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-xl border border-white/10 bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white transition-[border-color,background-color] duration-200 hover:border-emerald-500/50 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
        >
          Try again
        </button>
      </ErrorState>
    </div>
  );
}
