"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-neutral-900 px-6 py-3 text-sm font-bold whitespace-nowrap text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/5"
    >
      <ArrowLeft className="h-5 w-5" />
      Go Back
    </button>
  );
}
