import Link from "next/link";

import ReactMarkdown from "react-markdown";

import { formatMonthYear } from "@/lib/utils";
import { type Experience } from "@/lib/objects";

import TechnologyIcon from "@/components/TechnologyIcon";

interface Props {
  experience: Experience;
  compact?: boolean;
}

export default function Card({ experience, compact }: Props) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-xl p-6 text-pretty shadow-lg transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <h2 className="flex-1 pr-4 text-xl font-bold tracking-tight text-white">
            {experience.company.split(",")[0]}
          </h2>
          {!compact && (
            <div className="shrink-0 text-right text-sm font-medium text-white/60">
              {formatMonthYear(experience.start)}&nbsp;-&nbsp;
              {experience.end ? formatMonthYear(experience.end) : "Present"}
            </div>
          )}
        </div>
        <div className="mt-1 flex flex-col justify-center text-sm text-white/60">
          <span>{experience.company.split(",")[1]?.trim()}</span>
          <span className="mt-0.5 text-xs font-medium text-emerald-400/90">
            {experience.tenure}
          </span>
        </div>
        <div className="mt-3 border-b border-red-600/70"></div>
      </div>

      <div className="relative z-10 mt-5 flex flex-col gap-y-8">
        {experience.positions.map((position, idx) => (
          <div key={idx} className="relative">
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold text-blue-400">
                {position.role}
              </h3>
              <div className="shrink-0 text-right text-sm font-medium text-white/50">
                {formatMonthYear(position.start)}&nbsp;-&nbsp;
                {position.end ? formatMonthYear(position.end) : "Present"}
              </div>
            </div>

            <div className="mt-3">
              <span className="text-sm font-medium text-emerald-400">
                Details:
              </span>
              <div className="prose prose-invert prose-emerald prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 mt-1 ml-1 max-w-none text-sm text-white/75 marker:text-white/40">
                <ReactMarkdown
                  components={{
                    ul: ({ className, ...props }) => (
                      <ul
                        className={`list-disc pl-4 ${className ?? ""}`}
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
                        className="font-semibold text-emerald-400 underline decoration-transparent hover:decoration-emerald-400 hover:text-emerald-300 transition-all duration-300"
                      >
                        {children}
                      </Link>
                    ),
                  }}
                >
                  {position.workDone}
                </ReactMarkdown>
              </div>
            </div>

            <div className="mt-3">
              <span className="text-sm font-medium text-emerald-400">
                Projects:
              </span>
              <ul
                role="list"
                className="mt-2 ml-1 flex flex-wrap items-center gap-2"
              >
                {position.projects && position.projects.length > 0 ? (
                  position.projects.map((project) => (
                    <li key={project._id}>
                      <Link
                        href={`/projects/#${project._id}`}
                        className="inline-flex items-center rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white/80 border border-white/10 transition-colors duration-200 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/50"
                      >
                        {project.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="ml-1 text-sm text-white/40">
                    No projects listed
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-6 border-t border-white/10 pt-4">
        <span className="text-sm font-medium text-emerald-400">
          Technologies:
        </span>
        <ul
          role="list"
          className="mt-3 ml-1 grid grid-cols-4 place-items-center gap-x-3 gap-y-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10"
        >
          {experience.technologies && experience.technologies.length > 0 ? (
            experience.technologies.map((technology) => (
              <li
                key={technology._id}
                className="relative h-8 w-8 transition-transform duration-200 hover:scale-110"
              >
                <div className="group/tech inline-block h-full w-full rounded-md bg-white/5 p-1 border border-white/5 hover:border-emerald-500/50 transition-colors duration-300 cursor-pointer" tabIndex={0}>
                  <TechnologyIcon
                    technology={technology}
                    className="h-full w-full object-contain"
                  />
                  <span className="pointer-events-none absolute -top-10 left-1/2 mb-1 hidden w-max -translate-x-1/2 transform rounded-md border border-white/10 bg-neutral-800/90 backdrop-blur-md px-2 py-1 text-center text-xs font-semibold text-emerald-300 opacity-0 transition-opacity duration-300 group-hover/tech:inline-block group-focus/tech:inline-block group-hover/tech:opacity-100 group-focus/tech:opacity-100 shadow-xl z-20">
                    {technology.name}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li className="col-span-full ml-1 w-full text-left text-sm text-white/40">
              No technology listed
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
