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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 pb-12">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-full max-w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md px-4 text-center">
        <div className="flex flex-col items-center justify-center gap-8 rounded-2xl border border-white/5 bg-neutral-900/40 p-10 shadow-2xl backdrop-blur-xl">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 block h-full w-full animate-spin rounded-full border-[3px] border-emerald-500/20 border-t-emerald-500" />
            <span className="absolute inset-0 block h-full w-full animate-[ping_2.5s_ease-in-out_infinite] rounded-full border border-emerald-400 opacity-20" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white">
              Opening Resume
            </h1>
            <p className="animate-pulse text-sm font-medium text-white/50">
              Redirecting you to the PDF document...
            </p>
          </div>
        </div>

        <Script id="resume-redirect" strategy="beforeInteractive">
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
