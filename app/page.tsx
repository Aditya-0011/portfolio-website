import { Metadata } from "next";

import TechnologyDisplay from "@/components/home/technologies/TechnologyDisplay";
import ProjectsDisplay from "@/components/projects/ProjectsDisplay";
import ExperienceDisplay from "@/components/home/experiences/ExperienceDisplay";
import AboutMe from "@/components/home/AboutMe";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Home | Aditya Punmiya",
  description: "View my bio, work experience, projects and technologies.",
  metadataBase: new URL("https://adityapunmiya.com"),
  openGraph: {
    title: "Home | Aditya Punmiya",
    description: "View my bio, work experience, projects and technologies.",
    siteName: "Aditya Punmiya",
    type: "website",
    url: "https://adityapunmiya.com",
    images: [
      {
        url: "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Aditya Punmiya",
    description: "View my bio, work experience, projects and technologies.",
    images: [
      {
        url: "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg",
      },
    ],
  },
};

export default async function Home() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <AboutMe />
      <TechnologyDisplay />
      <ExperienceDisplay />
      <ProjectsDisplay
        heading={"Featured Projects"}
        description={""}
        featured={true}
      />
    </div>
  );
}
