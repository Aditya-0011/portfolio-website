"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Error as ErrorComponent } from "@/components/Error";

export default function Quote() {
  const [quote, setQuote] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("/api/quote");
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data.quote) {
          setQuote(data.quote);
        }
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    void fetchQuote();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 opacity-50">
        <Loader2 className="h-6 w-6 animate-spin text-white/50" />
        <p className="text-sm font-medium text-white/50">Fetching quote...</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <>
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px]" />
        <div className="relative z-10 w-full">
          <ErrorComponent content="custom slur" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight text-white/90 sm:text-2xl">
          {quote[0]}
        </h2>
        <p className="mx-auto px-2 text-sm leading-relaxed font-medium text-white/50 select-all sm:text-base">
          {quote[1]}
        </p>
      </div>
    </>
  );
}
