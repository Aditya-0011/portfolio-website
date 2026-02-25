"use client";

import Image from "next/image";
import Link from "next/link";

import ReactMarkdown from "react-markdown";
import { Globe, Github } from "lucide-react";

import { type Project } from "@/lib/objects";

type Props = {
  project: Project;
};

export default function Card({ project }: Props) {
  return (
    <li
      id={project._id}
      className="mb-6 break-inside-avoid rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75"
    >
      <Image
        alt={project.name}
        src={project.imageUrl}
        width={600}
        height={400}
        className="aspect-3/2 rounded-lg object-contain"
        priority
        unoptimized={project.imageUrl.endsWith(".gif")}
      />
      <div className="mt-6 flex max-w-7xl items-center justify-between border-b-2 border-red-500">
        <div className="text-lg leading-8 font-semibold tracking-tight text-white">
          {project.name}
        </div>
        <div className="flex items-center justify-between gap-2">
          <Link
            target="_blank"
            href={project?.projectUrl ?? ""}
            className={project.projectUrl ? "" : "hidden"}
          >
            <Globe className="-mt-0.5 h-6 w-6" />
          </Link>
          <Link
            target="_blank"
            href={project?.githubUrl ?? ""}
            className={project.githubUrl ? "ml-1" : "hidden"}
          >
            <Github className="-mt-0.5 h-6 w-6" />
          </Link>
        </div>
      </div>
      <div className="prose prose-invert prose-emerald mt-2 max-w-none text-base leading-7 text-emerald-300">
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </div>
      <ul
        role="list"
        className="mt-4 flex flex-wrap items-center justify-evenly gap-4"
      >
        {project.technologies?.map((technology) => (
          <li
            key={technology._id}
            className="relative h-8 w-8 transition-transform duration-200 hover:scale-110"
          >
            <div className="group inline-block h-full w-full" tabIndex={0}>
              <Image
                src={technology.imageUrl}
                height={32}
                width={32}
                className="h-full w-full object-contain"
                alt={technology?.name}
                onError={(event) => {
                  const fallback = technology.fallbackImageUrl;
                  if (event.currentTarget.src !== fallback) {
                    event.currentTarget.src = fallback;
                  }
                }}
                priority
                unoptimized={project.imageUrl.endsWith(".gif")}
              />
              <span className="absolute bottom-full left-1/2 mb-1 hidden w-fit -translate-x-1/2 transform rounded-md border-2 border-sky-300/75 bg-transparent p-1 text-left text-sm wrap-break-word whitespace-pre-line text-white opacity-100 shadow-lg backdrop-blur-sm group-hover:inline-block group-focus:inline-block sm:text-center md:w-max">
                {technology.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}
