"use client";

import { AlertTriangle } from "lucide-react";

import { BackButton } from "@/components/BackButton";

type ErrorProps = {
  content: string;
};

export function Error({ content }: ErrorProps) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-8 rounded-2xl border border-white/5 bg-neutral-900/40 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)] ring-1 ring-red-500/20">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>

      <div className="space-y-3 text-center">
        <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Unable to load {content}
        </h3>
        <p className="mx-auto max-w-sm text-sm leading-relaxed font-medium text-white/50 sm:text-base">
          An error occurred while fetching the data. Please check the{" "}
          <span className="text-neutral-300">console logs</span> for details or
          verify the system status.
        </p>
      </div>

      <div className="mt-2 flex w-full flex-row items-center justify-center gap-4">
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="inline-flex w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-neutral-900 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5"
        >
          Refresh
        </button>

        <div className="w-auto">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
