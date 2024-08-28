"use client";

import { useEffect, useState } from "react";

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
  }, [setTechnologies, setLoading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-neutral-800/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technology
          </h2>
          <p className="mt-6 text-lg leading-8 text-white">
            Here's what I typically work with.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid grid-cols-2 gap-9 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {technologies.map((technology: Technology) => (
            <li key={technology._id} className="relative">
              <div className="group inline-block">
                <Image
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${technology.imageUrl}`}
                  height={32}
                  width={32}
                  className="mx-auto rounded-sm hover:bg-neutral-800/75"
                  alt={technology.name}
                />
                <span className="absolute bottom-full mb-1 w-max p-1 hidden group-hover:inline bg-transparent backdrop-blur opacity-100 border-2 border-sky-300 rounded-md shadow-lg text-center text-emerald-300 font-medium text-sm">
                  {technology.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
