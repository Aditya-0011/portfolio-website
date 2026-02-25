"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 rounded-lg border border-neutral-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
    >
      <ArrowLeft className="h-4 w-4" />
      Go Back
    </button>
  );
}
