import Link from "next/link";

import { Home } from "lucide-react";

import { Error } from "@/components/Error";
import { BackButton } from "@/components/BackButton";

export default async function NotFound() {
  let data: string | null = null;
  let isError = false;

  try {
    const res = await fetch(`${process.env.MANAGER_BACKEND_URL}/random`);

    if (!res.ok) {
      isError = true;
    } else {
      data = await res.text();
    }
  } catch {
    isError = true;
  }

  if (isError || !data) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px]" />

        <div className="relative z-10 w-full">
          <Error content="custom slur" />
        </div>
      </div>
    );
  }

  const [prefix, message] = data.split(":");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <div className="flex flex-col items-center justify-center gap-8 p-4 sm:p-12">
          <div className="relative">
            <h1 className="bg-linear-to-r from-blue-500 to-sky-400 bg-clip-text text-7xl font-extrabold tracking-tighter text-transparent drop-shadow-sm sm:text-9xl">
              404
            </h1>
            <div className="absolute -inset-4 animate-[pulse_4s_ease-in-out_infinite] rounded-full border border-blue-500/20 opacity-50 blur-md" />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold tracking-tight text-white/90 sm:text-2xl">
              {prefix}
            </h2>
            <p className="mx-auto px-2 text-sm leading-relaxed font-medium text-white/50 select-all sm:text-base">
              {message}
            </p>
          </div>

          <div className="mt-2 flex w-full flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex w-auto items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-sm font-bold whitespace-nowrap text-blue-400 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/50 hover:bg-blue-500/20 hover:shadow-xl hover:shadow-blue-500/20"
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
