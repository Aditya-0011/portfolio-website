import Image from "next/image";
import Link from "next/link";

import ReactMarkdown from "react-markdown";

import { GetUserDetails } from "@/data/user-details";

export default async function AboutMe() {
  const details = await GetUserDetails();

  return (
    <div className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-250 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        
        <div className="w-full md:w-[60%] flex flex-col gap-8 z-10 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl">
            <span className="block text-white/90 xl:inline leading-tight">Hi, I am </span>
            <span className="block bg-linear-to-r from-emerald-400 via-emerald-500 to-blue-500 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Aditya Punmiya
            </span>
          </h1>
          <div className="prose prose-invert max-w-none space-y-4 text-lg text-white/70 sm:text-xl leading-relaxed">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <Link
                    href={href!}
                    className="relative text-white font-medium hover:text-emerald-400 transition-colors duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-emerald-400 before:transition-all hover:before:w-full"
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

        <div className="relative hidden md:flex items-center justify-center w-[40%] h-96 lg:h-full z-10">
          <div className="group relative h-64 w-64 md:h-80 md:w-80 lg:h-80 lg:w-80 xl:h-96 xl:w-96 perspective-1000">
            <div className="absolute -inset-4 animate-[spin_10s_linear_infinite] rounded-full bg-linear-to-br from-blue-500/20 via-transparent to-emerald-500/20 blur-xl opacity-70 group-hover:opacity-100 transition duration-700" />
            <div className="absolute -inset-1 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-blue-500/50 blur-lg group-hover:bg-emerald-500/50 group-hover:blur-xl transition duration-500" />
            
            <div className="relative h-full w-full rounded-full p-1 bg-linear-to-br from-neutral-800 to-neutral-900 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
              <Image
                className="h-full w-full rounded-full object-cover ring-4 ring-neutral-900 border border-white/10 group-hover:border-emerald-500/50 transition-colors duration-500"
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
