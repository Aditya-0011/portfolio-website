import Link from "next/link";
import Image from "next/image";

import { ProjectMetadata, Experience, TechnologyMetadata } from "@/lib/objects";
import { formatMonth } from "@/lib/utils";

interface Props {
  xp: Experience;
  compact?: boolean;
}

export default function ExperienceCard({ xp, compact }: Props) {
  return (
    <div className="m-2 flex flex-col justify-between rounded-lg bg-neutral-800/50 text-pretty p-5 hover:bg-neutral-800/75">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4 text-lg leading-tight font-semibold tracking-tight text-white">
            {xp.position}
          </div>
          {!compact && (
            <div className="shrink-0 text-right text-base leading-7 text-white">
              {formatMonth(xp.start)}&nbsp;&ndash;&nbsp;
              {xp.end ? formatMonth(xp.end) : "Present"}
            </div>
          )}
        </div>
        <div className="mt-1 flex flex-col justify-center text-base leading-5 text-white/75">
          {xp.company.split(",")[0]}
          <br />
          <span className="text-xs">{xp.company.split(",")[1]?.trim()}</span>
        </div>
        <div className="mt-2 border-b-2 border-red-500"></div>
      </div>
      <div className="mt-2 text-base leading-7 text-emerald-300">
        <span>Details:</span>
        <ul className="ml-6 list-disc text-sm text-white/75">
          {xp.details
            .split("\n")
            .filter(Boolean)
            .map((line, idx) => (
              <li key={idx} className="mt-1 first:mt-0 last:mb-0">
                {line}
              </li>
            ))}
        </ul>
      </div>
      <div className="mt-2 text-base leading-7 text-emerald-300">
        <span>Projects:</span>
        <ul role="list" className="ml-4 flex flex-wrap items-center gap-2">
          {xp.projects && xp.projects.length > 0 ? (
            xp.projects.map((project: ProjectMetadata) => (
              <li key={project._id}>
                <Link
                  href={`/projects/#${project._id}`}
                  className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium whitespace-nowrap text-white ring-1 ring-white transition-colors duration-200 ring-inset hover:text-blue-500 hover:ring-blue-500"
                >
                  {project.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No projects listed</li>
          )}
        </ul>
      </div>
      <div className="mt-2 text-base leading-7 text-emerald-300">
        <span>Technologies:</span>
        <ul
          role="list"
          className="grid grid-cols-3 place-items-center gap-x-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10"
        >
          {xp.technologies && xp.technologies.length > 0 ? (
            xp.technologies?.map((technology: TechnologyMetadata) => (
              <li key={technology._id} className="relative h-10 w-10 px-2 py-1">
                <div className="group inline-block" tabIndex={0}>
                  <Image
                    src={technology.imageUrl}
                    height={32}
                    width={32}
                    className="w-full"
                    alt={technology?.name}
                    priority
                  />
                  <span className="absolute bottom-full left-1/2 mb-1 hidden w-fit -translate-x-1/2 transform rounded-md border-2 border-sky-300/75 bg-transparent p-1 text-center text-sm break-words whitespace-pre-line text-white opacity-100 shadow-lg backdrop-blur-xs group-hover:inline-block group-focus:inline-block md:w-max">
                    {technology.name}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No technology listed</li>
          )}
        </ul>
      </div>
    </div>
  );
}
