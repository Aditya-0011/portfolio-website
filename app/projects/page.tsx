import { Metadata } from "next";

import ProjectsDisplay from "@/components/projects/ProjectsDisplay";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I've worked on.",
};

export default async function Projects() {
  return (
    <div className="relative min-h-screen bg-neutral-950">
      <ProjectsDisplay />
    </div>
  );
}
