import Link from "next/link";

import { Home } from "lucide-react";

import { Error } from "@/components/Error";
import { BackButton } from "@/components/BackButton";

export default async function NotFound() {
  let data: string | null = null;
  let isError = false;

  try {
    const res = await fetch(`${process.env.MANAGER_BACKEND_URL}/random`, {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      isError = true;
    } else {
      data = await res.text();
    }
  } catch (error) {
    isError = true;
  }

  if (isError || !data) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-center">
        <Error content="custom slur" />
      </div>
    );
  }

  const [prefix, message] = data.split(":");

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950">
      <div className="mx-auto max-w-7xl px-1 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-sky-500">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-white">{prefix}</h2>
          <p className="mt-2 text-neutral-400">{message}</p>
        </div>

        <div className="flex flex-row justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-sky-400"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>

          <BackButton />
        </div>
      </div>
    </div>
  );
}
