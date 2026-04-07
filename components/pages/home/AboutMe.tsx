import Image from "next/image";
import Link from "next/link";

import ReactMarkdown from "react-markdown";

import { GetUserDetails } from "@/data/user-details";

export default async function AboutMe() {
  const details = await GetUserDetails();

  return (
    <div className="relative overflow-hidden py-8 sm:py-16">
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-250 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 sm:px-8 md:flex-row lg:gap-16">
        <div className="animate-fade-in-up z-10 flex w-full flex-col gap-8 md:w-[60%]">
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl">
            <span className="block leading-tight text-white/90 xl:inline">
              Hi, I am{" "}
            </span>
            <span className="block bg-linear-to-r from-emerald-400 via-emerald-500 to-blue-500 bg-clip-text leading-tight text-transparent drop-shadow-sm">
              Aditya Punmiya
            </span>
          </h1>
          <div className="prose prose-invert max-w-none space-y-4 text-lg leading-relaxed text-white/70 sm:text-xl">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <Link
                    href={href!}
                    className="relative font-semibold text-white no-underline transition-colors duration-300 before:absolute before:-bottom-0.5 before:left-0 before:z-10 before:h-0.5 before:w-0 before:bg-emerald-400 before:transition-all before:duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-white/30 hover:text-emerald-400 hover:before:w-full"
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

        <div className="relative z-10 hidden h-96 w-[40%] items-center justify-center md:flex lg:h-full">
          <div className="group perspective-1000 relative h-64 w-64 md:h-80 md:w-80 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
            <div className="absolute -inset-4 animate-[spin_10s_linear_infinite] rounded-full bg-linear-to-br from-blue-500/20 via-transparent to-emerald-500/20 opacity-70 blur-xl transition duration-700 group-hover:opacity-100" />
            <div className="absolute -inset-1 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-blue-500/50 blur-lg transition duration-500 group-hover:bg-emerald-500/50 group-hover:blur-xl" />

            <div className="relative h-full w-full rounded-full bg-linear-to-br from-neutral-800 to-neutral-900 p-1 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                className="h-full w-full rounded-full border border-white/10 object-cover ring-4 ring-neutral-900 transition-colors duration-500 group-hover:border-emerald-500/50"
                src={details.coverImage}
                height={400}
                width={400}
                alt="Aditya's private photo"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
