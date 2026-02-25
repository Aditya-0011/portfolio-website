"use client";

import { AlertTriangle } from "lucide-react";

import { BackButton } from "@/components/BackButton";

type ErrorProps = {
  content: string;
};

export function Error({ content }: ErrorProps) {
  return (
    <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)] ring-1 ring-red-500/20">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>

      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold text-white">
          Unable to load {content}
        </h3>
        <p className="text-muted-foreground text-sm">
          An error occurred while fetching the data. Please check the{" "}
          <span className="text-neutral-300">console logs</span> for details or
          verify the system status.
        </p>
      </div>
      <div className="flex gap-2">
        <BackButton />

        <button
          onClick={() => {
            window.location.reload();
          }}
          className="inline-flex h-10 items-center justify-center rounded-md border border-sky-500/20 bg-sky-500/5 px-4 py-2 text-sm font-medium text-sky-500 transition-colors hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400 focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:outline-none"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
