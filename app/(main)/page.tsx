import { Suspense, ViewTransition } from "react";
import Link from "next/link";

import AboutMe from "@/components/pages/home/AboutMe";
import TechnologyGrid from "@/components/pages/home/technology/Grid";
import ExperienceGrid from "@/components/pages/home/experience/Grid";
import ProjectGrid from "@/components/pages/projects/Grid";
import {
  TechnologyGridSkeleton,
  ExperienceGridSkeleton,
  FeaturedProjectsSkeleton,
} from "@/components/Skeletons";
import { GetProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Home",
  description: "View my bio, work experience, projects and technologies.",
  path: "/",
});

async function FeaturedProjects() {
  const { projects } = await GetProjects({ Featured: true });

  return (
    <ViewTransition name="project-grid" default="none" share="auto">
      <ProjectGrid Heading="Featured Projects" projects={projects}>
        {projects.length > 0 ? (
          <div className="flex items-center justify-center p-10">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-blue-500 py-2 opacity-45 blur-md group-hover:bg-green-500 group-hover:blur-lg" />
              <Link
                href="/projects"
                transitionTypes={["nav-forward"]}
                className="relative rounded-lg border-2 border-blue-500 bg-neutral-950 px-3 py-2 text-xl font-bold text-blue-100 group-hover:border-green-500 group-hover:text-green-100 active:scale-[0.97]"
              >
                View all projects
              </Link>
            </div>
          </div>
        ) : null}
      </ProjectGrid>
    </ViewTransition>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <AboutMe />
      <Suspense fallback={<TechnologyGridSkeleton />}>
        <TechnologyGrid />
      </Suspense>
      <Suspense fallback={<ExperienceGridSkeleton />}>
        <ExperienceGrid />
      </Suspense>
      <Suspense fallback={<FeaturedProjectsSkeleton />}>
        <FeaturedProjects />
      </Suspense>
    </div>
  );
}
