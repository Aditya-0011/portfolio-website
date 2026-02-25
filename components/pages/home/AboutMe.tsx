import Image from "next/image";
import Link from "next/link";

import ReactMarkdown from "react-markdown";

import { GetUserDetails } from "@/data/user-details";

export default async function AboutMe() {
  const details = await GetUserDetails();

  return (
    <div className="relative bg-neutral-950">
      <div className="mx-auto mt-1 h-full w-full max-w-7xl py-8 text-left sm:py-16">
        <div className="px-6 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block text-white xl:inline">Hi, I am </span>
            <span className="mt-4 block text-emerald-500">Aditya Punmiya</span>
          </h1>
          <div className="prose prose-invert mt-6 max-w-7xl space-y-3 text-lg text-white/75 sm:text-xl md:mt-8 md:max-w-3xl">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <Link
                    href={href!}
                    className="underline decoration-emerald-500 underline-offset-2 hover:text-emerald-500 hover:no-underline hover:decoration-white"
                  >
                    {children}
                  </Link>
                ),
              }}
            >
              {details.about}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="relative mt-2.5 hidden h-64 w-full items-center justify-center sm:h-72 md:h-96 lg:absolute lg:inset-y-10 lg:right-0 lg:flex lg:h-full lg:w-1/2">
        <div className="group relative h-32 w-32 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-72 lg:w-72 xl:h-96 xl:w-96">
          <div className="absolute -inset-1 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-blue-500/75 py-2 blur-2xl group-hover:bg-emerald-500/75" />
          <Image
            className="absolute inset-0 h-full w-full rounded-full object-cover ring-2 ring-blue-500 group-hover:ring-emerald-500"
            src={details.coverImage}
            height={400}
            width={400}
            alt="Aditya's private photo"
            priority
          />
        </div>
      </div>
    </div>
  );
}
