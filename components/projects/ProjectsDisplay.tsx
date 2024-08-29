"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { Project, Technology } from "@/types/project";

interface Props {
  url: string;
  heading: string;
  description: string;
  featured: boolean;
}

const ProjectsDisplay: React.FC<Props> = ({
  url,
  heading,
  description,
  featured,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: { Accept: "application/json", Method: "GET" },
          cache: "force-cache",
          next: { revalidate: 10 },
        });
        if (response) {
          const data = await response.json();
          if (data.status === 200) {
            setProjects(data.message);
          } else {
            console.log(data.message);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
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
            className="mx-auto box-border gap-[1em] md:columns-2 lg:columns-3 mt-6"
          >
            {projects.map((project: Project) => (
              <li
                key={project._id}
                className="mb-6 break-inside-avoid rounded-lg p-5 bg-neutral-800/50 hover:bg-neutral-800/75"
              >
                <Image
                  alt={project.name}
                  src={project.imageUrl}
                  width={600}
                  height={400}
                  className="aspect-[3/2] rounded-lg object-cover"
                />
                <div className="flex justify-between items-center mt-6 border-b-2 border-red-500 max-w-7xl">
                  <div className="text-lg font-semibold leading-8 tracking-tight text-white">
                    {project.name}{" "}
                    {project.status === "wip" ? (
                      <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20 group hover:py-1 hover:px-2 hover:-translate-y-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 group-hover:hidden"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                            clipRule="evenodd"
                          />
                          <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                          <path
                            fillRule="evenodd"
                            d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="hidden group-hover:inline">
                          Work in Progress
                        </span>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      href={project?.projectUrl ?? ""}
                      className={project.projectUrl ? "" : "hidden"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 -mt-0.5 ab"
                      >
                        <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                      </svg>
                    </Link>
                    <Link
                      href={project?.githubUrl ?? ""}
                      className={project.githubUrl ? "ml-1" : "hidden"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <p className="text-base leading-7 text-emerald-300 mt-2">
                  {project.description}
                </p>
                <ul
                  role="list"
                  className="flex items-center justify-evenly gap-x-3"
                >
                  {project.technologies?.map((technology: Technology) => (
                    <li key={technology._id} className="relative w-8 h-8 mt-4">
                      <span className="group">
                        <Image
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${technology.imageUrl}`}
                          height={32}
                          width={32}
                          className="w-full"
                          alt={technology?.name}
                          priority
                        />
                        <span className="absolute bottom-full mb-1 w-max p-1 group-hover:inline hidden bg-transparent backdrop-blur opacity-100 border-2 border-sky-300/75 rounded-md shadow-lg text-center text-white text-sm">
                          {technology.name}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {featured && !loading ? (
        <div className="m-10 flex justify-center items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-blue-500 group-hover:bg-green-500 rounded-lg blur-md group-hover:blur-lg opacity-45 py-2" />
            <Link
              href={"/projects"}
              className="relative rounded-lg px-3 text-xl font-bold text-blue-100 bg-neutral-950 border-2 border-blue-500 py-2 group-hover:border-green-500 group-hover:text-green-100"
            >
              View all projects
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProjectsDisplay;
