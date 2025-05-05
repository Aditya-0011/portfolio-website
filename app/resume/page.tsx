import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Resume | Aditya Punmiya",
  description: "Aditya Punmiya's resume",
  metadataBase: new URL("https://adityapunmiya.com/resume"),
  openGraph: {
    title: "Resume | Aditya Punmiya",
    description: "View my resume.",
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
    <div>
      <h1>Resume - Aditya</h1>
      <p>Redirecting to resume PDF...</p>
      <Script strategy="afterInteractive">
        {`
          if (window.clarity) {
            window.clarity("event", "resume_download");
          }
          window.location.href = "/resume.pdf";
        `}
      </Script>
    </div>
  );
}
