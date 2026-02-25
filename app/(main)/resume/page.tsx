import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resume | Aditya Punmiya",
  description: "Aditya's resume",
  metadataBase: new URL("https://adityapunmiya.com/resume"),
  openGraph: {
    title: "Resume | Aditya Punmiya",
    description: "View my resume",
    siteName: "Aditya Punmiya",
    type: "website",
    url: "https://adityapunmiya.com/resume",
    images: [
      {
        url: "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Aditya Punmiya",
    description: "View my resume.",
    images: [
      {
        url: "https://res.cloudinary.com/dijxynt89/image/upload/v1725052376/Aditya_os4fzb.jpg",
      },
    ],
  },
};

export default async function Resume() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4">
      <div className="mx-auto max-w-2xl rounded-lg p-8 text-center">
        <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <Script strategy="beforeInteractive">
          {`
          if (window.clarity) {
            window.clarity("event", "resume_view");
          }
          window.location.href = "/resume.pdf";
        `}
        </Script>
      </div>
    </div>
  );
}
