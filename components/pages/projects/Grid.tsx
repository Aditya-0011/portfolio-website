import Link from "next/link";

import { GetProjects } from "@/data/projects";

import Card from "@/components/pages/projects/Card";

type Props = {
  Heading: string;
  Description?: string;
  Featured?: boolean;
};

export default async function Grid({ Heading, Description, Featured }: Props) {
  const projects = await GetProjects({ Featured });

  return (
    <div className={Featured ? "pt-8 sm:pt-16" : "py-8 sm:py-16"}>
      <div
        className="mx-auto max-w-7xl px-6 lg:px-8"
        id={Featured ? "projects" : ""}
      >
        <div className="max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {Heading}
          </h2>
          {Description && (
            <p className="mt-2 text-lg leading-8 text-white">{Description}</p>
          )}
        </div>
        <ul
          role="list"
          className="mx-auto mt-6 box-border columns-1 gap-[1em] space-y-4 md:columns-2 lg:columns-3"
        >
          {projects.map((project) => (
            <Card key={project._id} project={project} />
          ))}
        </ul>
      </div>
      {Featured && projects.length > 0 ? (
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
