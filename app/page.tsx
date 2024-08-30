import Technologies from "@/components/home/Technologies";
import ProjectsDisplay from "@/components/projects/ProjectsDisplay";
import AboutMe from "@/components/home/AboutMe";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <AboutMe />
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
