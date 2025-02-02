import Image from "next/image";
import Link from "next/link";

import {
  ProjectMetadata,
  TechnologyMetadata,
  Experience,
} from "@/types/project";

interface Props {
  xp: Experience;
}

export default async function ExperienceCard({ xp }: Props) {
  return (
    <li
      key={xp._id}
      className="mb-6 flex break-inside-avoid flex-col justify-between rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75"
    >
      <div className="flex max-w-7xl flex-col border-b-2 border-red-500 pb-2">
        <div className="flex max-w-7xl items-center justify-between">
          <div className="flex-1 text-lg font-semibold leading-tight tracking-tight text-white">
            {xp.position}
          </div>
          <div className="flex-shrink-0 pl-4 text-base leading-7 text-white">
            {xp.start} &#45; {xp.end}
          </div>
        </div>
        <div className="mt-1 text-base leading-7 text-white/75">{xp.company}</div>
      </div>
      <div className="mt-2 flex items-start text-base leading-7 text-emerald-300">
        <span>Projects:</span>
        <ul role="list" className="ml-2 flex flex-wrap items-center gap-2">
          {xp.projects?.map((project: ProjectMetadata) => (
            <li key={project._id}>
              <Link
                href={`/projects/#${project._id}`}
                className="inline-flex items-center whitespace-nowrap rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white"
              >
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul role="list" className="mt-2 flex items-center justify-evenly gap-x-3">
        {xp.technologies?.map((technology: TechnologyMetadata) => (
          <li key={technology._id} className="relative mt-4 h-8 w-8">
            <span className="group">
              <Image
                src={technology.imageUrl}
                height={32}
                width={32}
                className="w-full"
                alt={technology?.name}
                priority
              />
              <span className="absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 transform rounded-md border-2 border-sky-300/75 bg-transparent p-1 text-sm text-white opacity-100 shadow-lg backdrop-blur group-hover:inline">
                {technology.name}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </li>
  );
}
