import Technologies from "@/components/home/Technologies";
import ProjectsDisplay from "@/components/projects/ProjectsDisplay";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Technologies />
      <ProjectsDisplay
        url="/api/projects?featured=true"
        heading={"Featured Projects"}
        description={""}
        featured={true}
      />
    </div>
  );
}
