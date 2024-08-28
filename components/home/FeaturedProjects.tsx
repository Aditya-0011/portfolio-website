import Link from "next/link";

import ProjectsDisplay from "@/components/projects/ProjectsDisplay";

export default function FeaturedProjects() {
  return (
    <>
      <ProjectsDisplay
        url="/api/projects?featured=true"
        heading={"Featured Projects"}
        description={""}
        featured={true}
      />
    </>
  );
}
