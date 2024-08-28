import { lazy, Suspense } from "react";

import { Metadata } from "next";

const ProjectsDisplay = lazy(
  () => import("@/components/projects/ProjectsDisplay"),
);
import { Project } from "@/types/project";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I've worked on.",
};

export default async function Projects() {
  let response = await fetch(`${process.env.BASE_URL}/api/project`);

  let data = await response.json();

  let projects: Project[] = data.message;

  return (
    <div className="relative min-h-screen bg-neutral-950">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <ProjectsDisplay projects={projects} />
      </Suspense>
    </div>
  );
}
