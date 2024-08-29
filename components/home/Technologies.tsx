"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

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
          cache: "force-cache",
          next: { revalidate: 10000 },
        });
        if (response) {
          const data = await response.json();
          if (data.status === 200) {
            setTechnologies(data.message);
          } else {
            console.log(data.message);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTechnologies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
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
          className="mx-auto box-border gap-[1em] columns-1 md:columns-2 lg:columns-3 mt-6"
        >
          <li className="mb-2 break-inside-avoid rounded-lg p-5 bg-neutral-800/50 hover:bg-neutral-800/75">
            <div className="flex justify-between items-center border-b-2 border-red-500 max-w-7xl">
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
                    <div className="group inline-block">
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${technology.imageUrl}`}
                        height={32}
                        width={32}
                        className="mx-auto rounded-sm hover:bg-neutral-800/75"
                        alt={technology.name}
                        priority
                      />
                      <span className="absolute bottom-full mb-1 w-max p-1 hidden group-hover:inline bg-transparent backdrop-blur opacity-100 border-2 border-sky-300 rounded-md shadow-lg text-center text-emerald-300 font-medium text-sm">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
          <li className="mb-2 break-inside-avoid rounded-lg p-5 bg-neutral-800/50 hover:bg-neutral-800/75">
            <div className="flex justify-between items-center border-b-2 border-red-500 max-w-7xl">
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
                        className="mx-auto rounded-sm hover:bg-neutral-800/75"
                        alt={technology.name}
                        priority
                      />
                      <span className="absolute bottom-full mb-1 w-max p-1 hidden group-hover:inline bg-transparent backdrop-blur opacity-100 border-2 border-sky-300 rounded-md shadow-lg text-center text-emerald-300 font-medium text-sm">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
          <li className="mb-2 break-inside-avoid rounded-lg p-5 bg-neutral-800/50 hover:bg-neutral-800/75">
            <div className="flex justify-between items-center border-b-2 border-red-500 max-w-7xl">
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
                        className="mx-auto rounded-sm hover:bg-neutral-800/75"
                        alt={technology.name}
                        priority
                      />
                      <span className="absolute bottom-full mb-1 w-max p-1 hidden group-hover:inline bg-transparent backdrop-blur opacity-100 border-2 border-sky-300 rounded-md shadow-lg text-center text-emerald-300 font-medium text-sm">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
          <li className="mb-2 break-inside-avoid rounded-lg p-5 bg-neutral-800/50 hover:bg-neutral-800/75">
            <div className="flex justify-between items-center border-b-2 border-red-500 max-w-7xl">
              <div className="text-lg font-semibold leading-8 tracking-tight text-white ">
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
                        className="mx-auto rounded-sm hover:bg-neutral-800/75"
                        alt={technology.name}
                        priority
                      />
                      <span className="absolute bottom-full mb-1 w-max p-1 hidden group-hover:inline bg-transparent backdrop-blur opacity-100 border-2 border-sky-300 rounded-md shadow-lg text-center text-emerald-300 font-medium text-sm">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
          <li className="mb-2 break-inside-avoid rounded-lg p-5 bg-neutral-800/50 hover:bg-neutral-800/75">
            <div className="flex justify-between items-center border-b-2 border-red-500 max-w-7xl">
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
                        className="mx-auto rounded-sm hover:bg-neutral-800/75"
                        alt={technology.name}
                        priority
                      />
                      <span className="absolute bottom-full mb-1 w-max p-1 hidden group-hover:inline bg-transparent backdrop-blur opacity-100 border-2 border-sky-300 rounded-md shadow-lg text-center text-emerald-300 font-medium text-sm">
                        {technology.name}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </li>
          <li className="mb-2 break-inside-avoid rounded-lg p-5 bg-neutral-800/50 hover:bg-neutral-800/75">
            <div className="flex justify-between items-center border-b-2 border-red-500 max-w-7xl">
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
                        className="mx-auto rounded-sm hover:bg-neutral-800/75"
                        alt={technology.name}
                        priority
                      />
                      <span className="absolute bottom-full mb-1 w-max p-1 hidden group-hover:inline bg-transparent backdrop-blur opacity-100 border-2 border-sky-300 rounded-md shadow-lg text-center text-emerald-300 font-medium text-sm">
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
