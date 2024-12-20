import { Metadata } from "next";

import Technologies from "@/components/home/Technologies";
import ProjectsDisplay from "@/components/projects/ProjectsDisplay";
import AboutMe from "@/components/home/AboutMe";

export const metadata: Metadata = {
  title: "Home | Aditya Punmiya",
  description:
    "View my bio, featured projects and technologies.",
  metadataBase: new URL("https://adityapunmiya.com"),
  openGraph: {
    title: "Home | Aditya Punmiya",
    description: "View my bio, featured projects and technologies.",
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
    description: "View my bio, featured projects and technologies.",
    images: [
      {
        url: "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg",
      },
    ],
  },
};

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
