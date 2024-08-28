import Technologies from "@/components/home/Technologies";
import FeaturedProjects from "@/components/home/FeaturedProjects";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Technologies />
      <FeaturedProjects />
    </div>
  );
}
