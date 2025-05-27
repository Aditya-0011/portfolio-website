//import Image from "next/image";
import Link from "next/link";

import {
  ProjectMetadata,
  Experience,
  /*TechnologyMetadata*/
} from "@/lib/objects";

interface Props {
  xp: Experience;
}

function formatMonth(data: string): string {
  const months: { [key: string]: string } = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };
  const [year, month] = data.split("-");
  return `${months[month]}, ${year}`;
}

export default async function ExperienceCard({ xp }: Props) {
  return (
    <li
      key={xp._id}
      className="mb-6 flex break-inside-avoid flex-col justify-between rounded-lg bg-neutral-800/50 p-5 hover:bg-neutral-800/75"
    >
      <div className="flex max-w-7xl flex-col pb-2">
        <div className="flex min-h-[1rem] max-w-7xl items-start justify-between">
          <div className="flex-1 pr-4 text-lg leading-tight font-semibold tracking-tight text-white">
            {xp.position}
          </div>
          <div className="shrink-0 text-right text-base leading-7 text-white">
            {formatMonth(xp.start)}&nbsp;&ndash;&nbsp;
            {xp.end ? formatMonth(xp.end) : "Present"}
          </div>
        </div>
        <div className="mt-1 flex min-h-[2.5rem] flex-col justify-center text-base leading-5 text-white/75">
          {xp.company.split(",")[0]}
          <br />
          <span className="text-xs">{xp.company.split(",")[1]?.trim()}</span>
        </div>
        <div className="mt-2 border-b-2 border-red-500"></div>
      </div>
      <div className="mt-2 flex items-start text-base leading-7 text-emerald-300">
        <span>Projects:</span>
        <ul role="list" className="ml-2 flex flex-wrap items-center gap-2">
          {xp.projects ? (
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
      {/* Current ui is not looking good, will be fixed in future */}
      {/* Uncomment experience/data.ts and object.ts */}
      {/* <ul role="list" className="mt-2 flex items-center justify-evenly gap-x-3">
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
              <span className="absolute bottom-full left-1/2 mb-1 hidden w-max -translate-x-1/2 transform rounded-md border-2 border-sky-300/75 bg-transparent p-1 text-sm text-white opacity-100 shadow-lg backdrop-blur-sm group-hover:inline">
                {technology.name}
              </span>
            </span>
          </li>
        ))}
      </ul> */}
    </li>
  );
}
