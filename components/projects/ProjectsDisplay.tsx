import Link from "next/link";

import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import getProjects from "./data";

interface Props {
  heading: string;
  description: string;
  featured: boolean;
}

export default async function ProjectsDisplay({
  heading,
  description,
  featured,
}: Props) {
  const projects: Project[] = await getProjects({ featured });

  return (
    <div className={featured ? "pt-8 sm:pt-16" : "py-8 sm:py-16"}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">{description}</p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-6 box-border columns-1 gap-[1em] space-y-4 md:columns-2 lg:columns-3"
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </ul>
      </div>
      {featured && projects.length > 0 ? (
        <div className="flex items-center justify-center p-10">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-lg bg-blue-500 py-2 opacity-45 blur-md group-hover:bg-green-500 group-hover:blur-lg" />
            <Link
              href={"/projects"}
              className="relative rounded-lg border-2 border-blue-500 bg-neutral-950 px-3 py-2 text-xl font-bold text-blue-100 group-hover:border-green-500 group-hover:text-green-100"
            >
              View all projects
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
