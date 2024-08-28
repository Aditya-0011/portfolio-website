import { Metadata } from "next";

import ProjectsDisplay from "@/components/projects/ProjectsDisplay";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I've worked on.",
};

export default async function Projects() {
  return (
    <div className="relative min-h-screen bg-neutral-950">
      <ProjectsDisplay
        url={"/api/projects"}
        heading={"Projects"}
        description={"Here's a list of projects I have worked/working on."}
        featured={false}
      />
    </div>
  );
}
