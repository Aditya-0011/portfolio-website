import Link from "next/link";
import { Home } from "lucide-react";
import Quote from "@/components/pages/not-found/Quote";
import { BackButton } from "@/components/BackButton";

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

          <Quote />

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
