import Image from "next/image";
import Link from "next/link";

import ReactMarkdown from "react-markdown";
import { Globe } from "lucide-react";

import { type Project } from "@/lib/objects";

import TechnologyIcon from "@/components/TechnologyIcon";
import { Github } from "@/lib/brand-icons";

type Props = {
  project: Project;
};

export default function Card({ project }: Props) {
  return (
    <li
      id={project._id}
      className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/5 bg-neutral-900/40 p-5 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative aspect-3/2 overflow-hidden rounded-xl border border-white/5 bg-neutral-950/50 transition-colors duration-500 group-hover:border-emerald-500/20">
        <Image
          alt={project.name}
          src={project.imageUrl}
          width={600}
          height={400}
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          priority
          unoptimized={project.imageUrl.endsWith(".gif")}
        />
      </div>

      <div className="relative z-10 mt-6 flex max-w-7xl items-center justify-between border-b border-red-500/30 pb-3">
        <div className="text-xl leading-8 font-bold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-emerald-400">
          {project.name}
        </div>
        <div className="flex items-center justify-between gap-3">
          <Link
            target="_blank"
            href={project?.projectUrl ?? ""}
            className={
              project.projectUrl
                ? "text-white/70 transition-transform duration-300 hover:scale-110 hover:text-white"
                : "hidden"
            }
          >
            <Globe className="h-6 w-6" />
          </Link>
          <Link
            target="_blank"
            href={project?.githubUrl ?? ""}
            className={
              project.githubUrl
                ? "ml-1 text-white/70 transition-transform duration-300 hover:scale-110 hover:text-white"
                : "hidden"
            }
          >
            <Github className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <div className="prose prose-invert prose-emerald relative z-10 mt-4 max-w-none text-base leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/80">
        <ReactMarkdown
          components={{
            ul: ({ className, ...props }) => (
              <ul
                className={`list-disc pl-4 marker:text-emerald-500 ${className ?? ""}`}
                {...props}
              />
            ),
            ol: ({ className, ...props }) => (
              <ol
                className={`list-decimal pl-4 ${className ?? ""}`}
                {...props}
              />
            ),
            a: ({ href, children }) => (
              <Link
                href={href!}
                target="_blank"
                className="font-semibold text-emerald-400 underline decoration-transparent transition-all duration-300 hover:text-emerald-300 hover:decoration-emerald-400"
              >
                {children}
              </Link>
            ),
          }}
        >
          {project.description}
        </ReactMarkdown>
      </div>

      <ul
        role="list"
        className="relative z-10 mt-6 flex flex-wrap items-center gap-3"
      >
        {project.technologies?.map((technology) => (
          <li
            key={technology._id}
            className="group/tech relative h-10 w-10 cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            <div
              className="h-full w-full rounded-md border border-white/5 bg-white/5 p-1.5 transition-colors duration-300 group-hover/tech:border-emerald-500/50"
              tabIndex={0}
            >
              <TechnologyIcon
                technology={technology}
                className="h-full w-full object-contain"
              />
              <span className="pointer-events-none absolute -top-10 left-1/2 z-20 mb-1 w-max -translate-x-1/2 transform rounded-md bg-neutral-800/90 px-2 py-1 text-xs font-semibold text-emerald-300 opacity-0 shadow-xl ring ring-emerald-400/50 backdrop-blur-md transition-opacity duration-300 group-focus-within/tech:opacity-100 group-hover/tech:opacity-100 group-active/tech:opacity-100">
                {technology.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}
