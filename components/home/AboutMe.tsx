import Image from "next/image";
import Link from "next/link";

export default async function AboutMe() {
  return (
    <div className="relative bg-neutral-950">
      <div className="mx-auto w-full max-w-7xl py-8 text-left sm:py-16">
        <div className="px-6 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block text-white xl:inline">Hi, I am </span>
            <span className="mt-4 block text-emerald-500">Aditya Punmiya</span>
          </h1>
          <div className="mt-6 max-w-7xl space-y-3 text-lg text-white/75 sm:text-xl md:mt-8 md:max-w-3xl">
            <p>
              a senior-year Computer Science and Engineering student
              specializing in full-stack development with a strong focus on
              backend technologies. My expertise includes working with stacks
              like FARM/P, ASP.NET, MERN, and PERN. I have professional
              experience in C# (ASP.NET Core 8), PERN stack and basic Bash
              scripting. Additionally, I have some foundational academic
              experience in C and Java. When it comes to databases, SQL is my
              jam, and I prefer it over NoSQL options.
            </p>
            <p>
              I love designing, developing, and deploying apps from start to
              finish. Whether it&apos;s creating something new or tweaking an
              existing project, I&apos;m always up for it! When I&apos;m not
              coding, you&apos;ll find me locked into Assassin&apos;s Creed or
              Valorant.
            </p>
            <p>
              If it&apos;s about solving problems and building cool stuff,
              I&apos;m ready to jump in and get started!{" "}
              <Link
                href="/contact"
                className="underline decoration-emerald-500 underline-offset-2 hover:text-emerald-500 hover:no-underline hover:decoration-white"
              >
                Let&apos;s create something great together!
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden h-64 w-full items-center justify-center sm:h-72 md:h-96 lg:absolute lg:inset-y-10 lg:right-0 lg:flex lg:h-full lg:w-1/2">
        <div className="group relative h-32 w-32 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-72 lg:w-72 xl:h-96 xl:w-96">
          <div className="absolute -inset-1 animate-[pulse_4s_cubic-bezier(0.4,_0,_0.6,_1)_infinite] rounded-full bg-blue-500/75 py-2 blur-2xl group-hover:bg-emerald-500/75" />
          <Image
            className="absolute inset-0 h-full w-full rounded-full object-cover ring-2 ring-blue-500 group-hover:ring-emerald-500"
            src="https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg"
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
