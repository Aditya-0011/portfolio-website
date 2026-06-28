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
      key={project.id}
      id={project.id.toString()}
      className="group relative mb-6 break-inside-avoid rounded-2xl border border-white/5 bg-neutral-900/40 p-5 shadow-lg backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="relative aspect-3/2 overflow-hidden rounded-xl border border-white/5 bg-neutral-950/50 transition-colors duration-200 ease-out group-hover:border-emerald-500/20">
        <Image
          alt={project.name}
          src={project.image_url}
          width={600}
          height={400}
          className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
          unoptimized={project.image_url.endsWith(".gif")}
        />
      </div>

      <div className="relative z-10 mt-6 flex max-w-7xl items-center justify-between border-b border-red-500/30 pb-3">
        <div className="text-xl leading-8 font-bold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-emerald-400">
          {project.name}
        </div>
        <div className="flex items-center justify-between gap-3">
          {project.project_url ? (
            <Link
              target="_blank"
              href={project.project_url}
              aria-label={`Visit ${project.name} website`}
              className="rounded-sm text-white/70 transition-transform duration-200 hover:scale-110 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              <Globe className="h-6 w-6" />
            </Link>
          ) : null}
          {project.github_url ? (
            <Link
              target="_blank"
              href={project.github_url}
              aria-label={`View ${project.name} source on GitHub`}
              className="ml-1 rounded-sm text-white/70 transition-transform duration-200 hover:scale-110 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              <Github className="h-6 w-6" />
            </Link>
          ) : null}
        </div>
      </div>

      <div className="prose prose-invert prose-emerald prose-code:before:content-none prose-code:after:content-none prose-blockquote:font-normal prose-blockquote:not-italic relative z-10 mt-4 max-w-none text-base leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/80 [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none">
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
                className="relative rounded-sm font-semibold text-white no-underline transition-colors duration-300 before:absolute before:-bottom-0.5 before:left-0 before:z-10 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-emerald-400 before:transition-transform before:duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-white/30 hover:text-emerald-400 hover:before:scale-x-100 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none has-[code]:before:hidden has-[code]:after:hidden"
              >
                {children}
              </Link>
            ),
            code: ({ className, children, node, ...props }) => {
              const isInline = !className?.includes("language-");
              return isInline ? (
                <code
                  className="relative rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] font-medium"
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
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
            key={technology.id}
            className="group/tech relative h-10 w-10 cursor-pointer transition-transform duration-200 hover:scale-110"
          >
            <div
              className="h-full w-full rounded-md border border-white/5 bg-white/5 p-1.5 transition-colors duration-200 hover:border-emerald-500/50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              tabIndex={0}
            >
              <TechnologyIcon
                technology={technology}
                className="h-full w-full object-contain"
              />
              <span className="pointer-events-none absolute -top-8 left-1/2 z-20 mb-1 w-max -translate-x-1/2 transform rounded-md bg-neutral-800/90 px-2 py-1 text-xs font-semibold text-emerald-300 opacity-0 shadow-xl ring ring-emerald-400/50 backdrop-blur-md transition-opacity duration-200 group-focus-within/tech:opacity-100 group-hover/tech:opacity-100 group-active/tech:opacity-100">
                {technology.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}
