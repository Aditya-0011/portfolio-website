import { ViewTransition } from "react";

import { GetProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import Grid from "@/components/pages/projects/Grid";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Projects I've built and contributed to.",
  path: "/projects",
});

export default async function Projects() {
  const { projects } = await GetProjects({ Featured: false });

  return (
    <div className="relative min-h-screen bg-neutral-950">
      <ViewTransition name="project-grid" default="none" share="auto">
        <Grid
          Heading="Projects"
          headingLevel="h1"
          aboveTheFold
          Description="Projects I've built and contributed to."
          projects={projects}
        />
      </ViewTransition>
    </div>
  );
}
