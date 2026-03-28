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
    <div className="flex flex-col justify-between rounded-xl border border-white/5 bg-[#131315]/80 p-6 text-pretty shadow-lg transition-colors hover:bg-[#1a1a1d]">
      <div>
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

      <div className="mt-5 flex flex-col gap-y-8">
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
                        className="font-bold underline decoration-emerald-500 underline-offset-2 hover:text-emerald-500 hover:no-underline hover:decoration-white"
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
                        className="inline-flex items-center rounded bg-white/5 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white/80 ring-1 ring-white/10 transition-colors duration-200 hover:bg-blue-500/10 hover:text-blue-400 hover:ring-blue-500/50"
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

      <div className="mt-6 border-t border-white/10 pt-4">
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
                <div className="group inline-block h-full w-full" tabIndex={0}>
                  <TechnologyIcon
                    technology={technology}
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute bottom-full left-1/2 mb-1 hidden w-fit -translate-x-1/2 transform rounded-md bg-transparent p-1 text-left text-sm wrap-break-word whitespace-pre-line text-white opacity-100 shadow-lg ring-2 ring-sky-500 backdrop-blur-md group-hover:inline-block group-focus:inline-block sm:text-center md:w-max">
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
