import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";

import { Home, Loader2 } from "lucide-react";

import { env } from "@/lib/env";

import { Error as ErrorComponent } from "@/components/Error";
import { BackButton } from "@/components/BackButton";

async function RandomMessage() {
  await connection();
  const res = await fetch(`${env.MANAGER_BACKEND_URL}/random`);

  if (!res.ok && res.status !== 404) {
    return (
      <>
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px]" />
        <div className="relative z-10 w-full">
          <ErrorComponent content="custom slur" />
        </div>
      </>
    );
  }

  const text = await res.text();

  if (!text.includes(":")) {
    return (
      <>
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px]" />
        <div className="relative z-10 w-full">
          <ErrorComponent content="custom slur" />
        </div>
      </>
    );
  }

  const [prefix, message] = text.split(":");

  return (
    <>
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight text-white/90 sm:text-2xl">
          {prefix}
        </h2>
        <p className="mx-auto px-2 text-sm leading-relaxed font-medium text-white/50 select-all sm:text-base">
          {message}
        </p>
      </div>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 opacity-50">
      <Loader2 className="h-6 w-6 animate-spin text-white/50" />
      <p className="text-sm font-medium text-white/50">Fetching quote...</p>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="relative z-10 w-full max-w-4xl text-center">
        <div className="flex flex-col items-center justify-center gap-8 p-4 sm:p-12">
          <div className="relative">
            <h1 className="bg-linear-to-r from-blue-500 to-sky-400 bg-clip-text text-7xl font-extrabold tracking-tighter text-transparent drop-shadow-sm sm:text-9xl">
              404
            </h1>
            <div className="absolute -inset-4 animate-[pulse_4s_ease-in-out_infinite] rounded-full border border-blue-500/20 opacity-50 blur-md" />
          </div>

          <Suspense fallback={<LoadingFallback />}>
            <RandomMessage />
          </Suspense>

          <div className="mt-2 flex w-full flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex w-auto items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-sm font-bold whitespace-nowrap text-emerald-400 shadow-lg transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-[0.97]"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Link>

            <div className="w-auto">
              <BackButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
