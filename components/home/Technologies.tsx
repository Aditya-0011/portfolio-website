"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { toast } from "sonner";

import { Technology } from "@/types/project";

export default function Technologies() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/technologies", {
          headers: { Accept: "application/json", Method: "GET" },
          cache: "no-cache",
          next: { revalidate: 10 },
        });
        if (response) {
          const data = await response.json();
          if (data.status === 200) {
            setTechnologies(data.message);
          } else {
            toast.error(data.message);
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTechnologies();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technology
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            Here&apos;s what I typically work with.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-6 box-border columns-1 gap-[1em] md:columns-2 lg:columns-3"
        >
          <li className="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
            <div className="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
              <div className="text-lg font-semibold leading-8 tracking-tight text-white">
                Languages
              </div>
            </div>
            <ul
              role="list"
              className="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none"
            >
              {technologies
                .filter((tech) => tech.category === "lang")
                .map((technology: Technology) => (
                  <li key={technology._id} className="relative">
                    <div className="group inline-block truncate text-center">
                      <Image
                        src={technology.imageUrl}
                        height={32}
                        width={32}
                        className="mx-auto rounded-sm group-hover:hidden"
                        alt={technology.name}
                        priority
                      />
                      <span className="mx-auto mb-1 hidden w-max max-w-32 rounded-md bg-transparent p-1 text-center text-sm font-medium text-emerald-300 opacity-100 backdrop-blur group-hover:inline">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
          <li className="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
            <div className="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
              <div className="text-lg font-semibold leading-8 tracking-tight text-white">
                Frontend
              </div>
            </div>
            <ul
              role="list"
              className="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none"
            >
              {technologies
                .filter((tech) => tech.category === "frontend")
                .map((technology: Technology) => (
                  <li key={technology._id} className="relative">
                    <div className="group inline-block">
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${technology.imageUrl}`}
                        height={32}
                        width={32}
                        className="mx-auto rounded-sm group-hover:hidden"
                        alt={technology.name}
                        priority
                      />
                      <span className="mx-auto mb-1 hidden w-max rounded-md bg-transparent p-1 text-center text-sm font-medium text-emerald-300 opacity-100 backdrop-blur group-hover:inline">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
          <li className="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
            <div className="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
              <div className="text-lg font-semibold leading-8 tracking-tight text-white">
                Backend
              </div>
            </div>
            <ul
              role="list"
              className="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none"
            >
              {technologies
                .filter((tech) => tech.category === "backend")
                .map((technology: Technology) => (
                  <li key={technology._id} className="relative">
                    <div className="group inline-block">
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${technology.imageUrl}`}
                        height={32}
                        width={32}
                        className="mx-auto rounded-sm group-hover:hidden"
                        alt={technology.name}
                        priority
                      />
                      <span className="mx-auto mb-1 hidden w-max rounded-md bg-transparent p-1 text-center text-sm font-medium text-emerald-300 opacity-100 backdrop-blur group-hover:inline">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
          <li className="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
            <div className="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
              <div className="text-lg font-semibold leading-8 tracking-tight text-white">
                Databases
              </div>
            </div>
            <ul
              role="list"
              className="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none"
            >
              {technologies
                .filter((tech) => tech.category === "db")
                .map((technology: Technology) => (
                  <li key={technology._id} className="relative">
                    <div className="group inline-block">
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${technology.imageUrl}`}
                        height={32}
                        width={32}
                        className="mx-auto rounded-sm group-hover:hidden"
                        alt={technology.name}
                        priority
                      />
                      <span className="mx-auto mb-1 hidden w-max rounded-md bg-transparent p-1 text-center text-sm font-medium text-emerald-300 opacity-100 backdrop-blur group-hover:inline">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
          <li className="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
            <div className="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
              <div className="text-lg font-semibold leading-8 tracking-tight text-white">
                Tools
              </div>
            </div>
            <ul
              role="list"
              className="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none"
            >
              {technologies
                .filter((tech) => tech.category === "tool")
                .map((technology: Technology) => (
                  <li key={technology._id} className="relative">
                    <div className="group inline-block">
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${technology.imageUrl}`}
                        height={32}
                        width={32}
                        className="mx-auto rounded-sm group-hover:hidden"
                        alt={technology.name}
                        priority
                      />
                      <span className="mx-auto mb-1 hidden w-max rounded-md bg-transparent p-1 text-center text-sm font-medium text-emerald-300 opacity-100 backdrop-blur group-hover:inline">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
          <li className="mb-2 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75">
            <div className="flex max-w-7xl items-center justify-between border-b-2 border-red-500">
              <div className="text-lg font-semibold leading-8 tracking-tight text-white">
                Academics
              </div>
            </div>
            <ul
              role="list"
              className="mx-auto mt-8 grid grid-cols-3 gap-9 text-center lg:mx-0 lg:max-w-none"
            >
              {technologies
                .filter((tech) => tech.category === "acad")
                .map((technology: Technology) => (
                  <li key={technology._id} className="relative">
                    <div className="group inline-block">
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${technology.imageUrl}`}
                        height={32}
                        width={32}
                        className="mx-auto rounded-sm group-hover:hidden"
                        alt={technology.name}
                        priority
                      />
                      <span className="mb-1 hidden w-max rounded-md bg-transparent p-1 text-center text-sm font-medium text-emerald-300 opacity-100 backdrop-blur group-hover:inline">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
